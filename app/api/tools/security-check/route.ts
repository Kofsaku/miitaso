import { NextResponse } from "next/server"
import { chat } from "@/lib/openai"
import { consume, getClientIp } from "@/lib/rate-limit"
import { guardUrl } from "@/lib/ssrf"

export const runtime = "nodejs"
export const maxDuration = 60

type Status = "pass" | "warn" | "fail"
type Check = { id: string; label: string; status: Status; detail: string }

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

async function fetchGuarded(startUrl: URL): Promise<Response> {
  let current = startUrl
  for (let hop = 0; hop < 5; hop++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)
    let res: Response
    try {
      res = await fetch(current.toString(), {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "miitaso-security-check/1.0 (+https://miitaso.com)" },
      })
    } finally {
      clearTimeout(timer)
    }
    const loc = res.headers.get("location")
    if (res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, current)
      const g = await guardUrl(next.toString()) // 各リダイレクト先を再検証（SSRF対策）
      if (!g.ok) throw new Error("redirect_blocked")
      current = g.url
      continue
    }
    // 最終URLをヘッダに載せて呼び出し側へ渡す
    ;(res as Response & { finalUrl?: string }).finalUrl = current.toString()
    return res
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
    detail: ref ? `Referrer-Policy: ${ref}` : "Referrer-Policy 未設定。遷移先へURL情報が漏れる余地。",
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
      ? `バージョンを含むヘッダを露出: ${leak.join(", ")}（攻撃者に手掛かりを与える）`
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

    // 濫用対策はレート制限＋SSRFガード＋タイムアウトで担保（reCAPTCHAは誤ブロックを避け不使用）
    const guarded = await guardUrl(input)
    if (!guarded.ok) return NextResponse.json({ error: guarded.error }, { status: 400 })

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

    let res: Response & { finalUrl?: string }
    try {
      res = (await fetchGuarded(guarded.url)) as Response & { finalUrl?: string }
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

    const finalUrl = res.finalUrl ?? guarded.url.toString()
    const setCookies =
      typeof (res.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie === "function"
        ? (res.headers as Headers & { getSetCookie: () => string[] }).getSetCookie()
        : res.headers.get("set-cookie")
          ? [res.headers.get("set-cookie") as string]
          : []

    // 混在コンテンツ検出用に本文を少しだけ読む（上限200KB）
    let html = ""
    try {
      const buf = await res.arrayBuffer()
      html = Buffer.from(buf.slice(0, 200_000)).toString("utf8")
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
        timeoutMs: 40000,
      })
      summary = text
    } catch (e) {
      console.error("[tools/security-check] summary failed:", (e as Error).message)
      // 要約が失敗しても機械診断結果は返す
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
