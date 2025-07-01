"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { caseStudies } from "@/app/data/case-studies"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Cpu, Rocket, Lightbulb, Palette, BarChart3, Users, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CaseStudiesPage() {
  const [selectedServiceType, setSelectedServiceType] = useState<string>("all")

  const filteredCaseStudies = selectedServiceType === "all"
    ? caseStudies
    : caseStudies.filter(caseStudy => caseStudy.serviceType === selectedServiceType)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">成功事例</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが手がけたプロジェクトの一部をご紹介します
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  variant={selectedServiceType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedServiceType("all")}
                  className="flex items-center gap-2"
                >
                  すべて
                </Button>
                <Button
                  variant={selectedServiceType === "product" ? "default" : "outline"}
                  onClick={() => setSelectedServiceType("product")}
                  className="flex items-center gap-2"
                >
                  <Cpu className="h-4 w-4" />
                  プロダクト開発
                </Button>
                <Button
                  variant={selectedServiceType === "mvp" ? "default" : "outline"}
                  onClick={() => setSelectedServiceType("mvp")}
                  className="flex items-center gap-2"
                >
                  <Rocket className="h-4 w-4" />
                  MVP開発
                </Button>
                <Button
                  variant={selectedServiceType === "consulting" ? "default" : "outline"}
                  onClick={() => setSelectedServiceType("consulting")}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  コンサルティング
                </Button>
                <Button
                  variant={selectedServiceType === "design" ? "default" : "outline"}
                  onClick={() => setSelectedServiceType("design")}
                  className="flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  UI/UXデザイン
                </Button>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 lg:grid-cols-2 lg:gap-12">
                {filteredCaseStudies.map((caseStudy, index) => {
                  const serviceIcons = {
                    product: Cpu,
                    mvp: Rocket,
                    consulting: Lightbulb,
                    design: Palette
                  }
                  const ServiceIcon = serviceIcons[caseStudy.serviceType as keyof typeof serviceIcons] || Cpu
                  
                  // Extract key metrics from content
                  const metrics = caseStudy.content.match(/<strong>(.*?)<\/strong>/g)
                    ?.slice(0, 3)
                    .map(m => m.replace(/<\/?strong>/g, ''))
                    || []
                  
                  return (
                    <Link key={caseStudy.id} href={`/case-studies/${caseStudy.id}`} className="block">
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-white shadow-sm">
                              <ServiceIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">{caseStudy.category}</p>
                              <p className="text-xs text-muted-foreground">{caseStudy.date}</p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 line-clamp-2">
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
                          <span className="text-sm font-medium text-blue-600">
                            詳細を見る →
                          </span>
                        </div>
                      </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}