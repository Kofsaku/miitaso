import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Lightbulb, MessageCircle, ArrowRight } from "lucide-react"
import { getDb } from "@/lib/db"
import { ReportMarkdown } from "@/app/research/_components/ReportMarkdown"

// リクエストごとにDBから取得する（静的化しない）
export const dynamic = "force-dynamic"

type Report = {
  slug: string
  idea: string
  status: string
  summary: string | null
  report_md: string | null
  created_at: string
}

async function getReport(slug: string): Promise<Report | null> {
  const sql = getDb()
  const rows = (await sql`
    select slug, idea, status, summary, report_md, created_at
    from research_reports
    where slug = ${slug}
    limit 1
  `) as Report[]
  return rows[0] ?? null
}

// 本文先頭の「# タイトル」を抜き出して、ページ見出しとして別レンダリングする。
// 先頭が見出しでなければ title=null で本文をそのまま表示（堅牢なフォールバック）。
function splitTitle(md: string): { title: string | null; body: string } {
  const trimmed = md.replace(/^﻿/, "").trimStart()
  if (trimmed.startsWith("# ")) {
    const nl = trimmed.indexOf("\n")
    const title = (nl === -1 ? trimmed.slice(2) : trimmed.slice(2, nl)).trim()
    const body = nl === -1 ? "" : trimmed.slice(nl + 1)
    return { title, body }
  }
  return { title: null, body: md }
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    }).format(new Date(iso))
  } catch {
    return ""
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const report = await getReport(slug)
  return {
    title: report ? `${report.idea}｜市場調査レポート` : "市場調査レポート",
    // 限定URL: 検索エンジンにインデックスさせない
    robots: { index: false, follow: false },
  }
}

export default async function ResearchReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const report = await getReport(slug)
  if (!report) notFound()

  const done = report.status === "done" && !!report.report_md

  return (
    <main className="min-h-screen bg-white text-zinc-800">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {done ? <ReportView report={report} /> : <Pending status={report.status} />}
      </div>
    </main>
  )
}

function ReportView({ report }: { report: Report }) {
  const { title, body } = splitTitle(report.report_md as string)
  const dateStr = formatDate(report.created_at)

  return (
    <article>
      <header className="mb-8 border-b border-zinc-100 pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 font-semibold uppercase tracking-wider text-emerald-700">
            AI市場調査レポート
          </span>
          <span className="text-zinc-400">初期仮説{dateStr ? ` ・ ${dateStr}` : ""}</span>
        </div>
        {title ? (
          <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-[2rem]">
            {title}
          </h1>
        ) : null}
      </header>

      {report.summary ? <SummaryCallout summary={report.summary} /> : null}

      <ReportMarkdown source={body} />

      <CtaFooter />
    </article>
  )
}

function SummaryCallout({ summary }: { summary: string }) {
  return (
    <div className="mb-10 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
      <Lightbulb
        className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
        aria-hidden="true"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          要点
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-zinc-700">{summary}</p>
      </div>
    </div>
  )
}

function CtaFooter() {
  // 環境変数 NEXT_PUBLIC_LINE_ADD_FRIEND_URL に友だち追加/相談URLを設定
  const lineUrl = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL || "/contact"
  return (
    <div className="mt-14 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 sm:p-7">
      <p className="text-[15px] leading-relaxed text-zinc-700">
        このレポートはAIによる初期仮説です。ここから先（誰に・いくらで・何を作らないか／そもそもAIを使うべきか）は、ツバタと壁打ちで詰めましょう。
      </p>
      <a
        href={lineUrl}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        LINEで相談する
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <p className="mt-6 text-xs text-zinc-400">
        Powered by ツバタ｜新規事業 × AI開発・システム刷新
      </p>
    </div>
  )
}

function Pending({ status }: { status: string }) {
  const error = status === "error"
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center">
      <p className="text-lg font-semibold text-zinc-900">
        {error ? "レポートの作成に失敗しました" : "レポートを作成中です"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        {error
          ? "お手数ですが、表現を少し変えてLINEからもう一度お試しください。"
          : "市場を調べてまとめています。数分後にこのページを再読み込みしてください。"}
      </p>
    </div>
  )
}
