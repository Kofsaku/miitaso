'use client'

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Users, Building } from "lucide-react"
import Link from "next/link"


const serviceSpecificPlans = [
  {
    category: "Webアプリケーション開発",
    description: "最新AI技術を活用した効率的なWebアプリケーション開発",
    plans: [
      {
        name: "小規模Webアプリ",
        price: "30-80万円",
        marketPrice: "50-120万円",
        duration: "1-3ヶ月",
        features: [
          "基本機能の実装（3-5機能）",
          "レスポンシブWebアプリケーション",
          "基本的なユーザー管理",
          "データベース設計・構築",
          "AI支援による開発効率化",
          "3ヶ月間の無料サポート"
        ],
        examples: "コーポレートサイト、ランディングページ、小規模予約システム"
      },
      {
        name: "中規模Webアプリ",
        price: "80-200万円",
        marketPrice: "150-350万円",
        duration: "3-6ヶ月",
        features: [
          "包括的機能実装（5-10機能）",
          "高度なユーザー管理・権限制御",
          "API設計・外部連携",
          "管理画面・ダッシュボード",
          "AI自動テスト・品質保証",
          "6ヶ月間の無料サポート"
        ],
        examples: "業務管理システム、ECサイト、マッチングプラットフォーム"
      },
      {
        name: "大規模Webアプリ",
        price: "200-500万円",
        marketPrice: "400-800万円",
        duration: "6-12ヶ月",
        features: [
          "複雑な機能群実装（10機能以上）",
          "マイクロサービス・API設計",
          "高負荷対応・スケーラビリティ",
          "AI支援による継続的改善",
          "CI/CD・自動デプロイ",
          "12ヶ月間の無料サポート"
        ],
        examples: "SaaSプラットフォーム、大規模ECサイト、金融システム"
      }
    ]
  },
  {
    category: "MVP開発",
    description: "アイデア検証のための最小機能プロダクト（AI効率化で超高速開発）",
    plans: [
      {
        name: "ベーシックMVP",
        price: "30-80万円",
        marketPrice: "50-120万円",
        duration: "2-6週間",
        features: [
          "コア機能1-3つの実装",
          "AI支援による高速プロトタイピング",
          "ユーザーフィードバック収集機能",
          "基本的な分析ダッシュボード",
          "ランディングページ作成",
          "1ヶ月間のサポート"
        ]
      },
      {
        name: "アドバンスMVP",
        price: "80-150万円",
        marketPrice: "120-250万円",
        duration: "6-12週間",
        features: [
          "コア機能3-5つの実装",
          "本格的なUI/UXデザイン",
          "ユーザー管理・認証機能",
          "AI支援による詳細分析",
          "A/Bテスト機能",
          "3ヶ月間のサポート・改善"
        ]
      }
    ]
  },
  {
    category: "モバイルアプリ開発",
    description: "iOS・Android対応のモバイルアプリケーション開発",
    plans: [
      {
        name: "基本モバイルアプリ",
        price: "80-180万円",
        marketPrice: "150-300万円",
        duration: "3-6ヶ月",
        features: [
          "iOS・Android両対応",
          "基本機能の実装（5-8機能）",
          "AI支援による開発効率化",
          "アプリストア申請サポート",
          "プッシュ通知機能",
          "3ヶ月間の無料サポート"
        ]
      },
      {
        name: "高機能モバイルアプリ",
        price: "180-400万円",
        marketPrice: "300-600万円",
        duration: "6-12ヶ月",
        features: [
          "iOS・Android・PWA対応",
          "高度な機能実装（10機能以上）",
          "リアルタイム機能",
          "AI機能統合",
          "オフライン対応",
          "12ヶ月間の無料サポート"
        ]
      }
    ]
  },
  {
    category: "エンタープライズシステム",
    description: "大規模企業向けの高度なシステム開発",
    plans: [
      {
        name: "中規模エンタープライズ",
        price: "300-800万円",
        marketPrice: "500-1,200万円",
        duration: "6-12ヶ月",
        features: [
          "エンタープライズ級セキュリティ",
          "高度な権限管理",
          "システム間連携",
          "AI支援による運用最適化",
          "24時間監視体制",
          "12ヶ月間の無料サポート"
        ]
      },
      {
        name: "大規模エンタープライズ",
        price: "800-2,000万円",
        marketPrice: "1,200-3,000万円",
        duration: "12ヶ月以上",
        features: [
          "マイクロサービスアーキテクチャ",
          "高負荷・高可用性対応",
          "AI支援による予測分析",
          "DevOps・CI/CD完全自動化",
          "専属プロジェクトマネージャー",
          "24ヶ月間の無料サポート"
        ]
      }
    ]
  },
  {
    category: "UI/UXデザイン",
    description: "ユーザー体験を重視した包括的デザインサービス",
    plans: [
      {
        name: "UI/UXリニューアル",
        price: "100-300万円",
        duration: "4-8週間",
        features: [
          "現状のユーザビリティ診断",
          "ユーザーインタビュー・調査",
          "情報アーキテクチャ設計",
          "ワイヤーフレーム・プロトタイプ",
          "視覚デザイン・デザインシステム",
          "ユーザビリティテスト実施"
        ]
      },
      {
        name: "新規UI/UXデザイン",
        price: "200-500万円",
        duration: "6-12週間",
        features: [
          "ユーザーリサーチ・ペルソナ設計",
          "カスタマージャーニーマップ",
          "情報アーキテクチャ・サイトマップ",
          "インタラクティブプロトタイプ",
          "包括的デザインシステム構築",
          "開発サポート・品質保証"
        ]
      }
    ]
  },
  {
    category: "コンサルティング",
    description: "戦略策定から実行支援まで包括的な専門コンサルティング",
    plans: [
      {
        name: "DX戦略コンサルティング",
        price: "月額50-100万円",
        duration: "3-6ヶ月",
        features: [
          "現状分析・課題発見",
          "DX戦略・ロードマップ策定",
          "技術選定・アーキテクチャ設計",
          "プロジェクト計画・体制構築",
          "月4回の戦略ミーティング",
          "継続的な進捗管理・改善提案"
        ]
      },
      {
        name: "技術コンサルティング",
        price: "月額30-80万円",
        duration: "継続",
        features: [
          "技術的課題の分析・解決",
          "アーキテクチャレビュー",
          "コードレビュー・品質改善",
          "チーム技術力向上支援",
          "月2回の技術ミーティング",
          "緊急時のエスカレーション対応"
        ]
      },
      {
        name: "プロダクト戦略コンサルティング",
        price: "月額40-90万円",
        duration: "3-12ヶ月",
        features: [
          "市場分析・競合調査",
          "プロダクト戦略・ロードマップ",
          "機能優先度・開発計画策定",
          "KPI設計・効果測定",
          "月4回の戦略レビュー",
          "プロダクトマネジメント支援"
        ]
      }
    ]
  }
]

