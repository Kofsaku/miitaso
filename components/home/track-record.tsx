import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"
import { Stat } from "@/components/corporate/stat"

const statValueClass = "text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"

/** 掲載する数値実績（3つ）。約160社はオーナー承認・事実シートへの正式反映待ち */
const stats = [
  {
    value: "25",
    suffix: "%",
    label: "他社見積の25%のコストで開発を実現（Flutter製SNSアプリ）",
  },
  {
    value: "8位 → 2位",
    suffix: "",
    label: "検索順位（自社開発のマーケティングツールでSEO改善を実現）",
  },
  {
    value: "160",
    prefix: "約",
    suffix: "社",
    label: "新規事業から開発・改修まで、累計の支援実績",
  },
]

/**
 * 匿名事例。case-library.md（公開可）由来。各件を「課題 → 打ち手 → 成果 → 私たちの価値」
 * の物語で。数値成果は事実シートにある範囲のみ（捏造しない）。実名・生金額は出さない。
 */
const cases = [
  {
    tag: "運送・物流SaaS",
    problem: "掲載される車両が集まらず、プラットフォームとしての厚みが出ない。",
    action: "他社システムとのAPI連携とスクレイピングで、在庫データを自動で集める基盤を、要件定義から運用まで一人で構築。",
    result: "サイトの検索順位を、業界8位から2位へ。",
  },
  {
    tag: "ペットオーナー向けSNS",
    problem: "作りたいアプリはあるが、他社の見積もりが高すぎて動けない。",
    action: "要件定義から実装までを分業せず一人で担当。工程を分けないことで、伝達ロスも中間コストも削減。",
    result: "他社見積の25%のコストで形にしました。",
  },
  {
    tag: "中古車・中古トラック販売",
    problem: "車両在庫を人手で管理・掲載していて、Webからの問い合わせにもつながらない。",
    action: "在庫管理・検索・掲載を一つにしたシステムを複数開発。納品済みのコードは同業向けのデモにも転用できる形に。",
    result: "属人的だった在庫管理を仕組み化し、複数の案件で納品しました。",
  },
  {
    tag: "自治体",
    problem: "電子通貨（地域通貨）アプリ。公共ゆえ、要件のあいまいさが手戻り・コストに直結する。",
    action: "ITコンサルタントとして、後工程を左右する上流に入る。",
    result: "作る前に仕様を固める、要件定義を担当しました。",
  },
  {
    tag: "マーケティング支援",
    problem: "LINE・Instagram DM・Outlook・Gmailと問い合わせ窓口がバラバラで、顧客管理もフォローも回らない。",
    action: "分断していた窓口をまとめる方針で設計。",
    result: "4つの窓口を1つに束ねる顧客管理・ステップ配信ツール（SFA / CRM）を開発しました。",
  },
  {
    tag: "海外メーカー（新規事業）",
    problem: "「移動を楽しくする」という広いテーマだけがあり、社内の意思決定を動かせない。",
    action: "60以上の案を出し、1案ずつ市場・競合・規制を調べて「なぜ見送るか」まで提示しながら数案に絞り込み。",
    result: "「自分たちでは出ない視点」と評価され、実行前提の相談へ。アイデアではなく、動ける判断を渡しました。",
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
      <div data-particle-avoid className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <Stat
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              valueClassName={statValueClass}
            />
          </Reveal>
        ))}
      </div>

      {/* 匿名事例 */}
      <div className="mt-20 md:mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
          SELECTED WORK
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => (
            <Reveal key={item.tag} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-[#050a18]/80 p-6 backdrop-blur-md transition hover:border-sky-400/40 hover:bg-[#0a1226]/80">
                <span className="inline-flex w-fit items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
                  {item.tag}
                </span>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="text-slate-300">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">課題</span>
                    {item.problem}
                  </p>
                  <p className="text-slate-300">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">対応</span>
                    {item.action}
                  </p>
                  <p className="mt-auto border-t border-white/10 pt-3 font-medium text-white">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-sky-400">成果</span>
                    {item.result}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
