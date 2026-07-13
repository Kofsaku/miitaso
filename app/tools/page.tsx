import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LineChart, Lightbulb, ShieldCheck } from "lucide-react"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"

export const metadata: Metadata = {
  title: "無料ツール | miitaso",
  description:
    "miitasoが自社で作って運用しているAIツールを無料で公開。AI市場調査・新規事業アイデア診断・Webサイトのセキュリティ簡易チェック。登録不要でその場で試せます。",
  alternates: { canonical: "https://miitaso.com/tools" },
}

const tools = [
  {
    icon: LineChart,
    href: "/tools/research",
    label: "MARKET RESEARCH",
    title: "AI市場調査",
    desc: "事業アイデアを入れると、AIがWeb検索で市場規模・競合・参入障壁・最初に確かめることを簡易レポートに。",
  },
  {
    icon: Lightbulb,
    href: "/tools/idea-check",
    label: "IDEA CHECK",
    title: "新規事業アイデア診断",
    desc: "失敗する4要因で診断し、一番大きいリスクと、それを安く確かめる方法を提示します。",
  },
  {
    icon: ShieldCheck,
    href: "/tools/security-check",
    label: "SECURITY CHECK",
    title: "セキュリティ簡易チェック",
    desc: "URLを入れるだけで、HTTPS・セキュリティヘッダ・Cookieの安全性を診断し、直すべき点を解説。",
  },
]

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <SiteHeader />
      <main className="relative overflow-hidden pb-24 pt-32 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]"
        />
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">FREE TOOLS</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              自分たちで作って、
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                無料で公開
              </span>
              しているツール
            </h1>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-300">
              「助言だけで終わらない」証拠に。私たちが実際に使う考え方を、その場で試せるツールにしました。登録不要・無料です。
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                  <t.icon className="h-5 w-5 text-sky-400" />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{t.label}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{t.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{t.desc}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-sky-400">
                  試してみる
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
