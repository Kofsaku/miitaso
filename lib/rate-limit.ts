// 無料ツールの濫用対策。Neon(Postgres)に日次カウンタを持ち、
// ①IP日次上限 ②グローバル日次上限 の二段で守る。
// DATABASE_URL が無い/DB障害時はメモリにフォールバック（ツールは止めない）。
// テーブルは初回に CREATE TABLE IF NOT EXISTS で自己マイグレーション。

import { createHash } from "crypto"
import { getDb } from "./db"

export type RateResult = { ok: boolean; remaining: number; reason: "ip" | "global" | null }

const PER_IP = Number(process.env.TOOL_RL_PER_IP ?? 5) // 1IP/日
const GLOBAL = Number(process.env.TOOL_RL_GLOBAL ?? 300) // 全体/日（コスト天井）
const SALT = process.env.TOOL_RL_SALT ?? "miitaso-tools-v1"

const mem = new Map<string, { day: string; n: number }>()
let ensured = false

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function ipHash(ip: string): string {
  return createHash("sha256").update(SALT + ip).digest("hex").slice(0, 24)
}

function memBump(key: string, day: string): number {
  const cur = mem.get(key)
  if (!cur || cur.day !== day) {
    mem.set(key, { day, n: 1 })
    return 1
  }
  cur.n += 1
  return cur.n
}

type Sql = ReturnType<typeof getDb>

async function ensureTable(sql: Sql): Promise<void> {
  if (ensured) return
  await sql`CREATE TABLE IF NOT EXISTS tool_usage (
    key text PRIMARY KEY,
    n int NOT NULL DEFAULT 0,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`
  ensured = true
}

async function dbPeek(sql: Sql, key: string): Promise<number> {
  const rows = (await sql`SELECT n FROM tool_usage WHERE key = ${key}`) as { n: number }[]
  return rows[0]?.n ?? 0
}

async function dbBump(sql: Sql, key: string): Promise<number> {
  const rows = (await sql`INSERT INTO tool_usage (key, n) VALUES (${key}, 1)
    ON CONFLICT (key) DO UPDATE SET n = tool_usage.n + 1, updated_at = now()
    RETURNING n`) as { n: number }[]
  return rows[0].n
}

/** 1回分を消費する。上限超過なら ok:false（消費しない）。 */
export async function consume(ip: string, tool: string): Promise<RateResult> {
  const day = today()
  const ipKey = `ip:${ipHash(ip)}:${tool}:${day}` // ツール別にIP日次上限を持つ
  const gKey = `global:${day}` // 全ツール横断のコスト天井

  if (process.env.DATABASE_URL) {
    try {
      const sql = getDb()
      await ensureTable(sql)
      const [gN, ipN] = await Promise.all([dbPeek(sql, gKey), dbPeek(sql, ipKey)])
      if (gN >= GLOBAL) return { ok: false, remaining: 0, reason: "global" }
      if (ipN >= PER_IP) return { ok: false, remaining: 0, reason: "ip" }
      const [ipAfter] = await Promise.all([dbBump(sql, ipKey), dbBump(sql, gKey)])
      return { ok: true, remaining: Math.max(0, PER_IP - ipAfter), reason: null }
    } catch (e) {
      console.error("[rate-limit] db error, memory fallback:", (e as Error).message)
    }
  }

  // メモリフォールバック
  const gN = memBump(gKey, day)
  if (gN > GLOBAL) return { ok: false, remaining: 0, reason: "global" }
  const ipN = memBump(ipKey, day)
  if (ipN > PER_IP) return { ok: false, remaining: 0, reason: "ip" }
  return { ok: true, remaining: Math.max(0, PER_IP - ipN), reason: null }
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}
