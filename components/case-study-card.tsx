"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Cpu, Rocket, Lightbulb, Palette, BarChart3, Users, Zap, ArrowUpRight, CheckCircle2 } from "lucide-react"

interface CaseStudy {
  id: string
  title: string
  description: string
  content: string
  category: string
  date: string
  serviceType: string
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  index: number
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const serviceIcons = {
    product: Cpu,
    mvp: Rocket,
    consulting: Lightbulb,
    design: Palette
  }
  const ServiceIcon = serviceIcons[caseStudy.serviceType as keyof typeof serviceIcons] || Zap
  
  const gradients = [
    "from-blue-600/10 to-purple-600/10",
    "from-emerald-600/10 to-teal-600/10",
    "from-orange-600/10 to-red-600/10",
    "from-purple-600/10 to-pink-600/10"
  ]
  const gradient = gradients[index % gradients.length]
  
  // Extract key metrics from content
  const metrics = caseStudy.content.match(/<strong>(.*?)<\/strong>/g)
    ?.slice(0, 3)
    .map(m => m.replace(/<\/?strong>/g, ''))
    || []

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 border-muted hover:border-primary/20 overflow-hidden group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-background shadow-sm">
              <ServiceIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{caseStudy.category}</p>
              <p className="text-xs text-muted-foreground">{caseStudy.date}</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {caseStudy.description}
        </p>
        
        {metrics.length > 0 && (
          <div className="space-y-3 mb-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="font-medium text-foreground/80">{metric}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">高インパクト</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">実績あり</span>
            </div>
          </div>
          <Link 
            href={`/case-studies/${caseStudy.id}`} 
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1"
          >
            詳細を見る →
          </Link>
        </div>
      </div>
    </Card>
  )
}