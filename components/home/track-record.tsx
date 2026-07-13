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
    label: "検索順位（自社開発のマーケティングツールでSEO改善を実現）",
  },
  {
    value: "3",
    suffix: "カ国",
    label: "オフショア開発PM（ベトナム・バングラデシュ・シンガポール）",
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
    tag: "新規事業支援",
    title: "事業仮説を60案から数案へ",
    description:
      "広いテーマだけがある状態から60案以上を生成し、1案ずつ市場規模・競合・規制を調査。“具体的な除外理由つき”で数案に絞り込み、「自分たちでは出ない視点」と評価されました。捨てた理由こそが、確度の証明になります。",
  },
  {
    tag: "運送・物流SaaS",
    title: "データ連携基盤の構築",
    description:
      "在庫データが集まらず、プラットフォームが伸び悩んでいました。API連携とスクレイピングの基盤を要件定義から運用まで一人で構築し、サイトの検索順位を業界8位→2位へ。機能より“配管”が勝敗を分けました。",
  },
  {
    tag: "ペットオーナー向けSNS",
    title: "開発コストの再設計",
    description:
      "他社見積が過大だった案件。要件定義から実装までを分業せず一人で貫き、他社見積の25%のコストで実現しました。作れるコンサルは、見積もりそのものを設計し直せます。",
  },
  {
    tag: "中古車関連",
    title: "車両在庫管理DX",
    description:
      "在庫情報の管理・掲載が手作業のボトルネックでした。在庫管理システム・検索・管理画面を複数開発し、Webからの引き合いにつながる状態へ。同業の実績が積み上がり、次の商談ではデモをすぐ見せられる状態になっています。",
  },
  {
    tag: "自治体",
    title: "電子通貨アプリの要件定義",
    description:
      "公共領域は、要件のあいまいさが後工程の手戻り・コストに直結します。ITコンサルタントとして上流の要件定義を担当。“作れる人間が上流を握る”ことの価値が、最も出る領域です。",
  },
  {
    tag: "マーケティング支援",
    title: "分断された顧客管理の統合",
    description:
      "LINE・Instagram DM・Outlook・Gmailと窓口が分かれ、顧客管理とステップ配信が回らない状態。各チャネルを統合するSFA / CRMツールを開発しました。非効率は“機能不足”より“分断”から生まれます。",
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
      <div data-particle-avoid className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
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
            <Reveal key={item.title} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#050a18]/80 p-5 backdrop-blur-md transition hover:border-sky-400/40 hover:bg-[#0a1226]/80">
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
