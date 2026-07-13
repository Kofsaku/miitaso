import type { Metadata } from "next"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { ToolForm } from "@/components/tools/tool-form"

export const metadata: Metadata = {
  title: "AI市場調査ツール（無料）| miitaso",
  description:
    "事業アイデアを入力するだけで、AIがWeb検索を使って市場規模の目安・競合・参入障壁・最初に確かめるべきことを簡易レポートにまとめます。miitasoが自社で運用する調査ツールを無料で試せます。",
  alternates: { canonical: "https://miitaso.com/tools/research" },
  robots: { index: true, follow: true },
}

export default function ResearchToolPage() {
  return (
    <ToolPageShell
      eyebrow="FREE TOOL / MARKET RESEARCH"
      title="AI市場調査ツール"
      lead="事業アイデアを1行入れるだけ。AIがWeb検索で、市場規模の目安・競合・参入障壁・最初に確かめるべきことを簡易レポートにまとめます。"
    >
      <ToolForm
        endpoint="/api/tools/research"
        inputName="idea"
        inputType="textarea"
        placeholder="例：地方の中古車販売店向けに、在庫写真をAIが自動加工して出品するアプリ"
        buttonLabel="市場を調査する"
        loadingLabel="調査中"
        resultType="markdown"
        maxLength={500}
        recaptchaAction="tool_research"
        samples={[
          "高齢者向けの見守り宅配弁当",
          "建設業向けの現場写真AI整理アプリ",
          "個人経営の飲食店向けAI予約電話",
        ]}
        note="このツールは miitaso が自社で構築・運用しているものです。結果はAIによる簡易・概算のため、意思決定の前には一次情報での裏取りをおすすめします。無料でお試しいただけます（1日の利用回数に上限があります）。"
      />
    </ToolPageShell>
  )
}
