import {
  CheckCircle2,
  X,
  Minus,
  Cpu,
  Wrench,
  HandCoins,
  FileSearch,
  Rocket,
  HeadphonesIcon,
  MessageSquareText,
  ShoppingCart,
  BarChart3,
  Settings,
  Code2,
  Zap,
} from "lucide-react"
import { CTAButton } from "./_components/cta-button"
import { FAQSection } from "./_components/faq-section"
import { StickyMobileCTA } from "./_components/sticky-mobile-cta"
import { IndustryTabs } from "./_components/industry-tabs"

// ============================================================
// Section 1: Hero
// ============================================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A3C6E] via-[#1E4F8A] to-[#2E75B6] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-300 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 py-14 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-blue-100 border border-white/20">
            <Cpu className="w-4 h-4" />
            中小企業向けAI導入支援
          </div>
          <h1 className="text-[1.65rem] leading-[1.4] md:text-[2.5rem] font-bold md:leading-tight">
            「AIって、うちでも
            <br className="md:hidden" />
            使えるの？」
            <br />
            <span className="text-orange-300">
              その疑問に、30分で答えます。
            </span>
          </h1>
          <p className="text-[0.95rem] md:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            フルスタックエンジニアが御社の業務を分析し、
            <br className="hidden md:block" />
            最適なAI活用プランを無料でご提案します。
            <br className="hidden md:block" />
            提案だけでなく、実装・運用まで一貫対応。
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm">
            {[
              "業界問わず導入可能",
              "大手の1/5の費用",
              "最短2週間で導入",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-300" />
                <span className="text-blue-50 text-xs md:text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <CTAButton microcopy="※ 30秒で予約完了・営業は一切しません" dark />
            <p className="text-xs text-blue-200/80">
              EC・食品・士業・不動産・飲食など業界を問わず対応
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 2: Pain Points
// ============================================================

function PainPointsSection() {
  const problems = [
    "ChatGPTを試してみたけど、業務にどう活かせばいいか分からない",
    "AIを導入したいが、何から始めればいいか見当がつかない",
    "IT担当者がいないので、AIツールの選定・設定ができない",
    "問い合わせ対応や事務作業に時間を取られ、本業に集中できない",
    "競合がAIを活用し始めていて、差をつけられそうで不安",
    "大手コンサルに相談したら、数百万円の見積もりが出てきた",
  ]

  return (
    <section className="bg-white py-12 md:py-18">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          こんなお悩みはありませんか？
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10" />

        <div className="space-y-3 md:space-y-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-[#FFF8F5] border border-orange-100 rounded-lg p-4 md:p-5"
            >
              <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-[#333] text-sm md:text-base leading-relaxed">
                {problem}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#555] text-sm md:text-base mt-8 leading-relaxed">
          ひとつでも当てはまるなら、
          <span className="font-bold text-[#1A3C6E]">無料AI診断</span>
          で解決の糸口が見つかります。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// Section 3: Solution (Strengths + Comparison)
// ============================================================

function SolutionSection() {
  const strengths = [
    {
      icon: <Cpu className="w-10 h-10 text-[#2E75B6]" />,
      title: "エンジニアが直接対応",
      desc: "代表がフルスタックエンジニア。営業担当ではなく、技術者が直接ヒアリングし、その場で具体的な解決策をご提案します。",
    },
    {
      icon: <Wrench className="w-10 h-10 text-[#2E75B6]" />,
      title: "提案だけでなく実装まで",
      desc: "「提案書を作って終わり」ではありません。AIの選定・設計・実装・運用テストまで、すべてmiitasoが一貫対応します。",
    },
    {
      icon: <HandCoins className="w-10 h-10 text-[#2E75B6]" />,
      title: "大手の1/5の費用で導入",
      desc: "代表が直接対応するため中間マージンゼロ。大手コンサルの1/3〜1/5の費用で、同等以上の品質を実現します。",
    },
  ]

  const comparison = [
    {
      feature: "業務分析・提案",
      bigConsul: "check",
      inhouse: "minus",
      miitaso: "check",
    },
    {
      feature: "AI実装・開発",
      bigConsul: "x",
      inhouse: "check",
      miitaso: "check",
    },
    {
      feature: "中小企業の業務理解",
      bigConsul: "minus",
      inhouse: "x",
      miitaso: "check",
    },
    {
      feature: "導入後の継続サポート",
      bigConsul: "x",
      inhouse: "check",
      miitaso: "check",
    },
    {
      feature: "費用対効果",
      bigConsul: "x",
      inhouse: "minus",
      miitaso: "check",
    },
  ]

  function ComparisonIcon({ type }: { type: string }) {
    if (type === "check")
      return <CheckCircle2 className="w-5 h-5 text-[#2E75B6] mx-auto" />
    if (type === "x")
      return <X className="w-5 h-5 text-gray-300 mx-auto" />
    return <Minus className="w-5 h-5 text-gray-400 mx-auto" />
  }

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          miitasoのAI導入支援が
          <br className="md:hidden" />
          選ばれる理由
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] mb-10 md:mb-12 text-sm md:text-base">
          「分かる人」が直接対応するから、速い・安い・確実。
        </p>

        {/* 3-Column Strengths */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {strengths.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F0F6FF] rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-[#1A3C6E] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#555] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Matrix */}
        <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-[#333] text-center mb-6">
            他のAI導入方法との比較
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 md:px-4 text-[#555] font-medium" />
                  <th className="py-3 px-2 md:px-4 text-[#888] font-medium text-center">
                    大手
                    <br />
                    コンサル
                  </th>
                  <th className="py-3 px-2 md:px-4 text-[#888] font-medium text-center">
                    自社で
                    <br />
                    試行錯誤
                  </th>
                  <th className="py-3 px-2 md:px-4 text-[#1A3C6E] font-bold text-center bg-[#F0F6FF] rounded-t-lg">
                    miitaso
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-3 px-2 md:px-4 text-[#333] font-medium text-xs md:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3 px-2 md:px-4 text-center">
                      <ComparisonIcon type={row.bigConsul} />
                    </td>
                    <td className="py-3 px-2 md:px-4 text-center">
                      <ComparisonIcon type={row.inhouse} />
                    </td>
                    <td className="py-3 px-2 md:px-4 text-center bg-[#F0F6FF]">
                      <ComparisonIcon type={row.miitaso} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 4: Industry Use Cases
// ============================================================

function IndustrySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          業界別AI活用事例
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          御社の業界を選択して、具体的な活用イメージをご覧ください
        </p>

        <IndustryTabs />

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <CTAButton microcopy="※ 御社の業務に合わせた具体的な活用プランをご提案します" />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 5: Service Packages
// ============================================================

function PackagesSection() {
  const packages = [
    {
      icon: <MessageSquareText className="w-6 h-6 text-white" />,
      label: "A",
      title: "問い合わせ自動化",
      desc: "AIチャットボットで顧客対応を自動化。24時間対応で顧客満足度を向上させながら、対応コストを削減。",
      examples: ["FAQ自動応答", "メール自動分類・下書き", "LINE/Web対応"],
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      label: "B",
      title: "EC運営効率化",
      desc: "商品登録・説明文作成・レビュー分析・在庫管理をAIで効率化。少人数でも大量商品を管理可能に。",
      examples: ["商品説明自動生成", "レビュー分析", "在庫予測"],
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      label: "C",
      title: "営業・マーケティングAI",
      desc: "顧客データの分析、営業資料の自動生成、リード管理の効率化。営業活動をデータドリブンに。",
      examples: ["顧客分析", "提案書自動作成", "SNS投稿生成"],
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      label: "D",
      title: "社内業務効率化",
      desc: "日報・議事録・報告書の自動化、社内ナレッジの検索AI化。バックオフィス業務を大幅に削減。",
      examples: ["議事録自動生成", "社内FAQ AI化", "書類ドラフト作成"],
    },
    {
      icon: <Code2 className="w-6 h-6 text-white" />,
      label: "E",
      title: "カスタムAI開発",
      desc: "御社独自の業務フローに合わせたAIシステムをゼロから開発。既存システムとのAPI連携にも対応。",
      examples: ["業務特化AI", "既存システム連携", "独自モデル構築"],
    },
  ]

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          サービスパッケージ
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          御社の課題に合わせて最適なパッケージをご提案します
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1A3C6E] rounded-lg flex items-center justify-center flex-shrink-0">
                  {pkg.icon}
                </div>
                <div>
                  <span className="text-xs text-[#2E75B6] font-bold">
                    パッケージ {pkg.label}
                  </span>
                  <h3 className="font-bold text-[#1A3C6E] text-base">
                    {pkg.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                {pkg.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {pkg.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-xs bg-[#F0F6FF] text-[#2E75B6] px-2.5 py-1 rounded-full"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#888] mt-6">
          ※ 複数パッケージの組み合わせも可能です。無料診断で最適なプランをご提案します。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// Section 6: Service Flow
// ============================================================

function ServiceFlowSection() {
  const steps = [
    {
      icon: <FileSearch className="w-6 h-6 text-white" />,
      title: "無料AI診断（30分）",
      desc: "御社の業務内容をヒアリングし、AIで自動化・効率化できるポイントを特定します",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "改善提案・お見積もり",
      desc: "診断結果をもとに、具体的なAI活用プランと費用をご提案します（1週間以内）",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "AI導入・実装",
      desc: "AIツールの選定・設計・実装・テストを行います。最短2週間〜通常1-2ヶ月",
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-white" />,
      title: "月額サポート・改善",
      desc: "導入後もAIの精度改善、新しい活用シーンの提案、トラブル対応を継続サポート",
    },
  ]

  const notes = [
    "所要時間：30分（延長なし、時間厳守）",
    "実施方法：Zoom（オンライン）",
    "費用：完全無料",
    "診断内容：御社の業務フローをヒアリングし、AI活用で改善できるポイントを3つ以上ご提案",
    "成果物：診断後に「AI活用提案シート」（1枚）をメールでお送りします",
    "診断を受けたからといって契約の義務は一切ありません",
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          導入の流れ
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          無料診断からAI運用開始まで、すべてお任せください
        </p>

        {/* 4-Step Flow */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 mb-12">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              <div className="bg-[#F5F7FA] rounded-xl p-5 text-center border border-gray-100 h-full">
                <div className="w-12 h-12 mx-auto mb-3 bg-[#1A3C6E] rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-xs text-[#2E75B6] font-bold mb-1">
                  STEP {i + 1}
                </p>
                <h3 className="font-bold text-sm text-[#1A3C6E] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <>
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 text-[#2E75B6] z-10">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="md:hidden flex justify-center py-1">
                    <svg
                      className="w-5 h-5 text-[#2E75B6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Free AI Diagnosis Details */}
        <div className="bg-[#F5F7FA] rounded-xl p-6 md:p-8 border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-[#1A3C6E] mb-4">
            無料AI診断について
          </h3>
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-[#555]"
              >
                <span className="w-1.5 h-1.5 bg-[#2E75B6] rounded-full flex-shrink-0 mt-2" />
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 7: Pricing
// ============================================================

function PricingSection() {
  const plans = [
    {
      scale: "スタート",
      target: "まずは1つの業務から",
      price: "50〜100万円",
      monthly: "月額10〜15万円",
      desc: "問い合わせ自動化やFAQ AI化など、1つの業務に絞ってAIを導入",
    },
    {
      scale: "スタンダード",
      target: "複数業務をまとめて効率化",
      price: "150〜300万円",
      monthly: "月額20〜30万円",
      desc: "複数の業務プロセスにAIを導入。社内業務全体の効率化を実現",
      featured: true,
    },
    {
      scale: "カスタム",
      target: "独自AIシステムの開発",
      price: "300万円〜",
      monthly: "月額30〜50万円",
      desc: "御社専用のAIシステムをゼロから開発。既存システムとの連携も対応",
    },
  ]

  const includes = [
    "業務分析・AI活用プランの策定",
    "AIツール・システムの選定・設計",
    "実装・テスト・導入支援",
    "操作マニュアル・社内レクチャー",
    "導入後の改善・精度向上サポート",
    "定期ミーティング（月1-2回）",
  ]

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          料金プラン
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          初期導入費 + 月額リテイナーのシンプルな料金体系
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-10">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 md:p-8 text-center border transition-shadow ${
                plan.featured
                  ? "bg-[#F0F6FF] border-[#2E75B6]/30 shadow-md"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.featured && (
                <p className="text-xs font-bold text-[#2E75B6] mb-2">
                  おすすめ
                </p>
              )}
              <h3 className="font-bold text-lg text-[#1A3C6E] mb-1">
                {plan.scale}
              </h3>
              <p className="text-xs text-[#888] mb-4">{plan.target}</p>
              <div className="mb-2">
                <p className="text-xs text-[#555] mb-1">初期導入費</p>
                <p className="text-2xl md:text-3xl font-bold text-[#1A3C6E]">
                  {plan.price}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-[#2E75B6]">
                  + {plan.monthly}
                </p>
              </div>
              <p className="text-sm text-[#555] leading-relaxed">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-[#333] mb-4">
            月額リテイナーに含まれるもの
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#555]">
                <CheckCircle2 className="w-4 h-4 text-[#2E75B6] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2 text-sm text-[#888] mb-8">
          <p>※ 正確な費用は無料AI診断後に個別にお見積もりいたします</p>
          <p>※ 支払い条件：着手金50% + 導入完了時50%（標準）</p>
          <p>※ 月額リテイナーは最低契約期間3ヶ月〜</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButton microcopy="※ まずは無料診断で概算をお伝えします" />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 8: Profile
// ============================================================

function ProfileSection() {
  const careerSteps = [
    "物流系テック企業にてフルスタックエンジニアとして開発を経験",
    "大手IT企業にてプロダクトマネージャーとして複数の事業開発に従事",
    "ITコンサルタントとして大手印刷企業の地方自治体向け電子通貨開発プロジェクトに参画",
    "2024年に株式会社miitasoを創業。フルスタックエンジニア × AI活用の専門知識を活かし、中小企業のAI導入支援に特化",
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          代表プロフィール
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10" />

        <div className="bg-[#F5F7FA] rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Profile icon */}
            <div className="w-32 h-40 bg-gradient-to-br from-[#1A3C6E] to-[#2E75B6] rounded-xl flex flex-col items-center justify-center flex-shrink-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-white/60 text-[10px]">代表</p>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-[#1A3C6E] text-lg">
                  津端 晃作
                  <span className="text-sm font-normal text-[#888] ml-2">
                    つばた こうさく
                  </span>
                </h3>
                <p className="text-sm text-[#555] font-medium">
                  株式会社miitaso 代表
                </p>
              </div>
              <p className="text-sm font-medium text-[#333]">
                フルスタックエンジニア × AI活用の専門知識で、中小企業のDXを支援
              </p>
              <ul className="text-sm text-[#555] leading-relaxed space-y-1.5">
                {careerSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#2E75B6] rounded-full flex-shrink-0 mt-2" />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Claude API",
                  "OpenAI API",
                  "Next.js",
                  "React",
                  "Flutter",
                  "Firebase",
                  "Python",
                  "Laravel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-white text-[#2E75B6] px-3 py-1 rounded-full border border-[#2E75B6]/20 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 9: Final CTA
// ============================================================

function FinalCTASection() {
  return (
    <section className="bg-gradient-to-br from-[#1A3C6E] to-[#2E75B6] text-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          まずは30分、
          <br className="md:hidden" />
          AIの可能性を確認しませんか？
        </h2>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8">
          「うちの業務にAIは使えるのか？」
          <br className="hidden md:block" />
          その答えを、フルスタックエンジニアが30分で具体的にお伝えします。
          <br className="hidden md:block" />
          まずはお気軽にご相談ください。
        </p>
        <div className="space-y-4">
          <CTAButton microcopy="※ 30秒で予約完了・診断を受けても契約の義務はありません" dark />
          <div>
            <CTAButton
              variant="sub"
              label="メールでサービス資料を請求する"
            />
          </div>
          <p className="text-xs text-blue-200 mt-2">
            ※ すぐに診断する段階でない方はまず資料をご覧ください
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 10: Footer
// ============================================================

function LPFooter() {
  return (
    <footer className="bg-[#0F2847] text-white py-10">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <p className="font-bold text-lg">株式会社miitaso</p>
        <p className="text-sm text-blue-200">代表：津端 晃作</p>
        <p className="text-sm text-blue-200">
          〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F
        </p>
        <div className="flex justify-center gap-4 text-xs text-blue-200">
          <a href="/privacy" className="hover:text-white transition-colors">
            プライバシーポリシー
          </a>
          <span className="text-blue-400">|</span>
          <a href="/tokushoho" className="hover:text-white transition-colors">
            特定商取引法に基づく表記
          </a>
        </div>
        <p className="text-xs text-blue-400 pt-4">
          &copy; 2024-2026 株式会社miitaso All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ============================================================
// Main Page (Server Component)
// ============================================================
export default function AILLP() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <IndustrySection />
      <PackagesSection />
      <ServiceFlowSection />
      <ProfileSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <LPFooter />
      <StickyMobileCTA />
    </div>
  )
}
