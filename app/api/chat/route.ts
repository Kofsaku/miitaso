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
      console.log("Received request body:", JSON.stringify(body, null, 2))
    } catch (error) {
      console.error("JSON parse error:", error)
      return NextResponse.json(
        { error: '無効なJSON形式です' },
        { status: 400 }
      )
    }

    const { toolType, formData, prompt, testQuotaLimit } = body

    // テスト用: 429エラーを強制発生させる
    if (testQuotaLimit === true) {
      return NextResponse.json(
        { 
          error: "多くの方にご利用いただき、今月のAI利用枠の上限に達してしまいました。\n\nお問い合わせいただければ、AIよりも優れた専門チームが直接ご提案いたします。",
          showContactButton: true
        },
        { status: 429 }
      )
    }

    // 必須パラメータの検証
    if (!toolType || typeof toolType !== 'string') {
      return NextResponse.json(
        { error: 'ツールタイプは必須で、文字列である必要があります' },
        { status: 400 }
      )
    }

    if (!formData || typeof formData !== 'object') {
      return NextResponse.json(
        { error: 'フォームデータは必須で、オブジェクトである必要があります' },
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

    // フォームデータを構造化されたプロンプトに変換
    let userPrompt = ''
    switch (toolType) {
      case 'ideaGeneration':
        userPrompt = `
業界/分野：${formData.industry || ''}
ターゲットユーザー：${formData.targetUser || ''}
解決したい課題：${formData.problem || ''}
既存の競合サービス：${formData.competitors || ''}
予算規模：${formData.budget || ''}
`
        break
      case 'ideaRefinement':
        userPrompt = `
現在のアイデア概要：${formData.idea || ''}
想定される課題：${formData.challenges || ''}
想定されるユーザー：${formData.users || ''}
既存の類似サービス：${formData.similarServices || ''}
`
        break
      case 'requirementDraft':
        userPrompt = `
プロジェクト概要：${formData.projectOverview || ''}
主要なユーザーストーリー：${formData.userStories || ''}
必須機能：${formData.requiredFeatures || ''}
技術スタック：${formData.techStack || ''}
予算と期間：${formData.budgetAndTimeline || ''}
`
        break
      default:
        return NextResponse.json(
          { error: '無効なツールタイプです' },
          { status: 400 }
        )
    }

    // OpenAI APIリクエスト
    console.log("Sending request to OpenAI...")
    console.log("System prompt:", prompt)
    console.log("User prompt:", userPrompt)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
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
          { 
            error: "多くの方にご利用いただき、今月のAI利用枠の上限に達してしまいました。\n\nお問い合わせいただければ、AIよりも優れた専門チームが直接ご提案いたします。",
            showContactButton: true
          },
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