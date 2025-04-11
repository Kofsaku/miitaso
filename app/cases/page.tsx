"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Code2, Layout, MessageSquare } from "lucide-react"
import { useState } from "react"

type ServiceType = "product" | "mvp" | "consulting"

const services = {
  product: {
    title: "プロダクト開発",
    description: "最新の技術とデザインを活用した、革新的なプロダクトの開発を支援します。",
    icon: Code2,
    cases: [
      {
        title: "AIを活用した学習プラットフォーム",
        description: "個人向けのAI学習プラットフォームの開発を支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "IoTデバイス管理システム",
        description: "製造業向けのIoTデバイス管理システムの開発を支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  mvp: {
    title: "MVP開発",
    description: "最小限の機能で最大の価値を提供するMVPの開発をサポートします。",
    icon: Layout,
    cases: [
      {
        title: "フードデリバリーサービス",
        description: "地域密着型のフードデリバリーサービスのMVP開発を支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "健康管理アプリ",
        description: "個人向けの健康管理アプリのMVP開発を支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  consulting: {
    title: "コンサルティング",
    description: "ビジネス戦略から技術選定まで、幅広いコンサルティングサービスを提供します。",
    icon: MessageSquare,
    cases: [
      {
        title: "デジタル変革支援",
        description: "製造業のデジタル変革を支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "新規事業立ち上げ支援",
        description: "小売業の新規事業立ち上げを支援しました。",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

export default function CasesPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>("product")

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">事例紹介</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが手がけたプロジェクトの事例をご紹介します
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {Object.entries(services).map(([key, service]) => (
                  <Button
                    key={key}
                    variant={selectedService === key ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedService(key as ServiceType)}
                  >
                    <service.icon className="h-4 w-4" />
                    {service.title}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services[selectedService].cases.map((case_, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader>
                      <CardTitle>{case_.title}</CardTitle>
                      <CardDescription>{case_.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video relative">
                        <img
                          src={case_.image}
                          alt={case_.title}
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 