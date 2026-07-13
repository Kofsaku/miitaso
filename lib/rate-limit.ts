// 無料ツールの濫用対策。Neon(Postgres)に日次カウンタを持ち、
// ①IP日次上限 ②グローバル日次上限(コスト天井) の二段で守る。
// - チェックと加算を単一SQL(ON CONFLICT ... WHERE n < limit)でアトミックに行い競合を防ぐ
// - 日付はJST基準。古い行はインスタンス起動時に掃除してテーブル肥大を防ぐ
// - DATABASE_URL が無い/DB障害時はメモリにフォールバック

import { createHash } from "crypto"
import { getDb } from "./db"

export type RateResult = { ok: boolean; remaining: number; reason: "ip" | "global" | null }

const PER_IP = Number(process.env.TOOL_RL_PER_IP ?? 5)
const GLOBAL = Number(process.env.TOOL_RL_GLOBAL ?? 300)
const SALT = process.env.TOOL_RL_SALT ?? "miitaso-tools-v1"

const mem = new Map<string, { day: string; n: number }>()
let ensured = false

/** JST基準のYYYY-MM-DD（1日の上限が日本時間の深夜にリセットされるように） */
function today(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10)
}

function ipHash(ip: string): string {
  return createHash("sha256").update(SALT + ip).digest("hex").slice(0, 24)
}

type Sql = ReturnType<typeof getDb>

async function ensureTable(sql: Sql): Promise<void> {
  if (ensured) return
  await sql`CREATE TABLE IF NOT EXISTS tool_usage (
    key text PRIMARY KEY,
    n int NOT NULL DEFAULT 0,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`
  // 肥大防止: 2日より古い行を掃除（インスタンス起動時に一度）
  await sql`DELETE FROM tool_usage WHERE updated_at < now() - interval '2 days'`.catch(() => {})
  ensured = true
}

/**
 * チェックと加算をアトミックに行う。上限未満なら加算後の値を返し、上限到達なら null。
 * 初回(挿入)は必ず1で成立。以降は n < limit のときだけ加算される。
 */
async function bumpIfUnder(sql: Sql, key: string, limit: number): Promise<number | null> {
  const rows = (await sql`
    INSERT INTO tool_usage (key, n) VALUES (${key}, 1)
    ON CONFLICT (key) DO UPDATE SET n = tool_usage.n + 1, updated_at = now()
    WHERE tool_usage.n < ${limit}
    RETURNING n
  `) as { n: number }[]
  return rows.length ? rows[0].n : null
}

function memBumpIfUnder(key: string, day: string, limit: number): number | null {
  const cur = mem.get(key)
  if (!cur || cur.day !== day) {
    mem.set(key, { day, n: 1 })
    return 1
  }
  if (cur.n >= limit) return null
  cur.n += 1
  return cur.n
}

/** 1回分を消費する。上限超過なら ok:false（消費しない）。 */
export async function consume(ip: string, tool: string): Promise<RateResult> {
  const day = today()
  const ipKey = `ip:${ipHash(ip)}:${tool}:${day}`
  const gKey = `global:${day}`

  if (process.env.DATABASE_URL) {
    try {
      const sql = getDb()
      await ensureTable(sql)
      // グローバル(コスト天井)を先に確保。超過なら即拒否
      const gN = await bumpIfUnder(sql, gKey, GLOBAL)
      if (gN === null) return { ok: false, remaining: 0, reason: "global" }
      // IP日次
      const ipN = await bumpIfUnder(sql, ipKey, PER_IP)
      if (ipN === null) return { ok: false, remaining: 0, reason: "ip" }
      return { ok: true, remaining: Math.max(0, PER_IP - ipN), reason: null }
    } catch (e) {
      console.error("[rate-limit] db error, memory fallback:", (e as Error).message)
    }
  }

  // メモリフォールバック（単一インスタンス内でのみ有効）
  const gN = memBumpIfUnder(gKey, day, GLOBAL)
  if (gN === null) return { ok: false, remaining: 0, reason: "global" }
  const ipN = memBumpIfUnder(ipKey, day, PER_IP)
  if (ipN === null) return { ok: false, remaining: 0, reason: "ip" }
  return { ok: true, remaining: Math.max(0, PER_IP - ipN), reason: null }
}

/**
 * クライアントIP。Vercelが設定する x-real-ip を最優先（クライアントが差し替えにくい）。
 * 無ければ x-forwarded-for の先頭。
 */
export function getClientIp(req: Request): string {
  const real = req.headers.get("x-real-ip")
  if (real) return real.trim()
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return "unknown"
}
