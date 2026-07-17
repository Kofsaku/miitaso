import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Clock, Mail } from "lucide-react"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import { GridBackground, Glow } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

/* ------------------------------------------------------------------ */
/* モックURL（未デプロイのため暫定値）                                  */
/* ------------------------------------------------------------------ */

const MOCK_A_URL = "https://kuon-brewery.vercel.app"
const MOCK_B_URL = "https://ruhe-skincare.vercel.app"
const MOCK_C_URL = "https://tabiwa-shiomi.vercel.app"

const CAL_URL = "https://cal.com/miitaso/10"
const CONTACT_EMAIL = "kosaku.tsubata@miitaso.com"

/* ------------------------------------------------------------------ */
/* メタデータ                                                          */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = "サンプルモック | miitaso"
const PAGE_DESC =
  "資料ではなく、触れるもので判断していただくために。要件を見極めて最短1日で形にする、miitasoのサンプルモック集です（すべて架空案件）。"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://miitaso.com/mocks",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://miitaso.com/mocks",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
}

/* ------------------------------------------------------------------ */
/* データ                                                              */
/* ------------------------------------------------------------------ */

type Mock = {
  key: string
  index: string
  brand: string
  reading: string
  segment: string
  scenario: string
  highlight: string
  /** 裏側の管理画面（あれば）— B2B/業務システムを作れる証拠 */
  backstage?: string
  buildTime: string
  url: string
  /** プレビュー枠の雰囲気（ブランドごとに世界観を変える） */
  preview: {
    gradient: string
    wordmark: string
    /** ワードマークのタイポ指定 */
    wordmarkClass: string
    tagline: string
    accent: string
  }
}

const mocks: Mock[] = [
  {
    key: "kuon",
    index: "A",
    brand: "久遠 -KUON-",
    reading: "老舗酒蔵のリブランディング",
    segment: "ブランドサイト / 制作・ブランディング",
    scenario:
      "老舗酒蔵のリブランディング提案。コンペ初回に、ブランドの世界観を“動く形”で見せる。",
    highlight: "スクロール演出 → 商品 → 蔵見学予約の動線",
    buildTime: "制作 1日",
    url: MOCK_A_URL,
    preview: {
      gradient:
        "bg-[radial-gradient(120%_120%_at_20%_0%,#3a2a17_0%,#1c1610_55%,#0b0906_100%)]",
      wordmark: "久遠",
      wordmarkClass:
        "font-serif text-6xl tracking-[0.15em] text-amber-50/90 [writing-mode:vertical-rl]",
      tagline: "水、米、そして時間を醸す",
      accent: "amber",
    },
  },
  {
    key: "ruhe",
    index: "B",
    brand: "ruhe",
    reading: "D2Cスキンケアの肌診断",
    segment: "EC / D2C ブランド",
    scenario:
      "D2CスキンケアのCRM施策提案。診断コンテンツで、購入前の不安を解消する。",
    highlight: "肌診断フロー → レコメンド → 購入導線",
    backstage:
      "EC事業者向けの管理画面も（診断傾向のダッシュボード・商品マスタ・レコメンドルール設定）",
    buildTime: "制作 半日",
    url: MOCK_B_URL,
    preview: {
      gradient:
        "bg-[radial-gradient(120%_120%_at_80%_0%,#20302a_0%,#131d19_55%,#0a100d_100%)]",
      wordmark: "ruhe",
      wordmarkClass:
        "font-serif text-5xl lowercase tracking-[0.35em] text-emerald-50/90",
      tagline: "あなたに合う、その一本を",
      accent: "emerald",
    },
  },
  {
    key: "tabiwa",
    index: "C",
    brand: "TABIWA",
    reading: "地域体験の予約プラットフォーム",
    segment: "新規事業 / 地域・観光",
    scenario:
      "地域の体験予約プラットフォーム新規事業。初回打ち合わせで、サービスの骨格を確定させる。",
    highlight: "港町の情景（スクロール演出）→ 体験を選ぶ → 予約の動線",
    buildTime: "制作 1日",
    url: MOCK_C_URL,
    preview: {
      gradient:
        "bg-[radial-gradient(120%_120%_at_50%_0%,#3a2417_0%,#211610_55%,#0d0805_100%)]",
      wordmark: "TABIWA",
      wordmarkClass:
        "text-4xl font-semibold tracking-[0.3em] text-orange-50/90",
      tagline: "港町・汐見の、まだ知らない一日",
      accent: "orange",
    },
  },
]

const steps = [
  {
    title: "見極める",
    description:
      "どの画面と、どの動線が意思決定の肝か。作る前に、勝負どころを一緒に定めます。",
  },
  {
    title: "動くモックにする",
    description:
      "肝に絞って、触れる形へ。要件を見極めて一気に形にするので、最短1日で用意できます。",
  },
  {
    title: "本開発まで引き受ける",
    description:
      "モックで合意できたら、そのまま本番実装へ。作れるチームが、地続きで仕上げます。",
  },
]

