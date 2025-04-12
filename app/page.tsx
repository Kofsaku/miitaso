"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import React from "react"
import ReactMarkdown from "react-markdown"
import { toast } from "react-hot-toast"
import { getCaseStudiesByServiceType } from "@/app/data/case-studies"

type ServiceType = "product" | "mvp" | "consulting" | "design"

type CaseStudy = {
  title: string
  description: string
  content: string
  image: string
  category: string
  serviceType: string
}

type CaseStudies = {
  [key in ServiceType]: CaseStudy[]
}

export default function Home() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceType>("product")
  const [ideaResponse, setIdeaResponse] = useState<string>("")

  const currentCaseStudies = getCaseStudiesByServiceType(selectedCaseStudy)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    アイデアを現実に変える
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    私たちは最先端の技術とデザインで、あなたのビジョンを革新的なプロダクトへと変換します。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="inline-flex items-center" asChild>
                    <Link href="/services">
                      サービスを見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">お問い合わせ</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/hero2.png?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">サービス</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">私たちのサービス</h2>
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
                  <h3 className="text-2xl font-bold">プロダクト開発</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      アイデアはあるけど、実現方法が分からない。開発リソースが不足している。そんなお悩みを解決します。経験豊富なエンジニアチームが、最新技術を活用して高品質なプロダクトを開発します。
                    </p>
                    <p className="text-muted-foreground">
                      私たちのプロダクト開発では、ユーザー中心の設計思想を基に、市場のニーズに即した機能を実装します。アジャイル開発手法を採用し、短期間での開発と継続的な改善を実現。セキュリティとパフォーマンスを重視し、スケーラブルな設計で将来の拡張性も確保します。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>開発リソース不足の解消 - 経験豊富なエンジニアチームによる確実な開発</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>技術選定の不安解消 - 最新技術と実績に基づく最適な技術選定</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>品質管理の徹底 - 自動テストとコードレビューによる品質保証</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>スケーラブルな設計による将来性の確保 - 成長を見据えたアーキテクチャ設計</span>
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
                  <h3 className="text-2xl font-bold">MVP開発</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      市場の反応が分からない。開発コストを抑えたい。そんな不安を解消します。最小限の投資で最大の価値を提供し、市場検証をスピーディーに行うことができます。
                    </p>
                    <p className="text-muted-foreground">
                      MVP開発では、コアとなる価値提案に焦点を当て、必要最小限の機能を実装します。ユーザーフィードバックを早期に収集し、データに基づいた意思決定で製品を進化させていきます。リーンスタートアップの手法を取り入れ、無駄な投資を避けながら、確実な成長を実現します。
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>市場検証のリスク低減 - 早期のユーザーフィードバックによる確実な検証</span>
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
                      <span>ユーザーフィードバックの早期収集 - データに基づく意思決定と改善</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">コンサルティング</h3>
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
                  <h3 className="text-2xl font-bold">UI/UXデザイン</h3>
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
              <Button size="lg" asChild>
                <Link href="/services">サービスの詳細を見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">ツール</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">アイデア生成ツール</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AIがあなたのビジネスアイデアを自動生成します
                </p>
              </div>
            </div>
            <div className="grid gap-8 py-12 md:grid-cols-2">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">アイデアを生成する</h3>
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
                  <h3 className="text-xl font-bold">生成されたアイデア</h3>
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">会社概要</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">私たちについて</h2>
                <p className="text-muted-foreground md:text-xl">
                  miitasoは、革新的なプロダクト開発を専門とする会社です。私たちは最先端の技術とデザインを駆使して、クライアントのビジョンを現実のプロダクトへと変換します。
                </p>
                <p className="text-muted-foreground md:text-xl">
                  2022年以来、様々な業界のクライアントと協力し、ユーザー中心の革新的なソリューションを提供してきました。私たちのチームは、経験豊富な開発者、デザイナー、プロダクトマネージャーで構成されており、クライアントのニーズに合わせた最適なソリューションを提供します。
                </p>
                <div className="mt-4">
                  <Button asChild>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">成功事例</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが手がけた革新的なプロジェクトをご紹介します
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
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
              {currentCaseStudies.map((caseStudy) => (
                <Link key={caseStudy.id} href={`/case-studies/${caseStudy.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{caseStudy.category}</span>
                          <span>•</span>
                          <span>{caseStudy.serviceType}</span>
                        </div>
                        <h3 className="text-xl font-bold">{caseStudy.title}</h3>
                        <p className="text-muted-foreground">{caseStudy.description}</p>
                        {/* <p className="text-sm text-muted-foreground">{caseStudy.content}</p> */}
                      </div>
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={caseStudy.image}
                          width={400}
                          height={225}
                          alt={`Case Study ${caseStudy.id}`}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/case-studies">すべての事例を見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">技術スタック</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが使用する最先端の技術
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">フロントエンド</h3>
                <p className="text-sm text-muted-foreground text-center">React, Vue, Next.js, TypeScript</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">バックエンド</h3>
                <p className="text-sm text-muted-foreground text-center">Node.js, Python, Go, GraphQL</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">クラウド</h3>
                <p className="text-sm text-muted-foreground text-center">AWS, GCP, Azure, Vercel</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">AI/ML</h3>
                <p className="text-sm text-muted-foreground text-center">TensorFlow, PyTorch, OpenAI</p>
              </div>
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
                    <Users className="h-5 w-5 text-primary" />
                    <span>経験豊富な専門家チーム</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>迅速な開発プロセス</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <span>革新的なソリューション</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/contact">お問い合わせする</Link>
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
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            お名前
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="山田 太郎"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            会社名
                          </label>
                          <input
                            id="company"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="example@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          お問い合わせ内容
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="プロジェクトの詳細や目標などをお書きください"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        送信する
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
  )
}
