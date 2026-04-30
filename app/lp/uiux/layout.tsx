import type { Metadata } from "next"
import Script from "next/script"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title:
    "システムUI改善・UI/UXデザイン刷新 | 30分無料UI診断 - 株式会社miitaso",
  description:
    "システムのUIが古い、使いにくい──そんな課題を解決します。エンジニア出身のUIデザイナーが、既存システムを壊さずにUIだけを刷新。React/Next.js等のフロントエンド実装まで一貫対応。まずは30分無料UI診断から。",
  openGraph: {
    title: "システムUI改善 | 30分無料UI診断 - 株式会社miitaso",
    description:
      "既存システムを壊さずにUIだけを刷新。エンジニア出身のUIデザイナーが、デザインからフロントエンド実装まで一貫対応します。",
    type: "website",
    locale: "ja_JP",
    url: "https://miitaso.com/lp/uiux",
    images: [
      {
        url: "https://miitaso.com/og-uiux.png",
        width: 1200,
        height: 630,
        alt: "株式会社miitaso UI/UX改善サービス",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "システムUI改善 | 30分無料UI診断 - 株式会社miitaso",
    description:
      "既存システムを壊さずにUIだけを刷新。デザインからフロントエンド実装まで一貫対応。",
  },
  alternates: {
    canonical: "https://miitaso.com/lp/uiux",
  },
}

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "本当に無料ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、30分のUI診断は完全無料です。診断後に契約の義務も一切ありません。",
      },
    },
    {
      "@type": "Question",
      name: "UIだけ変えてサーバーサイドはそのままにできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、それが私たちの最も得意とするアプローチです。UIレイヤーのみを刷新し、既存のAPI・データベース・ビジネスロジックはそのまま活かします。",
      },
    },
    {
      "@type": "Question",
      name: "既存の開発会社との協業は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、むしろ推奨しています。実際の事例でも、miitasoがUI/UXデザインとフロントエンドを担当し、サーバーサイドは既存の開発会社が担当する体制で成功しています。",
      },
    },
    {
      "@type": "Question",
      name: "デザインだけの依頼も可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、Figmaでのデザイン納品のみも承ります。その場合、御社の開発チームがフロントエンド実装を行う形になります。",
      },
    },
    {
      "@type": "Question",
      name: "どんなシステムに対応していますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "業務システム、管理画面、SaaS、社内ツールなど、Web系のシステム全般に対応しています。",
      },
    },
    {
      "@type": "Question",
      name: "対応できるフレームワークは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "React / Next.js / Vue.js / Angular等のモダンフレームワークに対応しています。レガシーなフレームワークからの移行もご相談ください。",
      },
    },
    {
      "@type": "Question",
      name: "オンラインのみですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、UI診断はZoomを使ったオンライン実施となります。全国どこからでもご参加いただけます。プロジェクト開始後もリモート中心で進行します。",
      },
    },
    {
      "@type": "Question",
      name: "診断後にしつこい営業はありませんか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ありません。診断後のご連絡は改善ポイントシートの送付メール1通のみです。",
      },
    },
  ],
}

export default function UIUXLPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={notoSansJP.className}>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      {children}
    </div>
  )
}
