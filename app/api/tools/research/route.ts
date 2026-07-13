import { NextResponse } from "next/server"
import { chat } from "@/lib/openai"
import { consume, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const maxDuration = 60

const SYSTEM = `あなたは新規事業の市場調査アナリストです。与えられた事業アイデアについて、Web検索を活用し、日本語で「そのまま次の一歩を判断できる」簡易市場調査を作成します。専門用語は避け、具体性を最優先にします。

姿勢（最重要）:
- 直接のデータが無くても「データが乏しい」で終わらせない。必ず"推定の道筋"を示す。類似・隣接市場の実例や、対象人口×想定普及率×単価のボトムアップで、前提を明記した概算金額（幅でよい）を出す。例:「◯◯万人 × 想定◯% × 単価◯円 ≒ 約◯億円」。
- 競合は「専門企業が見つからない」で終わらせない。直接競合に加え、代替手段・近い業態・海外の類似例まで広げ、実在名を挙げて「誰と戦うことになるか」を具体的に書く。
- リスクは一般論でなく、このアイデア固有の急所を挙げる。
- 「最初に確かめるべきこと」は最大リスクを1つに絞り、"アンケート"のような一般論ではなく、このアイデアで安く速く確かめる具体策を1つ（例:1枚のLPで事前登録を集める／小さく1回だけ有料で開催してみる 等）。

必ず次の見出し構成のMarkdownで出力（各項目は具体的に、箇条書き中心）:

## 市場規模の目安（推定）
## 競合・近い存在
## このアイデア特有のリスク
## 最初に確かめるべきこと（最大リスク1つ＋安く速い検証法）

最後に必ずこの一文を添える: 「※これはAIによる簡易・概算です。数字は前提つきの推定なので、意思決定の前に一次情報での裏取りをおすすめします。」`

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
      model: "gpt-4o-search-preview", // miniより具体的（実在競合・ボトムアップ概算を出す）
      webSearch: true,
      system: SYSTEM,
      user: `事業アイデア: ${idea}`,
      maxTokens: 1600,
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
