import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    // リクエストボディの検証
    let body
    try {
      body = await req.json()
    } catch (error) {
      return NextResponse.json(
        { error: '無効なJSON形式です' },
        { status: 400 }
      )
    }

    const { type, prompt } = body

    // 必須パラメータの検証
    if (!type || typeof type !== 'string') {
      return NextResponse.json(
        { error: 'タイプは必須で、文字列である必要があります' },
        { status: 400 }
      )
    }

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'プロンプトは必須で、文字列である必要があります' },
        { status: 400 }
      )
    }

    // APIキーの検証
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI APIキーが設定されていません')
      return NextResponse.json(
        { error: 'OpenAI APIキーが設定されていません' },
        { status: 500 }
      )
    }

    // システムプロンプトの設定
    let systemPrompt = ''
    switch (type) {
      case 'ideaGeneration':
        systemPrompt = `以下のキーワードや業界に関する新しいビジネスアイデアを1つ提案してください。
以下の点を含めて簡潔に説明してください：
- アイデアの概要
- ターゲット顧客
- 解決する課題
- 主な特徴や利点
- 収益モデル
- 実現可能性

キーワード：${prompt}`
        break
      default:
        return NextResponse.json(
          { error: '無効なツールタイプです' },
          { status: 400 }
        )
    }

    // OpenAI APIリクエスト
    console.log("Sending request to OpenAI...")
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: systemPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    // レスポンスの検証
    if (!completion?.choices?.[0]?.message?.content) {
      console.error("Invalid OpenAI response:", completion)
      return NextResponse.json(
        { error: "AIからの応答が無効です" },
        { status: 500 }
      )
    }

    const response = completion.choices[0].message.content
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error details:", error)
    if (error instanceof Error) {
      console.error("Error stack:", error.stack)
      
      // OpenAI APIのエラー処理
      if (error.message.includes('insufficient_quota') || error.message.includes('429')) {
        return NextResponse.json(
          { error: "申し訳ありません。現在APIの利用制限に達しています。しばらく時間をおいて再度お試しください。" },
          { status: 429 }
        )
      }
      
      // APIキー関連のエラー
      if (error.message.includes('401') || error.message.includes('invalid_api_key')) {
        return NextResponse.json(
          { error: "APIキーが無効です。管理者にお問い合わせください。" },
          { status: 401 }
        )
      }
      
      // その他のOpenAI APIエラー
      if (error.message.includes('openai')) {
        return NextResponse.json(
          { error: "AIサービスでエラーが発生しました。しばらく時間をおいて再度お試しください。" },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: "予期せぬエラーが発生しました" },
      { status: 500 }
    )
  }
} 