import Image from "next/image"
import {
  Check,
  X,
  Sparkles,
  Search,
  FileText,
  Wrench,
  Rocket,
  Handshake,
  Layers,
  Repeat,
  Compass,
  Mail,
  MessageSquare,
  Clock,
} from "lucide-react"
import { PrimaryCTA, SecondaryCTA } from "./_components/cta-button"
import { FAQSection } from "./_components/faq-section"
import { StickyMobileCTA } from "./_components/sticky-mobile-cta"
import { HeroSection } from "./_components/hero-section"

// ============================================================
// Header
// ============================================================
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#0F1F3D]/8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#0F1F3D] text-white"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12 L7 2 L12 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 8 L7 6 L9.5 8"
                stroke="#E8704C"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-[var(--font-sans-bc)] font-bold text-[12px] md:text-[13px] text-[#0F1F3D] tracking-tight">
            30日AI営業ページ内製化ブートキャンプ
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-[12px] font-medium text-[#475569]">
          <a href="#problem" className="hover:text-[#0F1F3D] transition-colors">プログラム内容</a>
          <a href="#pricing" className="hover:text-[#0F1F3D] transition-colors">料金プラン</a>
          <a href="#cases" className="hover:text-[#0F1F3D] transition-colors">ケースイメージ</a>
          <a href="#faq" className="hover:text-[#0F1F3D] transition-colors">FAQ</a>
        </nav>
        <div className="hidden md:block">
          <PrimaryCTA size="sm" label="無料相談を予約する" />
        </div>
      </div>
    </header>
  )
}

// Hero is in _components/hero-section.tsx

