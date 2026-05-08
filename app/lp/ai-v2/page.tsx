import Image from "next/image"
import { CTAButton } from "./_components/cta-button"
import { FAQSection } from "./_components/faq-section"
import { StickyMobileCTA } from "./_components/sticky-mobile-cta"
import { FadeIn } from "./_components/fade-in"

// ============================================================
// Editorial AI内製化伴走 LP
// Aesthetic: Editorial Japanese Business — bone + ink + persimmon
// ============================================================

function Hairline({ inverted = false, width = "w-12" }: { inverted?: boolean; width?: string }) {
  return (
    <div
      className={`h-px ${width} ${
        inverted ? "bg-[#F5F1E8]/40" : "bg-[#0E1B2C]/30"
      }`}
    />
  )
}

function SectionLabel({
  number,
  label,
  inverted = false,
}: {
  number: string
  label: string
  inverted?: boolean
}) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span
        className={`font-[var(--font-display)] italic tabular-nums text-[28px] md:text-[34px] leading-none ${
          inverted ? "text-[#F5F1E8]" : "text-[#B8392E]"
        }`}
      >
        {number}
      </span>
      <span
        className={`font-[var(--font-display)] italic text-[13px] md:text-[14px] tracking-[0.22em] ${
          inverted ? "text-[#F5F1E8]/80" : "text-[#0E1B2C]/65"
        }`}
      >
        / {label}
      </span>
    </div>
  )
}

