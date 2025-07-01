"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CheckCircle, Cpu, Lightbulb, Rocket, Palette, Star, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type ServiceType = "product" | "mvp" | "consulting" | "design"

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>("product")

  const services = {
    product: {
      title: "プロダクト開発",
      icon: Cpu,
      description: "アイデアから完成品まで、ユーザー中心の革新的なプロダクトを開発します。",
      price: "300万円〜",
      duration: "3-6ヶ月",
      popular: true,
      features: [
        "ユーザー体験設計",
        "フロントエンド・バックエンド開発",
        "品質保証とテスト",
        "継続的なメンテナンスとサポート",
        "スケーラブルなアーキテクチャ設計"
      ],
      process: [
        {
          title: "要件定義",
          description: "ビジネス目標とユーザーニーズの詳細な分析"
        },
        {
          title: "設計",
          description: "ユーザー体験と技術アーキテクチャの設計"
        },
        {
          title: "開発",
          description: "アジャイル開発による段階的な実装"
        },
        {
          title: "テスト・リリース",
          description: "包括的な品質保証と安定したリリース"
        }
      ]
    },
    mvp: {
      title: "MVP開発",
      icon: Rocket,
      description: "最小限の機能で最大の価値を提供する製品を迅速に開発します。",
      price: "100万円〜",
      duration: "1-2ヶ月",
      popular: false,
      features: [
        "迅速なプロトタイピング",
        "市場検証",
        "反復的な改善",
        "コスト効率の高い開発",
        "フィードバックループの構築"
      ],
      process: [
        {
          title: "アイデア検証",
          description: "市場調査と仮説検証"
        },
        {
          title: "プロトタイプ開発",
          description: "コア機能に焦点を当てた迅速な開発"
        },
        {
          title: "市場テスト",
          description: "ユーザーフィードバックの収集と分析"
        },
        {
          title: "改善・拡張",
          description: "フィードバックに基づく機能の改善と追加"
        }
      ]
    },
    consulting: {
      title: "コンサルティング",
      icon: Lightbulb,
      description: "プロダクト戦略から技術選定まで、専門知識でビジネスをサポートします。",
      price: "50万円〜",
      duration: "2週間〜",
      popular: false,
      features: [
        "プロダクト戦略",
        "技術スタック選定",
        "開発プロセス最適化",
        "デジタルトランスフォーメーション",
        "テクニカルデューデリジェンス"
      ],
      process: [
        {
          title: "現状分析",
          description: "ビジネスと技術の現状評価"
        },
        {
          title: "戦略策定",
          description: "目標達成のためのロードマップ作成"
        },
        {
          title: "実装支援",
          description: "戦略の実行と進捗管理"
        },
        {
          title: "評価・改善",
          description: "結果の評価と継続的な改善"
        }
      ]
    },
    design: {
      title: "UI/UXデザイン",
      icon: Palette,
      description: "ユーザー中心のデザインで、魅力的で使いやすいインターフェースを提供します。",
      price: "80万円〜",
      duration: "1-3ヶ月",
      popular: false,
      features: [
        "ユーザーリサーチと分析",
        "インタラクションデザイン",
        "ビジュアルデザイン",
        "プロトタイピング",
        "ユーザビリティテスト"
      ],
      process: [
        {
          title: "リサーチ",
          description: "ユーザーニーズと市場動向の分析"
        },
        {
          title: "ワイヤーフレーム",
          description: "情報設計と基本的なレイアウトの作成"
        },
        {
          title: "デザイン",
          description: "ビジュアルデザインとインタラクションの設計"
        },
        {
          title: "テスト・改善",
          description: "ユーザビリティテストとデザインの最適化"
        }
      ]
    }
  }

  const currentService = services[selectedService]

  const getRecommendations = (serviceType: ServiceType) => {
    const recommendations = {
      product: [
        "新しいビジネスアイデアを形にしたい方",
        "既存サービスを大幅にリニューアルしたい方",
        "長期的な成長を見据えたプロダクトが欲しい方",
        "ユーザー体験を重視したいサービス事業者",
        "技術的に高度なプロダクトを開発したい方"
      ],
      mvp: [
        "スタートアップでアイデアを素早く検証したい方",
        "限られた予算で最大限の価値を得たい方",
        "失敗リスクを最小限に抑えたい方",
        "投資家にプロトタイプを見せたい方",
        "市場の反応を早く知りたい方"
      ],
      consulting: [
        "技術選択で迷っている経営者・CTOの方",
        "開発チームの生産性を向上させたい方",
        "デジタル変革を推進したい企業",
        "既存システムの問題点を洗い出したい方",
        "第三者の専門的な意見が欲しい方"
      ],
      design: [
        "ユーザーの使いやすさを重視したい方",
        "競合他社と差別化したいサービス事業者",
        "ブランドイメージを向上させたい企業",
        "コンバージョン率を改善したい方",
        "デザインの専門知識がない開発チーム"
      ]
    }
    return recommendations[serviceType] || []
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <Badge variant="outline" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  高品質なプロダクト開発
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  サービス
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  最先端の技術とデザインで、あなたのビジネスを次のレベルへ<br />
                  <span className="text-primary font-semibold">100社以上の実績</span>と<span className="text-primary font-semibold">満足度98%</span>のサービスをご提供
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-12">
                {Object.entries(services).map(([key, service]) => (
                  <div key={key} className="group relative flex flex-col items-center p-6 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 no-select">
                    {service.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                        人気No.1
                      </Badge>
                    )}
                    <div className="mb-4 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-primary">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link href="/contact">
                    無料相談を申し込む
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/estimate">見積もり依頼</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {Object.entries(services).map(([key, service]) => (
                  <Button
                    key={key}
                    variant={selectedService === key ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedService(key as ServiceType)}
                  >
                    <service.icon className="h-4 w-4" />
                    {service.title}
                  </Button>
                ))}
              </div>

              <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-colors no-select">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <currentService.icon className="h-6 w-6 text-primary" />
                    </div>
                    {currentService.popular && (
                      <Badge className="bg-primary text-primary-foreground">
                        人気No.1
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {currentService.title}
                  </CardTitle>
                  <CardDescription className="text-md mt-2">
                    {currentService.description}
                  </CardDescription>
                  <div className="flex items-center gap-6 mt-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">料金目安</p>
                      <p className="font-semibold text-lg text-primary">{currentService.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">期間</p>
                        <p className="font-semibold text-lg">{currentService.duration}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">主な特徴</h3>
                        <ul className="space-y-3 text-sm">
                          {currentService.features.map((feature, index) => (
                            <li key={index} className="flex items-center group">
                              <CheckCircle className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                              <span className="group-hover:text-foreground transition-colors">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          こんな人におすすめ
                        </h3>
                        <ul className="space-y-3 text-sm">
                          {getRecommendations(selectedService).map((recommendation, index) => (
                            <li key={index} className="flex items-start group">
                              <CheckCircle className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <span className="group-hover:text-foreground transition-colors leading-relaxed">{recommendation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">開発プロセス</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {currentService.process.map((step, index) => (
                          <div key={index} className="flex flex-col items-center space-y-3 text-center group">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground group-hover:scale-110 transition-transform shadow-lg">
                              {index + 1}
                            </div>
                            <h4 className="text-lg font-semibold tracking-tight">{step.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-primary/5 via-background to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20">
                  <Star className="h-3 w-3 mr-1" />
                  無料相談実施中
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  プロジェクトを始めませんか？
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  まずはお気軽にご相談ください。あなたのアイデアを実現するための<br />
                  最適なプランをご提案させていただきます。
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
                <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur-sm rounded-lg border no-select">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">迅速対応</h3>
                  <p className="text-sm text-center text-muted-foreground">24時間以内にご返答</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur-sm rounded-lg border no-select">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">無料相談</h3>
                  <p className="text-sm text-center text-muted-foreground">初回相談は完全無料</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-background/80 backdrop-blur-sm rounded-lg border no-select">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">実績豊富</h3>
                  <p className="text-sm text-center text-muted-foreground">100社以上の成功事例</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button size="lg" className="flex-1 group text-lg py-6" asChild>
                  <Link href="/contact">
                    今すぐ無料相談
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1 text-lg py-6" asChild>
                  <Link href="/estimate">見積もり依頼</Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                📞 お電話での相談も承っております<br />
                💬 LINEでのお問い合わせも可能です
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