// ============================================================
// 2. Problem
// ============================================================
function Problem() {
  const pains = [
    {
      img: "/lp/ai-bootcamp/icon-pain-1.png",
      title: "LPの小さな修正が、毎回外注待ちになる",
      body: "見出しなどの微調整だけでも、毎回〜数週間かかり、スピードが鈍る。",
    },
    {
      img: "/lp/ai-bootcamp/icon-pain-2.png",
      title: "営業資料の更新が遅く、商談機会を逃す",
      body: "情報が古いままだと商談率が下がり、せっかくの見込み客を取りこぼしてしまう。",
    },
    {
      img: "/lp/ai-bootcamp/icon-pain-3.png",
      title: "問い合わせ返信の型がなく、対応が属人化する",
      body: "担当者によって品質バラつき、品質にムラが出る。負荷も増える。",
    },
    {
      img: "/lp/ai-bootcamp/icon-pain-4.png",
      title: "待ち時間と手戻りが、事業スピードを鈍らせる",
      body: "伝え方のズレや手戻しのやり直しで、リードの熱量が下がってしまう。",
    },
  ]
  return (
    <section id="problem" className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-gradient-to-b from-[#FAFAF7] to-transparent" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="font-[var(--font-num-bc)] font-bold text-[#E8704C] text-[11px] tracking-[0.28em] mb-3">
            PROBLEM
          </p>
          <h2 className="font-[var(--font-sans-bc)] font-black text-[28px] md:text-[40px] leading-[1.4] text-[#0F1F3D] tracking-tight">
            こんなお悩み、ありませんか？
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-7 hover:border-[#E8704C]/50 hover:shadow-[0_12px_40px_-15px_rgba(232,112,76,0.25)] hover:-translate-y-1 transition-all duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-[var(--font-sans-bc)] font-black text-[15px] md:text-[17px] leading-[1.55] text-[#0F1F3D] mb-5 min-h-[48px] md:min-h-[56px]">
                {p.title}
              </h3>
              <div className="relative w-full aspect-square max-w-[140px] md:max-w-[160px] mx-auto mb-5">
                <Image
                  src={p.img}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
              <p className="text-[12px] md:text-[13px] leading-[1.85] text-[#475569]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 3. Solution + Comparison
// ============================================================
type Mark = "best" | "ok" | "no"
const MarkCell = ({ m }: { m: Mark }) => {
  if (m === "best")
    return (
      <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full border-[2.5px] border-[#E8704C] mx-auto">
        <span className="block w-1.5 h-1.5 rounded-full bg-[#E8704C]" />
      </span>
    )
  if (m === "ok")
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 mx-auto text-[#94A3B8]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12,5 21,20 3,20" />
      </svg>
    )
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 mx-auto text-[#94A3B8]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  )
}

function SolutionComparison() {
  const rows: { label: string; outsource: Mark; training: Mark; self: Mark; ours: Mark }[] = [
    { label: "すぐ使える成果物", outsource: "ok", training: "ok", self: "no", ours: "best" },
    { label: "社員自身の自走", outsource: "no", training: "best", self: "ok", ours: "best" },
    { label: "作成支援", outsource: "best", training: "no", self: "no", ours: "best" },
    { label: "短期間での公開", outsource: "ok", training: "no", self: "no", ours: "best" },
  ]
  return (
    <section className="bg-[#FAFAF7] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <h2 className="font-[var(--font-sans-bc)] font-black text-[24px] md:text-[32px] lg:text-[36px] leading-[1.5] text-[#0F1F3D] text-center mb-10 md:mb-12">
          研修でも受託でもない、
          <br className="md:hidden" />
          成果物付きの内製化ブートキャンプ。
        </h2>
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* TABLE (left) */}
          <div className="lg:col-span-9 overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full text-[13px] md:text-[14px] min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-white">
                  <th className="text-left p-4 md:p-5 font-bold text-[#475569] w-[36%]"></th>
                  <th className="p-4 md:p-5 text-center font-bold text-[#475569]">外注</th>
                  <th className="p-4 md:p-5 text-center font-bold text-[#475569]">研修</th>
                  <th className="p-4 md:p-5 text-center font-bold text-[#475569]">独学</th>
                  <th className="p-4 md:p-5 text-center font-black text-[#0F1F3D] bg-[#E8704C]/10 border-l border-r border-[#E8704C]/20">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#E8704C]" strokeWidth={2.5} />
                      本ブートキャンプ
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-[#E5E7EB] last:border-0">
                    <td className="p-4 md:p-5 font-bold text-[#0F1F3D]">{r.label}</td>
                    <td className="p-4 md:p-5 text-center"><MarkCell m={r.outsource} /></td>
                    <td className="p-4 md:p-5 text-center"><MarkCell m={r.training} /></td>
                    <td className="p-4 md:p-5 text-center"><MarkCell m={r.self} /></td>
                    <td className="p-4 md:p-5 text-center bg-[#E8704C]/10 border-l border-r border-[#E8704C]/20">
                      <MarkCell m={r.ours} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CALLOUT (right) */}
          <aside className="lg:col-span-3 rounded-2xl border-2 border-[#E8704C]/30 bg-white p-5 md:p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFE9DD] mb-3">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#E8704C]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="22" x2="4" y2="3" />
                <path d="M4 4h13l-2 4 2 4H4" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <p className="text-[13px] md:text-[14px] leading-[1.85] font-bold text-[#0F1F3D]">
              30日で「作り切る」ことに
              <br />
              こだわったプログラムです。
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

// (FocusedProgram removed — the message lives inside SolutionComparison's right callout)

// ============================================================
// 4. Deliverables (CSS/HTML composition for high fidelity)
// ============================================================
function Deliverables() {
  return (
    <section id="deliverables" className="relative bg-[#FAFAF7] py-20 md:py-28 overflow-hidden">
      {/* atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[420px] bg-gradient-to-b from-[#FFE9DD]/35 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="font-[var(--font-num-bc)] text-[#E8704C] text-[11px] tracking-[0.32em] font-black mb-4">
            DELIVERABLES
          </p>
          <h2 className="font-[var(--font-sans-bc)] font-black text-[28px] md:text-[44px] leading-[1.3] text-[#0F1F3D] tracking-tight mb-5">
            30日で、確実に手に入る
            <br className="md:hidden" />
            <span className="relative inline-block ml-2">
              <span className="relative z-10 text-[#E8704C]">2つの成果物</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E8704C]/20 -z-0 rounded-sm"
              />
            </span>
            。
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#475569] leading-[2] max-w-2xl mx-auto font-medium">
            学んで終わりではなく、卒業時には実際に動く成果物が手元に残ります。
            <br className="hidden md:block" />
            メイン成果物 ＋ サブ成果物の組み合わせで、貴社の営業課題に直結する形で設計します。
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-7 items-stretch">
          {/* MAIN deliverable */}
          <article className="group relative">
            {/* halo */}
            <div
              className="absolute -inset-2 bg-gradient-to-br from-[#E8704C]/25 via-[#E8704C]/0 to-[#E8704C]/15 rounded-[28px] blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl bg-white border-2 border-[#E8704C] p-7 md:p-8 shadow-[0_30px_80px_-25px_rgba(232,112,76,0.35)] h-full flex flex-col">
              {/* Top */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8704C] text-white px-3.5 py-1.5 text-[11px] font-black tracking-[0.12em]">
                  <Sparkles className="w-3 h-3" /> メイン成果物
                </div>
                <div className="font-[var(--font-num-bc)] text-[10px] font-black tracking-[0.18em] text-[#94A3B8]">
                  PRIMARY
                </div>
              </div>

              <h3 className="font-[var(--font-sans-bc)] font-black text-[22px] md:text-[26px] leading-[1.45] text-[#0F1F3D] tracking-tight mb-4">
                営業ページを1本、
                <br />
                自社で公開できる状態になる
              </h3>

              <p className="text-[13px] md:text-[14px] leading-[1.85] text-[#475569] mb-5">
                外注に頼まず、社長自身がClaude Code/Cursorでキャンペーン・導入事例・比較ページを<strong className="text-[#0F1F3D] font-bold">即日リリース</strong>できる体に。
              </p>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-1.5 mb-7">
                {["キャンペーン", "導入事例", "比較", "フォロー"].map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#FFE9DD]/70 text-[#0F1F3D] border border-[#E8704C]/15"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Visual: browser-style LP mock with floating metrics */}
              <div className="relative mt-auto pb-3 md:pb-4">
                <div className="rounded-2xl bg-gradient-to-br from-[#0F1F3D] via-[#1B2F5E] to-[#0F1F3D] p-2.5 md:p-3 shadow-[0_25px_60px_-20px_rgba(15,31,61,0.45)]">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 mb-2.5 px-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 rounded-md bg-white/10 px-2 py-0.5 text-[9px] text-white/70 font-mono tracking-tight">
                      your-company.com/lp/campaign
                    </div>
                  </div>

                  {/* LP body */}
                  <div className="rounded-lg bg-white p-3.5 md:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-[#0F1F3D]" />
                        <div className="h-1.5 bg-[#0F1F3D] rounded w-12" />
                      </div>
                      <div className="flex gap-1.5">
                        <div className="h-1 bg-[#E5E7EB] rounded w-5" />
                        <div className="h-1 bg-[#E5E7EB] rounded w-5" />
                        <div className="h-2.5 bg-[#E8704C] rounded w-7" />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div className="col-span-3 space-y-1.5">
                        <div className="h-1 bg-[#E8704C]/40 rounded w-2/5" />
                        <div className="h-2 bg-[#0F1F3D] rounded w-full" />
                        <div className="h-2 bg-[#0F1F3D] rounded w-3/4" />
                        <div className="h-2 bg-[#0F1F3D] rounded w-5/6" />
                        <div className="pt-1 space-y-0.5">
                          <div className="h-0.5 bg-[#E5E7EB] rounded w-full" />
                          <div className="h-0.5 bg-[#E5E7EB] rounded w-5/6" />
                          <div className="h-0.5 bg-[#E5E7EB] rounded w-4/6" />
                        </div>
                        <div className="inline-block h-3 bg-[#E8704C] rounded-sm w-1/2 mt-1" />
                      </div>
                      <div className="col-span-2">
                        <div className="aspect-square rounded-md bg-gradient-to-br from-[#FFE9DD] via-[#F0F4FA] to-[#E0E7F4] relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#94A3B8]/40" />
                          </div>
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1 bg-white/60 rounded" />
                        </div>
                      </div>
                    </div>
                    {/* footer chips */}
                    <div className="flex gap-1 mt-3 pt-2.5 border-t border-[#E5E7EB]">
                      <div className="h-1.5 bg-[#FAFAF7] border border-[#E5E7EB] rounded w-10" />
                      <div className="h-1.5 bg-[#FAFAF7] border border-[#E5E7EB] rounded w-12" />
                      <div className="h-1.5 bg-[#FAFAF7] border border-[#E5E7EB] rounded w-8" />
                    </div>
                  </div>
                </div>

                {/* Floating metrics card */}
                <div className="absolute -bottom-3 right-2 md:right-4 bg-white rounded-2xl shadow-[0_20px_45px_-12px_rgba(15,31,61,0.25)] border border-[#E5E7EB] p-3 flex items-stretch gap-3 backdrop-blur">
                  {[
                    { k: "CVR", v: "+35%", c: "text-[#15803D]" },
                    { k: "REACH", v: "+42%", c: "text-[#15803D]" },
                    { k: "LEADS", v: "+28%", c: "text-[#15803D]" },
                  ].map((m, i) => (
                    <div
                      key={m.k}
                      className={`text-center ${i > 0 ? "border-l border-[#E5E7EB] pl-3" : ""}`}
                    >
                      <div className="font-[var(--font-num-bc)] text-[8px] font-black tracking-[0.14em] text-[#94A3B8] mb-0.5">
                        {m.k}
                      </div>
                      <div className={`font-[var(--font-num-bc)] font-black text-[13px] md:text-[14px] tabular-nums ${m.c}`}>
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating "公開済" badge */}
                <div className="absolute -top-2.5 -left-2.5 bg-[#15803D] text-white rounded-full px-2.5 py-1 text-[9px] font-black tracking-wider flex items-center gap-1 shadow-lg">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
              </div>

              <p className="mt-6 text-[10px] text-[#94A3B8] text-right">※ イメージです</p>
            </div>
          </article>

          {/* SUB deliverable */}
          <article className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#0F1F3D]/10 via-transparent to-[#0F1F3D]/5 rounded-[28px] blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true" />
            <div className="relative rounded-3xl bg-white border border-[#E5E7EB] p-7 md:p-8 shadow-[0_25px_60px_-20px_rgba(15,31,61,0.18)] h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1F3D] text-white px-3.5 py-1.5 text-[11px] font-black tracking-[0.12em]">
                  <Layers className="w-3 h-3" /> サブ成果物
                </div>
                <div className="font-[var(--font-num-bc)] text-[10px] font-black tracking-[0.18em] text-[#94A3B8]">
                  ADD-ON
                </div>
              </div>

              <h3 className="font-[var(--font-sans-bc)] font-black text-[22px] md:text-[26px] leading-[1.45] text-[#0F1F3D] tracking-tight mb-4">
                問い合わせ返信テンプレ または
                <br />
                商談オペのAI化を1つ実装
              </h3>

              <p className="text-[13px] md:text-[14px] leading-[1.85] text-[#475569] mb-5">
                返信品質を均一化したり、商談から提案までを<strong className="text-[#0F1F3D] font-bold">半自動化</strong>したり。貴社の課題に合わせて1つを選択して構築。
              </p>

              <div className="flex flex-wrap gap-1.5 mb-7">
                {["提案書たたき台", "議事録", "返信メール", "フォローメール"].map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#F0F4FA] text-[#0F1F3D] border border-[#E5E7EB]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Visual: realistic email/chat thread UI */}
              <div className="relative mt-auto pb-3 md:pb-4">
                <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_20px_45px_-15px_rgba(15,31,61,0.18)] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0F1F3D] text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span className="text-[11px] font-black tracking-tight">
                        問い合わせ返信テンプレ
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
                      <span className="text-[9px] font-bold text-white/80 tracking-wider">ACTIVE</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 space-y-3 bg-[#FAFAF7]">
                    {/* User msg */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#94A3B8] flex items-center justify-center text-white text-[9px] font-black flex-shrink-0">
                        客
                      </div>
                      <div className="flex-1">
                        <div className="text-[8px] font-black tracking-wider text-[#94A3B8] mb-0.5">
                          顧客 — 14:23
                        </div>
                        <div className="rounded-lg bg-white border border-[#E5E7EB] p-2.5">
                          <div className="text-[10px] md:text-[11px] text-[#0F1F3D] leading-[1.6]">
                            製品Aの料金プランについて教えてください。
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI typing/draft */}
                    <div className="flex items-start gap-2 flex-row-reverse">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E8704C] to-[#D8623F] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Sparkles className="w-3 h-3 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="text-[8px] font-black tracking-wider text-[#E8704C] mb-0.5 flex items-center gap-1.5 justify-end">
                          AI DRAFT
                          <span className="font-mono text-[#94A3B8] font-medium">— 0.8s</span>
                        </div>
                        <div className="rounded-lg bg-[#FFE9DD]/50 border border-[#E8704C]/30 p-2.5 text-left">
                          <div className="text-[10px] md:text-[11px] text-[#0F1F3D] leading-[1.7] space-y-1">
                            <p>ご連絡ありがとうございます。</p>
                            <p>製品Aの料金プランは下記の通りです:</p>
                            <ul className="space-y-0.5 pl-2 mt-1">
                              <li className="flex items-baseline gap-1">
                                <span className="text-[#E8704C]">•</span>
                                <span>スターター <span className="font-black tabular-nums">¥9,800</span>/月</span>
                              </li>
                              <li className="flex items-baseline gap-1">
                                <span className="text-[#E8704C]">•</span>
                                <span>スタンダード <span className="font-black tabular-nums">¥29,800</span>/月</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action footer */}
                  <div className="flex items-center gap-2 px-3.5 py-2.5 border-t border-[#E5E7EB] bg-white">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] md:text-[11px] font-black tracking-wider text-white bg-[#E8704C] py-2 rounded-md"
                    >
                      <Mail className="w-3 h-3" strokeWidth={2.5} />
                      送信する
                    </button>
                    <button
                      type="button"
                      className="text-[10px] md:text-[11px] font-bold text-[#475569] bg-white border border-[#E5E7EB] px-3.5 py-2 rounded-md"
                    >
                      編集
                    </button>
                  </div>
                </div>

                {/* Floating "TIME SAVED" badge */}
                <div className="absolute -top-2.5 -right-2.5 bg-[#E8704C] text-white rounded-full px-2.5 py-1 text-[9px] font-black tracking-wider flex items-center gap-1 shadow-lg">
                  <Clock className="w-2.5 h-2.5" strokeWidth={3} />
                  −85% TIME
                </div>
              </div>

              <p className="mt-6 text-[10px] text-[#94A3B8] text-right">※ イメージです</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 5. Process
// ============================================================
function Process() {
  const steps = [
    {
      week: "Week 1",
      icon: Search,
      title: "課題整理とコース設定",
      body: "貴社の営業課題をヒアリングし、30日で仕上げる成果物のスコープを確定。Claude Code/Cursorのセットアップも完了。",
    },
    {
      week: "Week 2",
      icon: FileText,
      title: "構成・素材・プロンプト整備",
      body: "ターゲット・訴求軸・構成を一緒に設計。AIで複数案を高速にドラフト化し、骨格を固める。",
    },
    {
      week: "Week 3",
      icon: Wrench,
      title: "制作と仕上げ",
      body: "営業ページの実装と、副成果物（返信テンプレ／オペAI化）を並行構築。詰めどころを徹底ブラッシュアップ。",
    },
    {
      week: "Week 4",
      icon: Rocket,
      title: "公開・運用・型化",
      body: "Web公開し、運用手順を社内資産として文書化。卒業後も再現できる「型」を残す。",
    },
  ]
  return (
    <section id="process" className="bg-[#FAFAF7] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-sans-bc)] font-black text-[26px] md:text-[36px] leading-[1.4] text-[#0F1F3D]">
            30日間の進め方
            <span className="block md:inline text-[14px] md:text-[18px] font-bold text-[#475569] md:ml-3 mt-1.5 md:mt-0">
              ［週次で伴走］
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5 md:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.week} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(100%-8px)] w-4 h-px bg-[#E8704C]/40 z-0"></div>
                )}
                <div className="relative z-10 rounded-2xl bg-white border border-[#E5E7EB] p-5 md:p-6 h-full hover:border-[#E8704C]/40 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0F1F3D] text-white">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <span className="font-[var(--font-num-bc)] font-bold text-[#E8704C] text-[13px] tracking-wider">
                      {s.week}
                    </span>
                  </div>
                  <h4 className="font-[var(--font-sans-bc)] font-bold text-[15px] md:text-[16px] leading-[1.5] text-[#0F1F3D] mb-3">
                    {s.title}
                  </h4>
                  <p className="text-[12px] md:text-[13px] leading-[1.85] text-[#475569]">{s.body}</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-8 text-center text-[12px] md:text-[13px] text-[#475569]">
          週1回60分のオンライン1on1 + 質問チャット無制限 で伴走
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 6. Why this works (short narrative)
// ============================================================
function WhyItWorks() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <h2 className="font-[var(--font-sans-bc)] font-black text-[24px] md:text-[32px] leading-[1.5] text-[#0F1F3D] mb-5">
            このプログラムが
            <br className="md:hidden" />
            成果につながる理由
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[2] text-[#475569] mb-4">
            現場の事業を10年以上支えてきた実装経験と、Claude Code／Cursorのソフトウェア開発力を組み合わせた一気通貫の伴走。受講者は「考え方」だけでなく、「自分の手で動かせる成果物」と「再現可能な型」を持って卒業します。
          </p>
          <p className="text-[14px] md:text-[15px] leading-[2] text-[#475569]">
            外注ではなく、研修でもなく、独学でもない。30日後、営業改善が&quot;社内で回る&quot;状態に到達するための、最短ルートを設計しました。
          </p>
        </div>
        <div className="md:col-span-5 order-1 md:order-2">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#F0F4FA] to-[#FFE9DD] shadow-lg">
            <Image
              src="/lp/ai-bootcamp/deliverable-laptop.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-contain p-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 7. Pricing
// ============================================================
function Pricing() {
  const plans = [
    {
      key: "light",
      name: "ライトプラン",
      tagline: "まずは気軽に試したい方へ",
      price: "29,800",
      unit: "/月",
      sub: "月額・最低契約期間なし",
      badge: null,
      features: [
        "月10回までのチャット質問",
        "月1回の30分オンライン会話",
        "営業時間内・24h以内返信",
        "受講ガイド資料アクセス",
      ],
      ctaLabel: "ライトプランを見る",
      ctaPrimary: false,
    },
    {
      key: "bootcamp",
      name: "ブートキャンプ",
      tagline: "30日で集中的に取り組みたい方へ",
      price: "298,000",
      unit: "/30日",
      sub: "分割払い ¥99,800 × 3回 OK",
      badge: "おすすめ",
      features: [
        "30日間の伴走サポート",
        "週1回60分の1on1セッション",
        "成果物 メイン1点+サブ1点を納品",
        "チャット質問 無制限",
        "ライト初月分の充当特典",
      ],
      ctaLabel: "ブートキャンプに申し込む",
      ctaPrimary: true,
    },
    {
      key: "monthly",
      name: "月額伴走",
      tagline: "ブートキャンプ修了者向け",
      price: "49,800",
      unit: "/月",
      sub: "卒業後の継続サポート",
      badge: null,
      features: [
        "月1回60分の壁打ち1on1",
        "チャット質問 無制限",
        "新規業務のAI化アドバイス",
        "社内展開・新人研修サポート",
      ],
      ctaLabel: "月額伴走を見る",
      ctaPrimary: false,
    },
  ]
  return (
    <section id="pricing" className="bg-[#FAFAF7] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <h2 className="font-[var(--font-sans-bc)] font-black text-[26px] md:text-[36px] leading-[1.4] text-[#0F1F3D] text-center mb-12">
          料金プラン
        </h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {plans.map((p) => {
            const featured = p.key === "bootcamp"
            return (
              <div
                key={p.key}
                className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
                  featured
                    ? "bg-[#0F1F3D] text-white border-2 border-[#E8704C] shadow-2xl md:-translate-y-2"
                    : "bg-white border border-[#E5E7EB] shadow-sm"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[#E8704C] text-white text-[11px] font-bold tracking-wider px-3 py-1">
                    <Sparkles className="w-3 h-3" /> {p.badge}
                  </span>
                )}
                <div className="mb-5">
                  <h3
                    className={`font-[var(--font-sans-bc)] font-black text-[20px] md:text-[22px] mb-1 ${
                      featured ? "text-white" : "text-[#0F1F3D]"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`text-[12px] ${
                      featured ? "text-white/70" : "text-[#475569]"
                    }`}
                  >
                    {p.tagline}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-[14px] font-bold ${
                        featured ? "text-white" : "text-[#0F1F3D]"
                      }`}
                    >
                      ¥
                    </span>
                    <span
                      className={`font-[var(--font-num-bc)] font-black text-[40px] md:text-[44px] tabular-nums leading-none ${
                        featured ? "text-[#E8704C]" : "text-[#0F1F3D]"
                      }`}
                    >
                      {p.price}
                    </span>
                    <span
                      className={`text-[13px] font-bold ml-1 ${
                        featured ? "text-white/80" : "text-[#475569]"
                      }`}
                    >
                      {p.unit}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-[12px] ${
                      featured ? "text-white/65" : "text-[#475569]"
                    }`}
                  >
                    {p.sub}
                  </p>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-[13px] leading-[1.7] ${
                        featured ? "text-white/90" : "text-[#0F1F3D]"
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 mt-1 flex-shrink-0 ${
                          featured ? "text-[#E8704C]" : "text-[#15803D]"
                        }`}
                        strokeWidth={3}
                      />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  {p.ctaPrimary ? (
                    <PrimaryCTA full label={p.ctaLabel} />
                  ) : (
                    <SecondaryCTA full label={p.ctaLabel} href="#cta" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-8 text-center text-[12px] text-[#475569]">
          ※ 表示価格は税抜です。 ※ 受講には週3〜5時間の作業時間確保が前提となります。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 8. Qualification
// ============================================================
function Qualification() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#15803D]/30 p-7 md:p-8">
            <h3 className="font-[var(--font-sans-bc)] font-black text-[20px] md:text-[22px] text-[#0F1F3D] mb-5 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#15803D] text-white">
                <Check className="w-4 h-4" strokeWidth={3} />
              </span>
              向いている会社
            </h3>
            <ul className="space-y-3">
              {[
                "BtoB中小企業（年商1〜10億円）の経営者",
                "情シス専任不在で、LPや営業資料は外注中心",
                "外注待ちで意思決定が止まっている",
                "週3〜5時間の作業時間を確保できる",
                "AIを業務に組み込みたい意欲がある",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[1.75] text-[#0F1F3D]">
                  <Check className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-[#FAFAF7] border-2 border-[#94A3B8]/30 p-7 md:p-8">
            <h3 className="font-[var(--font-sans-bc)] font-black text-[20px] md:text-[22px] text-[#475569] mb-5 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#94A3B8] text-white">
                <X className="w-4 h-4" strokeWidth={3} />
              </span>
              向いていないケース
            </h3>
            <ul className="space-y-3">
              {[
                "とにかく丸投げしたい・任せきりにしたい",
                "外注頼みでも資金繰りが回せている",
                "週の作業時間が確保できない繁忙期",
                "大規模システムや深い業務知識を要する",
                "1ヶ月で結果が出ないと納得できない",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[1.75] text-[#475569]">
                  <X className="w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-1" strokeWidth={3} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 9. About
// ============================================================
function About() {
  const values = [
    { icon: Handshake, title: "中小企業の伴走", body: "現場での実装に10年以上関わってきた知見" },
    { icon: Wrench, title: "実装まで一気通貫", body: "戦略・設計・実装・運用を一人で完結" },
    { icon: Repeat, title: "再現性のある型", body: "卒業後も社内で回せる仕組みを残す" },
    { icon: Compass, title: "持続的なAI活用", body: "ブームではなく業務に根付くAI習慣を" },
  ]
  return (
    <section className="bg-[#FAFAF7] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <h2 className="font-[var(--font-sans-bc)] font-black text-[26px] md:text-[36px] leading-[1.4] text-[#0F1F3D] text-center mb-12">
          運営者について
        </h2>
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center mb-12">
          <div className="md:col-span-4">
            <div className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-br from-[#FFE9DD] to-[#F0F4FA] shadow-lg max-w-[260px] mx-auto">
              <Image
                src="/lp/ai-bootcamp/hero.jpg"
                alt="運営者プロフィール"
                fill
                sizes="(max-width: 768px) 60vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="font-[var(--font-sans-bc)] font-black text-[20px] md:text-[24px] leading-[1.5] text-[#0F1F3D] mb-4">
              中小企業の&quot;伝える化&quot;を、
              <br />
              現場で支えるパートナー。
            </h3>
            <p className="text-[14px] md:text-[15px] leading-[1.95] text-[#475569] mb-3">
              中小企業のWeb制作・マーケティング支援を10年以上続け、現場の業務にAIを実装してきた経験をベースに、伴走型の内製化プログラムを設計しました。
            </p>
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-[#475569]">
              「使えないAI研修」「言われた通り作って終わる外注」を超えて、社内に資産が残る形で営業改善を進めます。
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#E5E7EB] mb-3">
                  <Icon className="w-6 h-6 text-[#E8704C]" strokeWidth={2} />
                </div>
                <h4 className="font-[var(--font-sans-bc)] font-bold text-[13px] md:text-[14px] text-[#0F1F3D] mb-1.5">
                  {v.title}
                </h4>
                <p className="text-[11px] md:text-[12px] leading-[1.7] text-[#475569]">
                  {v.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 10. Cases (Before/After)
// ============================================================
function Cases() {
  const cases = [
    {
      industry: "製造業",
      icon: Layers,
      title: "導入事例化LPを内製化",
      before: "外注に都度依頼で月50万円・公開まで3週間",
      after: "社内で1日公開・年間外注費 ¥0 に",
    },
    {
      industry: "サービス業",
      icon: MessageSquare,
      title: "問い合わせ返信テンプレを整備",
      before: "返信に1件30分・属人化で品質バラつき",
      after: "AI下書きで5分・全社で品質を均一化",
    },
    {
      industry: "コンサル業",
      icon: Mail,
      title: "フォローメールを内製化",
      before: "商談後の次アクションが鈍り商談化率15%",
      after: "提案メールが翌朝出せ、商談化率28%へ",
    },
  ]
  return (
    <section id="cases" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8704C] text-white px-3.5 py-1.5 text-[11px] font-bold tracking-wider mb-4">
            <Sparkles className="w-3 h-3" /> 立ち上げ期につき先着5社募集
          </span>
          <h2 className="font-[var(--font-sans-bc)] font-black text-[26px] md:text-[36px] leading-[1.4] text-[#0F1F3D]">
            ケースイメージ
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => {
            const Icon = c.icon
            return (
              <article
                key={c.title}
                className="rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[#E5E7EB]">
                    <Icon className="w-5 h-5 text-[#E8704C]" />
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-[#E8704C]">
                    {c.industry}
                  </span>
                </div>
                <h4 className="font-[var(--font-sans-bc)] font-bold text-[16px] leading-[1.5] text-[#0F1F3D] mb-5">
                  {c.title}
                </h4>
                <div className="space-y-3">
                  <div className="rounded-lg bg-white border border-[#E5E7EB] p-3.5">
                    <p className="text-[11px] font-black tracking-wider text-[#94A3B8] mb-1.5">
                      Before
                    </p>
                    <p className="text-[13px] leading-[1.7] text-[#475569]">{c.before}</p>
                  </div>
                  <div className="rounded-lg bg-white border-2 border-[#15803D]/30 p-3.5">
                    <p className="text-[11px] font-black tracking-wider text-[#15803D] mb-1.5">
                      After
                    </p>
                    <p className="text-[13px] leading-[1.7] text-[#0F1F3D] font-medium">{c.after}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-8 text-center text-[12px] text-[#475569]">
          ※ ケースは想定事例です。立ち上げ期につき先着5社限定の特別募集中。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// 11. Final CTA (dark navy)
// ============================================================
function FinalCTA() {
  return (
    <section
      id="cta"
      className="bg-[#0F1F3D] text-white py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E8704C] blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#E8704C] blur-3xl"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        <h2 className="font-[var(--font-sans-bc)] font-black text-[28px] md:text-[44px] leading-[1.4] mb-6">
          次の営業改善を、
          <br />
          外注待ちで止めない。
        </h2>
        <p className="text-[14px] md:text-[16px] leading-[2] text-white/80 mb-10 max-w-2xl mx-auto">
          30分の無料相談で、貴社の営業オペレーションのうち、どこにAIが効くかを一緒に整理します。
          <br />
          相談後の契約義務はありません。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
          <PrimaryCTA size="lg" label="無料相談を予約する" />
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-transparent text-white hover:bg-white/10 font-bold px-8 py-5 text-[16px] transition-colors"
          >
            ブートキャンプに申し込む
          </a>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] md:text-[13px] text-white/70">
          {["先着5社募集中", "30日完了", "30日返金保証"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#E8704C]" strokeWidth={3} />
              <span className="font-medium">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ============================================================
// 12. Footer
// ============================================================
function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-[var(--font-num-bc)] font-bold text-[18px] text-[#0F1F3D]">
            miitaso
          </span>
          <span className="text-[11px] text-[#475569]">
            / 30日AI営業ページ内製化ブートキャンプ
          </span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#475569]">
          <a href="/privacy" className="hover:text-[#0F1F3D]">プライバシーポリシー</a>
          <a href="/terms" className="hover:text-[#0F1F3D]">特定商取引法に基づく表記</a>
          <a href="/contact" className="hover:text-[#0F1F3D]">お問い合わせ</a>
        </div>
        <p className="text-[11px] text-[#475569]">© 2026 miitaso All Rights Reserved.</p>
      </div>
    </footer>
  )
}

// ============================================================
// Page
// ============================================================
export default function AIBootcampLP() {
  return (
    <main className="font-[var(--font-sans-bc)] bg-white text-[#0F1F3D] antialiased">
      <Header />
      <HeroSection />
      <Problem />
      <SolutionComparison />
      <Deliverables />
      <Process />
      <WhyItWorks />
      <Pricing />
      <Qualification />
      <About />
      <Cases />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
