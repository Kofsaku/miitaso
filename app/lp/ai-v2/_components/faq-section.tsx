"use client"

import { useState, useRef, useEffect } from "react"

const faqs = [
  {
    q: "30分のAI活用相談は本当に無料ですか？",
    a: "はい、完全無料です。相談後の契約義務もありません。30分の中で、貴社の対象業務にAI活用の余地があるか、年間非効率額の概算と一緒に整理してお伝えします。",
  },
  {
    q: "「内製化伴走」は具体的に何をしてくれるのですか？",
    a: "業務分析からAIワークフローの設計・実装、社員向けの操作マニュアル整備、月次の効果測定レポートのテンプレート作成、6ヶ月時点での社内推進担当への引継ぎセッション（最低3回）までを、納品物とプロセスとしてご提供します。KPI改善は協働で目指す改善目標として位置づけます。",
  },
  {
    q: "情シスがいなくても導入できますか？",
    a: "本サービスは「専任情シスがおらず、総務・経理・現場管理者が兼任している中堅企業」を主な対象としています。経営者または兼任担当者と直接コミュニケーションする前提で設計されています。なお、社内に推進担当が一人もおらず、経営者もコミットできない場合は適合外とさせていただきます。",
  },
  {
    q: "費用はいくらですか？",
    a: "6ヶ月の伴走パッケージで350万円〜（初期150万円 + 月額33万円 × 6ヶ月）が基準です。対象業務の規模・複雑度に応じて個別見積もりとなります。月額リテイナーは最低契約期間6ヶ月、その後は3ヶ月単位での更新です。",
  },
  {
    q: "どのような業務にAIが効きますか？",
    a: "初期パッケージでは業種ではなく業務横断で対応します。具体的には、見積作成・受発注事務、問い合わせ対応（メール／電話／チャット）、社内ナレッジ検索（議事録／規程／過去案件）、報告書・日報の作成、帳票や書類のドラフト生成などが代表例です。",
  },
  {
    q: "ROIはどう判断するのですか？",
    a: "対象業務の「年間削減見込み時間 × 総人件費時間単価」で年間非効率額を算出します。原則350万円以上、または2年累計700万円以上の非効率額が見込める業務を本提案の対象としています。30分相談の中でこの概算を一緒に整理し、適合しない場合は無理にお勧めしません。",
  },
  {
    q: "成果は保証されますか？",
    a: "保証対象は「納品物（業務フロー図／プロンプト運用ハンドブック／ワークフロー設計書／操作マニュアル／効果測定レポートテンプレート／引継ぎ書 等の7成果物）」と「プロセス（月次定例・営業日24時間以内のレスポンスSLA・引継ぎセッション最低3回）」です。KPIの数値達成は努力目標として位置づけており、いわゆる「成果保証」はいたしません。これは、AIの効果が顧客側の運用協力に大きく依存するためです。",
  },
  {
    q: "過去にSIerやコンサルにDX／AIを依頼して上手くいきませんでした。今回は何が違いますか？",
    a: "代表が要件定義から実装、社員教育、引継ぎまでを一気通貫で担当するため、提案書だけで終わったり、実装と運用の間に断絶が生まれることがありません。また、6ヶ月後に社内推進担当へ移管することを前提に設計しているため、長期的に外部依存が続く構造を作りません。",
  },
  {
    q: "業種は問いませんか？",
    a: "第1フェーズでは年商10〜30億円の製造業・卸売業・専門サービス（士業除く）を主たる対象としています。それ以外の業種でも、対象業務が業務横断のホワイトカラー業務（見積／問合せ／書類作成等）であれば適合する可能性があります。30分相談でご確認ください。",
  },
  {
    q: "契約期間中にトラブルがあった場合はどうなりますか？",
    a: "miitaso責任の事由により保証項目を満たせなかった場合、是正案を提示のうえ顧客と協議し、減額・無償補完・契約解除のいずれかをmiitasoの裁量で決定します。同一事由に対する重複適用は行いません。一方、データ提供期限超過・主担当者離席・第三者SaaS障害など顧客側または不可抗力による事由は、保証義務から除外します（契約書に明記）。",
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const panelId = `ai-v2-faq-panel-${index}`
  const buttonId = `ai-v2-faq-button-${index}`

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="border-b border-[#0E1B2C]/15 last:border-b">
      <button
        id={buttonId}
        type="button"
        className="w-full text-left py-6 md:py-7 flex items-start justify-between gap-6 group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-start gap-5 flex-1">
          <span className="font-[var(--font-display)] italic text-[#B8392E] text-[20px] leading-none mt-1 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-[var(--font-mincho)] text-[16px] md:text-[17px] leading-[1.7] text-[#0E1B2C]">
            {faq.q}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-[#0E1B2C]/40 flex-shrink-0 mt-1 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className="pb-7 pl-12 md:pl-14 pr-4 font-[var(--font-sans-jp)] text-[14px] md:text-[15px] leading-[1.9] text-[#2A3140]/85"
        >
          {faq.a}
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#F5F1E8] py-24 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="mb-14 md:mb-16">
          <p className="font-[var(--font-display)] italic text-[#B8392E] text-[15px] tracking-[0.18em] mb-3">
            FAQ ─ よくある質問
          </p>
          <h2 className="font-[var(--font-mincho)] text-[28px] md:text-[36px] leading-[1.4] text-[#0E1B2C] font-medium">
            検討中の経営者から、
            <br />
            よく頂くご質問。
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
