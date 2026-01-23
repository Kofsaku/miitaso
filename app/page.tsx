"use client"

import { Toaster } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ProblemsSection } from "@/components/sections/problems"
import { ServicesSection } from "@/components/sections/services"
import { ReasonsSection } from "@/components/sections/reasons"
import { ProcessSection } from "@/components/sections/process"
import { FaqSection } from "@/components/sections/faq"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <ReasonsSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
