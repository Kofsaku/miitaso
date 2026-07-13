import { Fragment } from "react"
import Link from "next/link"
import { ArrowLeftRight, ArrowRight } from "lucide-react"
import { GridBackground } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

type FlowNode = {
  caption: string
  name: string
  sub: string
  /** このノードの手前に置くコネクタ。"both" は双方向矢印 */
  connector?: "arrow" | "both"
}

/** このサイトで実際に動いている「AI市場調査ツール」の構成 */
const flowNodes: FlowNode[] = [
  { caption: "INPUT", name: "このサイト", sub: "事業アイデアを入力" },
  { caption: "SERVER", name: "Vercel / API", sub: "miitaso.com", connector: "arrow" },
  { caption: "AI", name: "OpenAI", sub: "Web検索・分析", connector: "both" },
  {
    caption: "OUTPUT",
    name: "市場調査レポート",
    sub: "その場で表示",
    connector: "arrow",
  },
]

const notes = [
  {
    title: "このサイトで動くAIツール",
    description:
      "上の図は、このページの『無料ツール』にある AI市場調査 の実際の構成です。「できます」と言う代わりに、動くものを置いておく——登録不要で、その場で試せます。",
  },
  {
    title: "課題定義が9割",
    description:
      "AI導入の成否は、モデルの性能ではなく「どの業務に、何のために入れるか」でほぼ決まります。私たちは技術の手前にある業務分析と課題定義から入り、効かない場所には「AIを入れない」提案もします。",
  },
]

/**
 * How we build — research bot のアーキテクチャ図解。
 */
export function HowWeBuild() {
  return (
    <Section variant="transparent" chapter="02 考え方" decoration={<GridBackground fade />}>
      <SectionHeading
        label="OUR APPROACH"
        title={
          <>
            AIは、
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              道具
            </span>
            にすぎません
          </>
        }
        lead="成果を分けるのは、どの業務に・何のために組み込むかという課題定義です。そのうえで、使い切る技術力は「実際に動くもの」で示します。下の図は、このサイトで動かしているAI市場調査ツールの構成です。今すぐ試せます。"
      />

      {/* アーキテクチャ図 */}
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-[#050a18]/70 p-5 backdrop-blur md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-slate-400">
              ai market research — live architecture
            </p>
            <Link
              href="/tools/research"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300 transition hover:bg-sky-400/20"
            >
              実際に試す
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-3">
            {flowNodes.map((node) => (
              <Fragment key={node.name}>
                {node.connector ? (
                  <div
                    aria-hidden
                    className="flex shrink-0 items-center justify-center self-center text-sky-400"
                  >
                    {node.connector === "both" ? (
                      <ArrowLeftRight className="h-4 w-4 rotate-90 lg:rotate-0" />
                    ) : (
                      <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
                    )}
                  </div>
                ) : null}
                <div className="flex-1 rounded-xl border border-white/10 bg-[#0b1120] px-4 py-5 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                    {node.caption}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-white">{node.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{node.sub}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 補足 */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {notes.map((note, i) => (
          <Reveal key={note.title} delay={i * 80} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{note.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{note.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
