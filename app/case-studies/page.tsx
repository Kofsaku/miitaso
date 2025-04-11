"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { caseStudies } from "@/app/data/case-studies"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Cpu, Rocket, Lightbulb, Palette } from "lucide-react"
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
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">事例</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">成功事例</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                私たちが手がけた革新的なプロジェクトをご紹介します
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
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

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
            {filteredCaseStudies.map((caseStudy) => (
              <Link key={caseStudy.id} href={`/case-studies/${caseStudy.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{caseStudy.category}</span>
                        <span>•</span>
                        <span>{caseStudy.serviceType}</span>
                      </div>
                      <h3 className="text-xl font-bold">{caseStudy.title}</h3>
                      <p className="text-muted-foreground">{caseStudy.description}</p>
                    </div>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={caseStudy.image}
                        width={400}
                        height={225}
                        alt={`Case Study ${caseStudy.id}`}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 