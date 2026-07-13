// セキュリティチェック用のURLガード。
// 「自社サイトのセキュリティを診断するツール」自身がSSRFの踏み台にならないよう、
// http/httpsのみ許可し、名前解決したIPが内部レンジ/ループバック/メタデータ等なら拒否する。

import { lookup } from "dns/promises"

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata.google.internal",
])

function isPrivateIPv4(ip: string): boolean {
  const p = ip.split(".").map(Number)
  if (p.length !== 4 || p.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true // 不正は拒否
  const [a, b] = p
  if (a === 10) return true
  if (a === 127) return true // loopback
  if (a === 0) return true
  if (a === 169 && b === 254) return true // link-local / metadata (169.254.169.254)
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
  if (a >= 224) return true // multicast/reserved
  return false
}

function isPrivateIPv6(ip: string): boolean {
  const s = ip.toLowerCase()
  if (s === "::1" || s === "::") return true
  if (s.startsWith("fe80") || s.startsWith("fc") || s.startsWith("fd")) return true // link-local / ULA
  if (s.startsWith("::ffff:")) return isPrivateIPv4(s.replace("::ffff:", "")) // v4-mapped
  return false
}

export type UrlGuardResult =
  | { ok: true; url: URL }
  | { ok: false; error: string }

/** ユーザー入力URLを検証し、安全（外部の公開ホスト）なときだけ許可する。 */
export async function guardUrl(input: string): Promise<UrlGuardResult> {
  let raw = (input ?? "").trim()
  if (!raw) return { ok: false, error: "URLを入力してください。" }
  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return { ok: false, error: "URLの形式が正しくありません。" }
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, error: "http / https のURLのみ診断できます。" }
  }
  const host = url.hostname.toLowerCase()
  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith(".local") || host.endsWith(".internal")) {
    return { ok: false, error: "内部ホストは診断できません。" }
  }

  // ホスト名をIPに解決し、内部レンジを拒否（DNSリバインディング対策の一次防御）
  try {
    const results = await lookup(host, { all: true })
    if (!results.length) return { ok: false, error: "ホスト名を解決できませんでした。" }
    for (const r of results) {
      const priv = r.family === 6 ? isPrivateIPv6(r.address) : isPrivateIPv4(r.address)
      if (priv) return { ok: false, error: "内部・プライベートアドレスは診断できません。" }
    }
  } catch {
    return { ok: false, error: "ホスト名を解決できませんでした。" }
  }

  return { ok: true, url }
}
