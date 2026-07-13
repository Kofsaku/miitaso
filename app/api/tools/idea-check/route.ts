import { NextResponse } from "next/server"
import { chat } from "@/lib/openai"
import { consume, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const maxDuration = 60

// miitasoの新規事業メソッド（methodology.md C章）を製品化したプロンプト。
// 「4失敗要因 → 一番大きいリスクを1つ → 安く速い確かめ方」を返す。
const SYSTEM = `あなたは新規事業の壁打ちアシスタントです。与えられた事業アイデアを、次の「新規事業が失敗する4要因」で診断し、日本語のMarkdownで返します。誇張・お世辞はせず、事業を前に進めるための現実的なフィードバックに徹します。

4要因:
1. 欲しい人がいるか（Desirability）
2. お金を払うか（Viability）
3. 見つけてもらえるか（届け方・集客）
4. 自分たちで実現できるか（Feasibility）

必ず次の構成で出力:

## ひとことで
（このアイデアの要点と、率直な第一印象を2〜3行）

## 4つの観点でのチェック
- **欲しい人がいるか**：…（強い/弱い/要検証 を明記して1〜2行）
- **お金を払うか**：…
- **見つけてもらえるか**：…
- **自分たちで実現できるか**：…

## 一番大きいリスク（まずここを確かめる）
（4つのうち、この事業が失敗するとしたら最もありえる理由を1つだけ選び、なぜそれが急所かを説明）

## 一番安く・速い確かめ方
（上のリスクを、作り込む前に最小コストで確かめる具体的な方法を1つ。例：1枚のLP＋登録ボタン／少人数の有料テスト／手運用で1回売る 等）

最後に必ず: 「※これはAIによる簡易診断です。最後は“作る前に一番大きいリスクを1つ確かめる”——ここを一緒に設計するのが私たちの仕事です。」`

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
    if (idea.length > 600) {
      return NextResponse.json(
        { error: "入力は600文字以内でお願いします。" },
        { status: 400 }
      )
    }

    // 濫用対策はレート制限＋入力/出力/タイムアウト上限で担保（reCAPTCHAは誤ブロックを避け不使用）
    const rl = await consume(getClientIp(req), "idea-check")
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

    const { text } = await chat({
      system: SYSTEM,
      user: `事業アイデア: ${idea}`,
      maxTokens: 1200,
      timeoutMs: 45000,
    })

    if (!text) {
      return NextResponse.json(
        { error: "診断結果を生成できませんでした。表現を変えて再度お試しください。" },
        { status: 502 }
      )
    }

    return NextResponse.json({ report: text, remaining: rl.remaining })
  } catch (e) {
    console.error("[tools/idea-check]", (e as Error).message)
    return NextResponse.json(
      { error: "診断に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    )
  }
}
