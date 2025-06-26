"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CheckCircle, Cpu, Lightbulb, Rocket, Palette } from "lucide-react"
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">サービス</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  最先端の技術とデザインで、あなたのビジネスを次のレベルへ
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mt-8">
                <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
                  <Cpu className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">プロダクト開発</h3>
                  <p className="text-sm text-muted-foreground text-center">アイデアから完成品まで、ユーザー中心の革新的なプロダクトを開発</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
                  <Rocket className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">MVP開発</h3>
                  <p className="text-sm text-muted-foreground text-center">最小限の機能で最大の価値を提供する製品を迅速に開発</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
                  <Lightbulb className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">コンサルティング</h3>
                  <p className="text-sm text-muted-foreground text-center">プロダクト戦略から技術選定まで、専門知識でサポート</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
                  <Palette className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">UI/UXデザイン</h3>
                  <p className="text-sm text-muted-foreground text-center">ユーザー中心のデザインで、魅力的で使いやすいインターフェースを提供</p>
                </div>
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

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <currentService.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{currentService.title}</CardTitle>
                  <CardDescription className="text-md mt-2">
                    {currentService.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">主な特徴</h3>
                      <ul className="space-y-2 text-sm">
                        {currentService.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">開発プロセス</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {currentService.process.map((step, index) => (
                          <div key={index} className="flex flex-col items-center space-y-2 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                              {index + 1}
                            </div>
                            <h4 className="text-xl font-semibold tracking-tight">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">お問い合わせ</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  サービスについてのご質問やお見積もりのご依頼は、お気軽にお問い合わせください
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact">お問い合わせする</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
