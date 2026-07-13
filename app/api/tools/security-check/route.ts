import { NextResponse } from "next/server"
import { Agent, fetch as undiciFetch } from "undici"
import { chat } from "@/lib/openai"
import { consume, getClientIp } from "@/lib/rate-limit"
import { guardUrl, type UrlGuardResult } from "@/lib/ssrf"

export const runtime = "nodejs"
export const maxDuration = 60

type Status = "pass" | "warn" | "fail"
type Check = { id: string; label: string; status: Status; detail: string }

const MAX_HOPS = 4
const PER_HOP_MS = 8000
const OVERALL_MS = 30000 // fetch群の全体上限（要約に余白を残す）
const MAX_BODY_BYTES = 200_000

const SYSTEM = `あなたはWebセキュリティの診断結果を、専門用語をかみ砕いて経営者にも分かるように要約するアシスタントです。
渡される「診断結果（機械的に取得したHTTPヘッダ等の事実）」だけを根拠にしてください。診断結果に無い脆弱性を推測で書かないこと。
日本語のMarkdownで、次の構成で簡潔に:

## 総評
（全体像を2〜3行。過度に不安を煽らない）

## 特に対応をおすすめしたい点
（warn/failの項目を、影響（何が起こりうるか）と対策（どう直すか）をセットで、優先度の高い順に箇条書き。各1〜2行）

## できていること
（passの項目を1行で簡潔に）

最後に必ず: 「※これは公開情報（HTTPレスポンス）からの簡易チェックです。実際の攻撃・侵入テストは行っていません。本格的な診断・改修が必要な場合はご相談ください。」`

/** 検証済みIPに固定して名前解決の再実行を封じる（DNSリバインディング対策） */
function pinnedAgent(ip: string, family: number): Agent {
  return new Agent({
    connect: {
      lookup: (
        _hostname: string,
        options: { all?: boolean } | undefined,
        cb: (err: NodeJS.ErrnoException | null, address: unknown, family?: number) => void
      ) => {
        if (options && options.all) cb(null, [{ address: ip, family }])
        else cb(null, ip, family)
      },
    },
  })
}

/** レスポンス本文をストリーミングで最大 maxBytes まで読む（OOM/DoS防止） */
async function readCapped(res: Response, maxBytes: number): Promise<string> {
  if (!res.body) return ""
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (total < maxBytes) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        chunks.push(value)
        total += value.byteLength
      }
    }
  } finally {
    await reader.cancel().catch(() => {})
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c))).slice(0, maxBytes).toString("utf8")
}

async function fetchGuarded(
  initial: Extract<UrlGuardResult, { ok: true }>
): Promise<{ res: Response; finalUrl: string }> {
  const deadline = Date.now() + OVERALL_MS
  let current = initial
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) throw new Error("timeout")
    const agent = pinnedAgent(current.ip, current.family)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Math.min(PER_HOP_MS, remaining))
    let res: Awaited<ReturnType<typeof undiciFetch>>
    try {
      // undici の Agent は undici の fetch と組で使う（Node内蔵fetchとは非互換）
      res = await undiciFetch(current.url.toString(), {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "miitaso-security-check/1.0 (+https://miitaso.com)" },
        dispatcher: agent,
      })
    } finally {
      clearTimeout(timer)
      agent.close().catch(() => {})
    }
    const loc = res.headers.get("location")
    if (res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, current.url)
      const g = await guardUrl(next.toString()) // リダイレクト先も再検証＆再ピン留め
      if (!g.ok) throw new Error("redirect_blocked")
      current = g
      continue
    }
    return { res, finalUrl: current.url.toString() }
  }
  throw new Error("too_many_redirects")
}

