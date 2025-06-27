'use client'

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"
import { Calculator, MessageSquare, ArrowRight, CheckCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"

type EstimateData = {
  projectType: string
  scale: string
  features: string[]
  timeline: string
  budget: string
  description: string
}

type EstimateResult = {
  basePrice: number
  adjustedPrice: number
  breakdown: {
    development: number
    design: number
    testing: number
    projectManagement: number
  }
  timeline: string
  features: string[]
  savingsRate?: number
  aiOptimizations?: string[]
}

export default function EstimatePage() {
  const [estimateData, setEstimateData] = useState<EstimateData>({
    projectType: "",
    scale: "",
    features: [],
    timeline: "",
    budget: "",
    description: "",
  })
  
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projectTypes = [
    { value: "web-app", label: "Webアプリケーション", basePrice: 120, marketPrice: 180 },
    { value: "mobile-app", label: "モバイルアプリ", basePrice: 180, marketPrice: 280 },
    { value: "enterprise", label: "エンタープライズシステム", basePrice: 300, marketPrice: 500 },
    { value: "ecommerce", label: "ECサイト", basePrice: 150, marketPrice: 250 },
    { value: "mvp", label: "MVP開発", basePrice: 80, marketPrice: 120 },
    { value: "api", label: "API開発", basePrice: 100, marketPrice: 150 },
    { value: "landing", label: "ランディングページ", basePrice: 30, marketPrice: 50 },
    { value: "corporate", label: "コーポレートサイト", basePrice: 60, marketPrice: 100 },
  ]

  const scales = [
    { value: "small", label: "小規模（1-3ヶ月）", multiplier: 0.8, complexityFactor: 1.0 },
    { value: "medium", label: "中規模（3-6ヶ月）", multiplier: 1.0, complexityFactor: 1.2 },
    { value: "large", label: "大規模（6-12ヶ月）", multiplier: 1.6, complexityFactor: 1.5 },
    { value: "enterprise", label: "エンタープライズ（12ヶ月以上）", multiplier: 2.2, complexityFactor: 2.0 },
  ]

  const featureOptions = [
    { value: "user-auth", label: "ユーザー認証", price: 8, marketPrice: 20 },
    { value: "payment", label: "決済機能", price: 15, marketPrice: 35 },
    { value: "admin-panel", label: "管理画面", price: 12, marketPrice: 30 },
    { value: "notifications", label: "通知機能", price: 6, marketPrice: 15 },
    { value: "search", label: "検索機能", price: 8, marketPrice: 20 },
    { value: "analytics", label: "分析・レポート", price: 12, marketPrice: 25 },
    { value: "api-integration", label: "外部API連携", price: 10, marketPrice: 25 },
    { value: "chat", label: "チャット機能", price: 18, marketPrice: 40 },
    { value: "file-upload", label: "ファイルアップロード", price: 6, marketPrice: 15 },
    { value: "multi-language", label: "多言語対応", price: 10, marketPrice: 25 },
    { value: "ai-features", label: "AI機能統合", price: 20, marketPrice: 50 },
    { value: "real-time", label: "リアルタイム機能", price: 15, marketPrice: 35 },
  ]

  const handleProjectTypeChange = (value: string) => {
    setEstimateData(prev => ({ ...prev, projectType: value }))
  }

  const handleScaleChange = (value: string) => {
    setEstimateData(prev => ({ ...prev, scale: value }))
  }

  const handleFeatureToggle = (featureValue: string) => {
    setEstimateData(prev => ({
      ...prev,
      features: prev.features.includes(featureValue)
        ? prev.features.filter(f => f !== featureValue)
        : [...prev.features, featureValue]
    }))
  }

  const handleTimelineChange = (value: string) => {
    setEstimateData(prev => ({ ...prev, timeline: value }))
  }

  const handleBudgetChange = (value: string) => {
    setEstimateData(prev => ({ ...prev, budget: value }))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEstimateData(prev => ({ ...prev, description: e.target.value }))
  }

  const performCalculation = () => {
    if (!estimateData.projectType || !estimateData.scale) {
      return null
    }

    const projectType = projectTypes.find(p => p.value === estimateData.projectType)
    const scale = scales.find(s => s.value === estimateData.scale)
    
    if (!projectType || !scale) return null

    // AI効率化を考慮した価格計算
    const aiOptimizedPrice = projectType.basePrice
    const marketBasePrice = projectType.marketPrice
    const scaleMultiplier = scale.multiplier
    const complexityFactor = scale.complexityFactor
    
    // 機能追加価格（AI効率化済み）
    const aiOptimizedFeatures = estimateData.features.reduce((total, featureValue) => {
      const feature = featureOptions.find(f => f.value === featureValue)
      return total + (feature?.price || 0)
    }, 0)
    
    // 市場価格での機能追加価格
    const marketFeatures = estimateData.features.reduce((total, featureValue) => {
      const feature = featureOptions.find(f => f.value === featureValue)
      return total + (feature?.marketPrice || feature?.price || 0)
    }, 0)

    // AI効率化後の最終価格
    const aiOptimizedTotal = Math.round((aiOptimizedPrice + aiOptimizedFeatures) * scaleMultiplier * complexityFactor)
    
    // 市場相場価格
    const marketTotal = Math.round((marketBasePrice + marketFeatures) * scaleMultiplier * complexityFactor)

    // 最低価格保証（30万円以上）
    const finalPrice = Math.max(aiOptimizedTotal, 30)
    const marketPrice = Math.max(marketTotal, 50)

    // 費用内訳（AI効率化を考慮）
    const breakdown = {
      development: Math.round(finalPrice * 0.45), // AI支援により開発効率向上
      design: Math.round(finalPrice * 0.25), // AIツール活用でデザイン効率化
      testing: Math.round(finalPrice * 0.15), // 自動テスト導入
      projectManagement: Math.round(finalPrice * 0.15), // AI支援プロジェクト管理
    }

    const timelineMapping: { [key: string]: string } = {
      "small": "1-3ヶ月",
      "medium": "3-6ヶ月", 
      "large": "6-12ヶ月",
      "enterprise": "12ヶ月以上"
    }

    // 削減率を計算
    const savingsRate = Math.round(((marketPrice - finalPrice) / marketPrice) * 100)

    const result: EstimateResult = {
      basePrice: marketPrice,
      adjustedPrice: finalPrice,
      breakdown,
      timeline: timelineMapping[estimateData.scale] || "要相談",
      features: estimateData.features,
      savingsRate,
      aiOptimizations: [
        "AI自動コード生成による開発効率化",
        "機械学習による品質管理",
        "AI支援デザインツールの活用",
        "自動テスト・デプロイメント"
      ]
    }

    return result
  }

  const calculateEstimate = () => {
    if (!estimateData.projectType || !estimateData.scale) {
      toast.error("プロジェクトタイプとスケールを選択してください")
      return
    }
    const result = performCalculation()
    if (result) {
      setEstimateResult(result)
    }
  }

  // リアルタイム計算のためのuseEffect
  useEffect(() => {
    const result = performCalculation()
    if (result) {
      setEstimateResult(result)
    }
  }, [estimateData.projectType, estimateData.scale, estimateData.features])

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactData,
          service: "estimate",
          message: `見積もり内容:\n
プロジェクトタイプ: ${projectTypes.find(p => p.value === estimateData.projectType)?.label}
規模: ${scales.find(s => s.value === estimateData.scale)?.label}
選択機能: ${estimateData.features.map(f => featureOptions.find(opt => opt.value === f)?.label).join(", ")}
希望スケジュール: ${estimateData.timeline}
予算: ${estimateData.budget}
追加要望: ${estimateData.description}

見積もり結果: ${estimateResult?.adjustedPrice}万円〜
`,
          source: "estimate_page",
          estimateData,
          estimateResult,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "送信に失敗しました")
      }

      toast.success("お問い合わせを受け付けました。担当者より3日以内にご連絡させていただきます。")
      setContactData({
        name: "",
        company: "",
        email: "",
        phone: "",
      })
      setShowContactForm(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "送信に失敗しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  無料見積もり
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  最新AI技術をフル活用した効率的な開発で、相場の25-40%オフを実現。
                  <br />
                  プロジェクト詳細を入力するだけで、精度の高い見積もりを瞬時算出。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 見積もりフォームセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]">
              {/* 見積もり入力フォーム */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    プロジェクト詳細
                  </h2>
                  <p className="text-muted-foreground">
                    以下の項目を入力して、概算見積もりを取得してください。
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>基本情報</CardTitle>
                    <CardDescription>プロジェクトの基本的な情報を選択してください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">プロジェクトタイプ *</label>
                      <Select value={estimateData.projectType} onValueChange={handleProjectTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="プロジェクトの種類を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">プロジェクト規模 *</label>
                      <Select value={estimateData.scale} onValueChange={handleScaleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="プロジェクトの規模を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {scales.map((scale) => (
                            <SelectItem key={scale.value} value={scale.value}>
                              {scale.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>追加機能</CardTitle>
                    <CardDescription>必要な機能を選択してください（複数選択可）</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featureOptions.map((feature) => (
                        <div
                          key={feature.value}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                            estimateData.features.includes(feature.value)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted"
                          }`}
                          onClick={() => handleFeatureToggle(feature.value)}
                        >
                          <div className={`w-4 h-4 rounded border ${
                            estimateData.features.includes(feature.value)
                              ? "bg-primary border-primary"
                              : "border-border"
                          } flex items-center justify-center`}>
                            {estimateData.features.includes(feature.value) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium">{feature.label}</span>
                            <div className="text-xs text-muted-foreground ml-2">
                              <span className="line-through">市場価格: +{feature.marketPrice || feature.price * 2}万円</span>
                              <br />
                              <span className="text-primary font-medium">AI効率化: +{feature.price}万円</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>詳細要件</CardTitle>
                    <CardDescription>追加の要件や希望があればご記入ください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">希望スケジュール</label>
                      <Select value={estimateData.timeline} onValueChange={handleTimelineChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="完成希望時期を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">できるだけ早く</SelectItem>
                          <SelectItem value="1-2months">1-2ヶ月以内</SelectItem>
                          <SelectItem value="3-6months">3-6ヶ月以内</SelectItem>
                          <SelectItem value="6months+">6ヶ月以上先でも可</SelectItem>
                          <SelectItem value="flexible">柔軟に対応</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">予算感</label>
                      <Select value={estimateData.budget} onValueChange={handleBudgetChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="予算の目安を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-50">50万円未満</SelectItem>
                          <SelectItem value="50-100">50-100万円</SelectItem>
                          <SelectItem value="100-200">100-200万円</SelectItem>
                          <SelectItem value="200-500">200-500万円</SelectItem>
                          <SelectItem value="500plus">500万円以上</SelectItem>
                          <SelectItem value="discuss">要相談</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">追加要望・詳細</label>
                      <Textarea
                        value={estimateData.description}
                        onChange={handleDescriptionChange}
                        placeholder="プロジェクトの詳細、特別な要件、技術的な希望などをご記入ください"
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={calculateEstimate} className="w-full" size="lg">
                  見積もりを計算する
                </Button>
              </div>

              {/* 見積もり結果表示 */}
              <div className="space-y-6">
                {estimateResult || (estimateData.projectType && estimateData.scale) ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="h-5 w-5" />
                          見積もり結果
                        </CardTitle>
                        <CardDescription>
                          以下は概算見積もりです。詳細な見積もりは無料相談にてご提供いたします。
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center space-y-3">
                          <div className="text-sm text-muted-foreground line-through">
                            一般的な相場: {estimateResult?.basePrice || 0}万円
                          </div>
                          <div className="text-3xl font-bold text-primary">
                            {estimateResult?.adjustedPrice || 0}万円〜
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 space-y-2">
                            <div className="text-sm text-green-700 font-medium">
                              🤖 AI活用で相場より{estimateResult?.savingsRate || 25}%お得！
                            </div>
                            <div className="text-xs text-green-600">
                              最新AI技術と自動化で効率的な開発を実現
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xl font-semibold tracking-tight">費用内訳</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>開発費用</span>
                              <span>{estimateResult?.breakdown.development || 0}万円</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>デザイン費用</span>
                              <span>{estimateResult?.breakdown.design || 0}万円</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>テスト・品質保証</span>
                              <span>{estimateResult?.breakdown.testing || 0}万円</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>プロジェクト管理</span>
                              <span>{estimateResult?.breakdown.projectManagement || 0}万円</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold tracking-tight">開発期間目安</h4>
                          <p className="text-sm text-muted-foreground">{estimateResult?.timeline || "選択してください"}</p>
                        </div>

                        {estimateResult?.aiOptimizations && (
                          <div className="space-y-3">
                            <h4 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                              🤖 AI活用によるコスト削減要因
                            </h4>
                            <div className="space-y-2">
                              {estimateResult.aiOptimizations.map((optimization, index) => (
                                <div key={index} className="flex items-start space-x-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-muted-foreground">{optimization}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {estimateResult?.features && estimateResult.features.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xl font-semibold tracking-tight">選択された機能</h4>
                            <div className="flex flex-wrap gap-2">
                              {estimateResult.features.map((featureValue) => {
                                const feature = featureOptions.find(f => f.value === featureValue)
                                return (
                                  <span
                                    key={featureValue}
                                    className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                  >
                                    {feature?.label}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          詳細相談・お問い合わせ
                        </CardTitle>
                        <CardDescription>
                          より詳しい見積もりと提案をご希望の方は、お問い合わせください。
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {!showContactForm ? (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/20 rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span className="text-sm font-medium text-primary">特典情報</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  この見積もりでお問い合わせいただくと、以下の特典をご提供：
                                </p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>✓ 詳細な技術提案書（無料）</li>
                                  <li>✓ AI活用によるコスト削減プラン</li>
                                  <li>✓ プロトタイプの無料作成（条件あり）</li>
                                </ul>
                              </div>
                              <Button onClick={() => setShowContactForm(true)} className="w-full" size="lg">
                                🤖 AI活用でお得に開発！お問い合わせ
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                  お名前 *
                                </label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={contactData.name}
                                  onChange={handleContactFormChange}
                                  placeholder="山田 太郎"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium">
                                  会社名
                                </label>
                                <Input
                                  id="company"
                                  name="company"
                                  value={contactData.company}
                                  onChange={handleContactFormChange}
                                  placeholder="株式会社〇〇"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">
                                メールアドレス *
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={contactData.email}
                                onChange={handleContactFormChange}
                                placeholder="example@company.com"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="phone" className="text-sm font-medium">
                                電話番号
                              </label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={contactData.phone}
                                onChange={handleContactFormChange}
                                placeholder="03-1234-5678"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? (
                                  <div className="flex items-center gap-2">
                                    <Spinner size="sm" />
                                    送信中...
                                  </div>
                                ) : (
                                  "お問い合わせを送信"
                                )}
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setShowContactForm(false)}
                              >
                                戻る
                              </Button>
                            </div>
                          </form>
                        )}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>見積もり結果</CardTitle>
                      <CardDescription>
                        左のフォームに必要事項を入力して、見積もりを計算してください。
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          プロジェクトの詳細を入力すると、
                          <br />
                          こちらに見積もり結果が表示されます。
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🤖 AI活用で実現するお得な価格
                    </CardTitle>
                    <CardDescription>
                      最新のAI技術と自動化でコストを大幅削減
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <h4 className="text-xl font-semibold tracking-tight text-blue-900 flex items-center gap-2">
                        🤖 AIフル活用で効率化
                      </h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>GitHub Copilot、ChatGPT等でコード自動生成、開発速度が3倍向上</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>AIデザインツール（Figma AI、Midjourney）でデザイン作業時間を60%短縮</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>機械学習によるバグ検出、テストケース自動生成で品質向上</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>CI/CDパイプライン自動化でデプロイ作業を無人化</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-xl font-semibold tracking-tight">再利用可能なAIコンポーネント</h4>
                          <p className="text-sm text-muted-foreground">
                            独自のAIライブラリとテンプレートで開発期間を最大50%短縮
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-xl font-semibold tracking-tight">リーンな運営体制</h4>
                          <p className="text-sm text-muted-foreground">
                            AI支援による管理コスト削減で、お客様に最適価格を提供
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-xl font-semibold tracking-tight">最新技術スタック</h4>
                          <p className="text-sm text-muted-foreground">
                            Next.js 14、React 18、TypeScript等の最新技術でパフォーマンスと保守性を両立
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      直接お問い合わせする
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}