// セキュリティチェック用のURLガード。
// 「自社サイトのセキュリティを診断するツール」自身がSSRFの踏み台にならないよう、
// http/httpsのみ許可し、名前解決したIPが内部レンジ/ループバック/メタデータ等なら拒否する。
// さらに DNSリバインディング(TOCTOU)対策として、検証済みIPを返し、
// 呼び出し側は fetch をそのIPにピン留めして接続する（再解決を許さない）。

import { lookup } from "dns/promises"
import { isIP } from "net"

const BLOCKED_HOSTNAMES = new Set(["localhost", "metadata.google.internal"])

function isPrivateIPv4(ip: string): boolean {
  const p = ip.split(".").map(Number)
  if (p.length !== 4 || p.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true
  const [a, b] = p
  if (a === 0) return true // "this" network
  if (a === 10) return true // private
  if (a === 127) return true // loopback
  if (a === 169 && b === 254) return true // link-local / metadata(169.254.169.254)
  if (a === 172 && b >= 16 && b <= 31) return true // private
  if (a === 192 && b === 168) return true // private
  if (a === 192 && b === 0) return true // 192.0.0.0/24, 192.0.2.0/24 (test/reserved)
  if (a === 198 && (b === 18 || b === 19)) return true // benchmarking
  if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
  if (a >= 224) return true // multicast / reserved / broadcast
  return false
}

function isPrivateIPv6(ip: string): boolean {
  const s = ip.toLowerCase().split("%")[0] // zone id を除去
  if (s === "::1" || s === "::" || s === "::0") return true // loopback / unspecified
  // v4-mapped / v4-compatible ::ffff:a.b.c.d
  const mapped = s.match(/(?:::ffff:|::)(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return isPrivateIPv4(mapped[1])
  const head = s.split(":")[0] ?? ""
  if (s.startsWith("fe8") || s.startsWith("fe9") || s.startsWith("fea") || s.startsWith("feb")) return true // link-local fe80::/10
  if (head.startsWith("fc") || head.startsWith("fd")) return true // ULA fc00::/7
  if (s.startsWith("2001:db8")) return true // documentation
  if (s.startsWith("ff")) return true // multicast
  return false
}

function isPrivateAddress(ip: string): boolean {
  const fam = isIP(ip)
  if (fam === 4) return isPrivateIPv4(ip)
  if (fam === 6) return isPrivateIPv6(ip)
  return true // 解釈できないものは拒否
}

export type UrlGuardResult =
  | { ok: true; url: URL; ip: string; family: number }
  | { ok: false; error: string }

/** ユーザー入力URLを検証。安全なら検証済みIPを添えて許可する。 */
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
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "")
  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith(".local") || host.endsWith(".internal")) {
    return { ok: false, error: "内部ホストは診断できません。" }
  }

  // 既にIPリテラルならそのまま検証
  const literal = isIP(host)
  if (literal) {
    if (isPrivateAddress(host)) return { ok: false, error: "内部・プライベートアドレスは診断できません。" }
    return { ok: true, url, ip: host, family: literal }
  }

  // ホスト名を解決し、全解決IPが公開レンジであることを確認
  try {
    const results = await lookup(host, { all: true })
    if (!results.length) return { ok: false, error: "ホスト名を解決できませんでした。" }
    for (const r of results) {
      if (isPrivateAddress(r.address)) {
        return { ok: false, error: "内部・プライベートアドレスは診断できません。" }
      }
    }
    // 先頭の検証済みIPにピン留めして返す（fetchの再解決を防ぐ）
    const first = results[0]
    return { ok: true, url, ip: first.address, family: first.family }
  } catch {
    return { ok: false, error: "ホスト名を解決できませんでした。" }
  }
}
