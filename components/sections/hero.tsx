"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Two animated blobs moving across entire screen */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-sky-400/50 to-blue-500/40 rounded-full blur-3xl animate-blob-move-1"
        />
        <div
          className="absolute w-[250px] h-[250px] bg-gradient-to-br from-cyan-400/40 to-blue-400/30 rounded-full blur-3xl animate-blob-move-2"
        />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 animate-fade-in-up">
            アイデアを、
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              動くプロダクトに。
            </span>
          </h1>

          <p
            className="max-w-[600px] text-lg text-slate-600 md:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            新規事業の立ち上げからアプリ開発まで。
            <br />
            企画・設計・開発・運用をワンストップでサポートします。
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              無料で相談する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="border-slate-300 hover:bg-slate-50 hover:scale-105 transition-all duration-300"
            >
              サービスを見る
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
