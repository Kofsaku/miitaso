import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Terminal, type TerminalLine } from "@/components/corporate/terminal"

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
 * トップページのヒーロー。fixed ヘッダー対応の上余白込み。
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* コピー */}
          <div className="corp-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
              CONSULTING × ENGINEERING
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              考えるだけでも、
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                作るだけでもない。
              </span>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
              提案書で終わるコンサルと、言われた通りに作る開発会社。その間を埋めるのが私たちです。経営課題の定義から、システムの実装・運用まで、エンジニア出身のコンサルタントが一貫して成果に伴走します。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
              >
                無料相談する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-white transition hover:bg-white/10"
              >
                サービスを見る
              </Link>
            </div>
          </div>

          {/* research bot の実フロー再現ターミナル */}
          <div className="corp-fade-in-up" style={{ animationDelay: "180ms" }}>
            <Terminal title="miitaso — research bot" lines={terminalLines} />
            <p className="mt-3 text-center text-xs text-slate-500">
              口だけにしない証拠に——自社で本番運用しているAIエージェント「research」の実際の処理フロー
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
