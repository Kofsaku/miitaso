"use client"

import { useState, useRef, useEffect } from "react"

const faqs = [
  {
    q: "本当に無料ですか？",
    a: "はい、30分の相談は完全無料です。相談後に契約の義務も一切ありません。",
  },
  {
    q: "まだアイデアが固まっていないのですが相談できますか？",
    a: "もちろんです。「何をすべきか分からない」という段階からのご相談が最も多いです。",
  },
  {
    q: "オンラインのみですか？",
    a: "はい、Zoomを使ったオンライン相談となります。全国どこからでもご参加いただけます。",
  },
  {
    q: "相談後にしつこい営業はありませんか？",
    a: "ありません。相談後のご連絡はフォローアップメール1通のみです。",
  },
  {
    q: "個人事業主でも相談できますか？",
    a: "はい、法人・個人問わずご相談いただけます。",
  },
  {
    q: "どんな業種に対応していますか？",
    a: "業種は問いません。これまで160社超、多様な業種の新規事業を支援してきた実績があります。",
  },
  {
    q: "すでに開発が進んでいるプロジェクトの相談も可能ですか？",
    a: "はい、途中段階からの軌道修正も得意分野です。",
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
