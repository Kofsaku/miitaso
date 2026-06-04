import { NextResponse } from "next/server"
import crypto from "crypto"
import { getDb } from "@/lib/db"
import { verifyLineSignature, replyMessage, textMessage } from "@/lib/line"

// 署名検証(crypto)とDB書き込みを行うので Node ランタイムで動かす
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const FREE_LIMIT = Number(process.env.RESEARCH_FREE_LIMIT ?? 3)
// 先頭が "research"（全角/半角スペースや : の有無を許容）
const RESEARCH_PREFIX = /^research[\s　:：]*/i

const ONBOARD =
  "友だち追加ありがとうございます、ツバタです。\n" +
  "エンジニア出身で、新規事業の壁打ち〜AIプロダクト開発・システム刷新までやっています。\n\n" +
  "【使い方】\n「research」＋あなたの事業アイデアを送ってください。\n" +
  "例）research 地方の小規模飲食店向けに、AIで予約と仕入れを最適化するサービス\n\n" +
  "AIが市場の初期仮説・想定顧客・リーンキャンバス・“最も死にやすい仮説”をまとめたレポートのURLを返します（無料）。"

const USAGE =
  "「research」＋事業アイデアを送ってください。\n" +
  "例）research 地方の小規模飲食店向けに、AIで予約と仕入れを最適化するサービス"

const ACK =
  "受け取りました🔍 いま市場を調べてレポートを作成中です。\n" +
  "数分かかります。できあがったら、このトークにURLを送ります。"

const LIMIT_MSG =
  "無料のレポート作成回数の上限に達しました。\n" +
  "続きはぜひ壁打ちで詰めましょう。「相談」と送ってください。"

export async function POST(request: Request) {
  const raw = await request.text()
  const signature = request.headers.get("x-line-signature")
  if (!verifyLineSignature(raw, signature)) {
    return new NextResponse("invalid signature", { status: 401 })
  }

  let body: any
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: true })
  }

  const events: any[] = body.events ?? []
  // LINEは10秒程度で200を期待。各イベントは失敗しても全体は200で返す。
  await Promise.allSettled(events.map(handleEvent))
  return NextResponse.json({ ok: true })
}

async function handleEvent(event: any): Promise<void> {
  try {
    // 友だち追加 → オンボーディング
    if (event.type === "follow" && event.replyToken) {
      await replyMessage(event.replyToken, [textMessage(ONBOARD)])
      return
    }

    if (event.type !== "message" || event.message?.type !== "text") return

    const text: string = (event.message.text ?? "").trim()
    const replyToken: string = event.replyToken
    const userId: string | undefined = event.source?.userId

    if (!RESEARCH_PREFIX.test(text)) {
      await replyMessage(replyToken, [textMessage(USAGE)])
      return
    }

    const idea = text.replace(RESEARCH_PREFIX, "").trim()
    if (!idea) {
      await replyMessage(replyToken, [textMessage(USAGE)])
      return
    }

    const sql = getDb()

    // 無料回数チェック（pending/processing/done をカウント）
    // TODO: 期間ウィンドウ（例: 直近30日）やスパム判定を足す
    if (userId) {
      const rows = (await sql`
        select count(*)::int as n
        from research_reports
        where line_user_id = ${userId} and status in ('pending','processing','done')
      `) as { n: number }[]
      if ((rows[0]?.n ?? 0) >= FREE_LIMIT) {
        await replyMessage(replyToken, [textMessage(LIMIT_MSG)])
        return
      }
    }

    const slug = crypto.randomBytes(16).toString("base64url") // 推測不能・22文字
    await sql`
      insert into research_reports (slug, line_user_id, idea, status)
      values (${slug}, ${userId ?? null}, ${idea}, 'pending')
    `
    // ワーカー(別プロセス)が pending を拾って claude -p で調査→完了時にpushする
    await replyMessage(replyToken, [textMessage(ACK)])
  } catch (e) {
    console.error("[line webhook] event error", e)
  }
}