function analyze(finalUrl: string, headers: Headers, setCookies: string[], html: string): Check[] {
  const checks: Check[] = []
  const h = (k: string) => headers.get(k)
  const isHttps = finalUrl.startsWith("https://")

  checks.push({
    id: "https",
    label: "HTTPS（通信の暗号化）",
    status: isHttps ? "pass" : "fail",
    detail: isHttps ? "HTTPSで配信されています。" : "HTTPで配信されています。通信が暗号化されず盗聴・改ざんのリスク。",
  })

  const hsts = h("strict-transport-security")
  checks.push({
    id: "hsts",
    label: "HSTS（常時HTTPS強制）",
    status: hsts ? "pass" : "warn",
    detail: hsts ? "Strict-Transport-Security 設定あり。" : "HSTS未設定。初回アクセス時にHTTPへ誘導される余地。",
  })

  const csp = h("content-security-policy")
  checks.push({
    id: "csp",
    label: "CSP（XSS等の緩和）",
    status: csp ? "pass" : "warn",
    detail: csp ? "Content-Security-Policy 設定あり。" : "CSP未設定。XSS・不正スクリプト注入の緩和が弱い。",
  })

  const xfo = h("x-frame-options")
  const frameAncestors = csp ? /frame-ancestors/i.test(csp) : false
  checks.push({
    id: "clickjacking",
    label: "クリックジャッキング対策",
    status: xfo || frameAncestors ? "pass" : "warn",
    detail: xfo || frameAncestors ? "X-Frame-Options / frame-ancestors 設定あり。" : "iframe埋め込みを制限するヘッダが未設定。",
  })

  const xcto = h("x-content-type-options")
  checks.push({
    id: "nosniff",
    label: "MIMEスニッフィング防止",
    status: xcto && /nosniff/i.test(xcto) ? "pass" : "warn",
    detail: xcto ? "X-Content-Type-Options: nosniff 設定あり。" : "X-Content-Type-Options 未設定。",
  })

  const ref = h("referrer-policy")
  checks.push({
    id: "referrer",
    label: "Referrer-Policy",
    status: ref ? "pass" : "warn",
    detail: ref ? "Referrer-Policy 設定あり。" : "Referrer-Policy 未設定。遷移先へURL情報が漏れる余地。",
  })

  const perm = h("permissions-policy")
  checks.push({
    id: "permissions",
    label: "Permissions-Policy",
    status: perm ? "pass" : "warn",
    detail: perm ? "Permissions-Policy 設定あり。" : "Permissions-Policy 未設定（カメラ/位置情報等の権限制御）。",
  })

  const server = h("server")
  const xpb = h("x-powered-by")
  const leak = [server, xpb].filter(Boolean).filter((v) => /\d/.test(v as string))
  checks.push({
    id: "info-leak",
    label: "サーバー情報の露出",
    status: leak.length ? "warn" : "pass",
    detail: leak.length
      ? "バージョンを含むサーバーヘッダを露出しています（攻撃者に手掛かりを与えます）。"
      : "Server / X-Powered-By からの明確なバージョン露出は見られません。",
  })

  if (setCookies.length) {
    const weak = setCookies.filter((c) => {
      const s = c.toLowerCase()
      return !s.includes("secure") || !s.includes("httponly") || !s.includes("samesite")
    })
    checks.push({
      id: "cookies",
      label: "Cookieの安全属性",
      status: weak.length ? "warn" : "pass",
      detail: weak.length
        ? `Secure/HttpOnly/SameSite のいずれかが欠けたCookieが ${weak.length} 件。`
        : "Cookieに Secure/HttpOnly/SameSite が付与されています。",
    })
  }

  if (isHttps && html) {
    const mixed = /(?:src|href)\s*=\s*["']http:\/\//i.test(html)
    checks.push({
      id: "mixed-content",
      label: "混在コンテンツ",
      status: mixed ? "warn" : "pass",
      detail: mixed ? "HTTPSページ内にHTTPリソースの参照が見られます。" : "明確な混在コンテンツは検出されませんでした。",
    })
  }

  return checks
}

function grade(checks: Check[]): { grade: string; pass: number; warn: number; fail: number } {
  const fail = checks.filter((c) => c.status === "fail").length
  const warn = checks.filter((c) => c.status === "warn").length
  const pass = checks.filter((c) => c.status === "pass").length
  let g = "A"
  if (fail > 0) g = "D"
  else if (warn >= 5) g = "C"
  else if (warn >= 2) g = "B"
  return { grade: g, pass, warn, fail }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const input = typeof body?.url === "string" ? body.url : ""

    // 濫用対策はレート制限＋SSRFガード＋タイムアウトで担保
    const rl = await consume(getClientIp(req), "security-check")
    if (!rl.ok) {
      return NextResponse.json(
        {
          error:
            rl.reason === "global"
              ? "本日の無料利用枠が上限に達しました。時間をおいてお試しください。"
              : "本日の無料利用回数の上限に達しました。明日また試すか、無料相談からご相談ください。",
        },
        { status: 429 }
      )
    }

    const guarded = await guardUrl(input)
    if (!guarded.ok) return NextResponse.json({ error: guarded.error }, { status: 400 })

    let out: { res: Response; finalUrl: string }
    try {
      out = await fetchGuarded(guarded)
    } catch (e) {
      const msg = (e as Error).message
      return NextResponse.json(
        {
          error:
            msg === "redirect_blocked" || msg === "too_many_redirects"
              ? "リダイレクト先が安全に確認できませんでした。"
              : "サイトに接続できませんでした。URLをご確認ください。",
        },
        { status: 400 }
      )
    }

    const { res, finalUrl } = out
    const setCookies =
      typeof (res.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie === "function"
        ? (res.headers as Headers & { getSetCookie: () => string[] }).getSetCookie()
        : res.headers.get("set-cookie")
          ? [res.headers.get("set-cookie") as string]
          : []

    let html = ""
    try {
      html = await readCapped(res, MAX_BODY_BYTES)
    } catch {
      /* 本文が読めなくてもヘッダ診断は続行 */
    }

    const checks = analyze(finalUrl, res.headers, setCookies, html)
    const g = grade(checks)

    let summary = ""
    try {
      const { text } = await chat({
        system: SYSTEM,
        user: `診断対象: ${finalUrl}\n総合評価: ${g.grade}（pass:${g.pass} / warn:${g.warn} / fail:${g.fail}）\n\n診断結果(JSON):\n${JSON.stringify(checks, null, 2)}`,
        maxTokens: 1000,
        timeoutMs: 25000,
      })
      summary = text
    } catch (e) {
      console.error("[tools/security-check] summary failed:", (e as Error).message)
    }

    return NextResponse.json({
      url: finalUrl,
      grade: g.grade,
      counts: { pass: g.pass, warn: g.warn, fail: g.fail },
      checks,
      summary,
      remaining: rl.remaining,
    })
  } catch (e) {
    console.error("[tools/security-check]", (e as Error).message)
    return NextResponse.json(
      { error: "診断に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    )
  }
}
