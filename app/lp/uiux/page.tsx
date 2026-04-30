import {
  CheckCircle2,
  X,
  Minus,
  PenTool,
  Code2,
  Handshake,
  Clock,
  FileSearch,
  Palette,
  MonitorSmartphone,
  Shield,
} from "lucide-react"
import { CTAButton } from "./_components/cta-button"
import { FAQSection } from "./_components/faq-section"
import { StickyMobileCTA } from "./_components/sticky-mobile-cta"
import { FadeIn } from "../consultation/_components/fade-in"
import { DemoMockups } from "./_components/demo-mockups"
import { CaseCarousel } from "./_components/case-carousel"

// ============================================================
// Section 1: Hero (First View)
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
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-[1.65rem] leading-[1.4] md:text-[2.25rem] font-bold md:leading-tight">
              「システムのUIが古い」──
              <br />
              でも、どこに頼めばいいか
              <br className="hidden md:block" />
              分からない。
              <br />
              <span className="text-orange-300">
                そんな課題を、30分で整理します。
              </span>
            </h1>
            <p className="text-[0.95rem] md:text-lg text-blue-100 leading-relaxed">
              デザインだけでなくフロントエンド実装まで対応。
              <br className="hidden md:block" />
              既存の開発体制を活かしたまま、UIだけをプロの手で刷新します。
            </p>
            <div className="pt-2 space-y-3">
              <CTAButton microcopy="※ 30秒で予約完了・営業は一切しません" dark />
              <p className="text-xs text-blue-200/80">
                導入実績あり｜既存の開発会社との協業体制に対応
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <DemoMockups />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 2: Pain Points (Empathy)
// ============================================================

