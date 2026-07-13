import Link from "next/link"
import { ArrowRight, LineChart, Lightbulb, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Glow } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

/** その場で試せる自社ツール（無料・登録不要）。研究botはLINE版を廃しサイト内ツール化 */
type Tool = { icon: LucideIcon; href: string; label: string; name: string; description: string }
const tools: Tool[] = [
  {
    icon: LineChart,
    href: "/tools/research",
    label: "MARKET RESEARCH",
    name: "AI市場調査",
    description:
      "事業アイデアを入れると、AIがWeb検索で市場規模・競合・参入障壁・最初に確かめることを簡易レポートにまとめます。",
  },
  {
    icon: Lightbulb,
    href: "/tools/idea-check",
    label: "IDEA CHECK",
    name: "新規事業アイデア診断",
    description:
      "失敗する4要因で診断し、一番大きいリスクと、それを安く確かめる方法を提示します。",
  },
  {
    icon: ShieldCheck,
    href: "/tools/security-check",
    label: "SECURITY CHECK",
    name: "セキュリティ簡易チェック",
    description:
      "URLを入れるだけで、HTTPS・セキュリティヘッダ・Cookieの安全性を診断し、直すべき点を解説します。",
  },
]

/** 受託・コンサルとは別に、自社で手がけている事業（AIプロダクトを自分たちで事業にしている） */
type Venture = { tag: string; name: string; description: string }
const ventures: Venture[] = [
  {
    tag: "EDUCATION",
    name: "子ども向け 英語×プログラミング教育",
    description:
      "マインクラフトを教材に、子どもが英語で試行錯誤しながらプログラミングを学ぶ教育事業。",
  },
  {
    tag: "AI / MUSIC",
    name: "AI作曲・編曲・楽譜作成",
    description:
      "自社のAIプロダクト『compo-kun』を使い、作曲から編曲・楽譜作成までを手がける音楽事業。",
  },
  {
    tag: "AI / PICTURE BOOK",
    name: "AIオリジナル絵本の制作",
    description:
      "自社のAIツール『picture-book』を使い、一人ひとりに合わせたオリジナル絵本をつくる事業。",
  },
]

/**
 * 「助言だけで終わらない証拠」。自分たちでツールを作り、AIで自社の事業もやっている。
 * その場で試せるツールと、自社で手がける事業を1セクションに。id="products"。
 */
export function Products() {
  return (
    <Section
      id="products"
      variant="transparent"
      chapter="05 プロダクト"
      className="scroll-mt-16"
      decoration={<Glow className="-top-24 left-0 bg-violet-500/15" />}
    >
      <SectionHeading
        label="TOOLS & VENTURES"
        title={
          <>
            作る側であり、
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              やる側でもある
            </span>
          </>
        }
        lead="助言だけで終わらせない証拠に、自分たちでAIツールを作り、AIを使った事業も手がけています。ツールは、この場で試せます。"
      />

      {/* その場で試せるツール */}
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
        その場で試せるツール（無料・登録不要）
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool, i) => (
          <Reveal key={tool.href} delay={i * 80} className="h-full">
            <Link
              href={tool.href}
              data-cursor-label="TRY"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <tool.icon className="h-5 w-5 text-sky-400" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                {tool.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{tool.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{tool.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-sky-400">
                試してみる
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* 自社で手がける事業 */}
      <p className="mb-5 mt-14 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
        自社で手がける事業
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={i * 80} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">
                {v.tag}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">{v.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{v.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
