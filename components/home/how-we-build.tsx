import { Fragment } from "react"
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

/** research bot の実アーキテクチャ（事実シート記載の構成） */
const flowNodes: FlowNode[] = [
  { caption: "INPUT", name: "LINE", sub: "事業アイデアを送信" },
  { caption: "VERCEL", name: "Webhook", sub: "署名検証", connector: "arrow" },
  { caption: "DATABASE", name: "Neon (Postgres)", sub: "ジョブ・レポート管理", connector: "arrow" },
  { caption: "AI WORKER", name: "Claude 調査ワーカー", sub: "市場調査・レポート生成", connector: "both" },
  {
    caption: "OUTPUT",
    name: "自動公開 + LINE push通知",
    sub: "miitaso.com/research",
    connector: "arrow",
  },
]

const notes = [
  {
    title: "本番で動くAIエージェント",
    description:
      "LINEのWebhook受信と署名検証、ジョブ管理、Claudeによる調査・執筆、レポートの自動公開まで。この図の構成は、実際に本番で運用しているものです。",
  },
  {
    title: "開発プロセスもAI駆動",
    description:
      "ClaudeをはじめとするAIを開発プロセスに常用し、設計・実装・検証のサイクルを高速に回しています。クライアントワークの開発も、同じ進め方で行います。",
  },
]

/**
 * How we build — research bot のアーキテクチャ図解。
 */
export function HowWeBuild() {
  return (
    <Section decoration={<GridBackground fade />}>
      <SectionHeading
        label="HOW WE BUILD"
        title={
          <>
            私たちは、自分たちのプロダクトを
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              AIで作っています
            </span>
          </>
        }
        lead="自社プロダクト『research』は、LINEに事業アイデアを送ると、AIエージェントが市場調査してレポートを自動公開するbotです。その実際のアーキテクチャを公開します。"
      />

      {/* アーキテクチャ図 */}
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur md:p-8">
          <p className="mb-6 font-mono text-xs text-slate-500">
            research — production architecture
          </p>
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
                  <p className="mt-1 text-xs text-slate-500">{node.sub}</p>
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
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{note.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{note.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
