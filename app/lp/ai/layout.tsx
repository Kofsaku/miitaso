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
    "中小企業向けAI導入支援 | 30分無料AI診断 - 株式会社miitaso",
  description:
    "「AIって、うちでも使えるの？」──その疑問に30分で答えます。フルスタックエンジニアが御社の業務を分析し、最適なAI活用プランをご提案。問い合わせ自動化・書類作成・データ分析など、業界を問わず対応可能。まずは無料AI診断から。",
  openGraph: {
    title: "中小企業向けAI導入支援 | 30分無料AI診断 - 株式会社miitaso",
    description:
      "フルスタックエンジニアが御社の業務を分析し、最適なAI活用プランをご提案。大手コンサルの1/5の費用で導入可能。",
    type: "website",
    locale: "ja_JP",
    url: "https://miitaso.com/lp/ai",
    images: [
      {
        url: "https://miitaso.com/og-ai.png",
        width: 1200,
        height: 630,
        alt: "株式会社miitaso AI導入支援サービス",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "中小企業向けAI導入支援 | 30分無料AI診断 - 株式会社miitaso",
    description:
      "フルスタックエンジニアが御社の業務を分析し、最適なAI活用プランをご提案。",
  },
  alternates: {
    canonical: "https://miitaso.com/lp/ai",
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
        text: "はい、30分のAI診断は完全無料です。診断後に契約の義務も一切ありません。御社の業務にAIがどう活用できるか、具体的にお伝えします。",
      },
    },
    {
      "@type": "Question",
      name: "ITに詳しい人がいなくても大丈夫ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、まったく問題ありません。導入から運用まですべてmiitasoが対応します。操作が必要な場合も、使い方のレクチャーとマニュアルをご用意します。",
      },
    },
    {
      "@type": "Question",
      name: "どのくらいの期間で導入できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "パッケージにより異なりますが、最短2週間〜通常1〜2ヶ月で導入可能です。問い合わせ自動化など、すぐに効果が出る施策から段階的に進めることもできます。",
      },
    },
    {
      "@type": "Question",
      name: "既存のシステムを変える必要がありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "いいえ。既存のシステムやツールはそのまま使い続けられます。AIを「追加」する形で導入するため、現在の業務フローを壊しません。",
      },
    },
    {
      "@type": "Question",
      name: "月額費用はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "月額10万〜30万円のリテイナー型です。パッケージ内容と御社の規模に応じて最適なプランをご提案します。初期導入費は別途お見積もりとなります。",
      },
    },
    {
      "@type": "Question",
      name: "大手コンサルとの違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "大手は「提案書」を作って終わりですが、miitasoは代表自らが設計・実装・運用まで一貫対応します。中間マージンがないため、大手の1/3〜1/5の費用で導入できます。",
      },
    },
    {
      "@type": "Question",
      name: "自社の業界でもAIは使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。問い合わせ対応、書類作成、データ分析など、業界を問わず効果が出る汎用的な活用パターンがあります。無料診断で御社に最適な活用法をご提案します。",
      },
    },
    {
      "@type": "Question",
      name: "導入後のサポートはありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。月額リテイナーにはサポート・改善が含まれます。AIの精度改善、新しい活用シーンの提案、トラブル対応まで継続的にサポートします。",
      },
    },
  ],
}

export default function AILPLayout({
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
