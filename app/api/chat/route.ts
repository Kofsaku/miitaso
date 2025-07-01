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

    const { toolType, formData, prompt, testQuotaLimit, type } = body

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

    // promptのみのリクエストに対応
    const actualToolType = toolType || type || 'ideaGeneration'
    const actualFormData = formData || {}
    
    // promptが存在しない場合はデフォルトのシステムプロンプトを使用
    const systemPrompt = prompt || "あなたは優秀なビジネスコンサルタントです。ユーザーの質問や要求に対して、具体的で実用的なアドバイスを提供してください。"

    // 必須パラメータの検証（緩和）
    if (actualToolType && typeof actualToolType !== 'string') {
      return NextResponse.json(
        { error: 'ツールタイプは文字列である必要があります' },
        { status: 400 }
      )
    }

    if (actualFormData && typeof actualFormData !== 'object') {
      return NextResponse.json(
        { error: 'フォームデータはオブジェクトである必要があります' },
        { status: 400 }
      )
    }

    if (systemPrompt && typeof systemPrompt !== 'string') {
      return NextResponse.json(
        { error: 'プロンプトは文字列である必要があります' },
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
    
    // promptのみのリクエストの場合は、promptをそのままuserPromptとして使用
    if (body.prompt && !body.toolType && !body.type && !body.formData) {
      userPrompt = body.prompt
    } else {
      switch (actualToolType) {
        case 'ideaGeneration':
          userPrompt = `
業界/分野：${actualFormData.industry || ''}
ターゲットユーザー：${actualFormData.targetUser || ''}
解決したい課題：${actualFormData.problem || ''}
既存の競合サービス：${actualFormData.competitors || ''}
予算規模：${actualFormData.budget || ''}
`
          break
        case 'ideaRefinement':
          userPrompt = `
現在のアイデア概要：${actualFormData.idea || ''}
想定される課題：${actualFormData.challenges || ''}
想定されるユーザー：${actualFormData.users || ''}
既存の類似サービス：${actualFormData.similarServices || ''}
`
          break
        case 'requirementDraft':
          userPrompt = `
プロジェクト概要：${actualFormData.projectOverview || ''}
主要なユーザーストーリー：${actualFormData.userStories || ''}
必須機能：${actualFormData.requiredFeatures || ''}
技術スタック：${actualFormData.techStack || ''}
予算と期間：${actualFormData.budgetAndTimeline || ''}
`
          break
        default:
          // 不明なtoolTypeの場合もエラーではなく、デフォルトの動作を行う
          userPrompt = body.prompt || '健康に関するビジネスアイデアを教えてください。'
      }
    }

    // OpenAI APIリクエスト
    console.log("Sending request to OpenAI...")
    console.log("System prompt:", systemPrompt)
    console.log("User prompt:", userPrompt)
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: systemPrompt
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