"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Cpu, BadgeCheck } from "lucide-react"

const reasons = [
  {
    icon: Users,
    title: "一貫サポート",
    description: "相談から運用まで、一人の担当者が責任を持って伴走。コミュニケーションロスなく、スムーズにプロジェクトを進めます。",
    stat: "ワンストップ",
    statLabel: "対応",
  },
  {
    icon: Cpu,
    title: "技術力",
    description: "最新のフレームワークとベストプラクティスを活用。スケーラブルで保守性の高い、将来を見据えたプロダクトを構築します。",
    stat: "最新技術",
    statLabel: "活用",
  },
  {
    icon: BadgeCheck,
    title: "コストパフォーマンス",
    description: "無駄な工程を省き、本当に必要な機能に集中。限られた予算で最大限の価値を提供します。",
    stat: "適正価格",
    statLabel: "実現",
  },
]

export function ReasonsSection() {
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
    <section id="reasons" ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-600 font-medium mb-2">WHY CHOOSE US</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            選ばれる理由
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">{reason.stat}</span>
                <span className="text-slate-500 ml-1">{reason.statLabel}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
