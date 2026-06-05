import { notFound } from "next/navigation"
import type { Metadata } from "next"
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-5 py-12">
        {done ? (
          <>
            <ReportMarkdown source={report.report_md as string} />
            <CtaFooter />
          </>
        ) : (
          <Pending status={report.status} />
        )}
      </div>
    </main>
  )
}

function Pending({ status }: { status: string }) {
  if (status === "error") {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-lg font-medium">レポートの作成に失敗しました</p>
        <p className="mt-2 text-sm text-zinc-400">
          お手数ですが、表現を少し変えてLINEからもう一度お試しください。
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
      <p className="text-lg font-medium">レポートを作成中です🔍</p>
      <p className="mt-2 text-sm text-zinc-400">
        市場を調べてまとめています。数分後にこのページを再読み込みしてください。
      </p>
    </div>
  )
}

function CtaFooter() {
  // 環境変数 NEXT_PUBLIC_LINE_ADD_FRIEND_URL に友だち追加/相談URLを設定
  const lineUrl = process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL || "/contact"
  return (
    <div className="mt-12 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm leading-relaxed text-zinc-300">
        このレポートはAIによる初期仮説です。ここから先（誰に・いくらで・何を作らないか／そもそもAIを使うべきか）は、ツバタと壁打ちで詰めましょう。
      </p>
      <a
        href={lineUrl}
        className="mt-4 inline-block rounded-md bg-emerald-500 px-5 py-2.5 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
      >
        LINEで相談する
      </a>
      <p className="mt-6 text-xs text-zinc-500">
        Powered by ツバタ｜新規事業 × AI開発・システム刷新
      </p>
    </div>
  )
}
