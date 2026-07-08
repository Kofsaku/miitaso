import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"
import { Stat } from "@/components/corporate/stat"

const statValueClass = "text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"

/** 事実シート「数値実績」の4つのみ */
const stats = [
  {
    value: "25",
    suffix: "%",
    label: "他社見積の25%のコストで開発を実現（Flutter製SNSアプリ）",
  },
  {
    value: "8位 → 2位",
    suffix: "",
    label: "車両掲載台数の業界順位（データ連携基盤の構築）",
  },
  {
    value: "3",
    suffix: "カ国",
    label: "オフショア開発PM（ベトナム・バングラデシュ・シンガポール）",
  },
  {
    value: "一気通貫",
    suffix: "",
    label: "要件定義から運用まで、単独で全工程を担当",
  },
]

/** 事実シート「匿名事例」から8件 */
const cases = [
  {
    tag: "自治体",
    title: "電子通貨アプリ",
    description: "ITコンサルタントとして要件定義を担当しました。",
  },
  {
    tag: "B2B繊維商社",
    title: "ECサイト刷新",
    description: "Shopify開発PMとして改修・新機能開発を推進しました。",
  },
  {
    tag: "運送・物流SaaS",
    title: "データ連携基盤",
    description:
      "Salesforce API連携・スクレイピング基盤を単独構築。車両掲載台数を業界8位から2位に引き上げました。",
  },
  {
    tag: "中古車関連",
    title: "車両在庫管理DX",
    description: "在庫管理システムをはじめ、業務システムを多数開発しました。",
  },
  {
    tag: "マーケティング支援",
    title: "SFA / CRMツール",
    description:
      "LINE・Instagram DM・Outlook・Gmail連携の顧客管理・ステップ配信ツールを開発しました。",
  },
  {
    tag: "ペットオーナー向けSNS",
    title: "Flutterアプリ開発",
    description: "他社見積の25%のコストで開発を実現しました。",
  },
  {
    tag: "AIライブ配信",
    title: "配信アプリ",
    description: "配信中にAIが自動でコメントするライブ配信アプリを開発しました。",
  },
  {
    tag: "動画",
    title: "自動クリップ生成ツール",
    description: "YouTubeのURLからショートクリップを自動生成するツールを開発しました。",
  },
]

/**
 * 実績スタッツ＋匿名事例。
 */
export function TrackRecord() {
  return (
    <Section id="works" variant="transparent" chapter="04 実績" className="scroll-mt-16">
      <SectionHeading
        label="TRACK RECORD"
        title={
          <>
            数字で見る
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              実績
            </span>
          </>
        }
        lead="コンサルティングから開発、運用まで。実際に手を動かしてきたプロジェクトの一部をご紹介します。"
      />

      {/* スタッツ */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <Stat
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              valueClassName={statValueClass}
            />
          </Reveal>
        ))}
      </div>

      {/* 匿名事例 */}
      <div className="mt-20 md:mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          SELECTED WORK
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-sky-400/40 hover:bg-white/[0.06]">
                <span className="inline-flex w-fit items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
                  {item.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
