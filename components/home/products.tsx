import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Glow } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

type Product = {
  tag: string
  name: string
  description: string
  href?: string
  linkLabel?: string
}

/** 事実シート「自社プロダクト」の4つ */
const products: Product[] = [
  {
    tag: "AI AGENT / LINE BOT",
    name: "research",
    description:
      "LINEで事業アイデアを送ると、AIエージェント（Claude）が市場調査を行い、数分でレポートを自動生成して公開するbotです。LINE Webhook（署名検証）、Neon（Postgres）、Claude調査ワーカーで構成しています。",
  },
  {
    tag: "REAL ESTATE / GLOBAL",
    name: "Japan Property",
    description:
      "海外投資家向けに日本の温泉地物件を紹介する英語サイトです。多言語対応のLPと問い合わせ導線を備えています。",
    href: "/lp/japan-property",
    linkLabel: "サイトを見る",
  },
  {
    tag: "EDUCATION",
    name: "マイクラ English",
    description:
      "「遊んでたら、英語ができてた。」をコンセプトにした、マインクラフト×英語学習サービスです。",
    href: "/minecraft-english",
    linkLabel: "サイトを見る",
  },
  {
    tag: "INTERNAL SYSTEM",
    name: "物件管理システム",
    description:
      "物件・ブローカー情報を一元管理する社内基幹システムです。認証・権限管理を備えています。",
  },
]

/**
 * 自社プロダクト。id="products" は フッターの /#products の着地先。
 */
export function Products() {
  return (
    <Section
      id="products"
      variant="alt"
      className="scroll-mt-16"
      decoration={<Glow className="-top-24 left-0 bg-violet-500/15" />}
    >
      <SectionHeading
        label="PRODUCTS"
        title={
          <>
            自社
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              プロダクト
            </span>
          </>
        }
        lead="受託開発だけでなく、自分たちのプロダクトを作り、本番で運用しています。その経験をクライアントワークにも還元しています。"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.name} delay={i * 80} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06]">
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
