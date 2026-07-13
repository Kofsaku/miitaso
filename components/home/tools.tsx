import Link from "next/link"
import { ArrowRight, LineChart, Lightbulb, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

type Tool = { icon: LucideIcon; href: string; label: string; title: string; desc: string }

const tools: Tool[] = [
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

/**
 * 無料ツール群。「助言だけで終わらない証拠」＝自社で作って本番運用しているツールを、
 * その場で試せる形で見せる（リードマグネットも兼ねる）。id="tools" はナビの着地先。
 */
export function Tools() {
  return (
    <Section id="tools" variant="transparent" className="scroll-mt-16">
      <SectionHeading
        label="FREE TOOLS"
        title={
          <>
            その場で試せる
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              無料ツール
            </span>
          </>
        }
        lead="「作れる」を言葉でなく手触りで。私たちが実際に使う考え方を、その場で動くツールにして公開しています。登録不要・無料です。"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((t, i) => (
          <Reveal key={t.href} delay={i * 80} className="h-full">
            <Link
              href={t.href}
              data-cursor-label="TRY"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <t.icon className="h-5 w-5 text-sky-400" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{t.label}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{t.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{t.desc}</p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-sky-400">
                試してみる
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