function PainPointsSection() {
  const clientProblems = [
    "自社システムのUIが古く、社員やユーザーから不満の声が出ている",
    "既存のシステム会社にUI改善を相談したが「デザインは対応できない」と言われた",
    "システム全体を作り直す予算はないが、UIだけでも刷新したい",
    "新しい社員が操作を覚えるのに時間がかかり、業務効率が落ちている",
    "競合サービスのUIが洗練されており、自社システムの見劣りが気になっている",
    "UIを改善したいが、既存のデータやロジックは壊したくない",
  ]

  const sierProblems = [
    "クライアントからUI改善を求められるが、社内にデザイナーがいない",
    "デザイン外注を検討しているが、技術を理解しないデザイナーでは手戻りが多い",
    "フロントエンド実装まで含めて任せられるパートナーを探している",
  ]

  return (
    <section className="bg-white py-12 md:py-18">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          こんなお悩みはありませんか？
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10" />

        {/* Direct Client Problems */}
        <FadeIn>
          <div className="space-y-3 md:space-y-4 mb-10">
            {clientProblems.map((problem, i) => (
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
        </FadeIn>

        {/* SIer / Partner Problems */}
        <FadeIn>
          <div className="bg-[#F0F6FF] rounded-xl p-5 md:p-8 border border-[#2E75B6]/10">
            <h3 className="text-lg md:text-xl font-bold text-[#1A3C6E] mb-5">
              開発会社・SIerの方へ
            </h3>
            <div className="space-y-3">
              {sierProblems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2E75B6] flex-shrink-0 mt-0.5" />
                  <p className="text-[#333] text-sm md:text-base leading-relaxed">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// Section 3: Solution (Strengths + Comparison Matrix)
// ============================================================

function SolutionSection() {
  const strengths = [
    {
      icon: <PenTool className="w-10 h-10 text-[#2E75B6]" />,
      title: "技術を理解したデザイン",
      desc: "代表がフルスタックエンジニア出身。技術的制約を踏まえた、実装可能なUIを設計します。",
    },
    {
      icon: <Code2 className="w-10 h-10 text-[#2E75B6]" />,
      title: "フロントエンド実装まで対応",
      desc: "React / Next.js等を用いたフロントエンド実装まで一貫対応。デザインと実装のギャップをゼロに。",
    },
    {
      icon: <Handshake className="w-10 h-10 text-[#2E75B6]" />,
      title: "既存の開発体制と協業",
      desc: "サーバーサイドは既存の開発会社が担当、UIだけをmiitasoが担当。開発体制を崩しません。",
    },
  ]

  const comparison = [
    {
      feature: "UIデザイン",
      designCo: "check",
      devCo: "minus",
      miitaso: "check",
    },
    {
      feature: "技術的実現性の考慮",
      designCo: "x",
      devCo: "check",
      miitaso: "check",
    },
    {
      feature: "フロントエンド実装",
      designCo: "x",
      devCo: "check",
      miitaso: "check",
    },
    {
      feature: "既存システムとの協業",
      designCo: "minus",
      devCo: "x",
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
          「設計も分かるデザイナー」だから、
          <br className="md:hidden" />
          できること
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] mb-10 md:mb-12 text-sm md:text-base">
          既存システムを壊さずにUIだけを刷新できる。
        </p>

        {/* 3-Column Strengths */}
        <FadeIn>
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
        </FadeIn>

        {/* Comparison Matrix */}
        <FadeIn>
          <div className="bg-white rounded-xl p-5 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-xl font-bold text-[#333] text-center mb-6">
              一般的なデザイン会社・開発会社との違い
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 md:px-4 text-[#555] font-medium" />
                    <th className="py-3 px-2 md:px-4 text-[#888] font-medium text-center">
                      一般的な
                      <br />
                      デザイン会社
                    </th>
                    <th className="py-3 px-2 md:px-4 text-[#888] font-medium text-center">
                      一般的な
                      <br />
                      開発会社
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
                        <ComparisonIcon type={row.designCo} />
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        <ComparisonIcon type={row.devCo} />
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
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// Section 4: Case Study + Profile + CTA2
// ============================================================

function CaseStudySection() {
  const careerSteps = [
    "物流系テック企業にてフルスタックエンジニアとして開発を経験",
    "大手IT企業にてプロダクトマネージャーとして複数の事業開発に従事",
    "ITコンサルタントとして大手印刷企業の地方自治体向け電子通貨開発プロジェクトに参画",
    "2024年に株式会社miitasoを創業。エンジニアリングとデザインの両方を理解する「実装型UIデザイナー」として、既存システムのUI/UX改善に特化",
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          実績
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10 md:mb-12" />

        {/* Case Studies Carousel */}
        <FadeIn>
          <CaseCarousel />
        </FadeIn>

        {/* Profile */}
        <FadeIn>
          <div className="bg-[#F5F7FA] rounded-xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-[#333] text-center mb-6">
              代表プロフィール
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* TODO: replace with actual photo */}
              <div className="w-32 h-40 bg-white rounded-xl flex items-center justify-center text-[#aaa] text-xs flex-shrink-0 border border-gray-200">
                写真
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-[#1A3C6E] text-lg">
                    津端 晃作
                    <span className="text-sm font-normal text-[#888] ml-2">
                      つばた こうさく
                    </span>
                  </h4>
                  <p className="text-sm text-[#555] font-medium">
                    株式会社miitaso 代表
                  </p>
                </div>
                <p className="text-sm font-medium text-[#333]">
                  エンジニアリングとデザインの両方を理解する「実装型UIデザイナー」
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
                    "React",
                    "Next.js",
                    "Flutter",
                    "Firebase",
                    "Figma",
                    "Storybook",
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
        </FadeIn>

        {/* CTA 2 */}
        <div className="text-center mt-10">
          <CTAButton microcopy="※ 30秒で予約完了・診断を受けても契約の義務はありません" />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 5: Service Flow
// ============================================================

function ServiceFlowSection() {
  const steps = [
    {
      icon: <FileSearch className="w-6 h-6 text-white" />,
      title: "無料UI診断（30分）",
      desc: "現在のシステムのUI課題をヒアリングし、改善ポイントを整理します",
    },
    {
      icon: <Palette className="w-6 h-6 text-white" />,
      title: "改善提案（1〜2週間）",
      desc: "UI改善の方針・デザイン案・概算見積もりをご提案します",
    },
    {
      icon: <MonitorSmartphone className="w-6 h-6 text-white" />,
      title: "UI/UXデザイン（1〜2ヶ月）",
      desc: "Figmaで画面設計・UIデザインを作成。随時フィードバックを反映",
    },
    {
      icon: <Code2 className="w-6 h-6 text-white" />,
      title: "フロントエンド実装支援（1〜3ヶ月）",
      desc: "React/Next.js等でフロントエンドを実装。既存の開発会社と連携して統合",
    },
  ]

  const notes = [
    "所要時間：30分（延長なし、時間厳守）",
    "実施方法：Zoom（オンライン）",
    "費用：完全無料",
    "診断内容：対象システムの画面を共有いただき、UI/UXの課題を専門家の視点で整理",
    "成果物：診断後に「UI改善ポイントシート」（1枚）をメールでお送りします",
    "診断を受けたからといって契約の義務は一切ありません",
  ]

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          サービスの流れ
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          ご依頼からUI刷新完了までの全体像
        </p>

        {/* 4-Step Flow */}
        <FadeIn>
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 mb-12">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 h-full">
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
        </FadeIn>

        {/* Free UI Review Details */}
        <FadeIn>
          <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-[#1A3C6E] mb-4">
              無料UI診断について
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
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// Section 6: Pricing + CTA3
// ============================================================

function PricingSection() {
  const plans = [
    {
      scale: "小規模",
      screens: "画面数 5〜10画面",
      price: "80〜150万円",
      desc: "管理画面の一部刷新、特定機能のUI改善など",
    },
    {
      scale: "中規模",
      screens: "画面数 10〜30画面",
      price: "150〜300万円",
      desc: "システム全体のUI刷新、デザインシステム構築を含む",
      featured: true,
    },
    {
      scale: "大規模",
      screens: "画面数 30画面以上",
      price: "300万円〜",
      desc: "複数サービスの統一デザイン、段階的なリニューアルなど",
    },
  ]

  const includes = [
    "UI/UXデザイン（Figma納品）",
    "デザインシステム / コンポーネントライブラリの設計",
    "フロントエンド実装（React / Next.js等）",
    "既存開発チームとの技術連携・コードレビュー",
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          料金目安
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          プロジェクトの規模に応じた目安です
        </p>

        {/* Pricing Cards */}
        <FadeIn>
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
                    最も多いご依頼
                  </p>
                )}
                <h3 className="font-bold text-lg text-[#1A3C6E] mb-1">
                  {plan.scale}
                </h3>
                <p className="text-xs text-[#888] mb-4">{plan.screens}</p>
                <p className="text-2xl md:text-3xl font-bold text-[#1A3C6E] mb-4">
                  {plan.price}
                </p>
                <p className="text-sm text-[#555] leading-relaxed">
                  {plan.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* What's Included */}
        <FadeIn>
          <div className="bg-[#F5F7FA] rounded-xl p-6 md:p-8 mb-6">
            <h3 className="text-base md:text-lg font-bold text-[#333] mb-4">
              料金に含まれるもの
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
        </FadeIn>

        {/* Supplementary Notes */}
        <div className="space-y-2 text-sm text-[#888] mb-8">
          <p>
            ※ 正確な費用は無料UI診断後に個別にお見積もりいたします
          </p>
          <p>
            ※ 月額保守プラン（継続的なUI改善）：月額10〜30万円
          </p>
          <p>※ 支払い条件：着手金50% + 納品時50%（標準）</p>
        </div>

        {/* CTA 3 */}
        <div className="text-center">
          <CTAButton microcopy="※ まずは無料診断で概算をお伝えします" />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Section 8: Final CTA
// ============================================================

function FinalCTASection() {
  return (
    <section className="bg-gradient-to-br from-[#1A3C6E] to-[#2E75B6] text-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          まずは30分、UIの課題を
          <br className="md:hidden" />
          整理しませんか？
        </h2>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8">
          システムのUI改善について、一人で悩む必要はありません。
          <br className="hidden md:block" />
          エンジニア出身のUIデザイナーが、あなたのシステムに合わせた改善ポイントを30分で整理します。
        </p>
        <div className="space-y-4">
          <CTAButton microcopy="※ 30秒で予約完了・診断を受けても契約の義務はありません" dark />
          <div>
            <CTAButton
              variant="sub"
              label="まずはサービス資料をダウンロードする"
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
// Section 9: Footer
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
export default function UIUXLP() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <CaseStudySection />
      <ServiceFlowSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <LPFooter />
      <StickyMobileCTA />
    </div>
  )
}
