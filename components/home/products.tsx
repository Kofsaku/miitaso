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

/** 実際に作って動かしているプロダクト（事実シート準拠） */
type Product = { tag: string; name: string; description: string; href?: string; linkLabel?: string }
const products: Product[] = [
  {
    tag: "REAL ESTATE / GLOBAL",
    name: "Japan Property",
    description:
      "海外投資家に向けて、日本の温泉地の物件を英語で紹介するサイト。多言語のLPと、そのまま問い合わせにつながる導線を束ねています。",
    href: "/lp/japan-property",
    linkLabel: "サイトを見る",
  },
  {
    tag: "AI / MUSIC",
    name: "compo-kun",
    description:
      "作曲から編集までをAIで行える音楽制作プロダクト。かんたんな指定から曲を組み立て、楽譜の作成・取り込みにも対応します。ご希望の方にはデモをご案内しています。",
  },
  {
    tag: "AI / PICTURE BOOK",
    name: "picture-book",
    description:
      "つくりたい物語を入れると、AIが文章と挿絵からオリジナルの絵本を組み立てるプロダクト。実際に動く形まで作り込んでいます。",
  },
]

/**
 * 自社プロダクト＆ツール（旧Products＋旧無料ツールを統合）。
 * 「助言だけで終わらない証拠」＝自分たちで作って動かしているもの。
 * その場で試せるツールと、運用中のプロダクトを1セクションに。id="products"。
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
        label="PRODUCTS & TOOLS"
        title={
          <>
            自分たちで作って、
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              動かしています
            </span>
          </>
        }
        lead="助言だけで終わらせない証拠に、自社でも事業とプロダクトを作り、運用しています。いくつかは、この場で試せます。"
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

      {/* 自社で作ったプロダクト */}
      <p className="mb-5 mt-14 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
        自社プロダクト
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.name} delay={i * 80} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">
                {product.tag}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">{product.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {product.description}
              </p>
              {product.href ? (
                <Link
                  href={product.href}
                  data-cursor-label="VIEW"
                  className="mt-6 inline-flex items-center text-sm font-medium text-sky-400 transition hover:text-sky-300"
                >
                  {product.linkLabel}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
