"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ToolForm } from "@/components/tool-form"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Brain, Sparkles, ClipboardList, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ToolType = "ideaGeneration" | "ideaRefinement" | "requirementDraft"

const tools = {
  ideaGeneration: {
    title: "アイデア生成",
    description: "新しいビジネスアイデアを生成します",
    icon: Brain,
    prompt: `以下の情報を基に、新しいビジネスアイデアを提案してください。

業界/分野：
ターゲットユーザー：
解決したい課題：
既存の競合サービス：
予算規模：

提案するアイデアは以下の点を考慮してください：
1. 市場のニーズと課題の解決
2. 競合との差別化ポイント
3. 実現可能性とスケーラビリティ
4. 収益モデルの可能性
5. 初期投資と運用コスト

具体的な提案をお願いします。`
  },
  ideaRefinement: {
    title: "アイデア改善",
    description: "既存のアイデアを改善します",
    icon: Sparkles,
    prompt: `以下の情報を基に、既存のビジネスアイデアを改善・発展させてください。

現在のアイデア概要：
想定される課題：
想定されるユーザー：
既存の類似サービス：

改善提案は以下の点を考慮してください：
1. 現在の課題の解決策
2. ユーザー体験の向上
3. 競合との差別化
4. 収益性の向上
5. 実現可能性の向上

具体的な改善案をお願いします。`
  },
  requirementDraft: {
    title: "要件定義",
    description: "プロジェクトの要件を定義します",
    icon: ClipboardList,
    prompt: `以下の情報を基に、プロジェクトの要件定義書を作成してください。

プロジェクト概要：
主要なユーザーストーリー：
必須機能：
技術スタック：
予算と期間：

要件定義は以下の点を考慮してください：
1. 機能要件と非機能要件
2. 優先順位付け
3. 技術的な制約
4. スケジュールとマイルストーン
5. リスクと対策

具体的な要件定義をお願いします。`
  }
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolType>("ideaGeneration")
  const [aiResponse, setAiResponse] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showContactButton, setShowContactButton] = useState<boolean>(false)

  const handleToolChange = (tool: ToolType) => {
    setSelectedTool(tool)
    setFormData({})
    setAiResponse("")
    setShowContactButton(false)
  }

  const handleSubmit = async (formData: Record<string, string>, testMode: boolean = false) => {
    try {
      setLoading(true)
      console.log("Submitting form data:", formData)
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolType: selectedTool,
          formData,
          prompt: tools[selectedTool].prompt,
          ...(testMode && { testQuotaLimit: true }),
        }),
      }).catch(error => {
        console.error("Fetch error:", error)
        throw new Error(`APIリクエストエラー: ${error.message}`)
      })

      console.log("API Response status:", response.status)
      const data = await response.json().catch(error => {
        console.error("JSON parse error:", error)
        throw new Error("APIレスポンスの解析に失敗しました")
      })
      console.log("API Response data:", data)

      if (!response.ok) {
        // API制限エラーの場合、お問い合わせボタンを表示
        if (data.showContactButton) {
          setShowContactButton(true)
        }
        throw new Error(data.error || "APIリクエストに失敗しました")
      }

      if (!data.response) {
        throw new Error("AIからの応答が空です")
      }

      setAiResponse(data.response)
      setShowContactButton(false)
      toast.success("分析が完了しました")
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      toast.error(error instanceof Error ? error.message : "エラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  const currentTool = tools[selectedTool]

  const renderResponse = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Spinner size="sm" />
            <span className="text-sm font-medium">AIが分析中です...</span>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      )
    }

    if (!aiResponse) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            フォームに入力して「AIに分析を依頼」ボタンをクリックしてください
          </p>
          {showContactButton && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 mb-4 text-sm leading-relaxed">
                多くの方にご利用いただき、今月のAI利用枠の上限に達してしまいました。
                <br />
                お問い合わせいただければ、AIよりも優れた専門チームが直接ご提案いたします。
              </p>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  無料相談を申し込む
                </Link>
              </Button>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{aiResponse}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">ツール</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AIを活用したビジネスツールをご利用いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {Object.entries(tools).map(([key, tool]) => (
                  <Button
                    key={key}
                    variant={selectedTool === key ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => handleToolChange(key as ToolType)}
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.title}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <currentTool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{currentTool.title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {currentTool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ToolForm
                      toolType={selectedTool as ToolType}
                      onSubmit={handleSubmit}
                      loading={loading}
                      initialData={formData}
                    />
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle>AIの分析結果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderResponse()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 