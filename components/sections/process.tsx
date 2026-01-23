"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "ヒアリング",
    description: "課題やアイデアをじっくりお聞きします。何から始めればいいか分からない段階でも大丈夫です。",
  },
  {
    icon: PenTool,
    number: "02",
    title: "企画・設計",
    description: "要件を整理し、UI/UXを設計。プロトタイプで完成イメージを共有しながら進めます。",
  },
  {
    icon: Code,
    number: "03",
    title: "開発",
    description: "アジャイル開発で柔軟に対応。定期的な進捗共有で、認識のずれなく開発を進めます。",
  },
  {
    icon: Rocket,
    number: "04",
    title: "納品・サポート",
    description: "リリース後も継続してサポート。運用課題の解決や機能改善もお任せください。",
  },
]

export function ProcessSection() {
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
    <section ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-600 font-medium mb-2">PROCESS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            開発の流れ
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex gap-6 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-sky-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-sky-600">{step.number}</span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
