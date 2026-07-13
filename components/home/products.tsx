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

/** 事実シート「自社プロダクト」。AIツール群は別セクション（無料ツール）に集約 */
const products: Product[] = [
  {
    tag: "REAL ESTATE / GLOBAL",
    name: "Japan Property",
    description:
      "海外投資家に向けて、日本の温泉地の物件を英語で紹介するサイト。多言語のランディングページと、そのまま問い合わせにつながる導線をひとつに束ねています。",
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
 * 自社プロダクト。id="products" は フッターの /#products の着地先。
 */
export function Products() {
  return (
    <Section
      id="products"
      variant="transparent"
      chapter="03 プロダクト"
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
        lead="助言だけで終わらない証拠に。自分たちでも事業とプロダクトを作り、動かしています。そこで得た手触りを、そのままクライアントワークに還元しています。"
      />
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
