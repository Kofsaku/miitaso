import type { Metadata } from "next"
import { SiteHeader } from "@/components/corporate/site-header"
import { SiteFooter } from "@/components/corporate/site-footer"
import { Hero } from "@/components/home/hero"
import { TechMarquee } from "@/components/home/tech-marquee"
import { Services } from "@/components/home/services"
import { HowWeBuild } from "@/components/home/how-we-build"
import { Products } from "@/components/home/products"
import { TrackRecord } from "@/components/home/track-record"
import { Process } from "@/components/home/process"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"

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
    <div className="bg-[#030712] text-white">
      <SiteHeader />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <HowWeBuild />
        <Products />
        <TrackRecord />
        <Process />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
