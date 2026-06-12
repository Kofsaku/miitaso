import type { Metadata } from "next"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import { Section, SectionHeading } from "@/components/corporate/section"
import { Reveal } from "@/components/corporate/reveal"
import { Stat } from "@/components/corporate/stat"
import {
  ServiceHero,
  PainList,
  OfferGrid,
  StepFlow,
  RelatedCases,
  ServiceFaq,
  CtaBand,
} from "@/components/corporate/service-page"

const pageTitle = "ソフトウェア開発 | miitaso"
const pageDescription =
  "要件定義から運用まで、一気通貫。Webアプリ・業務システム・モバイルアプリを、成果から逆算して速く・確かに開発します。他社見積2,000万円の開発を500万円で実現した実例があります。"

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://miitaso.com/services/development",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://miitaso.com/services/development",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
}

const gradientText =
  "bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"

const pains = [
  {
    title: "開発会社の見積もりが高すぎる",
    description:
      "相見積もりを取っても金額に納得感がなく、何にいくらかかるのかの内訳も見えない。妥当性を判断できないまま発注を迫られている。",
  },
  {
    title: "発注後の進捗が見えない",
    description:
      "開発を任せたあとはブラックボックス。納品間際まで動くものを確認できず、認識のずれに気づくのが遅れてしまう。",
  },
  {
    title: "作って終わりで運用が不安",
    description:
      "リリース後の保守や改善を誰が担うのかが曖昧。不具合対応や機能追加のたびに、体制を組み直すことになる。",
  },
  {
    title: "技術選定を相談できる相手がいない",
    description:
      "社内にエンジニアがおらず、提案された技術構成が適切なのか判断できない。中立的な立場で相談できる相手が欲しい。",
  },
]

const offers = [
  {
    title: "Webアプリ・業務システム開発",
    description:
      "Next.js / React / TypeScript を中心としたモダンな構成で、顧客向けWebサービスから社内の業務システムまで開発します。",
    points: [
      "Next.js / React / TypeScript によるWeb開発",
      "PostgreSQL(Neon) / Firebase / AWS / Vercel での構築・運用",
      "認証・権限管理を含む業務システムの設計",
    ],
  },
  {
    title: "モバイルアプリ開発",
    description:
      "Flutter により、1つのコードベースで iOS / Android 両対応のアプリを開発します。開発・保守のコストを抑えながら、必要な機能を確実に実装します。",
    points: [
      "Flutter による iOS / Android 同時開発",
      "決済・SMS認証などの機能実装",
      "ペットオーナー向けSNSアプリなどの開発実績",
    ],
  },
  {
    title: "EC・外部サービス連携",
    description:
      "Shopify を使ったECサイトの構築・改修や、外部サービスと連携するシステムの開発に対応します。",
    points: [
      "Shopify によるEC構築・改修",
      "Salesforce API / LINE Messaging API 連携",
      "決済APIなど外部サービスの組み込み",
    ],
  },
  {
    title: "保守・グロース運用",
    description:
      "リリース後の不具合対応に加えて、データを見ながらの継続的な機能改善まで伴走します。作って終わりにしません。",
    points: [
      "障害対応・セキュリティ更新",
      "機能追加・改善の継続開発",
      "運用を見据えた設計とドキュメント整備",
    ],
  },
]

const strengths = [
  {
    title: "AIを使い切る開発プロセス",
    description:
      "Claude などの AI を開発プロセスに常用し、設計・実装・テストのサイクルを高速に回しています。AIエージェントが市場調査レポートを自動生成する自社プロダクトも、同じ手法で開発・運用しています。",
  },
  {
    title: "実例のあるコスト効率",
    description:
      "他社から2,000万円の見積もりが出ていたペットオーナー向けSNSアプリ（Flutter）を、500万円で実現した実例があります。本当に必要な機能の見極めと無駄のない体制で、品質を保ちながらコストを抑えます。",
  },
  {
    title: "代表自身がエンジニア",
    description:
      "代表が要件定義から設計・開発・運用までを一気通貫で担えるエンジニアです。窓口と作り手が分かれないため、認識のずれや伝言のコストが生まれません。",
  },
]

const cases = [
  {
    category: "モバイル / Flutter",
    title: "ペットオーナー向けSNSアプリ",
    description:
      "他社では2,000万円の見積もりだったSNSアプリを、Flutter の採用とスコープの見極めにより500万円で開発しました。",
    result: "他社見積2,000万円 → 500万円で実現",
  },
  {
    category: "業務システム / DX",
    title: "中古車関連企業の在庫管理DX",
    description:
      "中古車関連企業向けに、車両在庫管理のDX・在庫管理システムを多数開発しています。",
  },
  {
    category: "Webアプリ",
    title: "仕事紹介系アプリ",
    description:
      "React + Laravel による仕事紹介系アプリを開発。決済機能やSMS認証など、運用に必要な機能を実装しました。",
  },
  {
    category: "自社プロダクト",
    title: "物件管理システム",
    description:
      "物件・ブローカー情報を一元管理する社内基幹システムを自社開発。認証・権限管理を備え、実際に運用しています。",
  },
]

