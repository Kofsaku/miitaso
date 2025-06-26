'use client'

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, DollarSign, Settings, Users, Shield } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    title: "プロジェクト開始について",
    icon: MessageSquare,
    color: "bg-blue-500",
    faqs: [
      {
        question: "プロジェクトを開始するまでの流れを教えてください",
        answer: "①無料相談でご要件をお伺い → ②提案書・見積書作成 → ③契約締結 → ④キックオフミーティング → ⑤開発開始の流れとなります。初回相談から開発開始まで通常2-3週間程度です。"
      },
      {
        question: "見積もりは無料ですか？",
        answer: "はい、初回相談および基本的なお見積もりは無料で承っております。詳細な技術調査が必要な場合のみ、事前にご相談の上で別途費用が発生する場合があります。"
      },
      {
        question: "契約前に技術的な相談をすることは可能ですか？",
        answer: "もちろん可能です。技術選定、アーキテクチャ設計、実現可能性の検証など、プロジェクト成功のための事前相談を歓迎いたします。専門チームがお答えします。"
      }
    ]
  },
  {
    title: "開発期間・スケジュール",
    icon: Clock,
    color: "bg-green-500",
    faqs: [
      {
        question: "一般的な開発期間はどのくらいですか？",
        answer: "MVPであれば3-6ヶ月、本格的なWebアプリケーションは6-12ヶ月、エンタープライズシステムは12ヶ月以上が目安です。要件により調整可能です。"
      },
      {
        question: "開発期間を短縮することは可能ですか？",
        answer: "はい。開発チームの拡大、機能の優先度調整、アジャイル開発の採用などにより期間短縮が可能です。ただし品質は妥協いたしません。"
      },
      {
        question: "開発進捗はどのように確認できますか？",
        answer: "週次レポート、専用ダッシュボード、定期ミーティングを通じてリアルタイムで進捗をご確認いただけます。透明性を重視したプロジェクト管理を行います。"
      }
    ]
  },
  {
    title: "料金・支払い",
    icon: DollarSign,
    color: "bg-yellow-500",
    faqs: [
      {
        question: "料金体系はどうなっていますか？",
        answer: "プロジェクトベースの固定料金制を採用しています。スタートアップ300万円〜、スタンダード800万円〜、エンタープライズ1,500万円〜が目安です。詳しくは料金ページをご確認ください。"
      },
      {
        question: "支払い条件を教えてください",
        answer: "一般的には契約時30%、開発中間時40%、完成・納品時30%の3回払いです。プロジェクトに応じて柔軟に調整可能です。"
      },
      {
        question: "追加開発が発生した場合の料金はどうなりますか？",
        answer: "事前にお見積もりをご提示し、ご承認いただいてから作業を開始します。時間単価は12万円/日が標準レートです。"
      }
    ]
  },
  {
    title: "技術・開発手法",
    icon: Settings,
    color: "bg-purple-500",
    faqs: [
      {
        question: "どのような技術スタックを使用しますか？",
        answer: "React/Next.js、Vue.js、Node.js、Python、AWS/GCPなど最新技術を活用します。プロジェクト要件に最適な技術を選定いたします。"
      },
      {
        question: "既存システムとの連携は可能ですか？",
        answer: "はい、API連携、データベース統合、認証連携など、既存システムとのスムーズな連携を実現します。事前調査を十分に行います。"
      },
      {
        question: "コードの品質管理はどのように行いますか？",
        answer: "コードレビュー、自動テスト、CI/CD導入により高品質なコードを保証します。業界標準のベストプラクティスを遵守しています。"
      }
    ]
  },
  {
    title: "チーム・サポート体制",
    icon: Users,
    color: "bg-red-500",
    faqs: [
      {
        question: "開発チームの構成はどうなっていますか？",
        answer: "プロジェクトマネージャー、フロントエンド・バックエンドエンジニア、UI/UXデザイナー、QAエンジニアなど、必要な専門スキルを持つメンバーでチームを構成します。"
      },
      {
        question: "開発後のサポートはありますか？",
        answer: "はい。バグ修正、機能追加、運用サポートなど包括的なアフターサポートを提供します。保守契約により継続的なサポートも可能です。"
      },
      {
        question: "緊急時の対応はどうなりますか？",
        answer: "エンタープライズプランでは24時間サポートを提供。その他のプランでも営業時間内での迅速な対応を心がけています。"
      }
    ]
  },
  {
    title: "セキュリティ・品質保証",
    icon: Shield,
    color: "bg-indigo-500",
    faqs: [
      {
        question: "セキュリティ対策はどのように行いますか？",
        answer: "HTTPS、認証・認可、データ暗号化、脆弱性検査など、包括的なセキュリティ対策を実装します。OWASP Top 10への対応も標準で行います。"
      },
      {
        question: "データの機密性は保護されますか？",
        answer: "はい。NDA締結、アクセス制限、データ暗号化により機密情報を厳重に保護します。GDPR、個人情報保護法にも対応しています。"
      },
      {
        question: "品質保証のプロセスはどうなっていますか？",
        answer: "ユニットテスト、統合テスト、ユーザビリティテストを段階的に実施。バグゼロを目指した徹底的な品質管理を行います。"
      }
    ]
  }
]

export default function FAQPage() {
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
                  よくある質問
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  miitasoのサービスについてよくいただく質問をカテゴリ別にまとめました。
                  <br />
                  ご不明な点がございましたら、お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${category.color}`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 追加質問セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  他にご質問はありませんか？
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  上記以外にもご不明な点やより詳しく知りたいことがございましたら、
                  専門スタッフが直接お答えいたします。
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/contact">無料相談を申し込む</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/resources">無料資料をダウンロード</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* クイックリンクセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  詳しい情報はこちら
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>サービス詳細</CardTitle>
                  <CardDescription>
                    提供しているサービスの詳細情報
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/services">サービスを見る</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>料金プラン</CardTitle>
                  <CardDescription>
                    明確で透明性のある料金体系
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/pricing">料金を見る</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>事例紹介</CardTitle>
                  <CardDescription>
                    実際の開発事例と成果
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/case-studies">事例を見る</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}