const maintenanceServices = [
  {
    name: "ベーシック保守",
    description: "基本的な運用・保守サポート",
    price: "月額15-30万円",
    features: [
      "バグ修正対応（営業時間内）",
      "セキュリティアップデート",
      "月次レポート・相談",
      "軽微な機能改善"
    ]
  },
  {
    name: "スタンダード保守",
    description: "包括的な運用・保守・改善サポート",
    price: "月額30-60万円",
    features: [
      "迅速なバグ修正対応",
      "定期的なシステム監視",
      "パフォーマンス最適化",
      "機能追加・改善開発",
      "週次ミーティング・相談"
    ]
  },
  {
    name: "プレミアム保守",
    description: "24時間体制の高度な保守・運用サポート",
    price: "月額60-120万円",
    features: [
      "24時間監視・緊急対応",
      "専属エンジニア配置",
      "継続的な機能開発",
      "インフラ最適化・スケーリング",
      "SLA保証（99.9%稼働率）"
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  サービス別料金
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  最新AI技術を活用した効率的な開発で、相場より25-40%お得な料金を実現。
                  <br />
                  透明性のある料金体系で、まずは無料見積もりで詳細をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* サービス別料金セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            {serviceSpecificPlans.map((service, serviceIndex) => (
              <div key={serviceIndex} className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">{service.category}</h2>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {service.plans.map((plan, planIndex) => (
                    <Card key={planIndex} className="bg-background">
                      <CardHeader>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                          {plan.marketPrice && (
                            <div className="text-sm text-muted-foreground line-through mb-1">
                              一般的な相場: {plan.marketPrice}
                            </div>
                          )}
                          <span className="text-3xl font-bold text-primary">{plan.price}</span>
                          {plan.marketPrice && (
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-2 mt-2">
                              <div className="text-xs text-green-700 font-medium">
                                🤖 AI活用で相場より25-40%お得！
                              </div>
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">期間: {plan.duration}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-3">含まれるサービス:</h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {plan.examples && (
                            <div className="bg-muted p-3 rounded-lg">
                              <h4 className="font-semibold mb-2 text-sm">適用例:</h4>
                              <p className="text-sm text-muted-foreground">{plan.examples}</p>
                            </div>
                          )}
                          
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="/contact">詳細を相談する</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 保守・運用サービスセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  保守・運用サービス
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  開発後の継続的なシステム運用・保守・改善をサポートします。
                </p>
              </div>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {maintenanceServices.map((service, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/contact">詳細を相談する</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 料金比較表セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  サービス別料金一覧
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  各サービスの参考価格と期間の目安です。詳細はお気軽にご相談ください。
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl">
              <Card className="bg-background">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-4 px-6 text-left font-semibold">サービス</th>
                          <th className="py-4 px-6 text-left font-semibold">料金範囲</th>
                          <th className="py-4 px-6 text-left font-semibold">期間</th>
                          <th className="py-4 px-6 text-left font-semibold">適用例</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">小規模Webアプリ開発</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">30-80万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 50-120万円）</div>
                          </td>
                          <td className="py-4 px-6">1-3ヶ月</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">コーポレートサイト、ランディングページ</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">中規模Webアプリ開発</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">80-200万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 150-350万円）</div>
                          </td>
                          <td className="py-4 px-6">3-6ヶ月</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">業務管理システム、ECサイト</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">大規模Webアプリ開発</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">200-500万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 400-800万円）</div>
                          </td>
                          <td className="py-4 px-6">6-12ヶ月</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">SaaSプラットフォーム、金融システム</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">ベーシックMVP開発</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">30-80万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 50-120万円）</div>
                          </td>
                          <td className="py-4 px-6">2-6週間</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">アイデア検証、初期プロトタイプ</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">アドバンスMVP開発</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">80-150万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 120-250万円）</div>
                          </td>
                          <td className="py-4 px-6">6-12週間</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">本格的なMVP、ユーザーテスト対応</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">基本モバイルアプリ</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">80-180万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 150-300万円）</div>
                          </td>
                          <td className="py-4 px-6">3-6ヶ月</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">iOS・Android対応アプリ</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">エンタープライズシステム</td>
                          <td className="py-4 px-6">
                            <span className="text-primary font-medium">300-2,000万円</span>
                            <div className="text-xs text-muted-foreground">（相場: 500-3,000万円）</div>
                          </td>
                          <td className="py-4 px-6">6ヶ月以上</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">大規模企業向けシステム</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">UI/UXデザイン</td>
                          <td className="py-4 px-6">50-300万円</td>
                          <td className="py-4 px-6">2-12週間</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">デザイン改善、新規デザイン</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4 px-6 font-medium">各種コンサルティング</td>
                          <td className="py-4 px-6">月額30-100万円</td>
                          <td className="py-4 px-6">継続</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">DX戦略、技術、プロダクト戦略</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-medium">保守・運用サポート</td>
                          <td className="py-4 px-6">月額15-120万円</td>
                          <td className="py-4 px-6">継続</td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">システム監視、機能改善、緊急対応</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  料金についてのよくある質問
                </h2>
              </div>
            </div>
            <div className="mx-auto max-w-4xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q. 見積もりはどのように決まりますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    プロジェクトの規模、機能要件、開発期間、技術的複雑さなどを総合的に評価して見積もりを作成します。
                    無料相談にて詳細をお伺いし、透明性のある見積もりを提供いたします。
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q. 支払い方法はどうなりますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    一般的には契約時30%、中間段階で40%、完成時30%の分割支払いとなります。
                    プロジェクトの性質に応じて柔軟に対応いたします。
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q. 追加機能の開発は可能ですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    もちろん可能です。プロジェクト途中での機能追加も柔軟に対応いたします。
                    追加開発については別途お見積もりをご提示いたします。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  まずは無料相談から始めませんか？
                </h2>
                <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed">
                  プロジェクトの詳細をお聞かせください。最適なプランと正確なお見積もりをご提案いたします。
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">無料相談を申し込む</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link href="/case-studies">事例を見る</Link>
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