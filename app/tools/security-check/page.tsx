import type { Metadata } from "next"
import { ToolPageShell } from "@/components/tools/tool-page-shell"
import { ToolForm } from "@/components/tools/tool-form"

export const metadata: Metadata = {
  title: "Webサイト セキュリティ簡易チェック（無料）| miitaso",
  description:
    "URLを入れるだけで、HTTPS・セキュリティヘッダ（CSP/HSTS等）・Cookieの安全属性・サーバー情報の露出などを簡易診断し、優先度つきの改善ポイントを分かりやすく解説します。無料。",
  alternates: { canonical: "https://miitaso.com/tools/security-check" },
  robots: { index: true, follow: true },
}

export default function SecurityCheckToolPage() {
  return (
    <ToolPageShell
      eyebrow="FREE TOOL / SECURITY CHECK"
      title="Webサイト セキュリティ簡易チェック"
      lead="自社サイトのURLを入れるだけ。HTTPS・セキュリティヘッダ・Cookieの安全性などを診断し、どこを直すべきかを優先度つきで分かりやすくお伝えします。"
    >
      <ToolForm
        endpoint="/api/tools/security-check"
        inputName="url"
        inputType="url"
        placeholder="例：https://example.com"
        buttonLabel="診断する"
        loadingLabel="診断中"
        resultType="security"
        maxLength={200}
        recaptchaAction="tool_security"
        note="公開情報（HTTPレスポンス）のみを見る受動的なチェックです。実際の攻撃・侵入テストは行いません。あくまで簡易チェックのため、本格的な診断・改修が必要な場合はご相談ください。"
      />
    </ToolPageShell>
  )
}
