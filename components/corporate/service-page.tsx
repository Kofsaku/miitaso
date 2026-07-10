import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import { GridBackground, Glow } from "./backgrounds"
import { Reveal } from "./reveal"
import { Section, SectionHeading } from "./section"

const primaryCtaClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"

const cardClass =
  "h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06]"

/* ------------------------------------------------------------------ */
/* ServiceHero                                                         */
/* ------------------------------------------------------------------ */

type ServiceHeroProps = {
  /** mono英語ラベル（例: "AI INTEGRATION"） */
  label: string
  /** H1。強調語は呼び出し側で gradient span を入れる */
  title: ReactNode
  /** リード文（課題提起＋約束） */
  lead: ReactNode
  /** 約束・特徴の箇条書き（緑チェック付き） */
  bullets?: string[]
  /** CTA。省略時は「無料相談する」→ /#contact */
  cta?: { label: string; href: string }
}

export function ServiceHero({ label, title, lead, bullets, cta }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#030712] pb-20 pt-36 md:pb-28 md:pt-44">
      <GridBackground fade />
      <Glow className="-top-24 left-1/4 h-80 w-80" />
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
              {label}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-slate-400">{lead}</p>
          </Reveal>
          {bullets && bullets.length > 0 ? (
            <Reveal delay={150}>
              <ul className="mt-8 space-y-3">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-slate-300">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
          <Reveal delay={250}>
            <div className="mt-10">
              <Link href={cta?.href ?? "/#contact"} className={primaryCtaClass}>
                {cta?.label ?? "無料相談する"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* PainList                                                            */
/* ------------------------------------------------------------------ */

type PainItem = {
  title: string
  description: string
}

type PainListProps = {
  label?: string
  title?: ReactNode
  lead?: ReactNode
  items: PainItem[]
}

export function PainList({
  label = "CHALLENGES",
  title = "こんな課題はありませんか",
  lead,
  items,
}: PainListProps) {
  return (
    <Section variant="alt">
      <SectionHeading label={label} title={title} lead={lead} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80} className="h-full">
            <div className={cardClass}>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* OfferGrid                                                           */
/* ------------------------------------------------------------------ */

type OfferItem = {
  title: string
  description: string
  /** 提供内容の詳細（緑チェック付き箇条書き） */
  points?: string[]
}

type OfferGridProps = {
  label?: string
  title?: ReactNode
  lead?: ReactNode
  items: OfferItem[]
}

export function OfferGrid({
  label = "WHAT WE DO",
  title = "提供内容",
  lead,
  items,
}: OfferGridProps) {
  return (
    <Section>
      <SectionHeading label={label} title={title} lead={lead} />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80} className="h-full">
            <div className={cardClass}>
              <span className="font-mono text-sm text-sky-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
              {item.points && item.points.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* StepFlow                                                            */
/* ------------------------------------------------------------------ */

type Step = {
  title: string
  description: string
}

type StepFlowProps = {
  label?: string
  title?: ReactNode
  lead?: ReactNode
  steps: Step[]
  /** セクション背景。トップページでは "transparent" を渡す */
  variant?: "default" | "alt" | "transparent"
  /** 章ラベル（トップページ用） */
  chapter?: string
}

const stepColsMap: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
}

export function StepFlow({
  label = "PROCESS",
  title = "進め方",
  lead,
  steps,
  variant = "alt",
  chapter,
}: StepFlowProps) {
  const cols = stepColsMap[steps.length] ?? "lg:grid-cols-4"
  return (
    <Section variant={variant} chapter={chapter}>
      <SectionHeading label={label} title={title} lead={lead} />
      <div data-particle-avoid className={`grid gap-10 md:grid-cols-2 ${cols}`}>
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 100} className="h-full">
            <div className="h-full">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 font-mono text-sm text-sky-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-r from-sky-400/40 to-transparent lg:block"
                  />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* RelatedCases                                                        */
/* ------------------------------------------------------------------ */

type CaseItem = {
  /** 業種・領域などの匿名カテゴリ（例: "運送・物流SaaS"） */
  category?: string
  title: string
  description: string
  /** 成果（事実シートにある数値のみ。例: "業界8位 → 2位"） */
  result?: string
}

type RelatedCasesProps = {
  label?: string
  title?: ReactNode
  lead?: ReactNode
  cases: CaseItem[]
}

export function RelatedCases({
  label = "RELATED WORK",
  title = "関連実績",
  lead,
  cases,
}: RelatedCasesProps) {
  return (
    <Section>
      <SectionHeading label={label} title={title} lead={lead} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((item, i) => (
          <Reveal key={item.title} delay={i * 80} className="h-full">
            <div className={`flex flex-col ${cardClass}`}>
              {item.category ? (
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.category}
                </span>
              ) : null}
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
              {item.result ? (
                <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-sky-400">
                  {item.result}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* ServiceFaq                                                          */
/* ------------------------------------------------------------------ */

type FaqItem = {
  question: string
  answer: string
}

type ServiceFaqProps = {
  label?: string
  title?: ReactNode
  lead?: ReactNode
  faqs: FaqItem[]
  /** 背景。前後セクションと default/alt が交互になるよう指定する */
  variant?: "default" | "alt"
}

/**
 * サービスページ共通のFAQアコーディオン（max-w-3xl の details 開閉式）。
 * 3枚のサービスページで見た目を揃えるための共有コンポーネント。
 */
export function ServiceFaq({
  label = "FAQ",
  title = "よくあるご質問",
  lead,
  faqs,
  variant = "default",
}: ServiceFaqProps) {
  return (
    <Section variant={variant}>
      <SectionHeading label={label} title={title} lead={lead} />
      <div className="max-w-3xl space-y-4">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={i * 60}>
            <details className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur transition hover:border-sky-400/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-medium text-white [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">
                {faq.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* CtaBand                                                             */
/* ------------------------------------------------------------------ */

type CtaBandProps = {
  title?: ReactNode
  lead?: ReactNode
  ctaLabel?: string
  ctaHref?: string
  /** 背景。前のセクションと default/alt が交互になるよう指定する */
  variant?: "default" | "alt"
}

export function CtaBand({
  title = "まずは無料相談から",
  lead = "課題の整理段階からでも構いません。現状をうかがい、最適な進め方をご提案します。",
  ctaLabel = "無料相談する",
  ctaHref = "/#contact",
  variant = "alt",
}: CtaBandProps) {
  return (
    <Section variant={variant}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center backdrop-blur md:px-12 md:py-20">
          <Glow className="-top-28 left-1/2 h-64 w-64 -translate-x-1/2" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">
              {lead}
            </p>
            <div className="mt-10">
              <Link href={ctaHref} className={primaryCtaClass}>
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
