import {
  AlertTriangle,
  BarChart3,
  Code2,
  Users,
  CheckCircle2,
  X,
  Circle,
} from "lucide-react"
import { CTAButton } from "./_components/cta-button"
import { FAQSection } from "./_components/faq-section"
import { StickyMobileCTA } from "./_components/sticky-mobile-cta"
import { AnimatedCounter } from "./_components/counter"
import { FadeIn } from "./_components/fade-in"

// ============================================================
// Section Components (Server Components)
// ============================================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A3C6E] via-[#1E4F8A] to-[#2E75B6] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-300 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 py-14 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-[1.75rem] leading-[1.35] md:text-4xl font-bold md:leading-tight">
              「新規事業、どこに相談すればいいか分からない」
              <br />
              <span className="text-orange-300">
                そんな経営者のための
                <br className="md:hidden" />
                30分無料相談
              </span>
            </h1>
            <p className="text-[0.95rem] md:text-lg text-blue-100 leading-relaxed">
              戦略立案からMVP開発まで一気通貫で支援。
              <br className="hidden md:block" />
              160社超の実績を持つ専門家が、あなたの課題を30分で整理します。
            </p>
            <div className="pt-2 space-y-3">
              <CTAButton microcopy="※ 30秒で予約完了・営業は一切しません" />
              <div className="text-center md:text-left">
                <CTAButton
                  variant="sub"
                  label="まずはLINEで情報を受け取る"
                />
                <p className="text-xs text-blue-200/70 mt-1">
                  ※ まだ相談する段階でない方はこちら
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            {/* TODO: replace with actual photo */}
            <div className="w-56 h-72 md:w-80 md:h-[400px] bg-white/10 rounded-2xl flex items-center justify-center text-blue-200 text-sm border border-white/20 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-white/20" />
                <p className="text-xs md:text-sm">写真がここに入ります</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemsSection() {
  const problems = [
    "新規事業のアイデアはあるが、どう進めればいいか分からない",
    "開発会社に相談したが、戦略面のアドバイスがなく不安",
    "コンサルに相談したが、実装フェーズで結局別の会社に頼む必要がある",
    "社内にIT人材がおらず、何を作るべきか判断できない",
    "予算が限られており、最小限の投資で事業の可能性を検証したい",
    "過去に開発で失敗したことがあり、次こそは正しい進め方をしたい",
  ]

  return (
    <section className="bg-white py-12 md:py-18">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          こんなお悩みはありませんか？
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10" />
        <FadeIn>
          <div className="space-y-3 md:space-y-4">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#FFF8F5] border border-orange-100 rounded-lg p-4 md:p-5"
              >
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-[#333] text-sm md:text-base leading-relaxed">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function SolutionSection() {
  const strengths = [
    {
      icon: <BarChart3 className="w-10 h-10 text-[#2E75B6]" />,
      title: "戦略立案",
      desc: "新規事業の目的設計・市場調査・ビジネスモデル構築を支援",
    },
    {
      icon: <Code2 className="w-10 h-10 text-[#2E75B6]" />,
      title: "MVP開発",
      desc: "最小限の投資で仮説を検証できるプロダクトを自社開発",
    },
    {
      icon: <Users className="w-10 h-10 text-[#2E75B6]" />,
      title: "伴走支援",
      desc: "6ヶ月間、戦略の軌道修正からピボットまで継続的にサポート",
    },
  ]

  const comparison = [
    {
      feature: "戦略立案・市場調査",
      consultant: true,
      devCompany: false,
      miitaso: true,
    },
    {
      feature: "プロダクト開発・実装",
      consultant: false,
      devCompany: true,
      miitaso: true,
    },
    {
      feature: "一気通貫のワンストップ対応",
      consultant: false,
      devCompany: false,
      miitaso: true,
    },
    {
      feature: "ピボット・軌道修正の伴走",
      consultant: false,
      devCompany: false,
      miitaso: true,
    },
  ]

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          「戦略も語れて、自分で作れる」
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] mb-10 md:mb-12 text-sm md:text-base">
          コンサルタントにもエンジニアにもできない、ワンストップ支援。
        </p>
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
              他社との違い
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 md:px-4 text-[#555] font-medium" />
                    <th className="py-3 px-2 md:px-4 text-[#888] font-medium text-center">
                      一般的な
                      <br />
                      コンサル
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
                        {row.consultant ? (
                          <Circle className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        {row.devCompany ? (
                          <Circle className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center bg-[#F0F6FF]">
                        <CheckCircle2 className="w-5 h-5 text-[#2E75B6] mx-auto" />
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

function CredibilitySection() {
  const stats = [
    { number: "160", suffix: "社超", label: "支援企業数" },
    { number: "5", suffix: "年", label: "新規事業支援の経験年数" },
    { number: "50", suffix: "件超", label: "MVP開発の累計件数" },
    {
      number: "3000",
      suffix: "万円",
      label: "創業半年で自社売上突破",
    },
  ]

  const testimonials = [
    {
      role: "代表取締役 A様",
      before:
        "新規事業をやりたいと思いつつも、どこに相談すればいいのか分からず半年以上悩んでいました。",
      after:
        "津端さんに相談したところ、30分で課題が整理され、翌月にはMVPの開発がスタート。戦略と開発を一人で見てくれるので、コミュニケーションコストが圧倒的に低いです。",
    },
    {
      role: "個人事業主 K様（動画配信アプリ）",
      before:
        "他のシステム会社に相談したところ『それはうちでは難しい』と断られてしまい、半ば諦めていました。",
      after:
        "津端さんは様々な技術を組み合わせて、私がやりたかったことをそのまま形にしてくれました。『できない』ではなく『どうやったらできるか』を一緒に考えてくれる姿勢が本当にありがたかったです。",
    },
    {
      role: "スタートアップ・CEO C様",
      before: "限られた予算の中で、どの機能に投資すべきか判断がつかない状態でした。",
      after:
        "本当に必要な機能だけを見極めてMVPを作ってくれました。おかげで初期投資を抑えつつ、市場の反応を素早く検証できました。",
    },
  ]

  const careerSteps = [
    "物流系テック企業にてフルスタックエンジニアとして開発を経験",
    "大手IT企業にてプロダクトマネージャーとして複数の事業開発に従事",
    "ITコンサルタントとして大手印刷企業の地方自治体向け電子通貨開発プロジェクトに参画",
    "2024年にmiitaso Inc.を創業",
    "160社超の新規事業支援と50件超のMVP開発を実施",
    "創業半年で売上3,000万円を突破",
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          実績・信頼
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10 md:mb-12" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-14 md:mb-16">
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={i}
              target={stat.number}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-lg md:text-xl font-bold text-[#333] text-center mb-6">
          お客様の声
        </h3>
        <FadeIn>
          <div className="space-y-4 mb-16">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#F5F7FA] rounded-xl p-5 md:p-6 border-l-4 border-[#2E75B6] relative"
              >
                <div className="absolute -top-2 left-4 text-4xl text-[#2E75B6]/20 font-serif leading-none">
                  &ldquo;
                </div>
                <div className="space-y-2 mb-3">
                  <p className="text-sm md:text-base text-[#888] leading-relaxed">
                    <span className="font-medium text-[#999]">相談前：</span>
                    {t.before}
                  </p>
                  <p className="text-sm md:text-base text-[#333] leading-relaxed">
                    <span className="font-medium text-[#2E75B6]">相談後：</span>
                    {t.after}
                  </p>
                </div>
                <p className="text-xs md:text-sm text-[#888] font-bold">
                  ── {t.role}
                </p>
              </div>
            ))}
          </div>
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
                    miitaso Inc. 代表
                  </p>
                </div>
                <p className="text-sm font-medium text-[#333]">
                  ソフトウェア開発と新規事業コンサルティングを一人で完結できる「実装型コンサルタント」
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
                    "Flutter",
                    "Firebase",
                    "Next.js",
                    "Laravel",
                    "AI連携",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-white text-[#2E75B6] px-3 py-1 rounded-full border border-[#2E75B6]/20"
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
          <CTAButton microcopy="※ 30秒で予約完了・営業は一切しません" />
        </div>
      </div>
    </section>
  )
}

function ConsultationFlowSection() {
  const steps = [
    {
      title: "ヒアリング（10分）",
      desc: "現在の状況・課題・やりたいことをお聞きします",
    },
    {
      title: "課題整理（15分）",
      desc: "お話を踏まえて、優先すべきポイントと進め方を整理します",
    },
    {
      title: "ご提案（5分）",
      desc: "最適な次のアクションをご提案します（押し売りは一切しません）",
    },
  ]

  const notes = [
    "所要時間：30分（延長なし、時間厳守）",
    "実施方法：Zoom（オンライン）",
    "費用：完全無料",
    "相談したからといって契約の義務は一切ありません",
  ]

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          無料相談の流れ
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm md:text-base mb-10">
          「無料相談って何をするの？」という不安を解消します
        </p>

        <FadeIn>
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-10">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="w-10 h-10 mx-auto mb-3 bg-[#1A3C6E] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-[#1A3C6E] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <>
                    <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#2E75B6] z-10">
                      <svg
                        className="w-6 h-6"
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

        <div className="bg-white rounded-xl p-5 md:p-6 space-y-3 border border-gray-100">
          {notes.map((note, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#555]">
              <span className="w-1.5 h-1.5 bg-[#2E75B6] rounded-full flex-shrink-0" />
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BonusSection() {
  const bonuses = [
    {
      title: "年商3,600万円の全ステップ",
      desc: "創業から売上達成までのロードマップを完全公開",
      color: "from-[#1A3C6E] to-[#2E75B6]",
    },
    {
      title: "新規事業・目的設定ワークシート",
      desc: "事業の方向性を明確にするための実践ワークシート",
      color: "from-[#2E75B6] to-[#4A90D9]",
    },
    {
      title: "新規事業の失敗事例集",
      desc: "実際の失敗から学ぶ、避けるべき落とし穴まとめ",
      color: "from-[#D97706] to-[#F59E0B]",
    },
    {
      title: "MVP開発チェックリスト",
      desc: "最小限の機能で最大の検証効果を得るためのリスト",
      color: "from-[#1A3C6E] to-[#2E75B6]",
    },
    {
      title: "市場調査テンプレート",
      desc: "ターゲット市場を効率的に分析するためのフレームワーク",
      color: "from-[#2E75B6] to-[#4A90D9]",
    },
    {
      title: "ビジネスモデル設計シート",
      desc: "収益構造を整理し、持続可能なモデルを構築する",
      color: "from-[#1A3C6E] to-[#2E75B6]",
    },
    {
      title: "競合分析フレームワーク",
      desc: "競合の強み・弱みを体系的に把握するツール",
      color: "from-[#2E75B6] to-[#4A90D9]",
    },
    {
      title: "プロダクト要件定義テンプレート",
      desc: "開発前に必要な要件を漏れなく整理する",
      color: "from-[#1A3C6E] to-[#2E75B6]",
    },
    {
      title: "資金調達ピッチ資料テンプレート",
      desc: "投資家・銀行向けの説得力あるプレゼン資料の雛形",
      color: "from-[#D97706] to-[#F59E0B]",
    },
    {
      title: "KPI設計ガイド",
      desc: "事業フェーズ別の重要指標の設定方法",
      color: "from-[#2E75B6] to-[#4A90D9]",
    },
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3 leading-tight">
          無料相談にお申し込みの方に
          <br />
          <span className="text-[#1A3C6E]">
            新規事業の立ち上げに役立つ
            <span className="text-3xl md:text-4xl text-orange-600 mx-1">
              10
            </span>
            大特典を無料プレゼント
          </span>
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-4" />
        <p className="text-center text-[#555] text-sm mb-10">
          すべてオリジナルコンテンツ。実践で使えるテンプレート・ガイドをお届けします。
        </p>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                className="flex gap-4 bg-[#F5F7FA] rounded-xl p-4 items-center"
              >
                {/* TODO: replace with actual cover images */}
                <div
                  className={`w-16 h-20 bg-gradient-to-b ${bonus.color} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  #{String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#333]">
                    {bonus.title}
                  </h4>
                  <p className="text-xs text-[#777] mt-1">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Exclusive bonus */}
        <div className="bg-gradient-to-r from-[#1A3C6E] to-[#2E75B6] rounded-xl p-6 text-white text-center mb-10">
          <div className="text-xs font-bold text-orange-300 mb-2">
            無料相談限定の追加特典
          </div>
          <h3 className="font-bold text-lg mb-2">
            あなたの事業に合わせた個別フィードバックシート
          </h3>
          <p className="text-sm text-blue-100">
            無料相談の中で課題を整理し、次のアクションをまとめた1枚のシートをお渡しします。
          </p>
        </div>

        {/* CTA 3 */}
        <div className="text-center">
          <CTAButton
            label="30分無料相談を予約する（無料・10大特典つき）"
            microcopy="※ 30秒で予約完了・営業は一切しません"
          />
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="bg-gradient-to-br from-[#1A3C6E] to-[#2E75B6] text-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          まずは30分、お話しませんか？
        </h2>
        <p className="text-xs md:text-sm text-orange-300 font-bold mb-6">
          毎月の相談枠には限りがあります
        </p>
        <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8">
          新規事業の進め方について、一人で悩む必要はありません。
          <br className="hidden md:block" />
          160社超の支援実績を持つ専門家が、あなたの状況に合わせて最適な一歩を一緒に考えます。
        </p>
        <div className="space-y-4">
          <CTAButton
            label="30分無料相談を予約する（無料・10大特典つき）"
            microcopy="※ 30秒で予約完了・営業は一切しません"
          />
          <div>
            <CTAButton
              variant="sub"
              label="まずはLINEで情報を受け取る"
            />
          </div>
          <p className="text-xs text-blue-200 mt-2">
            ※ すぐに相談する段階でない方はLINEで情報収集からどうぞ
          </p>
        </div>
      </div>
    </section>
  )
}

function LPFooter() {
  return (
    <footer className="bg-[#0F2847] text-white py-10">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <p className="font-bold text-lg">miitaso Inc.</p>
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
          &copy; 2026 miitaso Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ============================================================
// Main Page (Server Component)
// ============================================================
export default function ConsultationLP() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <CredibilitySection />
      <ConsultationFlowSection />
      <BonusSection />
      <FAQSection />
      <FinalCTASection />
      <LPFooter />
      <StickyMobileCTA />
    </div>
  )
}
