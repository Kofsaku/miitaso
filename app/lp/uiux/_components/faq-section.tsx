"use client"

import { useState, useRef, useEffect } from "react"

const faqs = [
  {
    q: "本当に無料ですか？",
    a: "はい、30分のUI診断は完全無料です。診断後に契約の義務も一切ありません。",
  },
  {
    q: "UIだけ変えてサーバーサイドはそのままにできますか？",
    a: "はい、それが私たちの最も得意とするアプローチです。UIレイヤーのみを刷新し、既存のAPI・データベース・ビジネスロジックはそのまま活かします。",
  },
  {
    q: "既存の開発会社との協業は可能ですか？",
    a: "はい、むしろ推奨しています。実際の事例でも、miitasoがUI/UXデザインとフロントエンドを担当し、サーバーサイドは既存の開発会社が担当する体制で成功しています。",
  },
  {
    q: "デザインだけの依頼も可能ですか？",
    a: "はい、Figmaでのデザイン納品のみも承ります。その場合、御社の開発チームがフロントエンド実装を行う形になります。",
  },
  {
    q: "どんなシステムに対応していますか？",
    a: "業務システム、管理画面、SaaS、社内ツールなど、Web系のシステム全般に対応しています。",
  },
  {
    q: "対応できるフレームワークは？",
    a: "React / Next.js / Vue.js / Angular等のモダンフレームワークに対応しています。レガシーなフレームワークからの移行もご相談ください。",
  },
  {
    q: "オンラインのみですか？",
    a: "はい、UI診断はZoomを使ったオンライン実施となります。全国どこからでもご参加いただけます。プロジェクト開始後もリモート中心で進行します。",
  },
  {
    q: "診断後にしつこい営業はありませんか？",
    a: "ありません。診断後のご連絡は改善ポイントシートの送付メール1通のみです。",
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
        className="w-full text-left p-5 flex items-center justify-between gap-4"
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