/** ブランドごとのホバー・アクセント（Tailwindの動的クラス生成を避けるため静的マップ） */
const accentMap: Record<string, { border: string; text: string; dot: string; glow: string }> = {
  amber: {
    border: "hover:border-amber-400/40",
    text: "text-amber-300",
    dot: "bg-amber-400/70",
    glow: "group-hover:bg-amber-500/10",
  },
  emerald: {
    border: "hover:border-emerald-400/40",
    text: "text-emerald-300",
    dot: "bg-emerald-400/70",
    glow: "group-hover:bg-emerald-500/10",
  },
  orange: {
    border: "hover:border-orange-400/40",
    text: "text-orange-300",
    dot: "bg-orange-400/70",
    glow: "group-hover:bg-orange-500/10",
  },
}

/* ------------------------------------------------------------------ */
/* カード                                                              */
/* ------------------------------------------------------------------ */

function MockCard({ mock }: { mock: Mock }) {
  const accent = accentMap[mock.preview.accent]
  return (
    <a
      href={mock.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05] ${accent.border}`}
    >
      {/* プレビュー枠：ブラウザクロム風 + ブランド世界観 */}
      <div className="relative">
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/30 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-slate-500">
            {mock.url.replace("https://", "")}
          </span>
        </div>
        <div
          className={`relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden ${mock.preview.gradient}`}
        >
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 ${accent.glow}`}
          />
          <span
            className={`relative transition-transform duration-500 ease-out group-hover:-translate-y-1 ${mock.preview.wordmarkClass}`}
          >
            {mock.preview.wordmark}
          </span>
          <span className="relative mt-5 text-[11px] tracking-[0.2em] text-white/45">
            {mock.preview.tagline}
          </span>
        </div>
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
            Mock {mock.index}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300">
            <Clock className="h-3 w-3 text-slate-500" />
            {mock.buildTime}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
          {mock.brand}
        </h3>
        <p className={`mt-1 text-sm font-medium ${accent.text}`}>{mock.reading}</p>

        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            想定シチュエーション
          </span>
          {mock.scenario}
        </p>

        <div className="mt-5 flex items-start gap-2.5 text-sm text-slate-300">
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
          <span>
            <span className="text-slate-500">見どころ：</span>
            {mock.highlight}
          </span>
        </div>

        {mock.backstage ? (
          <div className="mt-2.5 flex items-start gap-2.5 text-sm text-slate-400">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot} opacity-60`} />
            <span>
              <span className="text-slate-500">管理画面：</span>
              {mock.backstage}
            </span>
          </div>
        ) : null}

        <div className="mt-auto pt-7">
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors ${accent.text.replace(
              "text-",
              "group-hover:text-"
            )}`}
          >
            触ってみる
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* ページ                                                              */
/* ------------------------------------------------------------------ */

export default function MocksPage() {
  return (
    <div className="bg-[#030712] antialiased">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#030712] pb-16 pt-36 md:pb-20 md:pt-44">
          <GridBackground fade />
          <Glow className="-top-24 left-1/4 h-80 w-80" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
                  SAMPLE MOCKS
                </p>
                <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
                  初回打ち合わせに、
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                    動くモック
                  </span>
                  を持っていきます
                </h1>
                <p className="mt-7 max-w-2xl leading-relaxed text-slate-400">
                  資料ではなく、触れるものでご判断ください。以下はすべて
                  <span className="text-slate-200">架空案件のサンプルモック</span>
                  です（実案件は守秘のため非公開）。制作にかかった時間も、そのまま記載しています。
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {["3案件のサンプル", "最短1日で制作", "本開発まで一気通貫"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-300"
                      >
                        {chip}
                      </span>
                    )
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Cards */}
        <Section>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {mocks.map((mock, i) => (
              <Reveal key={mock.key} delay={i * 100} className="h-full">
                <MockCard mock={mock} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-center text-xs text-slate-600">
              リンクはすべて別タブで開きます。スマートフォンでもそのままご覧いただけます。
            </p>
          </Reveal>
        </Section>

        {/* Process */}
        <Section variant="alt">
          <SectionHeading
            label="HOW WE WORK"
            title={
              <>
                作る前に見極め、
                <br className="hidden sm:block" />
                最短1日で形にする
              </>
            }
            lead="いきなり全部を作り込むことはしません。意思決定の肝を見極め、そこだけを動く形にする。合意できたら、本番までそのまま引き受けます。"
          />
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="h-full">
                <div className="h-full">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 font-mono text-sm text-sky-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 bg-gradient-to-r from-sky-400/40 to-transparent md:block"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center backdrop-blur md:px-12 md:py-20">
              <Glow className="-top-28 left-1/2 h-64 w-64 -translate-x-1/2" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  御社の題材でも、作ってみせます
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">
                  15分だけお時間をください。想定シーンをうかがい、どの画面と動線を動くモックにするか、その場で見極めます。
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
                  >
                    15分の商談枠を予約する
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-8 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* 架空明記バッジ */}
        <div className="border-t border-white/10 bg-[#030712] py-6">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <p className="text-xs leading-relaxed text-slate-500">
                <span className="mr-2 inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-medium text-amber-300/90">
                  SAMPLE
                </span>
                掲載しているモックはすべて架空案件のサンプルです — 株式会社miitaso
              </p>
              <Link
                href="/mocks"
                className="shrink-0 font-mono text-xs text-slate-500 transition-colors hover:text-slate-300"
              >
                miitaso.com/mocks
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
