"use client"

import { useState, useRef, useEffect } from "react"

const faqs = [
  {
    q: "Claude CodeやCursorを触ったことがなくても受講できますか？",
    a: "はい、未経験を前提に設計しています。30日プログラムの初週は環境構築と基本操作から始め、実際に小さな成果物を作りながら習得していきます。「PCの基本操作はできる」レベルからスタート可能です。",
  },
  {
    q: "週3-5時間の作業時間が確保できない場合はどうなりますか？",
    a: "受講をお断りすることもあります。30日で成果物を完成させるためには、社内側で作業時間の確保が必須です。お申し込み前に貴社のスケジュールを一緒に確認させていただきます。",
  },
  {
    q: "成果物のクオリティは外注LPに勝てますか？",
    a: "メインLPの代替を目指すサービスではありません。本サービスが目指すのは「外注に頼むほどではない補助コンテンツ（キャンペーンページ・サブLP・導入事例ページ等）を、社長自身で即日リリースできる体になる」ことです。",
  },
  {
    q: "30日後、自走できるようになりますか？",
    a: "週3-5時間のコミットがあれば、卒業時点で「自社で営業ページを1本ゼロから公開できる状態」になります。ただし新しい業務領域への展開や複雑なシステム連携は卒業後の月額伴走でサポートしています。",
  },
  {
    q: "1人社長・個人事業主でも受講できますか？",
    a: "はい、むしろ最も適合する層です。意思決定が速く、自分で手を動かす前提のサービス設計のため、組織の調整が要らない一人経営者と相性が良いです。",
  },
  {
    q: "受講中に「やっぱり面倒」となったら？",
    a: "ライトプランへのダウングレード、または制作代行（受託）への切り替えをご相談いただけます。30日間はあくまで「自走できる体になる」ための試用期間とお考えください。",
  },
  {
    q: "返金保証はありますか？",
    a: "受講開始から最初の7日以内であれば、理由を問わず全額返金いたします。それ以降は弊社責任により受講継続が困難になった場合のみ、未消化分を返金します。",
  },
  {
    q: "業種は問いませんか？",
    a: "BtoB事業の中小企業であれば業種は問いません。ただし、訪問販売中心や深い業界知識が必要な業務（医療・法律等の有資格業務）は対象外となる場合があります。30分相談で確認させてください。",
  },
  {
    q: "ライトプランからブートキャンプへの切り替えは可能ですか？",
    a: "はい、いつでも切り替え可能です。直前に支払ったライト1ヶ月分の料金をブートキャンプ料金に充当できる特典をご用意しています。",
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
  const panelId = `bc-faq-panel-${index}`
  const buttonId = `bc-faq-button-${index}`

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight)
  }, [isOpen])

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        id={buttonId}
        type="button"
        className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-5 group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-start gap-4 flex-1">
          <span className="font-[var(--font-num-bc)] font-bold text-[#E8704C] text-[16px] tabular-nums mt-0.5">
            Q{String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-[var(--font-sans-bc)] font-bold text-[15px] md:text-[16px] leading-[1.7] text-[#0F1F3D]">
            {faq.q}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-[#0F1F3D]/40 flex-shrink-0 mt-1 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className="pb-6 pl-12 pr-2 font-[var(--font-sans-bc)] text-[14px] md:text-[15px] leading-[1.9] text-[#475569]"
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
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="mb-12 text-center">
          <p className="font-[var(--font-num-bc)] text-[#E8704C] text-[13px] tracking-[0.2em] font-bold mb-3">
            FAQ
          </p>
          <h2 className="font-[var(--font-sans-bc)] font-black text-[28px] md:text-[36px] leading-[1.4] text-[#0F1F3D]">
            よくあるご質問
          </h2>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 md:px-8">
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
