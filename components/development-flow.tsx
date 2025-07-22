"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MessageSquare, Lightbulb, FileText, Calculator, Handshake, Settings, Rocket, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

interface FlowStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  isFree?: boolean
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    title: "お問い合わせ",
    description: "まずはお気軽にご相談ください",
    icon: <MessageSquare className="h-6 w-6" />
  },
  {
    id: 2,
    title: "アイデアヒアリング",
    description: "お打ち合わせにてアイデアをヒアリング",
    icon: <Lightbulb className="h-6 w-6" />,
    isFree: true
  },
  {
    id: 3,
    title: "要件整理・モックアップ作成",
    description: "要件をまとめてモックアップを作成",
    icon: <FileText className="h-6 w-6" />,
    isFree: true
  },
  {
    id: 4,
    title: "お見積もり提示",
    description: "内容確認後、正確なお見積もりをご提示",
    icon: <Calculator className="h-6 w-6" />
  },
  {
    id: 5,
    title: "契約・発注",
    description: "ご契約内容を相談し、ご発注",
    icon: <Handshake className="h-6 w-6" />
  },
  {
    id: 6,
    title: "開発実行",
    description: "経験豊富なチームが開発を実行",
    icon: <Settings className="h-6 w-6" />
  },
  {
    id: 7,
    title: "プロダクトリリース",
    description: "品質テスト完了後、プロダクトをリリース",
    icon: <Rocket className="h-6 w-6" />
  },
  {
    id: 8,
    title: "スケールサポート",
    description: "ご要望に応じてスケールまでサポート",
    icon: <TrendingUp className="h-6 w-6" />
  }
]

export function DevelopmentFlow() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.flow-step')
      const newVisibleSteps: number[] = []
      
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible && !visibleSteps.includes(index)) {
          newVisibleSteps.push(index)
        }
      })
      
      if (newVisibleSteps.length > 0) {
        setVisibleSteps(prev => [...prev, ...newVisibleSteps])
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleSteps])

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            アイデアからリリースまで、<br className="sm:hidden" />一貫してサポート
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            プロダクト開発の全工程をワンストップで
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div
                className={`flow-step transform transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                  {step.isFree && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      無料
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
              
              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary/30" />
                </div>
              )}
              
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="group" asChild>
            <Link href="/contact">
              まずは無料相談から始める
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}