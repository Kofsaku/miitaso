import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"

type Props = {
  eyebrow: string
  title: ReactNode
  lead: string
  children: ReactNode
}

/** 無料ツールの共通レイアウト（コーポレートのダークUIに揃える）。 */
export function ToolPageShell({ eyebrow, title, lead, children }: Props) {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <SiteHeader />
      <main className="relative overflow-hidden pb-24 pt-32 md:pt-36">
        {/* 発光 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[120px]"
        />
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/#tools"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition hover:text-sky-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              無料ツール一覧
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-300">{lead}</p>
          </div>

          <div className="mt-10 md:mt-12">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
