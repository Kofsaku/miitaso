"use client"

import { useEffect, useRef, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "費用の目安を教えてください",
    answer: "プロジェクトの規模や要件によって異なりますが、MVPであれば100万円〜、本格的なアプリ開発であれば300万円〜が目安です。まずはご相談いただければ、要件をお聞きした上で概算をお伝えします。",
  },
  {
    question: "開発期間はどのくらいですか？",
    answer: "シンプルなMVPであれば1〜2ヶ月、中規模のアプリであれば3〜6ヶ月が目安です。ただし、要件の複雑さや確定状況によって変動します。スケジュールについてもご相談時に詳しくお伝えします。",
  },
  {
    question: "どんな技術を使っていますか？",
    answer: "フロントエンドはReact/Next.js、バックエンドはNode.js/Python、インフラはAWS/GCPを中心に、プロジェクトに最適な技術スタックを選定します。モバイルアプリはReact NativeやFlutterにも対応しています。",
  },
  {
    question: "相談だけでも大丈夫ですか？",
    answer: "もちろんです。アイデア段階でのご相談も歓迎します。「何から始めればいいか分からない」という状態でも、一緒に整理していきますのでお気軽にお問い合わせください。相談は無料です。",
  },
]

export function FaqSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-600 font-medium mb-2">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            よくある質問
          </h2>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-slate-100 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
