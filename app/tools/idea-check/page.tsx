import type { Metadata } from "next"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { ToolForm } from "@/components/tools/tool-form"

export const metadata: Metadata = {
  title: "新規事業アイデア診断（無料）| miitaso",
  description:
    "事業アイデアを、失敗する4要因（欲しい人がいるか/お金を払うか/見つけてもらえるか/実現できるか）で診断。一番大きいリスクと、それを一番安く確かめる方法を提示します。miitasoの新規事業メソッドを無料で。",
  alternates: { canonical: "https://miitaso.com/tools/idea-check" },
  robots: { index: true, follow: true },
}

export default function IdeaCheckToolPage() {
  return (
    <ToolPageShell
      eyebrow="FREE TOOL / IDEA CHECK"
      title="新規事業アイデア診断"
      lead="アイデアを、新規事業が失敗する4つの要因で診断します。一番大きいリスクを1つに絞り、それを“作り込む前に”安く確かめる方法まで提示します。"
    >
      <ToolForm
        endpoint="/api/tools/idea-check"
        inputName="idea"
        inputType="textarea"
        placeholder="例：忙しい共働き家庭向けに、栄養士が監修したミールキットをサブスクで届ける"
        buttonLabel="アイデアを診断する"
        loadingLabel="診断中"
        resultType="markdown"
        maxLength={600}
        recaptchaAction="tool_idea"
        samples={[
          "職人向けのマッチングアプリ",
          "地域の空き家を活用した宿泊事業",
          "中小企業向けのAI議事録サービス",
        ]}
        note="私たちが実際の新規事業支援で使う考え方（作る前に一番大きいリスクを1つ確かめる）を、そのまま簡易診断にしたものです。AIによる簡易診断のため、あくまで出発点としてご活用ください。"
      />
    </ToolPageShell>
  )
}
