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
  title: "miitaso | アイデアを、動くプロダクトに。",
  description:
    "AI導入支援・ソフトウェア開発・新規事業支援の miitaso。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
  alternates: {
    canonical: "https://miitaso.com",
  },
  openGraph: {
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "AI導入支援・ソフトウェア開発・新規事業支援の miitaso。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
    url: "https://miitaso.com",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "AI導入支援・ソフトウェア開発・新規事業支援の miitaso。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
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
