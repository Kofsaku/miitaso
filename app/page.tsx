import type { Metadata } from "next"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import { Hero } from "@/components/home/hero"
import { TechMarquee } from "@/components/home/tech-marquee"
import { PainPoints } from "@/components/home/pain-points"
import { Tools } from "@/components/home/tools"
import { Services } from "@/components/home/services"
import { HowWeBuild } from "@/components/home/how-we-build"
import { Products } from "@/components/home/products"
import { TrackRecord } from "@/components/home/track-record"
import { Process } from "@/components/home/process"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"
import { StageLoader } from "@/components/webgl/stage-loader"
import { SmoothScroll } from "@/components/webgl/smooth-scroll"
import { ScrollProgress } from "@/components/webgl/scroll-progress"
import { IntroOverlay } from "@/components/webgl/intro-overlay"
import { CursorFx } from "@/components/webgl/cursor-fx"
import { ChapterHud } from "@/components/webgl/chapter-hud"

export const metadata: Metadata = {
  title: "miitaso | 考えるだけでも、作るだけでもない。",
  description:
    "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
  alternates: {
    canonical: "https://miitaso.com",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    title: "miitaso | 考えるだけでも、作るだけでもない。",
    description:
      "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
    url: "https://miitaso.com",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    images: ["/og.png"],
    card: "summary_large_image",
    title: "miitaso | 考えるだけでも、作るだけでもない。",
    description:
      "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
  },
}

export default function Home() {
  return (
    <div className="corp-grain bg-[#030712] text-white">
      <StageLoader />
      <SmoothScroll />
      <ScrollProgress />
      <IntroOverlay />
      <CursorFx />
      <ChapterHud />
      <SiteHeader />
      <main className="relative z-10">
        <div data-story-chapter="0">
          <Hero />
        </div>
        <TechMarquee />
        <PainPoints />
        <div data-story-chapter="1">
          <Services />
        </div>
        <div data-story-chapter="2">
          <HowWeBuild />
        </div>
        <div data-story-chapter="3">
          <Products />
        </div>
        <Tools />
        <div data-story-chapter="4">
          <TrackRecord />
        </div>
        <div data-story-chapter="5">
          <Process />
        </div>
        <div data-story-chapter="6">
          <Faq />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
