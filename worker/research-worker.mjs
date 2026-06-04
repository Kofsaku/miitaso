// LINE「research」リードマグネットの調査ワーカー。
//
// 役割: Neonの research_reports から status='pending' を拾い、
//        claude -p（Claude Code ヘッドレス）でWeb調査→Markdownレポートを生成し、
//        DBに書き戻し、LINE push APIで「サマリー＋URL」を送る。
//
// ⚠️ これは Vercel では動かせない（CLI常駐＋数分の長時間ジョブのため）。
//     手元のMac / 小さなVPS / Railway 等、claude CLIが使える常駐環境で動かす。
//
// 必要env: DATABASE_URL, ANTHROPIC_API_KEY, LINE_CHANNEL_ACCESS_TOKEN
// 任意env: SITE_BASE_URL, CLAUDE_BIN, RESEARCH_MODEL, RESEARCH_MAX_TURNS,
//          RESEARCH_MAX_BUDGET_USD, RESEARCH_POLL_MS, RESEARCH_TIMEOUT_MS
//
// 実行: cd /Users/kt/miitaso && node worker/research-worker.mjs

import { neon } from "@neondatabase/serverless"
import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { DATABASE_URL, ANTHROPIC_API_KEY, LINE_CHANNEL_ACCESS_TOKEN } = process.env

const SITE_BASE_URL = process.env.SITE_BASE_URL || "https://miitaso.com"
const CLAUDE_BIN = process.env.CLAUDE_BIN || "claude"
const MODEL = process.env.RESEARCH_MODEL || "opus"
const MAX_TURNS = process.env.RESEARCH_MAX_TURNS || "30"
const MAX_BUDGET = process.env.RESEARCH_MAX_BUDGET_USD || "1.5"
const POLL_MS = Number(process.env.RESEARCH_POLL_MS || 5000)
const JOB_TIMEOUT_MS = Number(process.env.RESEARCH_TIMEOUT_MS || 600000) // 10分
const PROMPT_FILE = path.join(__dirname, "research_prompt.md")

if (!DATABASE_URL || !ANTHROPIC_API_KEY || !LINE_CHANNEL_ACCESS_TOKEN) {
  console.error("Missing env: DATABASE_URL / ANTHROPIC_API_KEY / LINE_CHANNEL_ACCESS_TOKEN")
  process.exit(1)
}

const sql = neon(DATABASE_URL)

function runClaude(idea) {
  return new Promise((resolve, reject) => {
    const args = [
      "-p", idea, // ← ユーザー入力は引数（=データ）。指示は research_prompt.md 側（=信頼）に分離
      "--append-system-prompt-file", PROMPT_FILE,
      // ツールは読み取り系のみに限定。これが最大の安全策。
      "--allowedTools", "WebSearch,WebFetch",
      "--disallowedTools", "Bash,Write,Edit,NotebookEdit",
      // ⚠️ 権限フラグはバージョン差あり。`claude --help` で確認すること。
      //     ツールを上で絞っているので、万一乗っ取られても被害はWeb読みのみ。
      "--permission-mode", "bypassPermissions",
      "--max-turns", MAX_TURNS,
      "--max-budget-usd", MAX_BUDGET,
      "--model", MODEL,
      "--output-format", "json",
    ]

    const child = spawn(CLAUDE_BIN, args, {
      cwd: __dirname,
      env: { ...process.env, ANTHROPIC_API_KEY },
    })

    let out = ""
    let err = ""
    const timer = setTimeout(() => {
      child.kill("SIGKILL")
      reject(new Error("claude -p timeout"))
    }, JOB_TIMEOUT_MS)

    child.stdout.on("data", (d) => (out += d))
    child.stderr.on("data", (d) => (err += d))
    child.on("error", (e) => {
      clearTimeout(timer)
      reject(e)
    })
    child.on("close", (code) => {
      clearTimeout(timer)
      if (code !== 0) return reject(new Error(`claude exited ${code}: ${err.slice(0, 500)}`))
      try {
        const json = JSON.parse(out)
        resolve({ result: json.result ?? "", cost: json.total_cost_usd ?? null })
      } catch (e) {
        reject(new Error("failed to parse claude json: " + e.message))
      }
    })
  })
}

// LINE通知用の短い要約を抽出（簡易版・要改善）
function extractSummary(md) {
  const m = md.match(/##\s*1\.[^\n]*\n+([^\n]+)/)
  const line = m ? m[1].trim() : md.replace(/[#>*`>-]/g, " ").trim().slice(0, 120)
  return line.slice(0, 200)
}

async function linePush(to, text) {
  if (!to) return
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ to, messages: [{ type: "text", text }] }),
  })
  if (!res.ok) console.error("LINE push failed", res.status, await res.text())
}

// 同時実行で同じジョブを掴まないよう、pending→processing にして1件確保
async function claimNext() {
  const rows = await sql`
    update research_reports set status = 'processing'
    where slug = (
      select slug from research_reports
      where status = 'pending'
      order by created_at
      limit 1
    )
    returning slug, idea, line_user_id
  `
  return rows[0] ?? null
}

async function processOne(job) {
  console.log("[worker] processing", job.slug, "|", job.idea)
  try {
    const { result, cost } = await runClaude(job.idea)
    if (!result || result.length < 50) throw new Error("empty/short report")

    const summary = extractSummary(result)
    await sql`
      update research_reports
      set status='done', report_md=${result}, summary=${summary}, cost_usd=${cost}, done_at=now()
      where slug=${job.slug}
    `
    const url = `${SITE_BASE_URL}/research/${job.slug}`
    await linePush(
      job.line_user_id,
      `お待たせしました。レポートができました👇\n${url}\n\n` +
        `ざっくり：${summary}\n\n` +
        `ここから先（誰に・いくらで・何を作らないか）は壁打ちで。「相談」と送ってください。`
    )
    console.log("[worker] done", job.slug, "cost", cost)
  } catch (e) {
    console.error("[worker] failed", job.slug, e.message)
    await sql`update research_reports set status='error', done_at=now() where slug=${job.slug}`
    await linePush(
      job.line_user_id,
      "うまく調査できませんでした。お手数ですが、表現を少し変えてもう一度お試しください🙏"
    )
  }
}

async function loop() {
  console.log("[worker] started. polling every", POLL_MS, "ms")
  for (;;) {
    try {
      const job = await claimNext()
      if (job) {
        await processOne(job)
        continue // 次のジョブをすぐ確認
      }
    } catch (e) {
      console.error("[worker] loop error", e.message)
    }
    await new Promise((r) => setTimeout(r, POLL_MS))
  }
}

loop()
