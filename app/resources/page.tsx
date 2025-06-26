'use client'

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"
import { Download, FileText, CheckCircle, Users, TrendingUp, Target, BarChart3, Shield, Search, Filter, X, Zap, Database, Cloud, Code } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

const resources = [
  {
    id: "dx-strategy-assessment",
    title: "DX戦略診断書",
    description: "貴社のデジタル変革の現状を診断し、具体的な改善提案をまとめた診断書を無料で提供",
    icon: TrendingUp,
    type: "診断書",
    category: "戦略・企画",
    tags: ["DX", "戦略", "診断", "ROI"],
    customerPain: "DXの進め方がわからない",
    readingTime: "8分",
    fileUrl: "/resources/files/dx-strategy-assessment.html",
    benefits: [
      "現在のDX成熟度レベルの可視化（5段階評価）",
      "業界比較による相対的な位置づけと競合分析",
      "優先度付きの改善アクション（3ヶ月・6ヶ月・1年）",
      "ROI予測とコスト削減試算（具体的な金額算出）",
      "組織のデジタル変革準備度チェック",
      "既存システムの課題分析とモダナイゼーション計画",
      "従業員のデジタルスキル評価とトレーニング計画",
      "DX推進体制の構築方法と役割分担",
      "成功事例ベースの実装ロードマップ",
      "リスク管理とセキュリティ対策の指針",
      "経営陣への報告書テンプレート",
      "予算計画と投資対効果の算出方法"
    ]
  },
  {
    id: "mvp-development-checklist",
    title: "MVP開発チェックリスト",
    description: "失敗しないMVP開発のための完全チェックリスト。開発前から検証まで段階別に整理",
    icon: CheckCircle,
    type: "チェックリスト",
    category: "開発・技術",
    tags: ["MVP", "開発", "チェックリスト", "検証"],
    customerPain: "何から開発を始めればいいかわからない",
    readingTime: "6分",
    fileUrl: "/resources/files/mvp-development-checklist.html",
    benefits: [
      "アイデア検証フェーズの完全チェック項目（市場調査・競合分析）",
      "ターゲットユーザーの明確化とペルソナ設定手法",
      "機能優先度付けのためのMoSCoW手法活用",
      "技術選定の判断基準（コスト・スケール・保守性）",
      "開発チーム編成とスキルマップ作成",
      "プロトタイプ作成のベストプラクティス",
      "ユーザーテストの設計と実施方法（定性・定量分析）",
      "A/Bテスト設計とデータ収集計画",
      "成功指標（KPI）の設定とトラッキング方法",
      "フィードバック収集と改善サイクルの構築",
      "リリース戦略とマーケティング計画",
      "次期開発フェーズへの移行判断基準",
      "失敗パターンとリスク回避策",
      "予算管理とコスト最適化のコツ"
    ]
  },
  {
    id: "product-requirements-template",
    title: "プロダクト要件定義テンプレート",
    description: "プロダクト開発に必要な要件を漏れなく整理できるテンプレート集",
    icon: FileText,
    type: "テンプレート",
    category: "企画・設計",
    tags: ["要件定義", "テンプレート", "仕様書", "設計"],
    customerPain: "要件の整理方法がわからない",
    readingTime: "7分",
    fileUrl: "/resources/files/product-requirements-template.xlsx",
    benefits: [
      "ビジネス要件から技術要件への変換フローチャート",
      "機能要件・非機能要件の体系的整理テンプレート",
      "ユーザーストーリーとアクセプタンス基準の作成ガイド",
      "画面設計とワイヤーフレーム作成テンプレート",
      "データベース設計とER図作成手順",
      "API仕様書とインターフェース設計書フォーマット",
      "技術アーキテクチャ選定のためのマトリックス表",
      "パフォーマンス要件とスケーラビリティ設計指針",
      "セキュリティ要件チェックリストと対策一覧",
      "テスト計画書とテストケース作成テンプレート",
      "運用保守要件と監視項目の定義書",
      "プロジェクトスケジュールとリソース計画表",
      "リスク管理とコンティンジェンシープラン",
      "品質保証とレビュープロセス設計",
      "ステークホルダー管理と承認フローテンプレート"
    ]
  },
  {
    id: "ui-ux-improvement-guide",
    title: "UI/UX改善ガイド",
    description: "ユーザビリティを向上させるための実践的なUI/UX改善手法とベストプラクティス",
    icon: Target,
    type: "ガイド",
    category: "デザイン・UX",
    tags: ["UI", "UX", "デザイン", "ユーザビリティ"],
    customerPain: "使いにくいと言われるが改善方法がわからない",
    readingTime: "9分",
    fileUrl: "/resources/files/ui-ux-improvement-guide.pdf",
    benefits: [
      "現状のUI/UX問題点の発見と分析手法（ヒートマップ・アナリティクス活用）",
      "ユーザビリティテストの設計・実施・分析の完全ガイド",
      "ペルソナ設計とユーザージャーニーマップ作成手順",
      "情報アーキテクチャとナビゲーション設計のベストプラクティス",
      "レスポンシブデザインとモバイルファーストの実装指針",
      "デザインシステム構築と運用管理の方法論",
      "カラーパレット・タイポグラフィ・アイコン設計ガイドライン",
      "アクセシビリティ対応（WCAG 2.1準拠）チェックリスト",
      "フォームデザインとエラーハンドリングの最適化",
      "マイクロインタラクションとアニメーション設計手法",
      "A/Bテストによるコンバージョン率最適化戦略",
      "パフォーマンス最適化とCore Web Vitals改善",
      "プロトタイピングツールの効果的な活用方法",
      "デザイン・開発チーム間の連携プロセス設計",
      "ユーザーフィードバック収集と継続的改善サイクル"
    ]
  },
  {
    id: "roi-calculation-template",
    title: "DX投資ROI計算テンプレート",
    description: "デジタル変革投資の効果測定と費用対効果を定量的に算出するためのExcelテンプレート",
    icon: BarChart3,
    type: "テンプレート",
    category: "戦略・企画",
    tags: ["ROI", "投資効果", "計算", "KPI"],
    customerPain: "投資効果を数値で示せない",
    readingTime: "8分",
    fileUrl: "/resources/files/roi-calculation-template.xlsx",
    benefits: [
      "DX投資の総コスト算出（初期投資・運用コスト・人件費）",
      "定量的効果測定（売上向上・コスト削減・効率化）の計算式",
      "定性的効果の数値化手法（顧客満足度・従業員満足度）",
      "業界ベンチマークとの比較分析テンプレート",
      "リスク調整後ROI（NPV・IRR）の算出方法",
      "段階的投資における累積ROI追跡システム",
      "KPI設定とダッシュボード設計テンプレート",
      "効果測定のための事前事後比較フレームワーク",
      "経営陣向け投資提案書の作成ガイド",
      "月次・四半期・年次レポートフォーマット",
      "投資回収期間とペイバック分析",
      "感度分析とシナリオプランニング手法",
      "競合他社ROI比較と市場ポジション分析",
      "投資継続・撤退判断のための評価基準",
      "成功事例とベストプラクティス集"
    ]
  },
  {
    id: "security-checklist",
    title: "セキュリティ対策チェックリスト",
    description: "Webアプリケーション開発で押さえるべきセキュリティ要件と対策項目の完全チェックリスト",
    icon: Shield,
    type: "チェックリスト",
    category: "開発・技術",
    tags: ["セキュリティ", "OWASP", "脆弱性", "チェックリスト"],
    customerPain: "セキュリティ対策が不安",
    readingTime: "7分",
    fileUrl: "/resources/files/security-checklist.pdf",
    benefits: [
      "OWASP Top 10対応の脆弱性診断チェックリスト",
      "認証・認可システムの設計と実装ガイド（OAuth2.0・JWT）",
      "データ暗号化とセキュア通信（TLS/SSL）の実装手順",
      "入力値検証とサニタイゼーションのベストプラクティス",
      "SQLインジェクション・XSS・CSRF対策の具体的実装",
      "セキュリティヘッダーとCSP（Content Security Policy）設定",
      "ログ管理と監査証跡の設計・運用方法",
      "セキュリティテスト（ペネトレーション・脆弱性診断）計画",
      "GDPR・個人情報保護法対応のデータ管理手順",
      "セキュリティインシデント対応計画とBCP策定",
      "クラウドセキュリティ（AWS・Azure・GCP）のベストプラクティス",
      "DevSecOpsとセキュリティ自動化の導入方法",
      "サードパーティライブラリの脆弱性管理",
      "セキュリティ教育とアウェアネス向上プログラム",
      "コンプライアンス監査対応と証跡管理システム"
    ]
  },
  {
    id: "agile-development-playbook",
    title: "アジャイル開発プレイブック",
    description: "スクラム・カンバンを活用した効率的なアジャイル開発の実践ガイドとツール集",
    icon: Zap,
    type: "プレイブック",
    category: "開発・技術",
    tags: ["アジャイル", "スクラム", "カンバン", "開発手法"],
    customerPain: "開発スピードが遅く品質も安定しない",
    readingTime: "10分",
    fileUrl: "/resources/files/agile-development-playbook.pdf",
    benefits: [
      "スクラム導入の段階的アプローチとチーム編成方法",
      "スプリント計画とバックログ管理のベストプラクティス",
      "カンバンボード設計と作業可視化の実装手順",
      "デイリースタンドアップとレトロスペクティブの効果的な運営",
      "ユーザーストーリー作成とストーリーポイント見積もり",
      "継続的インテグレーション・デリバリー（CI/CD）構築",
      "テスト駆動開発（TDD）とペアプログラミング導入",
      "アジャイルメトリクス（ベロシティ・バーンダウン）活用",
      "分散チームでのリモートアジャイル実践方法",
      "ステークホルダーとの効果的なコミュニケーション手法",
      "技術的負債管理とリファクタリング戦略",
      "アジャイルコーチング・ファシリテーション技術",
      "組織変革とアジャイルマインドセット醸成",
      "トラブルシューティング・よくある失敗パターン対策",
      "アジャイル成熟度評価とプロセス改善サイクル"
    ]
  },
  {
    id: "data-driven-decision-framework",
    title: "データドリブン意思決定フレームワーク",
    description: "データ分析とKPI設計で事業成長を加速するための戦略的フレームワーク",
    icon: Database,
    type: "フレームワーク",
    category: "戦略・企画",
    tags: ["データ分析", "KPI", "意思決定", "BI"],
    customerPain: "データを活用した意思決定ができていない",
    readingTime: "9分",
    fileUrl: "/resources/files/data-driven-decision-framework.pdf",
    benefits: [
      "ビジネス目標とKPI設計の体系的アプローチ",
      "データ収集戦略とガバナンス体制の構築方法",
      "顧客行動分析とセグメンテーション手法",
      "売上予測とトレンド分析のモデリング技術",
      "A/Bテスト設計と統計的有意性の判断基準",
      "ダッシュボード設計とデータ可視化のベストプラクティス",
      "機械学習を活用した予測分析の導入手順",
      "カスタマージャーニー分析とタッチポイント最適化",
      "ROI・LTV・CAC等の重要指標の算出と活用方法",
      "データドリブン文化の醸成と組織変革",
      "プライバシー保護とコンプライアンス対応",
      "リアルタイム分析とアラート設定の仕組み",
      "データ品質管理とクレンジング手法",
      "BIツール選定と導入プロジェクト管理",
      "データサイエンスチーム構築と人材育成"
    ]
  },
  {
    id: "cloud-migration-strategy",
    title: "クラウド移行戦略ガイド",
    description: "オンプレミスからクラウドへの移行を成功させるための包括的戦略とロードマップ",
    icon: Cloud,
    type: "戦略ガイド",
    category: "開発・技術",
    tags: ["クラウド", "AWS", "Azure", "移行"],
    customerPain: "クラウド移行のリスクとコストが心配",
    readingTime: "11分",
    fileUrl: "/resources/files/cloud-migration-strategy.pdf",
    benefits: [
      "クラウド移行の総合的なアセスメントと現状分析",
      "AWS・Azure・GCP各プラットフォームの比較と選定基準",
      "移行戦略（リフト&シフト・リプラットフォーム・リアーキテクト）の選択",
      "コスト最適化と予算計画の立案方法",
      "セキュリティ・コンプライアンス要件の移行対応",
      "データ移行計画と最小ダウンタイム実現手法",
      "ネットワーク設計とVPN・専用線接続の構築",
      "災害対策（DR）とバックアップ戦略の設計",
      "マイクロサービス化とコンテナ化の検討手順",
      "DevOpsパイプライン構築とインフラ自動化",
      "パフォーマンス監視と運用最適化",
      "段階的移行アプローチとロールバック計画",
      "チーム教育とスキルアップ計画",
      "ガバナンス体制とマルチクラウド管理",
      "移行後の継続的最適化とFinOps実践"
    ]
  },
  {
    id: "api-design-best-practices",
    title: "API設計ベストプラクティス集",
    description: "拡張性と保守性に優れたRESTful API・GraphQL APIの設計手法とドキュメント化",
    icon: Code,
    type: "ベストプラクティス",
    category: "開発・技術",
    tags: ["API", "REST", "GraphQL", "設計"],
    customerPain: "APIの設計と運用で問題が頻発する",
    readingTime: "8分",
    fileUrl: "/resources/files/api-design-best-practices.pdf",
    benefits: [
      "RESTful API設計原則とリソース指向アーキテクチャ",
      "GraphQL APIの設計パターンとスキーマ最適化",
      "API仕様書作成とOpenAPI（Swagger）活用方法",
      "認証・認可システム（OAuth2.0・JWT）の実装",
      "エラーハンドリングとステータスコード設計",
      "レート制限・スロットリング・キャッシュ戦略",
      "バージョニング戦略と後方互換性の保持",
      "API監視・ログ・メトリクス収集の仕組み",
      "テスト自動化（単体・結合・E2E）の実装",
      "API Gateway活用とマイクロサービス連携",
      "セキュリティ対策とペネトレーションテスト",
      "パフォーマンス最適化と負荷対策",
      "ドキュメント自動生成とAPIポータル構築",
      "開発者体験（DX）向上のためのSDK・ツール提供",
      "API運用・サポート体制とSLA設計"
    ]
  }
]