// ============================================================
// 1. HERO
// ============================================================
function HeroSection() {
  return (
    <section className="relative bg-[#0E1B2C] text-[#F5F1E8] overflow-hidden">
      {/* decorative hairlines and number watermark */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 right-0 top-[15%] h-px bg-[#F5F1E8]/8" />
        <div className="absolute left-0 right-0 bottom-[18%] h-px bg-[#F5F1E8]/8" />
        <div className="hidden md:block absolute right-[6%] top-[10%] font-[var(--font-display)] italic text-[#B8392E]/12 text-[280px] leading-none select-none">
          06
        </div>
        <Image
          src="/lp/ai-v2/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.18] mix-blend-screen"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-14 pb-20 md:pb-28">
        {/* Top bar: brand + meta */}
        <div className="flex items-center justify-between mb-20 md:mb-28">
          <div className="flex items-center gap-3">
            <span className="font-[var(--font-mincho)] text-[18px] tracking-[0.04em]">
              miitaso
            </span>
            <span className="font-[var(--font-display)] italic text-[12px] tracking-[0.2em] text-[#F5F1E8]/55">
              / AI Internalization Program
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px] tracking-[0.18em] text-[#F5F1E8]/55 font-[var(--font-sans-jp)]">
            <span>EST. 2024</span>
            <span className="text-[#F5F1E8]/30">·</span>
            <span>東京・銀座</span>
          </div>
        </div>

        {/* Main hero typography */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="md:col-span-8 min-w-0">
            <p className="font-[var(--font-display)] italic text-[#B8392E] text-[12px] md:text-[15px] tracking-[0.18em] md:tracking-[0.22em] leading-[1.8] max-w-[20rem] md:max-w-none mb-7">
              FOR THE PRESIDENT WHOSE DX NEVER REACHED THE FLOOR.
            </p>
            <h1 className="font-[var(--font-mincho)] font-medium text-[34px] sm:text-[44px] md:text-[60px] lg:text-[68px] leading-[1.3] tracking-[-0.005em]">
              DXに数千万を投じても、
              <br />
              <span className="text-[#F5F1E8]/85">現場が使わなかった</span>
              <br />
              <span className="relative inline-block">
                会社の経営者へ
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B8392E]/70" />
                <span className="absolute -right-3 top-2 text-[18px] md:text-[24px] text-[#B8392E]">
                  。
                </span>
              </span>
            </h1>
          </div>

          <div className="md:col-span-4 min-w-0">
            <Hairline inverted />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#F5F1E8]/75 mt-7 mb-10 break-words">
              年商10〜30億・専任情シス不在の中堅企業に特化した、
              <br />
              6ヶ月のAI内製化伴走プログラム。
              <br />
              業務設計・ワークフロー・運用マニュアル・
              <br />
              社内引継ぎセッションを、
              <span className="text-[#F5F1E8]">
                納品物とプロセスとして提供します。
              </span>
            </p>
          </div>
        </div>

        {/* CTA row */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mt-16 md:mt-24 items-center">
          <div className="md:col-span-7">
            <CTAButton
              inverted
              microcopy="※ 30秒で予約完了 / 条件未達なら本提案に進みません"
            />
          </div>
          <div className="md:col-span-5 md:border-l md:border-[#F5F1E8]/15 md:pl-8">
            <CTAButton variant="sub" inverted />
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#F5F1E8]/10 border-t border-b border-[#F5F1E8]/10">
          {[
            { num: "6", suffix: "ヶ月", label: "標準伴走期間" },
            { num: "350", suffix: "万円〜", label: "6ヶ月パッケージ" },
            { num: "1人", suffix: "", label: "代表が直接担当" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#0E1B2C] py-7 md:py-9 px-4 md:px-7 flex flex-col"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-[var(--font-display)] italic text-[40px] md:text-[58px] leading-none text-[#F5F1E8] tabular-nums">
                  {s.num}
                </span>
                <span className="font-[var(--font-mincho)] text-[14px] md:text-[16px] text-[#F5F1E8]/65">
                  {s.suffix}
                </span>
              </div>
              <span className="font-[var(--font-sans-jp)] text-[11px] md:text-[12px] tracking-[0.12em] text-[#F5F1E8]/55 mt-3">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 2. FAILURE PATTERNS — 5 patterns
// ============================================================
function PatternsSection() {
  const patterns = [
    {
      title: "提案書が紙のまま終わった",
      body: "コンサルから受け取った分厚い提案書。経営会議で配られ、決裁印を押し、それきり棚に戻った。実装の入口が、誰の役割でもなかった。",
    },
    {
      title: "PoCで止まり、次の予算が出なかった",
      body: "「効果が出るかは検証してみないと分かりません」という説明で500万円。動くデモは出来上がったが、本格運用へ進む稟議で消えた。次年度の予算には載らなかった。",
    },
    {
      title: "導入したが、現場が触らない",
      body: "ツールは導入された。マニュアルもある。しかし現場は今までのExcelに戻った。誰も「使え」と言えず、誰も改善できない。担当者も2年で異動した。",
    },
    {
      title: "ベンダーに依存し、改修が止まった",
      body: "些細な仕様変更も「お見積もりします」。月額が膨らむ。社内で判断できる人がいないため、止めるという選択肢も取れない。沈黙のまま運用が続いている。",
    },
    {
      title: "そして、誰も振り返らない",
      body: "数字が出ない。出ないことが共有されない。次のDXは、別部署で別ベンダーで、また同じパターンで始まる。",
    },
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-24">
          <div className="md:col-span-5">
            <SectionLabel number="01" label="WHAT WENT WRONG" />
            <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] text-[#0E1B2C] tracking-[-0.005em]">
              「DX投資が、
              <br />
              現場に届かない」
              <br />
              <span className="text-[#0E1B2C]/55">5つのパターン。</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-20">
            <Hairline />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#2A3140]/80 mt-6">
              以下のどれかひとつでも当てはまる経営者の方には、
              本プログラムを読み進めていただく価値があります。
              <br />
              逆に、いずれにも当てはまらない場合、おそらく弊社のサービスは合いません。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="border-t border-[#0E1B2C]/15">
            {patterns.map((p, i) => (
              <article
                key={i}
                className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-[#0E1B2C]/15 group"
              >
                <div className="md:col-span-2 flex md:block items-center gap-4">
                  <span className="font-[var(--font-display)] italic text-[44px] md:text-[68px] leading-none text-[#B8392E] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="md:hidden font-[var(--font-display)] italic text-[11px] tracking-[0.2em] text-[#0E1B2C]/55">
                    PATTERN
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-[var(--font-mincho)] font-medium text-[20px] md:text-[24px] leading-[1.5] text-[#0E1B2C]">
                    {p.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#2A3140]/85">
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 3. SOLUTION — 6ヶ月内製化伴走
// ============================================================
function SolutionSection() {
  const principles = [
    {
      label: "提案書ではなく、運用で残す",
      body: "提案書は最小限。代わりに、業務フロー図・プロンプト運用ハンドブック・操作マニュアル・効果測定レポートテンプレートなど、貴社が単独で運用するための実物を納品します。",
    },
    {
      label: "代表エンジニアが、要件定義から引継ぎまで",
      body: "営業・コンサル・実装エンジニアが分かれません。一人が一気通貫で6ヶ月伴走します。意思決定の速度と、業務理解の深さの両方を確保するための設計です。",
    },
    {
      label: "6ヶ月で「外す」ことを前提に設計する",
      body: "社内推進担当への引継ぎセッションを6ヶ月時点で最低3回実施。長期的な外部依存を作らず、社員だけで運用を回せる移管完了を一つの区切りとします。",
    },
  ]

  return (
    <section className="bg-[#0E1B2C] text-[#F5F1E8] py-24 md:py-36 relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <div className="absolute right-0 top-0 font-[var(--font-display)] italic text-[#F5F1E8] text-[260px] md:text-[480px] leading-[0.8] select-none">
          仕事
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-24">
          <div className="md:col-span-5">
            <SectionLabel number="02" label="OUR APPROACH" inverted />
            <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] tracking-[-0.005em]">
              社員だけで回せる
              <br />
              ところまで、
              <br />
              <span className="text-[#F5F1E8]/70">6ヶ月で残します。</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-16">
            <Hairline inverted />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#F5F1E8]/80 mt-6">
              AI導入の難しさは、技術ではなく「現場で誰が、どう使い続けるか」にあります。
              本プログラムは、提案書納品ではなく
              <span className="text-[#F5F1E8]">業務オペレーションの内製化</span>
              を6ヶ月で達成することを設計の中心に置きました。
              「効果が出ました」で終わらせず、貴社の社員が単独で運用・改善を続けられる状態への移管を伴走します。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="grid md:grid-cols-3 gap-px bg-[#F5F1E8]/10">
            {principles.map((p, i) => (
              <div
                key={i}
                className="bg-[#0E1B2C] p-8 md:p-10 flex flex-col gap-6 min-h-[280px]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-[var(--font-display)] italic text-[#B8392E] text-[20px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[var(--font-display)] italic text-[11px] tracking-[0.2em] text-[#F5F1E8]/55">
                    PRINCIPLE
                  </span>
                </div>
                <h3 className="font-[var(--font-mincho)] font-medium text-[19px] md:text-[21px] leading-[1.55] text-[#F5F1E8]">
                  {p.label}
                </h3>
                <Hairline inverted width="w-8" />
                <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[2] text-[#F5F1E8]/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 4. TARGET BUSINESS — 業務横断
// ============================================================
function TargetBusinessSection() {
  const areas = [
    {
      kanji: "見積・受発注",
      en: "Quotation & Order",
      body: "見積書ドラフト生成／類似案件の自動引用／受発注メールの分類と返信文作成。",
    },
    {
      kanji: "問い合わせ対応",
      en: "Inquiry Handling",
      body: "メール・電話・チャット問い合わせの一次回答案生成／FAQの社内ナレッジ統合。",
    },
    {
      kanji: "社内ナレッジ検索",
      en: "Knowledge Retrieval",
      body: "議事録／規程／過去案件／製品仕様などの横断検索と要約。",
    },
    {
      kanji: "報告書・日報・週報",
      en: "Operational Reports",
      body: "日報の要約／週次・月次レポートのドラフト生成／指標と所感の自動整理。",
    },
    {
      kanji: "帳票・書類のドラフト",
      en: "Document Drafting",
      body: "提案書・見積書・契約書ドラフト／社外送付メール／社内回付資料。",
    },
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-5">
            <SectionLabel number="03" label="WHERE AI WORKS" />
            <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] text-[#0E1B2C]">
              業種ではなく、
              <br />
              業務で考える。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-16">
            <Hairline />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#2A3140]/85 mt-6">
              中堅企業のホワイトカラー業務には、業種を問わず効果が出やすい
              <span className="text-[#0E1B2C]"> 5つの共通領域</span>
              があります。
              第1フェーズでは、これらの業務横断テーマに集中することで、貴社の業種特有の事情を抱えたまま導入を進められる設計にしました。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16">
            {areas.map((a, i) => (
              <article
                key={i}
                className="border-t border-[#0E1B2C]/20 py-8 md:py-10 grid grid-cols-12 gap-4"
              >
                <div className="col-span-2 md:col-span-2">
                  <span className="font-[var(--font-display)] italic text-[#B8392E] text-[26px] md:text-[32px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-10 space-y-3">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <h3 className="font-[var(--font-mincho)] font-medium text-[19px] md:text-[22px] text-[#0E1B2C]">
                      {a.kanji}
                    </h3>
                    <span className="font-[var(--font-display)] italic text-[12px] tracking-[0.2em] text-[#0E1B2C]/55">
                      {a.en}
                    </span>
                  </div>
                  <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[1.95] text-[#2A3140]/80">
                    {a.body}
                  </p>
                </div>
              </article>
            ))}
            {/* fill last slot for visual balance */}
            <div className="hidden md:block" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 5. ROADMAP — Phase 0–4
// ============================================================
function RoadmapSection() {
  const phases = [
    {
      phase: "PHASE 0",
      duration: "0.5ヶ月",
      title: "現状診断",
      body: "業務フローの可視化、AI活用余地の優先度マトリクス作成、PoC候補3件の選定根拠書。",
    },
    {
      phase: "PHASE 1",
      duration: "1.5ヶ月",
      title: "PoC実装",
      body: "選定業務に対するワークフロー設計・実装・テスト。プロンプト運用ハンドブック初版。",
    },
    {
      phase: "PHASE 2",
      duration: "1ヶ月",
      title: "運用立ち上げ",
      body: "社員研修、操作マニュアル、月次効果測定レポートのテンプレート整備。",
    },
    {
      phase: "PHASE 3",
      duration: "2ヶ月",
      title: "横展開",
      body: "2業務目への展開、改善ループの確立、社内推進担当のオンボーディング開始。",
    },
    {
      phase: "PHASE 4",
      duration: "1ヶ月",
      title: "移管完了",
      body: "引継ぎセッション最低3回。引継ぎ書・運用ガイドの納品。12ヶ月目以降の自走計画書。",
    },
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-36 border-t border-[#0E1B2C]/15">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-16 md:mb-20">
          <SectionLabel number="04" label="6-MONTH ROADMAP" />
          <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] text-[#0E1B2C] max-w-3xl">
            初日から移管完了までの、
            <br />
            6ヶ月のロードマップ。
          </h2>
        </div>

        <FadeIn>
          <div className="relative">
            {/* horizontal timeline line (md+) */}
            <div className="hidden md:block absolute left-[8%] right-[6%] top-[120px] h-px bg-[#0E1B2C]/20" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 md:gap-x-4">
              {phases.map((p, i) => (
                <div key={i} className="relative md:px-2">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-[var(--font-display)] italic text-[12px] tracking-[0.18em] text-[#B8392E]">
                      {p.phase}
                    </span>
                    <span className="font-[var(--font-sans-jp)] text-[11px] text-[#0E1B2C]/55 tracking-[0.06em]">
                      {p.duration}
                    </span>
                  </div>
                  <div className="relative pt-7 pb-3 mb-3 border-t border-[#0E1B2C]/30">
                    <span className="hidden md:flex absolute left-0 -top-[7px] w-3 h-3 rounded-full bg-[#B8392E] items-center justify-center">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#F5F1E8]" />
                    </span>
                  </div>
                  <h3 className="font-[var(--font-mincho)] font-medium text-[20px] md:text-[22px] text-[#0E1B2C] mb-3">
                    {p.title}
                  </h3>
                  <p className="font-[var(--font-sans-jp)] text-[13px] leading-[1.95] text-[#2A3140]/80">
                    {p.body}
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
// 6. ROI ELIGIBILITY — calculation example
// ============================================================
function ROISection() {
  return (
    <section className="bg-[#F5F1E8] py-24 md:py-36 border-t border-[#0E1B2C]/15">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="md:col-span-5">
            <SectionLabel number="05" label="ELIGIBILITY" />
            <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[42px] leading-[1.35] text-[#0E1B2C]">
              「会社規模」ではなく、
              <br />
              「対象業務の非効率額」で
              <br />
              判断します。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-12">
            <Hairline />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#2A3140]/85 mt-6">
              350万円以上の投資を正当化するには、対象業務に
              <span className="text-[#0E1B2C]">明確な非効率額</span>が必要です。
              30分相談の中で、貴社の対象業務について以下を一緒に概算します。
              数字が見えない、または条件を満たさない場合、無理にお勧めしません。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="bg-white border border-[#0E1B2C]/15 p-7 md:p-12">
            {/* Worked example */}
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-[var(--font-display)] italic text-[#B8392E] text-[14px] tracking-[0.2em]">
                WORKED EXAMPLE
              </span>
              <span className="font-[var(--font-sans-jp)] text-[12px] text-[#0E1B2C]/55">
                年間非効率額の試算（例示）
              </span>
            </div>

            <h3 className="font-[var(--font-mincho)] text-[18px] md:text-[20px] leading-[1.7] text-[#0E1B2C] mb-8 max-w-3xl">
              経理担当2名で月60時間かかっている見積作成業務を、AIワークフローで月20時間に短縮できる場合
            </h3>

            <div className="grid md:grid-cols-3 gap-px bg-[#0E1B2C]/15 border border-[#0E1B2C]/15">
              {[
                {
                  k: "削減時間／年",
                  v: "480",
                  unit: "h",
                  detail: "(60 − 20) × 12ヶ月",
                },
                {
                  k: "総人件費時間単価",
                  v: "4,500",
                  unit: "円",
                  detail: "年収500万 × 1.3 ÷ 1,440h（例示）",
                },
                {
                  k: "年間非効率額",
                  v: "216",
                  unit: "万円",
                  detail: "480h × 4,500円 / 年",
                },
              ].map((cell, i) => (
                <div key={i} className="bg-white p-6 md:p-8">
                  <p className="font-[var(--font-display)] italic text-[11px] tracking-[0.18em] text-[#0E1B2C]/55 mb-3">
                    {cell.k}
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-[var(--font-display)] italic text-[#0E1B2C] text-[44px] md:text-[54px] leading-none tabular-nums">
                      {cell.v}
                    </span>
                    <span className="font-[var(--font-mincho)] text-[14px] md:text-[16px] text-[#0E1B2C]/65">
                      {cell.unit}
                    </span>
                  </div>
                  <p className="font-[var(--font-sans-jp)] text-[11px] text-[#2A3140]/65 leading-[1.75]">
                    {cell.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 pt-7 border-t border-[#0E1B2C]/10 grid md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[2] text-[#2A3140]/85">
                  <span className="text-[#B8392E] font-medium">ご注意</span>
                  ：時間単価4,500円は計算例です。実際は役職・給与水準・間接費・稼働時間をもとに個別算定します。
                  上記の単独業務では条件未達のため、他業務との合算で年間350万円以上、または2年累計700万円以上に届くかを30分相談で確認します。
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="bg-[#0E1B2C] text-[#F5F1E8] p-6 md:p-7">
                  <p className="font-[var(--font-display)] italic text-[11px] tracking-[0.2em] text-[#F5F1E8]/65 mb-3">
                    ELIGIBILITY THRESHOLD
                  </p>
                  <p className="font-[var(--font-mincho)] text-[16px] md:text-[18px] leading-[1.7]">
                    年間非効率額
                    <span className="text-[#B8392E]"> 350万円</span>以上、
                    <br />
                    または2年累計
                    <span className="text-[#B8392E]"> 700万円</span>以上。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 7. CATEGORY COMPARISON
// ============================================================
function ComparisonSection() {
  const rows = [
    {
      attr: "公開LPで目立つ訴求",
      a: "大規模導入事例・エンタープライズ支援",
      b: "生成AI活用ノウハウ・相談導線",
      c: "年商10〜30億の中堅特化",
    },
    {
      attr: "公開LP上の価格表示",
      a: "非公開",
      b: "非公開",
      c: "6ヶ月パッケージ 350万円〜（レンジ公開）",
    },
    {
      attr: "初回接点の標準形",
      a: "資料DL ／ 商談",
      b: "資料DL ／ 問合せ",
      c: "30分の経営者向けAI活用相談",
    },
    {
      attr: "初回接点で確認できる窓口",
      a: "問い合わせ・資料DL",
      b: "問い合わせ・資料DL",
      c: "代表（要件定義から実装・教育まで）",
    },
    {
      attr: "内製化セッションの提供",
      a: "—",
      b: "—",
      c: "6ヶ月時点で社内推進担当向け最低3回",
    },
  ]

  return (
    <section className="bg-[#0E1B2C] text-[#F5F1E8] py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-16 md:mb-20">
          <SectionLabel number="06" label="WHERE WE FIT" inverted />
          <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] tracking-[-0.005em] max-w-3xl">
            選択肢のカテゴリと、
            <br />
            <span className="text-[#F5F1E8]/65">miitasoの提供内容。</span>
          </h2>
        </div>

        <FadeIn>
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <div className="px-6 md:px-0 min-w-[760px]">
              <table className="w-full font-[var(--font-sans-jp)]">
                <thead>
                  <tr className="border-b border-[#F5F1E8]/30">
                    <th className="text-left py-5 pr-4 align-bottom">
                      <span className="font-[var(--font-display)] italic text-[11px] tracking-[0.2em] text-[#F5F1E8]/55">
                        ATTRIBUTE
                      </span>
                    </th>
                    <th className="text-left py-5 px-4 align-bottom">
                      <p className="font-[var(--font-display)] italic text-[11px] tracking-[0.18em] text-[#F5F1E8]/55 mb-2">
                        CATEGORY A
                      </p>
                      <p className="font-[var(--font-mincho)] text-[14px] md:text-[15px] leading-[1.5]">
                        大手ファーム
                        <br />
                        ／上場AI企業
                      </p>
                    </th>
                    <th className="text-left py-5 px-4 align-bottom">
                      <p className="font-[var(--font-display)] italic text-[11px] tracking-[0.18em] text-[#F5F1E8]/55 mb-2">
                        CATEGORY B
                      </p>
                      <p className="font-[var(--font-mincho)] text-[14px] md:text-[15px] leading-[1.5]">
                        中堅向け
                        <br />
                        コンテンツ系
                      </p>
                    </th>
                    <th className="text-left py-5 pl-4 pr-2 align-bottom bg-[#F5F1E8]/[0.04]">
                      <p className="font-[var(--font-display)] italic text-[11px] tracking-[0.18em] text-[#B8392E] mb-2">
                        miitaso
                      </p>
                      <p className="font-[var(--font-mincho)] text-[14px] md:text-[15px] leading-[1.5]">
                        AI内製化伴走
                        <br />
                        プログラム
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#F5F1E8]/15 align-top"
                    >
                      <td className="py-6 pr-4 font-[var(--font-mincho)] text-[14px] md:text-[15px] text-[#F5F1E8]/80">
                        {row.attr}
                      </td>
                      <td className="py-6 px-4 font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[1.85] text-[#F5F1E8]/65">
                        {row.a}
                      </td>
                      <td className="py-6 px-4 font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[1.85] text-[#F5F1E8]/65">
                        {row.b}
                      </td>
                      <td className="py-6 pl-4 pr-2 font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[1.85] text-[#F5F1E8] bg-[#F5F1E8]/[0.04]">
                        {row.c}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <p className="mt-8 font-[var(--font-sans-jp)] text-[11px] md:text-[12px] leading-[1.85] text-[#F5F1E8]/55 max-w-3xl">
          ※
          本表は2026年5月時点の各社公開LP上で確認できる情報と、miitasoの提供内容を整理したものであり、各社サービス全体を評価・比較するものではありません。
          各社の具体的なサービス内容・価格・対象規模は、それぞれ直接お問い合わせください。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 8. DELIVERABLES — 7 items
// ============================================================
function DeliverablesSection() {
  const items = [
    "業務フロー現状マップ",
    "AI活用優先度マトリクス",
    "プロンプト運用ハンドブック",
    "AIワークフロー設計書",
    "社員向け操作マニュアル（動画＋テキスト）",
    "月次効果測定レポートのテンプレート",
    "社内AI推進担当への引継ぎ書",
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-6">
            <SectionLabel number="07" label="DELIVERABLES" />
            <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] text-[#0E1B2C]">
              「提案書」ではなく、
              <br />
              <span className="text-[#0E1B2C]/55">運用に残る7つの成果物。</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-16">
            <Hairline />
            <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#2A3140]/85 mt-6">
              本プログラムでは、コンサルティング報告書ではなく、
              貴社が単独で運用と改善を続けるための実物を納品します。
              これらの納品物は、契約書上の保証対象として取り扱われます。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-6 py-6 border-t border-[#0E1B2C]/20"
              >
                <span className="font-[var(--font-display)] italic text-[#B8392E] text-[26px] md:text-[32px] tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[var(--font-mincho)] text-[16px] md:text-[18px] leading-[1.6] text-[#0E1B2C]">
                  {item}
                </span>
              </div>
            ))}
            <div className="md:col-start-1 md:col-span-2 mt-4 pt-6 border-t border-[#0E1B2C]/20">
              <p className="font-[var(--font-sans-jp)] text-[12px] md:text-[13px] leading-[1.95] text-[#2A3140]/65 max-w-2xl">
                ＋ 月1〜2回の定例ミーティング、営業日24時間以内の一次返答SLA、6ヶ月時点での社内推進担当向け引継ぎセッション最低3回。
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 9. PRICING
// ============================================================
function PricingSection() {
  return (
    <section className="bg-[#0E1B2C] text-[#F5F1E8] py-24 md:py-36 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-[0.05]" aria-hidden="true">
        <div className="absolute -left-8 top-12 font-[var(--font-display)] italic text-[#F5F1E8] text-[260px] md:text-[480px] leading-[0.8] select-none">
          内製
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <SectionLabel number="08" label="PROGRAM FEE" inverted />
          <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.35] max-w-3xl">
            6ヶ月パッケージ
            <br />
            <span className="font-[var(--font-display)] italic text-[#B8392E] text-[44px] md:text-[60px]">
              ¥3,500,000
            </span>
            <span className="text-[#F5F1E8]/65 text-[24px] md:text-[32px]"> から</span>
          </h2>
        </div>

        <FadeIn>
          <div className="grid md:grid-cols-12 gap-px bg-[#F5F1E8]/10 border border-[#F5F1E8]/15">
            <div className="md:col-span-7 bg-[#0E1B2C] p-8 md:p-12">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-[var(--font-display)] italic text-[11px] tracking-[0.22em] text-[#F5F1E8]/65">
                  STANDARD PACKAGE / 6 MONTHS
                </span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-baseline justify-between border-b border-[#F5F1E8]/10 pb-4">
                  <span className="font-[var(--font-mincho)] text-[14px] md:text-[15px] text-[#F5F1E8]/80">
                    初期費用（Phase 0–1）
                  </span>
                  <span className="font-[var(--font-display)] italic text-[24px] md:text-[28px] text-[#F5F1E8] tabular-nums">
                    ¥1,500,000
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#F5F1E8]/10 pb-4">
                  <span className="font-[var(--font-mincho)] text-[14px] md:text-[15px] text-[#F5F1E8]/80">
                    月額リテイナー（Phase 2–4）
                  </span>
                  <span className="font-[var(--font-display)] italic text-[20px] md:text-[24px] text-[#F5F1E8] tabular-nums">
                    ¥330,000<span className="text-[12px] text-[#F5F1E8]/55"> × 6ヶ月</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-3">
                  <span className="font-[var(--font-mincho)] text-[15px] text-[#F5F1E8]">
                    総額
                  </span>
                  <span className="font-[var(--font-display)] italic text-[#B8392E] text-[34px] md:text-[42px] tabular-nums">
                    ¥3,480,000
                  </span>
                </div>
              </div>
              <Hairline inverted />
              <ul className="mt-7 space-y-3 font-[var(--font-sans-jp)] text-[13px] md:text-[14px] text-[#F5F1E8]/75 leading-[1.95]">
                <li className="flex gap-3">
                  <span className="text-[#B8392E] font-[var(--font-display)] italic">＋</span>
                  Phase 0–4の全工程（業務分析・設計・実装・教育・引継ぎ）
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8392E] font-[var(--font-display)] italic">＋</span>
                  7成果物の納品（保証対象）
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8392E] font-[var(--font-display)] italic">＋</span>
                  月次定例（月1〜2回）／ 営業日24時間以内の一次返答SLA
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8392E] font-[var(--font-display)] italic">＋</span>
                  社内推進担当への引継ぎセッション 最低3回
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8392E] font-[var(--font-display)] italic">＋</span>
                  Claude / OpenAI 等のAPI料金は実費別途
                </li>
              </ul>
            </div>
            <div className="md:col-span-5 bg-[#0E1B2C] p-8 md:p-12 flex flex-col">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-[var(--font-display)] italic text-[11px] tracking-[0.22em] text-[#F5F1E8]/65">
                  TERMS
                </span>
              </div>
              <dl className="space-y-5 mb-auto">
                {[
                  ["契約期間", "6ヶ月（Phase 0–4）"],
                  ["更新", "終了後3ヶ月単位での継続契約可"],
                  ["支払条件", "着手時50%／納品時50%（または月次按分）"],
                  ["スコープ変更", "途中追加は別途見積もり"],
                  ["保証", "納品物・プロセス（KPI数値達成は努力目標）"],
                  ["除外", "顧客起因 ／ 第三者SaaS障害は保証義務外"],
                ].map(([k, v], i) => (
                  <div key={i}>
                    <dt className="font-[var(--font-display)] italic text-[10px] tracking-[0.2em] text-[#F5F1E8]/55 mb-1.5">
                      {k}
                    </dt>
                    <dd className="font-[var(--font-mincho)] text-[14px] text-[#F5F1E8]/85 leading-[1.7]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 pt-6 border-t border-[#F5F1E8]/15">
                <p className="font-[var(--font-sans-jp)] text-[11px] leading-[1.85] text-[#F5F1E8]/55">
                  ※ 対象業務の規模・複雑度により個別見積もりとなる場合があります。詳細は30分相談でご確認ください。
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 10. NOT FOR YOU
// ============================================================
function NotForSection() {
  const items = [
    {
      head: "年商3億円未満の事業規模",
      body: "小規模事業の効率化は、SaaSやテンプレート活用の方が費用対効果が良い場合が多いです。",
    },
    {
      head: "対象業務の年間非効率額が350万円未満",
      body: "コスト割れする可能性が高いため、無理に契約せず、業務範囲を広げてから再度ご相談いただく形をお勧めします。",
    },
    {
      head: "「具体的な業務はないが、とりあえずAIを入れたい」段階",
      body: "本プログラムは「効果が出る業務に絞って実装する」設計のため、対象業務の特定が前提条件となります。",
    },
    {
      head: "DX推進担当が社内にゼロかつ経営者もコミットしない場合",
      body: "外部だけでは内製化は完成しません。社員側に最低限のリソース確保が見込めない場合は適合外です。",
    },
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="md:col-span-5">
            <SectionLabel number="09" label="NOT FOR YOU" />
            <h2 className="font-[var(--font-mincho)] font-medium text-[28px] md:text-[40px] leading-[1.4] text-[#0E1B2C]">
              以下の場合、
              <br />
              <span className="text-[#0E1B2C]/60">本プログラムは適合しません。</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-12">
            <Hairline />
            <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[2] text-[#2A3140]/80 mt-6">
              本プログラムは、契約後に「期待値とずれた」とお互いに感じる事態を避けたいと考えています。
              そのため、相談の段階で適合外と判断した場合は、無理にお勧めせず、他社サービスのご紹介や別アプローチの提案を行います。
            </p>
          </div>
        </div>

        <FadeIn>
          <div className="border-t border-[#0E1B2C]/20">
            {items.map((item, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-6 py-7 md:py-9 border-b border-[#0E1B2C]/20"
              >
                <div className="md:col-span-1 flex md:block items-center gap-3">
                  <span className="font-[var(--font-display)] italic text-[#B8392E]/60 text-[22px] md:text-[26px] tabular-nums leading-none">
                    ✕
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-[var(--font-mincho)] font-medium text-[17px] md:text-[19px] text-[#0E1B2C] leading-[1.6]">
                    {item.head}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[1.95] text-[#2A3140]/80">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 11. PROFILE
// ============================================================
function ProfileSection() {
  const career = [
    "物流系テック企業にてフルスタックエンジニアとして開発を経験",
    "大手IT企業にてプロダクトマネージャーとして複数の事業開発に従事",
    "ITコンサルタントとして大手印刷企業の地方自治体向け電子通貨開発プロジェクトに参画",
    "2024年に株式会社miitasoを創業",
    "中堅企業のAI内製化伴走プログラムを展開",
  ]

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-32 border-t border-[#0E1B2C]/15">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14 md:mb-16">
          <SectionLabel number="10" label="WHO LEADS THE PROGRAM" />
        </div>

        <FadeIn>
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <div
                className="relative aspect-[4/5] bg-[#0E1B2C] overflow-hidden"
              >
                <Image
                  src="/lp/ai-v2/founder-portrait.jpg"
                  alt="AI内製化伴走プログラムのエディトリアルポートレート"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 font-[var(--font-display)] italic text-[11px] tracking-[0.18em] text-[#F5F1E8]/65 drop-shadow">
                  PROGRAM LEAD / IMAGE
                </span>
              </div>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <p className="font-[var(--font-display)] italic text-[#B8392E] text-[12px] tracking-[0.22em] mb-3">
                FOUNDER & PROGRAM LEAD
              </p>
              <h3 className="font-[var(--font-mincho)] font-medium text-[28px] md:text-[36px] leading-[1.4] text-[#0E1B2C]">
                津端 晃作
                <span className="font-[var(--font-display)] italic text-[14px] md:text-[16px] tracking-[0.18em] text-[#0E1B2C]/55 ml-3">
                  TSUBATA, KOSAKU
                </span>
              </h3>
              <p className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] text-[#0E1B2C]/65 mt-1">
                株式会社miitaso 代表取締役
              </p>
              <Hairline width="w-12" />
              <p className="font-[var(--font-mincho)] text-[15px] md:text-[17px] leading-[2] text-[#0E1B2C] mt-7 mb-7">
                「提案書を書くコンサル」と「言われた通り作るエンジニア」のあいだで、
                何度もプロジェクトが滞るのを見てきました。要件定義から実装、教育、引継ぎまでを一人で完結させる「実装型コンサルタント」として、中堅企業のAI内製化に伴走しています。
              </p>
              <Hairline width="w-12" />
              <ul className="font-[var(--font-sans-jp)] text-[13px] md:text-[14px] leading-[2] text-[#2A3140]/85 mt-7 space-y-2.5">
                {career.map((c, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-[var(--font-display)] italic text-[#B8392E] text-[12px] tabular-nums tracking-[0.1em] mt-1.5 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#0E1B2C]/20">
                <p className="font-[var(--font-display)] italic text-[10px] tracking-[0.2em] text-[#0E1B2C]/55 mb-3">
                  TECH STACK
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 font-[var(--font-sans-jp)] text-[12px] text-[#0E1B2C]/75">
                  {[
                    "Claude API",
                    "OpenAI API",
                    "Next.js",
                    "React",
                    "Flutter",
                    "Firebase",
                    "Python",
                    "Laravel",
                  ].map((t, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-[#0E1B2C]/30">·</span>}
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================
// 12. FINAL CTA
// ============================================================
function FinalCTASection() {
  return (
    <section className="bg-[#0E1B2C] text-[#F5F1E8] py-28 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 font-[var(--font-display)] italic text-[#F5F1E8] text-[280px] md:text-[440px] leading-[0.8] select-none">
          ✦
        </div>
      </div>
      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p className="font-[var(--font-display)] italic text-[#B8392E] text-[12px] md:text-[14px] tracking-[0.24em] mb-7">
          THE NEXT STEP
        </p>
        <h2 className="font-[var(--font-mincho)] font-medium text-[30px] md:text-[44px] leading-[1.4] mb-10">
          まず30分、
          <br />
          <span className="text-[#F5F1E8]/85">貴社の業務に</span>
          <br />
          AIの効きどころがあるか、
          <br />
          数字で確認しませんか。
        </h2>
        <Hairline inverted />
        <p className="font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[2] text-[#F5F1E8]/75 mt-8 mb-12">
          相談の中で、貴社の対象業務の年間非効率額を一緒に概算します。
          <br />
          条件を満たさない場合は、無理にご提案いたしません。
          <br />
          条件未達の場合は、本提案には進みません。
        </p>
        <div className="flex flex-col items-center gap-6">
          <CTAButton
            inverted
            microcopy="※ 30秒で予約完了 / 条件未達の場合は本提案に進まず、別アプローチを整理します"
          />
          <CTAButton variant="sub" inverted />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 13. FOOTER
// ============================================================
function LPFooter() {
  return (
    <footer className="bg-[#0E1B2C] text-[#F5F1E8]/65 border-t border-[#F5F1E8]/10 py-14">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-6">
            <p className="font-[var(--font-mincho)] text-[20px] text-[#F5F1E8] mb-3">
              株式会社 miitaso
            </p>
            <p className="font-[var(--font-display)] italic text-[12px] tracking-[0.18em] text-[#F5F1E8]/55 mb-5">
              Implementation × Strategy / Tokyo
            </p>
            <p className="font-[var(--font-sans-jp)] text-[12px] leading-[1.95] text-[#F5F1E8]/55">
              代表：津端 晃作
              <br />
              〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F
            </p>
          </div>
          <div className="md:col-span-6 md:text-right">
            <div className="flex md:justify-end gap-6 text-[11px] tracking-[0.14em] font-[var(--font-sans-jp)]">
              <a href="/privacy" className="hover:text-[#F5F1E8] transition-colors">
                プライバシーポリシー
              </a>
              <span className="text-[#F5F1E8]/30">／</span>
              <a href="/tokushoho" className="hover:text-[#F5F1E8] transition-colors">
                特定商取引法に基づく表記
              </a>
            </div>
            <p className="mt-6 font-[var(--font-display)] italic text-[11px] tracking-[0.2em] text-[#F5F1E8]/40">
              © 2026 miitaso, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// Main page
// ============================================================
export default function AIInternalizationLP() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-16 md:pb-0 bg-[#F5F1E8] selection:bg-[#B8392E] selection:text-[#F5F1E8]">
      <HeroSection />
      <PatternsSection />
      <SolutionSection />
      <TargetBusinessSection />
      <RoadmapSection />
      <ROISection />
      <ComparisonSection />
      <DeliverablesSection />
      <PricingSection />
      <NotForSection />
      <ProfileSection />
      <FAQSection />
      <FinalCTASection />
      <LPFooter />
      <StickyMobileCTA />
    </main>
  )
}
