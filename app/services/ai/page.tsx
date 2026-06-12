import type { Metadata } from "next"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import {
  ServiceHero,
  PainList,
  OfferGrid,
  StepFlow,
  RelatedCases,
  ServiceFaq,
  CtaBand,
} from "@/components/corporate/service-page"

const pageTitle = "AI導入支援 | miitaso"
const pageDescription =
  "PoCで終わらせない、現場で動くAI導入。自社でAIエージェントを開発・運用しているチームが、業務分析・ユースケース設計からPoC、本番実装・既存システム連携、運用定着まで伴走します。"

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://miitaso.com/services/ai",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: pageTitle,
    description: pageDescription,
    url: "https://miitaso.com/services/ai",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
}

const pains = [
  {
    title: "何から手を付けるべきか分からない",
    description:
      "AIを活用したい気持ちはあるものの、自社のどの業務に効くのか判断できず、検討が止まってしまっている。",
  },
  {
    title: "ツールを入れたが使われていない",
    description:
      "AIツールを契約したものの、現場の業務フローに合わず定着しない。気づけば一部の人だけが使う状態になっている。",
  },
  {
    title: "PoC止まりで業務に組み込めない",
    description:
      "検証では手応えがあったのに、既存システムとの連携や運用設計の壁を越えられず、本番導入に進めない。",
  },
  {
    title: "社内にAI人材がいない",
    description:
      "推進役を担える人材が社内におらず、ベンダーの提案が妥当かどうかも判断できない。",
  },
]

const offers = [
  {
    title: "業務分析・ユースケース設計",
    description:
      "現場の業務フローをヒアリングし、AIが効く工程とそうでない工程を切り分けます。効果を見込める順に優先順位を付け、導入の道筋を設計します。",
    points: [
      "業務フローの棚卸しと課題の構造化",
      "ユースケースの洗い出しと優先順位付け",
      "導入ロードマップの策定",
    ],
  },
  {
    title: "PoC・プロトタイプ開発",
    description:
      "最初から大きく作りません。検証に必要な最小限のプロトタイプを小さく速く作り、実際の業務の中で効果を確かめてから次に進みます。",
    points: [
      "動くプロトタイプによる現場での検証",
      "Claude・OpenAI を使ったAI機能の実装",
      "検証結果に基づく本格導入の判断材料の整理",
    ],
  },
  {
    title: "本番実装・既存システム連携",
    description:
      "検証で手応えのあったものを、業務に組み込める本番品質で実装します。既存システムとのAPI連携まで含めて設計・開発します。",
    points: [
      "LINE・Salesforce・Gmail などのAPI連携",
      "認証・権限設計を含む本番実装",
      "Vercel・AWS 上での構築",
    ],
  },
  {
    title: "運用・内製化伴走",
    description:
      "導入して終わりにしません。運用の中で出てくる改善点に対応しながら、社内のチームだけで回せる状態への移行を支援します。",
    points: [
      "運用ルールと改善サイクルの整備",
      "社内メンバーへのナレッジ移転",
      "効果の振り返りと次の打ち手の検討",
    ],
  },
]

const steps = [
  {
    title: "無料相談",
    description:
      "現状の課題と業務内容をうかがいます。AI導入が有効かどうかの見立ても、この段階で率直にお伝えします。",
  },
  {
    title: "業務分析",
    description:
      "業務フローを棚卸しし、AIを適用するユースケースと優先順位を設計します。",
  },
  {
    title: "小さく検証",
    description:
      "最小限のプロトタイプを開発し、実際の業務の中で効果を検証します。",
  },
  {
    title: "本格導入",
    description:
      "検証で効果を確認できたものを、既存システムと連携する本番品質で実装します。",
  },
  {
    title: "運用伴走",
    description:
      "運用しながら精度と業務フローを改善し、社内で回せる体制づくりまで支援します。",
  },
]

const cases = [
  {
    category: "自社プロダクト",
    title: "research — AI市場調査bot",
    description:
      "LINEで事業アイデアを送ると、AIエージェント（Claude）が市場調査してレポートを自動生成・公開するbot。LINE Webhook（Vercel）から Neon、Claude調査ワーカー、LINE push通知まで、自社で設計・運用しています。",
    result: "数分でレポートを自動生成",
  },
  {
    category: "AIコール領域",
    title: "AI自動稼働システム",
    description:
      "AIコール領域における、AIの自動稼働システムを開発しました。",
  },
  {
    category: "マーケ支援企業",
    title: "SFA・CRM連携ツール",
    description:
      "LINE・Instagram DM・Outlook・Gmail と連携する顧客管理・ステップ配信ツールを開発。複数チャネルの顧客対応を一つの基盤で扱えるようにしました。",
  },
]

const faqs = [
  {
    question: "何から相談すればよいですか？",
    answer:
      "課題が整理できていない段階からで構いません。無料相談で現状をうかがい、AIが効きそうな業務領域の見立てと進め方をご提案します。",
  },
  {
    question: "社内にAIの知識がなくても進められますか？",
    answer:
      "はい。業務分析・ユースケース設計から運用定着まで伴走します。運用ルールの整備やナレッジ移転を通じて、社内のチームだけで回せる状態を目指します。",
  },
  {
    question: "小さく試してから判断できますか？",
    answer:
      "はい。最小限のプロトタイプを小さく速く作り、実際の業務で効果を確かめてから本格導入を判断する進め方を標準としています。",
  },
  {
    question: "既存システムとの連携はできますか？",
    answer:
      "LINE・Salesforce・Gmail などのAPI連携を含む実装の実績があります。現在お使いのシステムを前提に設計します。",
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer:
      "内容と規模によって異なります。無料相談で課題をうかがったうえで、進め方とあわせてお見積もりをご提示します。",
  },
]

export default function AiServicePage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <SiteHeader />
      <main>
        <ServiceHero
          label="AI INTEGRATION"
          title={
            <>
              PoCで終わらせない、
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                現場で動く
              </span>
              AI導入。
            </>
          }
          lead="AIを業務に取り入れたいが、何から始めるべきか分からない。その段階からのご相談で構いません。業務分析から運用定着まで、自社でAIエージェントを本番運用しているチームが支援します。"
          bullets={[
            "AIエージェント「research」を自社で開発し、本番運用しています",
            "LINE・Salesforce・Gmail など既存システムとのAPI連携実績があります",
            "要件定義から運用まで一気通貫で担当します",
          ]}
        />
        <PainList
          lead="中小〜中堅企業のAI導入で、よくうかがう課題です。ひとつでも当てはまれば、お力になれます。"
          items={pains}
        />
        <OfferGrid
          lead="自社プロダクト「research」でAIエージェントを開発・運用している経験をもとに、構想から定着までを4つのフェーズで支援します。"
          items={offers}
        />
        <StepFlow
          lead="小さく検証してから本格導入へ。投資判断ができる形で段階的に進めます。"
          steps={steps}
        />
        <RelatedCases
          lead="クライアントワークは匿名で記載しています。このほか、AIライブ配信アプリ（配信中にAIが自動コメント）や動画自動クリップ生成ツールなどの実装実績があります。"
          cases={cases}
        />
        <ServiceFaq variant="alt" faqs={faqs} />
        <CtaBand variant="default" />
      </main>
      <SiteFooter />
    </div>
  )
}
