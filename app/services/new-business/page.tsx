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

export const metadata: Metadata = {
  title: "新規事業支援 | miitaso",
  description:
    "アイデアの壁打ち・市場調査からMVP開発、グロースまで。エンジニアが企画段階から伴走し、作りながら確かめる新規事業の立ち上げを支援します。",
  alternates: {
    canonical: "https://miitaso.com/services/new-business",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: "新規事業支援 | miitaso",
    description:
      "アイデアの壁打ち・市場調査からMVP開発、グロースまで。エンジニアが企画段階から伴走し、作りながら確かめる新規事業の立ち上げを支援します。",
    url: "https://miitaso.com/services/new-business",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
    title: "新規事業支援 | miitaso",
    description:
      "アイデアの壁打ち・市場調査からMVP開発、グロースまで。エンジニアが企画段階から伴走し、作りながら確かめる新規事業の立ち上げを支援します。",
  },
}

const pains = [
  {
    title: "アイデアはあるが、形にできない",
    description:
      "構想はあるものの、何から作ればよいか分からない。社内に開発リソースがなく、企画書のまま時間だけが過ぎている。",
  },
  {
    title: "市場性の確かめ方が分からない",
    description:
      "思い込みだけで進めるのは不安だが、何をどう調べ、どの仮説から検証すべきかが定まらない。",
  },
  {
    title: "外注すると検証サイクルが遅い",
    description:
      "仕様書を書いて見積もりを取り、納品を待つあいだに前提が変わってしまう。小さく試して学ぶスピードが出ない。",
  },
  {
    title: "事業計画と開発が分断している",
    description:
      "計画を立てる人と作る人が別々で、技術的な実現性やコスト感が計画に反映されないまま進んでしまう。",
  },
]

const offers = [
  {
    title: "アイデア壁打ち・市場調査",
    description:
      "構想段階の壁打ちから、市場・競合の調査までを支援します。自社で運用するAIエージェントによる調査も活用し、検証の初速を上げます。",
    points: [
      "事業アイデアの壁打ちと論点整理",
      "AIエージェントを活用した市場・競合調査",
      "検証すべき仮説の言語化",
    ],
  },
  {
    title: "事業設計・検証計画",
    description:
      "誰のどんな課題を解くのか、何が確かめられれば前に進めるのかを定義し、検証の順序とMVPのスコープを設計します。",
    points: [
      "ターゲットと提供価値の整理",
      "検証項目と優先順位の設計",
      "MVPのスコープ定義",
    ],
  },
  {
    title: "MVP開発",
    description:
      "検証に必要な最小限の機能に絞り、最小コストで市場に出します。要件定義から開発・リリースまでを一気通貫で担います。",
    points: [
      "検証目的に絞った機能設計",
      "Next.js / TypeScript等によるスピード開発",
      "要件定義からリリースまで一気通貫",
    ],
  },
  {
    title: "グロース・改善伴走",
    description:
      "リリース後の利用状況を計測し、学びを次の打ち手に反映します。機能追加・改善を継続的に回し、スケールまで伴走します。",
    points: [
      "利用データの計測と振り返り",
      "機能追加・改善の継続開発",
      "スケールに向けた技術・体制の見直し",
    ],
  },
]

const steps = [
  {
    title: "無料相談",
    description:
      "構想や現状の課題をうかがいます。アイデア段階・企画書なしの状態でも構いません。",
  },
  {
    title: "仮説整理",
    description:
      "誰の何を解決する事業か、何が確かめられれば前進できるかを一緒に言語化します。",
  },
  {
    title: "MVP開発",
    description:
      "検証に必要な最小限のプロダクトを開発し、最小コストで市場に出します。",
  },
  {
    title: "計測と学習",
    description:
      "実際の利用データと反応から学び、仮説を更新して次の打ち手を決めます。",
  },
  {
    title: "スケール",
    description:
      "検証できた価値を軸に、機能拡張や運用体制づくりへと進めていきます。",
  },
]

