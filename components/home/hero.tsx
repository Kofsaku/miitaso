import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Terminal, type TerminalLine } from "@/components/corporate/terminal"
import { Magnetic } from "@/components/webgl/magnetic"

const terminalLines: TerminalLine[] = [
  { prompt: "$", text: 'LINE: "research 食品ECに参入したい"', done: true },
  { text: "✓ webhook verified", instant: true, className: "text-emerald-400" },
  {
    text: "⠿ Claude agent: 市場規模・競合・参入障壁を調査中…",
    instant: true,
    className: "text-slate-500",
  },
  { text: "✓ レポート生成完了（数分）", instant: true, className: "text-emerald-400" },
  { text: "✓ 公開 → miitaso.com/research/****", instant: true, className: "text-sky-400" },
]

/**
 * トップページのヒーロー。背景はWebGL粒子（stage-loader）が担う。
 * コピーはマスクリビール、ターミナルは粒子収束の着地点（data-terminal-anchor）。
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pt-36">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* コピー */}
          <div>
            <span className="corp-mask-line">
              <span
                className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400"
                style={{ "--mask-delay": "150ms" } as React.CSSProperties}
              >
                CONSULTING × ENGINEERING
              </span>
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="corp-mask-line">
                <span style={{ "--mask-delay": "350ms" } as React.CSSProperties}>
                  考えるだけでも、
                </span>
              </span>
              <span className="corp-mask-line">
                <span
                  className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                  style={{ "--mask-delay": "550ms" } as React.CSSProperties}
                >
                  作るだけでもない。
                </span>
              </span>
            </h1>
            <p
              className="corp-fade-in-up mt-6 max-w-xl leading-relaxed text-slate-400"
              style={{ animationDelay: "800ms" }}
            >
              提案書で終わるコンサルと、言われた通りに作る開発会社。その間を埋めるのが私たちです。経営課題の定義から、システムの実装・運用まで、エンジニア出身のコンサルタントが一貫して成果に伴走します。
            </p>
            <div
              className="corp-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "1000ms" }}
            >
              <Magnetic>
                <Link
                  href="#contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200 sm:w-auto"
                >
                  無料相談する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="#services"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
                >
                  サービスを見る
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* research bot の実フロー再現ターミナル（粒子収束の着地点） */}
          <div
            className="corp-fade-in"
            style={{ animationDelay: "1600ms" }}
            data-terminal-anchor
          >
            <Terminal title="miitaso — research bot" lines={terminalLines} />
            <p className="mt-3 text-center text-xs text-slate-500">
              口だけにしない証拠に——自社で本番運用しているAIエージェント「research」の実際の処理フロー
            </p>
          </div>
        </div>
      </div>

      {/* スクロールキュー */}
      <div
        aria-hidden
        className="corp-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        style={{ animationDelay: "2200ms" }}
      >
        <p className="font-mono text-[10px] tracking-[0.35em] text-slate-500">SCROLL</p>
        <span className="corp-scroll-cue mx-auto mt-2 block h-8 w-px bg-gradient-to-b from-sky-400/80 to-transparent" />
      </div>
    </section>
  )
}
