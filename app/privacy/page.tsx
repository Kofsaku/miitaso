import { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | miitaso",
  description: "miitasoのプライバシーポリシーについて",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg mb-6">
          株式会社miitaso（以下「当社」）は、お客様の個人情報の保護を重要視し、以下のプライバシーポリシーに従って適切に取り扱います。
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 収集する個人情報</h2>
          <p className="mb-4">当社は以下の個人情報を収集する場合があります：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>お名前</li>
            <li>メールアドレス</li>
            <li>電話番号</li>
            <li>会社名・部署名</li>
            <li>お問い合わせ内容</li>
            <li>その他、サービス提供に必要な情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 個人情報の利用目的</h2>
          <p className="mb-4">収集した個人情報は以下の目的で利用します：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>お問い合わせへの対応</li>
            <li>サービスの提供・運営</li>
            <li>重要なお知らせの配信</li>
            <li>サービス改善のための分析</li>
            <li>マーケティング・営業活動</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 個人情報の第三者提供</h2>
          <p className="mb-4">
            当社は、法令に基づく場合や、お客様の事前の同意がある場合を除き、
            収集した個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 個人情報の管理</h2>
          <p className="mb-4">
            当社は、個人情報の正確性を保ち、安全に管理するため、適切な措置を講じます。
            不正アクセス、紛失、破損、改ざん、漏洩などを防止するため、必要かつ適切な安全管理措置を実施します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookieの使用</h2>
          <p className="mb-4">
            当サイトでは、サービスの向上のためCookieを使用する場合があります。
            Cookieの使用を望まない場合は、ブラウザの設定により無効にすることができます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Google Analytics</h2>
          <p className="mb-4">
            当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。
            Google Analyticsは、Cookieを使用してユーザーの行動に関する情報を収集します。
            詳細については、Googleのプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. reCAPTCHA</h2>
          <p className="mb-4">
            当サイトでは、スパム対策のためGoogleのreCAPTCHAサービスを使用しています。
            reCAPTCHAの使用については、Googleのプライバシーポリシーと利用規約が適用されます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 個人情報に関するお問い合わせ</h2>
          <p className="mb-4">
            個人情報の開示、訂正、削除等をご希望の場合は、以下の連絡先までお問い合わせください。
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>株式会社miitaso</strong></p>
            <p>メール：info@miitaso.com</p>
            <p>住所：〒104-0061 東京都中央区銀座1丁目12番4号N&E BLD.6F</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. プライバシーポリシーの変更</h2>
          <p className="mb-4">
            当社は、必要に応じて本プライバシーポリシーを変更することがあります。
            変更した場合は、当サイトに掲載してお知らせします。
          </p>
        </section>

        <div className="text-right mt-8 text-gray-600">
          <p>制定日：2024年4月22日</p>
          <p>最終更新日：2024年4月22日</p>
        </div>
      </div>
    </div>
  )
}