export default function ResourcesPage() {
  const [email, setEmail] = useState("")
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("全て")
  const [selectedPain, setSelectedPain] = useState<string>("全て")

  // カテゴリと顧客の悩みの一覧を生成
  const categories = ["全て", ...Array.from(new Set(resources.map(r => r.category)))]
  const customerPains = ["全て", ...Array.from(new Set(resources.map(r => r.customerPain)))]

  // フィルタリングされたリソース
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "全て" || resource.category === selectedCategory
    const matchesPain = selectedPain === "全て" || resource.customerPain === selectedPain
    
    return matchesSearch && matchesCategory && matchesPain
  })

  const handleDownload = async (resourceId: string) => {
    if (!email) {
      toast.error("メールアドレスを入力してください")
      return
    }

    setIsSubmitting(true)
    setSelectedResource(resourceId)

    try {
      // リードマグネットのダウンロードAPI呼び出し
      const response = await fetch("/api/resources/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resourceId,
        }),
      })

      if (!response.ok) {
        throw new Error("ダウンロードに失敗しました")
      }

      toast.success("資料をメールアドレスに送信しました！受信トレイをご確認ください。")
      setEmail("")
    } catch (error) {
      toast.error("ダウンロードに失敗しました。しばらく経ってから再度お試しください。")
    } finally {
      setIsSubmitting(false)
      setSelectedResource(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  無料リソース
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  プロダクト開発とDXを成功に導く実践的な資料を無料でダウンロードできます。
                  <br />
                  今すぐメールアドレスを入力して、専門ノウハウを手に入れましょう。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 検索・フィルターセクション */}
        <section className="w-full py-8 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 検索バー */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="キーワードで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* カテゴリフィルター */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="カテゴリ" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* 悩みフィルター */}
                  <Select value={selectedPain} onValueChange={setSelectedPain}>
                    <SelectTrigger className="w-full sm:w-60">
                      <Users className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="お悩み" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerPains.map((pain) => (
                        <SelectItem key={pain} value={pain}>
                          {pain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* フィルター状態表示 */}
              <div className="flex flex-wrap gap-2">
                {(selectedCategory !== "全て" || selectedPain !== "全て" || searchQuery) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>フィルター:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        「{searchQuery}」
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                      </Badge>
                    )}
                    {selectedCategory !== "全て" && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedCategory}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("全て")} />
                      </Badge>
                    )}
                    {selectedPain !== "全て" && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedPain}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedPain("全て")} />
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* 検索結果数 */}
              <div className="text-sm text-muted-foreground">
                {filteredResources.length}件の資料が見つかりました
              </div>
            </div>
          </div>
        </section>

        {/* リソース一覧セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <resource.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">
                              {resource.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{resource.title}</CardTitle>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>読了時間</div>
                        <div className="font-semibold">{resource.readingTime}</div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                    
                    {/* タグ表示 */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* 顧客の悩み表示 */}
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>こんな悩みに: {resource.customerPain}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold tracking-tight mb-2">この資料で得られること：</h4>
                      <ul className="space-y-1">
                        {resource.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex space-x-2">
                        <Input
                          type="email"
                          placeholder="メールアドレスを入力"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleDownload(resource.id)}
                          disabled={isSubmitting && selectedResource === resource.id}
                          className="whitespace-nowrap"
                        >
                          {isSubmitting && selectedResource === resource.id ? (
                            <div className="flex items-center gap-2">
                              <Spinner size="sm" />
                              送信中...
                            </div>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              無料ダウンロード
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ※ ダウンロード後、お役立ち情報を月1-2回お送りすることがあります。いつでも配信停止可能です。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  さらに詳しいご相談をお求めですか？
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  貴社の具体的な課題に合わせたカスタマイズ提案や詳細なコンサルティングをご希望の場合は、
                  無料相談をご利用ください。専門チームが直接サポートいたします。
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <a href="/contact">無料相談を申し込む</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/case-studies">事例を見る</a>
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