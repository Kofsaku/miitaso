"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { DevelopmentFlow } from "@/components/development-flow"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cpu,
  Database,
  Globe,
  Lightbulb,
  MessageSquare,
  Palette,
  Rocket,
  Users,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import ReactMarkdown from "react-markdown"
import { toast } from "react-hot-toast"
import { getCaseStudiesByServiceType } from "@/app/data/case-studies"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ServiceType } from "@/types"

export default function Home() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceType>("product")
  const [ideaResponse, setIdeaResponse] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    service: "product",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentCaseStudies = getCaseStudiesByServiceType(selectedCaseStudy)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // reCAPTCHA v3でトークン取得
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (typeof window === 'undefined' || !(window as any).grecaptcha) {
          reject(new Error('reCAPTCHAが読み込まれていません'))
          return
        }
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'top_page_form' })
            .then(resolve)
            .catch(reject)
        })
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "top_page",
          recaptchaToken
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "送信に失敗しました")
      }

      toast.success("お問い合わせを受け付けました。担当者より3日以内にご連絡させていただきます。")
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        service: "product",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "送信に失敗しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen page-light-entrance">
      <div className="light-entrance-overlay" />
      <Toaster position="top-center" />
      <div className="content-reveal">
        <Header />
        <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 bg-white overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in-up">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-white border border-gray-200 px-3 py-1 text-sm mb-4 animate-slide-in-left animation-delay-200">
                    🎯 総合システム開発
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-300">
                  アイデアを<br/>現実に変える
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in-up animation-delay-500">
                    戦略立案、要件定義、UI/UX設計、実装、保守運用まで。一貫したサービス提供で、あなたのビジョンを確実に実現します。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-up animation-delay-700">
                  <Button size="lg" className="inline-flex items-center hover:scale-105 transition-all duration-300 hover:shadow-lg" asChild>
                    <Link href="/contact">
                      無料相談を申し込む
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="hover:scale-105 transition-all duration-300 hover:shadow-md" asChild>
                    <Link href="/estimate">無料見積もり</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block animate-fade-in-right animation-delay-400">
                <Image
                  src="/hero2.png?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover hover:scale-105 transition-transform duration-700 hover:shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        <DevelopmentFlow />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">サービス</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">私たちのサービス</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ビジネスの課題を解決し、成長を加速させるソリューションを提供します
                </p>
              </div>
            </div>
            <div className="grid gap-12 py-12">
              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">プロダクト開発</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      アイデアはあるけど、実現方法が分からない。開発リソースが不足している。そんなお悩みを解決します。経験豊富なエンジニアチームが、<strong>AI支援開発ツール</strong>と最新技術を活用して、従来の半分の時間で高品質なプロダクトを開発します。
                    </p>
                    <p className="text-muted-foreground">
                      私たちの<strong>AI駆動型プロダクト開発</strong>では、機械学習によるユーザー行動分析、自動コード生成、AI診断システムなどを活用し、ユーザー中心の設計と市場ニーズに即した機能を実装。開発効率を大幅に向上させながら、セキュリティとパフォーマンスを重視したスケーラブルな設計を実現します。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>🤖 AI支援開発による50%高速化 - 自動コード生成とテスト自動化</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>📊 機械学習による最適化 - ユーザー行動分析に基づくUX改善</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>🔍 AI診断システム - 95%精度の自動品質チェック</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>⚡ インテリジェント設計 - AI予測に基づくスケーラブルアーキテクチャ</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/product2.png?height=300&width=400"
                    width={400}
                    height={300}
                    alt="プロダクト開発"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="flex items-center justify-center order-2 md:order-1">
                  <Image
                    src="/mvp2.png?height=300&width=400"
                    width={400}
                    height={300}
                    alt="MVP開発"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">MVP開発</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      市場の反応が分からない。開発コストを抑えたい。そんな不安を解消します。最小限の投資で最大の価値を提供し、AI予測モデルによる市場検証をスピーディーに行うことができます。
                    </p>
                    <p className="text-muted-foreground">
                      私たちの<strong>AI支援MVP開発</strong>では、機械学習による市場予測でコア価値を特定し、必要最小限の機能を効率的に実装。AIユーザー分析でフィードバックを早期収集し、データ駆動の意思決定で製品を進化。リーンスタートアップとAI予測モデルを組み合わせ、無駄な投資を避けながら確実な成長を実現します。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>🤖 AI予測によるリスク低減 - 機械学習で市場反応を事前予測</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>開発コストの最適化 - 必要最小限の機能に集中した効率的な開発</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>スピーディーな市場投入 - 短期間での開発と迅速なリリース</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>📊 AIユーザー分析 - リアルタイムフィードバックと自動改善提案</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">コンサルティング</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      デジタル化の進め方が分からない。技術選定に迷っている。そんな課題を解決します。豊富な経験と専門知識で、ビジネスの成長を加速させる戦略を提案します。
                    </p>
                    <p className="text-muted-foreground">
                      私たちのコンサルティングサービスでは、ビジネス目標と技術的な可能性を統合した戦略を提案します。業界の最新動向と豊富な実績を基に、最適なソリューションを設計。デジタルトランスフォーメーションを推進し、競争優位性を確立するお手伝いをします。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>デジタル化戦略の明確化 - ビジネス目標に沿った具体的なロードマップ策定</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>技術選定の最適化 - 実績とデータに基づく技術スタックの選定</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>開発プロセスの効率化 - アジャイル開発手法の導入と最適化</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>投資対効果の最大化 - コストと効果を考慮した最適な投資計画</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/consul2.png?height=300&width=400"
                    width={400}
                    height={300}
                    alt="コンサルティング"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="flex items-center justify-center order-2 md:order-1">
                  <Image
                    src="/design.png?height=300&width=400"
                    width={400}
                    height={300}
                    alt="UI/UXデザイン"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">UI/UXデザイン</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      ユーザーに選ばれるデザインが分からない。使いやすさと見た目の両立が難しい。そんな悩みを解決します。ユーザー中心のデザインで、製品の価値を最大化します。
                    </p>
                    <p className="text-muted-foreground">
                      UI/UXデザインでは、ユーザーリサーチから始まり、ユーザーの行動や心理を理解した上でデザインを構築します。プロトタイピングとユーザビリティテストを繰り返し、直感的で魅力的なインターフェースを実現。ブランドの価値を高め、ユーザーエンゲージメントを向上させます。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>ユーザー満足度の向上 - ユーザー中心のデザインによる使いやすさの実現</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>コンバージョン率の改善 - データに基づく最適化とA/Bテスト</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>ユーザー離脱の防止 - 直感的なナビゲーションと魅力的なデザイン</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>ブランド価値の向上 - 一貫性のあるデザインとユーザー体験の提供</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">お問い合わせ</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">サービス詳細</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">会社概要</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">一貫したサービスで<br/>ビジネスを変革</h2>
                <p className="text-muted-foreground md:text-xl">
                  miitasoは、<strong>ビジネス要件定義からシステム保守まで一貫したサービス</strong>を提供する総合システム開発会社です。経営陣との対話から要件を正確に把握し、戦略的なコンサルティングでプロジェクトを成功に導きます。
                </p>
                <p className="text-muted-foreground md:text-xl">
                  2022年以来、様々な業界のクライアントに対して、<strong>要件定義から保守まで一貫したサービスで100%の成功率</strong>を誇っており、長期的なパートナーシップでビジネス成長を支援してきました。
                </p>
                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <Link href="/contact">相談する</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about">詳細を見る</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/we.png?height=600&width=800"
                  width={400}
                  height={300}
                  alt="私たちについて"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">事例</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">成功事例</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが手がけたプロジェクトの一部をご紹介します
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <Button
                variant={selectedCaseStudy === "product" ? "default" : "outline"}
                onClick={() => setSelectedCaseStudy("product")}
                className="flex items-center gap-2"
              >
                <Cpu className="h-4 w-4" />
                プロダクト開発
              </Button>
              <Button
                variant={selectedCaseStudy === "mvp" ? "default" : "outline"}
                onClick={() => setSelectedCaseStudy("mvp")}
                className="flex items-center gap-2"
              >
                <Rocket className="h-4 w-4" />
                MVP開発
              </Button>
              <Button
                variant={selectedCaseStudy === "consulting" ? "default" : "outline"}
                onClick={() => setSelectedCaseStudy("consulting")}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                コンサルティング
              </Button>
              <Button
                variant={selectedCaseStudy === "design" ? "default" : "outline"}
                onClick={() => setSelectedCaseStudy("design")}
                className="flex items-center gap-2"
              >
                <Palette className="h-4 w-4" />
                UI/UXデザイン
              </Button>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 lg:grid-cols-2 lg:gap-12">
              {currentCaseStudies.map((caseStudy, index) => {
                const serviceIcons = {
                  product: Cpu,
                  mvp: Rocket,
                  consulting: Lightbulb,
                  design: Palette
                }
                const ServiceIcon = serviceIcons[caseStudy.serviceType as keyof typeof serviceIcons] || Zap
                
                // Extract key metrics from content
                const metrics = caseStudy.content.match(/<strong>(.*?)<\/strong>/g)
                  ?.slice(0, 3)
                  .map(m => m.replace(/<\/?strong>/g, ''))
                  || []
                
                return (
                  <Link key={caseStudy.id} href={`/case-studies/${caseStudy.id}`} className="block">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-white shadow-sm">
                            <ServiceIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{caseStudy.category}</p>
                            <p className="text-xs text-muted-foreground">{caseStudy.date}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                        {caseStudy.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {caseStudy.description}
                      </p>
                      
                      {metrics.length > 0 && (
                        <div className="space-y-3 mb-6">
                          {metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="font-medium text-foreground/80">{metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">高インパクト</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">実績あり</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          詳細を見る →
                        </span>
                      </div>
                    </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/case-studies">もっと事例を見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white border border-gray-200 px-3 py-1 text-sm">🎯 総合力</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">なぜmiitasoが選ばれるのか</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ビジネス要件定義からコンサル、UI/UX、実装、保守まで一貫したサービス提供
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-lg">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">ビジネス要件定義</h3>
                <p className="text-sm text-muted-foreground">経営陣との直接対話でビジネス課題を深く理解し、的確な要件を定義</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-lg">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">コンサルティング</h3>
                <p className="text-sm text-muted-foreground">戦略立案からシステム設計まで、ビジネス視点での包括的なアドバイス</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-lg">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">UI/UX設計</h3>
                <p className="text-sm text-muted-foreground">ユーザー視点でのデザイン設計と使いやすさを追求したインターフェース</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-lg">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">実装〜保守</h3>
                <p className="text-sm text-muted-foreground">高品質な開発から継続的な保守・改善まで、長期的なパートナーシップ</p>
              </div>
            </div>
            {/* 他社比較テーブル */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-center justify-center">
                    📊 総合サービス比較
                  </CardTitle>
                  <CardDescription className="text-center">
                    なぜmiitasoは一貫したサービス提供でこんなにお得な価格を実現できるのか？
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium text-sm bg-muted/50">比較項目</th>
                          <th className="text-center p-3 font-medium text-sm bg-white border border-gray-200 text-blue-600">🎯 miitaso</th>
                          <th className="text-center p-3 font-medium text-sm">一般的なシステム会社A</th>
                          <th className="text-center p-3 font-medium text-sm">一般的なシステム会社B</th>
                          <th className="text-center p-3 font-medium text-sm">大手システム会社C</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">ビジネス理解度</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              経営陣と直接対話<br/>深い理解
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">技術者中心<br/>限定的理解</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">技術者中心<br/>限定的理解</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">営業担当<br/>表面的理解</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">開発速度</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              一貫サービスで<br/>3倍高速
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動開発<br/>標準速度</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動開発<br/>標準速度</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">テンプレート<br/>1.5倍速度</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">要件定義力</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              ビジネス視点<br/>的確な要件定義
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">技術寄り<br/>要件ブレあり</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">技術寄り<br/>要件ブレあり</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">形式的<br/>標準的品質</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">コード品質</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              総合的品質管理<br/>95%品質保証
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動テスト<br/>バラツキあり</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動テスト<br/>バラツキあり</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">レビュー体制<br/>高品質</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">デザイン効率</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              ユーザー中心設計<br/>60%時間短縮
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動デザイン<br/>通常時間</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動デザイン<br/>通常時間</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">デザイナー専任<br/>高品質</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">長期パートナーシップ</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              保守まで一貫<br/>継続改善提案
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">開発のみ<br/>保守別料金</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">開発のみ<br/>保守別料金</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">保守サポート<br/>高額契約</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">プロジェクト管理</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              一貫管理<br/>効率的進行
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動管理<br/>コスト高</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">手動管理<br/>コスト高</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">専任マネージャー<br/>高コスト</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">価格競争力</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              相場の25-40%OFF<br/>💰 最安級
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">市場相場<br/>高め</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">市場相場<br/>高め</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">市場相場+α<br/>最高級</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">最新技術対応</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              ✓ Next.js 14<br/>✓ React 18<br/>✓ AI統合
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">一世代前<br/>の技術</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">一世代前<br/>の技術</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">最新技術<br/>対応</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-sm">保守サポート</td>
                          <td className="p-3 text-center text-sm">
                            <div className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              AI監視<br/>予防保守
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">基本サポート<br/>反応型</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">基本サポート<br/>反応型</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">充実サポート<br/>高コスト</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-sm">総合評価</td>
                          <td className="p-3 text-center">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold">
                              🏆 最高コスパ<br/>⭐⭐⭐⭐⭐
                            </div>
                          </td>
                          <td className="p-3 text-center text-sm text-muted-foreground">⭐⭐⭐☆☆<br/>標準的</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">⭐⭐⭐☆☆<br/>標準的</td>
                          <td className="p-3 text-center text-sm text-muted-foreground">⭐⭐⭐⭐☆<br/>高品質・高価格</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-600/20 rounded-lg p-4">
                    <h4 className="text-xl font-semibold tracking-tight text-blue-600 mb-3 flex items-center gap-2">
                      🎯 miitasoの一貫したサービスが実現する差別化
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">ビジネス理解から設計</span>
                        </div>
                        <p className="text-muted-foreground text-xs pl-4">経営陣との直接対話で要件を的確に把握</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white border border-gray-2000 rounded-full"></div>
                          <span className="font-medium">戦略的コンサルティング</span>
                        </div>
                        <p className="text-muted-foreground text-xs pl-4">技術とビジネスを統合した最適解を提案</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="font-medium">ユーザー中心のUI/UX</span>
                        </div>
                        <p className="text-muted-foreground text-xs pl-4">使いやすさを追求したインターフェース設計</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="font-medium">継続的パートナーシップ</span>
                        </div>
                        <p className="text-muted-foreground text-xs pl-4">実装から保守・改善まで長期サポート</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/contact">お問い合わせ</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">ツール</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">お試しアイデア生成ツール</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AIがあなたのビジネスアイデアを自動生成します
                </p>
              </div>
            </div>
            <div className="grid gap-8 py-12 md:grid-cols-2">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 mb-4">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">アイデアを生成する</h3>
                  <p className="text-muted-foreground">
                    以下のフォームにキーワードや業界を入力すると、AIが新しいビジネスアイデアを提案します。
                  </p>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const prompt = formData.get('prompt') as string;
                    
                    try {
                      const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          type: 'ideaGeneration',
                          prompt: prompt,
                        }),
                      });

                      if (!response.ok) {
                        throw new Error('APIリクエストに失敗しました');
                      }

                      const data = await response.json();
                      setIdeaResponse(data.response);
                    } catch (error) {
                      console.error('Error:', error);
                      toast.error('エラーが発生しました。もう一度お試しください。');
                    }
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="prompt" className="text-sm font-medium">
                        キーワードや業界を入力してください
                      </label>
                      <textarea
                        id="prompt"
                        name="prompt"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="例：健康食品、サブスクリプション、エコフレンドリー"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      アイデアを生成する
                    </Button>
                  </form>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight">生成されたアイデア</h3>
                  {ideaResponse ? (
                    <div className="prose max-w-none">
                      <ReactMarkdown>{ideaResponse}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      左のフォームにキーワードを入力して、アイデアを生成してください。
                    </p>
                  )}
                </div>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/tools">すべてのツールを見る</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* クライアント証言セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  お客様の声
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  実際にmiitasoのサービスをご利用いただいたお客様からの声をご紹介します。
                </p>
              </div>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 w-max">
                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">K.T様</h3>
                        <p className="text-sm text-muted-foreground">防犯システム開発会社様</p>
                        {/* <p className="text-sm text-muted-foreground">株式会社テクノロジーソリューションズ</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「miitasoのチームは私たちのビジョンを完璧に理解し、期待を上回る成果を提供してくれました。
                      特に要件定義から保守まで一貫したサポートにより、開発期間も予定より20%短縮でき、
                      プロジェクト完了後も継続的な改善提案をいただけるなど、長期的なパートナーシップを実感しています。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">H.I様</h3>
                        <p className="text-sm text-muted-foreground">ウェブシステム開発会社様</p>
                        {/* <p className="text-sm text-muted-foreground">株式会社イノベーションラボ</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「CRMシステムの開発を依頼しましたが、結果は期待をはるかに超えるものでした。
                      顧客満足度が30%向上し、営業効率も40%改善。特にビジネス理解に基づく最適設計により
                      私たちの業務フローにぴったり合ったシステムになりました。投資回収期間も6ヶ月と非常に短期間でした。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Y.K様</h3>
                        <p className="text-sm text-muted-foreground">フリーランス</p>
                        {/* <p className="text-sm text-muted-foreground">クリエイティブスタジオ株式会社</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「動画編集アプリの開発では、技術力の高さに驚かされました。
                      編集時間が70%短縮され、制作コストを40%削減できました。
                      何より、コンサルティングから設計・実装・保守まで一貫したサポートにより、
                      クライアントからの信頼度が格段に向上し、月間動画制作本数も3倍に増加しました。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">S.T様</h3>
                        <p className="text-sm text-muted-foreground">子供向け教育関連企業様</p>
                        {/* <p className="text-sm text-muted-foreground">フィンテック株式会社</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「子供たちの夢を応援するプラットフォーム開発で、安全性と利便性を両立したシステムを構築いただきました。
                      要件定義段階での深いビジネス理解により、規制対応も含めて完璧なソリューションが実現。
                      ユーザー数が前年比200%増加し、関係者からも高い評価を得ています。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">M.S様</h3>
                        <p className="text-sm text-muted-foreground">予防アプリ事業者様</p>
                        {/* <p className="text-sm text-muted-foreground">ヘルスケア株式会社</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「予防アプリの開発で、安全性と利便性を両立したシステムを構築いただきました。
                      とにかくユーザービリティを考慮した設計にしてくえれたおかげで、リリース以降大きな改修もせずに運営できています。
                      非常に高いコストパフォーマンスに感謝です。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background w-80 flex-shrink-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">R.M様</h3>
                        <p className="text-sm text-muted-foreground">マーケティング関連企業様</p>
                        {/* <p className="text-sm text-muted-foreground">Eコマース株式会社</p> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      「弊社クライアントのECサイトのリニューアルでサポート頂きました。
                      UI/UXから決済システムまで、顧客体験を総合的に改善していただき、
                      コンバージョン率も2.5倍に向上。保守サポートも迅速で安心してお任せできます。クライアント様から弊社への評価も上がり今後も継続的にご依頼します。」
                    </p>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-blue-600 text-blue-600" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-4">
              ← 左右にスクロールして他のお客様の声もご覧ください →
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">お問い合わせ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  プロジェクトについて相談する
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  新しいプロジェクトや既存のプロダクトの改善について、お気軽にご相談ください。私たちの専門家チームがあなたのビジョンを実現するお手伝いをします。
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>経験豊富な専門家チーム</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-blue-600" />
                    <span>迅速な開発プロセス</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <span>革新的なソリューション</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <Link href="/contact">無料相談</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/estimate">無料見積もり</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>お問い合わせフォーム</CardTitle>
                    <CardDescription>
                      以下のフォームに必要事項をご記入ください。担当者が48時間以内にご連絡いたします。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            お名前
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="山田 太郎"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            会社名
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="株式会社〇〇"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          メールアドレス
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          電話番号
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="03-1234-5678"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="service"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ご相談内容
                        </label>
                        <Select value={formData.service} onValueChange={handleServiceChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="ご相談内容を選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product">プロダクト開発</SelectItem>
                            <SelectItem value="mvp">MVP開発</SelectItem>
                            <SelectItem value="consulting">コンサルティング</SelectItem>
                            <SelectItem value="design">UI/UXデザイン</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          お問い合わせ内容
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="プロジェクトの詳細や目標などをお書きください"
                          className="min-h-[120px]"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "送信中..." : "送信する"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </div>
  )
}
