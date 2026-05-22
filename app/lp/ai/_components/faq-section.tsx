"use client"

import { useState, useRef, useEffect } from "react"

const faqs = [
  {
    q: "本当に無料ですか？",
    a: "はい、30分のAI診断は完全無料です。診断後に契約の義務も一切ありません。御社の業務にAIがどう活用できるか、具体的にお伝えします。",
  },
  {
    q: "ITに詳しい人がいなくても大丈夫ですか？",
    a: "はい、まったく問題ありません。導入から運用まですべてmiitasoが対応します。操作が必要な場合も、使い方のレクチャーとマニュアルをご用意します。",
  },
  {
    q: "どのくらいの期間で導入できますか？",
    a: "パッケージにより異なりますが、最短2週間〜通常1〜2ヶ月で導入可能です。問い合わせ自動化など、すぐに効果が出る施策から段階的に進めることもできます。",
  },
  {
    q: "既存のシステムを変える必要がありますか？",
    a: "いいえ。既存のシステムやツールはそのまま使い続けられます。AIを「追加」する形で導入するため、現在の業務フローを壊しません。",
  },
  {
    q: "月額費用はいくらですか？",
    a: "月額10万〜30万円のリテイナー型です。パッケージ内容と御社の規模に応じて最適なプランをご提案します。初期導入費は別途お見積もりとなります。",
  },
  {
    q: "大手コンサルとの違いは何ですか？",
    a: "大手は「提案書」を作って終わりですが、miitasoは代表自らが設計・実装・運用まで一貫対応します。中間マージンがないため、大手の1/3〜1/5の費用で導入できます。",
  },
  {
    q: "自社の業界でもAIは使えますか？",
    a: "はい。問い合わせ対応、書類作成、データ分析など、業界を問わず効果が出る汎用的な活用パターンがあります。無料診断で御社に最適な活用法をご提案します。",
  },
  {
    q: "導入後のサポートはありますか？",
    a: "はい。月額リテイナーにはサポート・改善が含まれます。AIの精度改善、新しい活用シーンの提案、トラブル対応まで継続的にサポートします。",
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <button
        className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
        onClick={onToggle}
      >
        <span className="font-bold text-sm md:text-base text-[#333]">
          Q. {faq.q}
        </span>
        <svg
          className={`w-5 h-5 text-[#2E75B6] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
      >
        <div ref={contentRef} className="px-5 pb-5 text-sm text-[#555] leading-relaxed">
          A. {faq.a}
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
          よくある質問
        </h2>
        <div className="w-12 h-1 bg-[#2E75B6] mx-auto rounded-full mb-10" />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