const cases = [
  {
    category: "自社プロダクト",
    title: "research",
    description:
      "事業アイデアを入力すると、AIがWeb検索で市場規模・競合・参入障壁を調べ、数十秒で簡易レポートを生成する自社ツール。企画から開発まで自社で行い、サイトで公開しています。",
  },
  {
    category: "自社プロダクト",
    title: "Japan Property",
    description:
      "海外投資家向けに日本の温泉地物件を紹介する英語サイト。多言語のLPと問い合わせ導線を自社で企画・制作しました。",
  },
  {
    category: "自社プロダクト",
    title: "compo-kun",
    description:
      "AIで作曲から編集までできる音楽制作プロダクトを自社で開発しています。楽譜の作成・取り込みにも対応しています。",
  },
  {
    category: "コンサルティング",
    title: "自治体の電子通貨アプリ",
    description:
      "ITコンサルタントとして要件定義を担当。構想を実装可能な仕様へ落とし込む工程を支援しました。",
  },
  {
    category: "受託開発",
    title: "ペットオーナー向けSNSアプリ",
    description:
      "ペットオーナー向けのSNSアプリをFlutterで開発しました。",
    result: "他社見積の25%のコストで実現",
  },
  {
    category: "受託開発",
    title: "動画自動クリップ生成ツール",
    description:
      "YouTubeのURLを入力するとショートクリップを自動生成するツールを開発しました。",
  },
]

const faqs = [
  {
    question: "アイデア段階でも相談できますか？",
    answer:
      "はい。壁打ちや市場調査からで構いません。企画書がまだない状態でも、お話を整理するところから始められます。",
  },
  {
    question: "調査だけ、開発だけといった依頼も可能ですか？",
    answer:
      "可能です。市場調査のみ、MVP開発のみなど、フェーズを区切ったご依頼にも対応しています。現状に合わせて進め方をご提案します。",
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer:
      "検証したい仮説とスコープによって変わります。無料相談で内容をうかがったうえでお見積もりします。",
  },
  {
    question: "技術的な知識がなくても大丈夫ですか？",
    answer:
      "問題ありません。技術選定や開発の進め方は分かりやすくご説明し、意思決定に必要な情報を揃えてお渡しします。",
  },
  {
    question: "MVPのリリース後もお願いできますか？",
    answer:
      "はい。リリース後の計測・改善・機能追加まで継続して伴走できます。検証で得た学びを次の開発に反映しながら進めます。",
  },
]

export default function NewBusinessPage() {
  return (
    <div className="bg-[#030712] antialiased">
      <SiteHeader />
      <main>
        <ServiceHero
          label="NEW BUSINESS"
          title={
            <>
              作りながら、
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                確かめる
              </span>
              新規事業。
            </>
          }
          lead="アイデアを検証する最短の方法は、動くものを市場に出してみることです。miitasoはエンジニアが企画段階から伴走するため、調査・設計・開発・改善のサイクルが途切れず、検証を速く回せます。"
          bullets={[
            "アイデアの壁打ち・市場調査からMVP開発、グロースまで一気通貫で支援します",
            "AIエージェントを活用した市場調査で、検証の初速を上げます",
            "自社プロダクトを自ら立ち上げて運用しているチームが伴走します",
          ]}
        />

        <PainList
          lead="新規事業が止まる理由の多くは、構想と開発のあいだの分断にあります。"
          items={pains}
        />

        <OfferGrid
          lead="調査から開発、リリース後の改善まで、検証のサイクル全体をひとつのチームで支援します。"
          items={offers}
        />

        <StepFlow
          lead="大きく作り込む前に、小さく出して学ぶ。このサイクルを一緒に回します。"
          steps={steps}
        />

        <RelatedCases
          label="TRACK RECORD"
          title="自分たちでも、事業を立ち上げています"
          lead="机上の支援ではありません。自社プロダクトの立ち上げ・運用、受託でのMVP開発、自治体案件の要件定義まで、事業づくりの現場に立ってきました。"
          cases={cases}
        />

        <ServiceFaq variant="alt" faqs={faqs} />

        <CtaBand
          variant="default"
          lead="アイデアの壁打ちからでも構いません。構想をうかがい、検証の進め方からご提案します。"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
