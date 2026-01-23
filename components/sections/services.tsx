"use client"

import { useEffect, useRef, useState } from "react"
import { Lightbulb, Code, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "新規事業サポート",
    description: "アイデアの整理から事業計画の策定まで。ビジネスモデルの検証や市場調査もサポートし、成功確率を高めます。",
    features: ["アイデア壁打ち", "事業計画策定", "市場調査・検証"],
  },
  {
    icon: Code,
    title: "アプリ・Web開発",
    description: "企画・設計・開発をワンストップで。最新技術を活用し、スケーラブルで保守性の高いプロダクトを構築します。",
    features: ["UI/UX設計", "フルスタック開発", "品質保証"],
  },
  {
    icon: TrendingUp,
    title: "運用・改善",
    description: "リリース後の保守運用からグロース支援まで。データに基づいた改善提案で、プロダクトの成長を継続支援します。",
    features: ["保守・監視", "機能改善", "グロース支援"],
  },
]

export function ServicesSection() {
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
    <section id="services" ref={ref} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-600 font-medium mb-2">SERVICES</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            提供サービス
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            アイデアの段階から運用まで、プロダクト開発に必要なすべてをサポートします。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-sky-100 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
