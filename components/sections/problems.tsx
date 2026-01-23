"use client"

import { useEffect, useRef, useState } from "react"
import { HelpCircle, Search, Wallet } from "lucide-react"

const problems = [
  {
    icon: HelpCircle,
    title: "形にする方法が分からない",
    description: "アイデアはあるけど、どこから手をつければいいか分からない。技術的なことは専門外で不安。",
  },
  {
    icon: Search,
    title: "どこに頼めばいいか分からない",
    description: "開発会社はたくさんあるけど、違いが分からない。信頼できるパートナーを見つけたい。",
  },
  {
    icon: Wallet,
    title: "予算内で質を担保したい",
    description: "限られた予算で最大限の成果を出したい。コストを抑えつつ、妥協はしたくない。",
  },
]

export function ProblemsSection() {
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
          <p className="text-sky-600 font-medium mb-2">PROBLEMS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            こんなお悩みありませんか？
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