const steps = [
  {
    title: "ヒアリング",
    description:
      "現状の課題・目的・予算感をうかがいます。要件が固まっていない段階からでも構いません。",
  },
  {
    title: "要件定義・設計",
    description:
      "作るべきものを言語化し、技術選定とあわせて全体像を設計します。代表エンジニアが直接担当します。",
  },
  {
    title: "アジャイル開発",
    description:
      "短いサイクルで動くものを作り、週次で進捗を共有します。早い段階から実物を確認いただけます。",
  },
  {
    title: "リリース",
    description:
      "本番環境への展開と動作検証までを行い、安全にリリースします。",
  },
  {
    title: "運用",
    description:
      "リリース後の保守・改善を継続します。データを見ながら、次の打ち手をともに考えます。",
  },
]

const faqs = [
  {
    question: "相談の段階で要件が固まっていなくても大丈夫ですか？",
    answer:
      "はい。課題の整理段階からで構いません。ヒアリングを通じて要件を一緒に言語化し、進め方とあわせてご提案します。",
  },
  {
    question: "料金はどのように決まりますか？",
    answer:
      "開発範囲と体制に応じてお見積もりします。まずは無料相談で現状をお聞かせください。",
  },
  {
    question: "進捗はどのように確認できますか？",
    answer:
      "週次で動くものをお見せしながら進めます。開発中の画面を早い段階から確認いただけるため、認識のずれを早期に解消できます。",
  },
  {
    question: "他社で開発したシステムの改修・引き継ぎはできますか？",
    answer:
      "ご相談いただけます。現状のコードや構成を確認したうえで、引き継ぎの進め方をご提案します。",
  },
  {
    question: "リリース後の保守だけをお願いすることはできますか？",
    answer:
      "可能です。保守・グロース運用のみのご依頼にも対応します。現在の運用状況をうかがったうえで、体制をご提案します。",
  },
]

export default function DevelopmentServicePage() {
  return (
    <div className="bg-[#030712]">
      <SiteHeader />
      <main>
        <ServiceHero
          label="SOFTWARE DEVELOPMENT"
          title={
            <>
              要件定義から運用まで、
              <br className="hidden sm:block" />
              <span className={gradientText}>一気通貫</span>。
            </>
          }
          lead="成果から逆算して、速く・確かに作ります。代表自身がエンジニアとして要件定義から設計・開発・運用までを一貫して担うため、窓口と作り手が分かれず、認識のずれなくプロジェクトが進みます。"
          bullets={[
            "本当に必要な機能の見極めから入り、作らない判断もご提案します",
            "他社見積2,000万円の開発を500万円で実現した実例があります",
            "代表自身がエンジニア。要件定義から運用まで一気通貫で担います",
          ]}
        />

        <PainList
          lead="開発の発注でよくうかがう課題です。ひとつでも当てはまれば、お力になれます。"
          items={pains}
        />

        <OfferGrid
          lead="Webアプリからモバイル、EC、リリース後の運用まで。事業に必要な開発をまとめて引き受けます。"
          items={offers}
        />

        <Section variant="alt">
          <SectionHeading
            label="STRENGTHS"
            title={
              <>
                miitaso の<span className={gradientText}>強み</span>
              </>
            }
            lead="自分たちで AI を使って開発し、自社プロダクトを運用している会社だからこその開発体制です。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {strengths.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.06]">
                  <span className="font-mono text-sm text-sky-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 text-center sm:grid-cols-3">
            <Reveal>
              <Stat
                value="500"
                suffix="万円"
                label="他社見積2,000万円のアプリ開発を実現"
              />
            </Reveal>
            <Reveal delay={100}>
              <Stat
                value="8位 → 2位"
                label="データ連携基盤の構築で車両掲載台数（業界順位）"
              />
            </Reveal>
            <Reveal delay={200}>
              <Stat value={3} suffix="カ国" label="オフショア開発PMの経験" />
            </Reveal>
          </div>
        </Section>

        <RelatedCases
          lead="クライアントワークと自社プロダクトの一部をご紹介します。"
          cases={cases}
        />

        <StepFlow
          lead="小さく作って早く確かめる、アジャイルの進め方を基本にしています。"
          steps={steps}
        />

        <ServiceFaq
          lead="そのほかのご質問は、無料相談でお気軽にお尋ねください。"
          faqs={faqs}
        />

        <CtaBand lead="見積もりの妥当性確認や技術選定のご相談だけでも構いません。現状をうかがい、最適な進め方をご提案します。" />
      </main>
      <SiteFooter />
    </div>
  )
}
