import { Metadata } from "next"
import Image from "next/image"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import { Section, SectionHeading } from "@/components/corporate/section"
import { GridBackground, Glow } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { CtaBand } from "@/components/corporate/service-page"

export const metadata: Metadata = {
  title: "会社概要 | miitaso",
  description:
    "miitasoの会社概要。エンジニア出身の代表・津端晃作のプロフィール、事業内容、所在地をご紹介します。",
  alternates: {
    canonical: "https://miitaso.com/about",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: "会社概要 | miitaso",
    description:
      "miitasoの会社概要。エンジニア出身の代表・津端晃作のプロフィール、事業内容、所在地をご紹介します。",
    url: "https://miitaso.com/about",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
    title: "会社概要 | miitaso",
    description:
      "miitasoの会社概要。エンジニア出身の代表・津端晃作のプロフィール、事業内容、所在地をご紹介します。",
  },
}

const approach = [
  {
    title: "自分たちで作る",
    description:
      "AIエージェントを開発の現場で使い、自社プロダクトを企画から実装まで自分たちの手で作っています。",
  },
  {
    title: "本番で運用する",
    description:
      "作って終わりではなく、AI市場調査botなどの自社プロダクトを実際に本番環境で動かし続けています。",
  },
  {
    title: "その知見で支援する",
    description:
      "日々の開発と運用で得た実践知をもとに、クライアントのAI導入・プロダクト開発を支援します。",
  },
]

const companyInfo = [
  { label: "社名", value: "miitaso" },
  { label: "代表", value: "津端 晃作" },
  { label: "設立", value: "2024年12月" },
  {
    label: "所在地",
    value: "〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F",
  },
  {
    label: "事業内容",
    value: "AI導入支援・ソフトウェア開発・新規事業支援",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#030712] text-slate-300">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#030712] pb-20 pt-36 md:pb-28 md:pt-44">
          <GridBackground fade />
          <Glow className="-top-24 left-1/4 h-80 w-80" />
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="corp-fade-in-up max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
                  ABOUT
                </p>
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  会社概要
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-400">
                  テクノロジーで、挑戦する人の事業を
                  <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text font-semibold text-transparent">
                    前に進める
                  </span>
                  。<br className="hidden sm:block" />
                  miitasoは、課題の定義から実装・運用までを一貫して担う、エンジニア出身のコンサルティング会社です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 私たちについて */}
        <Section
          variant="alt"
          decoration={<Glow className="-top-24 right-0 h-72 w-72" />}
        >
          <SectionHeading
            label="WHO WE ARE"
            title={
              <>
                「考える」と「作る」を
                <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  分けない
                </span>
                会社
              </>
            }
            lead="miitasoは、エンジニア出身の代表が立ち上げた会社です。戦略の提案から、システムの実装・運用までをひとつのチームで担います。自分たちでも事業とプロダクトを作り、その知見をクライアント支援に還元しています。"
          />
          <Reveal>
            <div className="max-w-3xl space-y-5 leading-relaxed text-slate-300">
              <p>
                私たちは、戦略やAIを「語る」だけで終わらせないことを大切にしています。事業アイデアを入力するとAIがWeb検索で市場調査レポートを生成するツールをはじめ、自社プロダクトを企画から開発、運用まで自分たちの手で回しています。だから、提案する施策が本当に実装できるか、運用に耐えるかまで踏み込んで判断できます。
              </p>
              <p>
                要件定義から設計、実装、運用まで一気通貫で担えることが私たちの強みです。日々の開発で実際に使い、動かし続けているからこそ、AI導入やプロダクト開発の現実的な勘所をお伝えできると考えています。
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {approach.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06]">
                  <p className="font-mono text-xs tracking-[0.25em] text-sky-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 代表プロフィール */}
        <Section
          decoration={<Glow className="-bottom-24 left-0 h-72 w-72 bg-violet-500/20" />}
        >
          <SectionHeading
            label="FOUNDER"
            title="代表プロフィール"
            lead="営業からエンジニアへ。現場で手を動かし続けてきた代表が、開発のすべての工程に責任を持ちます。"
          />
          <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr]">
            <Reveal className="mx-auto lg:mx-0">
              <div className="relative w-fit">
                <div className="rounded-3xl bg-gradient-to-br from-sky-400/60 via-blue-500/40 to-violet-500/60 p-[1px]">
                  <Image
                    src="/tsubata.png"
                    width={288}
                    height={288}
                    alt="代表 津端 晃作"
                    className="h-64 w-64 rounded-3xl object-cover ring-1 ring-white/10 md:h-72 md:w-72"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                FOUNDER / ENGINEER
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                津端 晃作
              </h3>
              <div className="mt-6 space-y-5 leading-relaxed text-slate-300">
                <p>
                  新しい事業やプロダクトを立ち上げるとき、いちばんもったいないのは「いいアイデアが、形にならないまま消えていく」ことだと思っています。構想を語れる人はいても、それを最後まで作り切り、運用して育てられる人は驚くほど少ない。
                </p>
                <p>
                  だからこそ、自分がその役割になろうと決めました。経営の課題を一緒に考え、自分の手で実装し、本番で動かし、成果が出るまで伴走する。そんな存在がいれば、挑戦する人はもっと遠くまで行けるはずです。その思いで、2024年12月にmiitasoを創業しました。
                </p>
                <p>
                  私たちにとって、AIも開発も目的ではなく、事業を前に進めるための手段です。語るだけで終わらせない。つくって、動かして、結果で応える。それが、miitasoの約束です。
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 会社概要テーブル */}
        <Section variant="alt">
          <SectionHeading label="COMPANY" title="会社情報" />
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
              <dl className="divide-y divide-white/10">
                {companyInfo.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 md:px-8"
                  >
                    <dt className="text-sm font-medium text-slate-500">
                      {row.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-200 sm:text-base">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Section>

        {/* CTA */}
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  )
}
