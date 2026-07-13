import { NextResponse } from "next/server"
import { chat } from "@/lib/openai"
import { consume, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const maxDuration = 60

const SYSTEM = `あなたは新規事業の市場調査アシスタントです。与えられた事業アイデアについて、Web検索を活用して日本語で簡潔・実務的な「簡易市場調査メモ」を作成します。

必ず次の見出し構成のMarkdownで出力してください（各項目は箇条書き中心・3〜5行、誇張しない）:

## 市場規模の目安
## 主要プレイヤー・競合
## 参入障壁とリスク
## 最初に確かめるべきこと（最大リスクを1つ）

ルール:
- 数字が不確実なときは「目安」「推定」と明記。断定しない。
- 公開データが乏しい領域は正直に「明確なデータは乏しい」と書く。
- 「最初に確かめるべきこと」は、最も事業を左右する“一番大きいリスク”を1つに絞り、安く速く確かめる具体的な方法を書く。
- 最後に必ずこの一文を添える: 「※これはAIによる簡易・概算です。意思決定の前に一次情報での裏取りをおすすめします。」`

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const idea = typeof body?.idea === "string" ? body.idea.trim() : ""

    if (idea.length < 4) {
      return NextResponse.json(
        { error: "事業アイデアを入力してください（4文字以上）。" },
        { status: 400 }
      )
    }
    if (idea.length > 500) {
      return NextResponse.json(
        { error: "入力は500文字以内でお願いします。" },
        { status: 400 }
      )
    }

    // 濫用対策はレート制限＋入力/出力/タイムアウト上限で担保（reCAPTCHAは誤ブロックを避け不使用）
    const rl = await consume(getClientIp(req), "research")
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

    const { text, citations } = await chat({
      webSearch: true,
      system: SYSTEM,
      user: `事業アイデア: ${idea}`,
      maxTokens: 1300,
      timeoutMs: 55000,
    })

    if (!text) {
      return NextResponse.json(
        { error: "調査結果を生成できませんでした。表現を変えて再度お試しください。" },
        { status: 502 }
      )
    }

    return NextResponse.json({ report: text, citations, remaining: rl.remaining })
  } catch (e) {
    console.error("[tools/research]", (e as Error).message)
    return NextResponse.json(
      { error: "調査に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    )
  }
}
