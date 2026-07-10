import Link from "next/link"
import { ArrowRight, Bot, Code2, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Glow } from "@/components/corporate/backgrounds"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

type ServiceItem = {
  icon: LucideIcon
  label: string
  title: string
  description: string
  href: string
}

const services: ServiceItem[] = [
  {
    icon: Bot,
    label: "AI INTEGRATION",
    title: "AI導入支援",
    description:
      "業務のどこにAIが効くのかの見極めから、Claude・OpenAIを使った機能実装、導入後の運用まで支援します。自社でAIプロダクトを開発・運用しているからこそ、できること・できないことを踏まえた現実的な提案をします。",
    href: "/services/ai",
  },
  {
    icon: Code2,
    label: "SOFTWARE DEVELOPMENT",
    title: "ソフトウェア開発",
    description:
      "Webアプリ・モバイルアプリの受託開発。Next.js / React / TypeScript を中心に、要件定義から設計・開発・運用まで一気通貫で担います。",
    href: "/services/development",
  },
  {
    icon: Rocket,
    label: "NEW BUSINESS",
    title: "新規事業支援",
    description:
      "アイデアの検証からMVP開発、立ち上げ後の改善まで伴走します。小さく作って早く検証する進め方で、新規事業の不確実性に向き合います。",
    href: "/services/new-business",
  },
]

/**
 * サービス3本柱。各カードから詳細ページへ。
 */
export function Services() {
  return (
    <Section
      id="services"
      variant="transparent"
      chapter="01 設計"
      className="scroll-mt-16"
      decoration={<Glow className="-top-24 right-0" />}
    >
      <SectionHeading
        label="SERVICES"
        title={
          <>
            事業フェーズに合わせた
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              3つのサービス
            </span>
          </>
        }
        lead="「AIで何かしたい」も、「業務が回らない」も、「新しい事業を作りたい」も。どの入り口からのご相談でも、まず課題の定義に立ち返り、そのうえで最適な手段を選びます。"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.href} delay={i * 80} className="h-full">
            <Link
              href={service.href}
              data-cursor-label="VIEW"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#050a18]/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#0a1226]/70"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <service.icon className="h-5 w-5 text-sky-400" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                {service.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-sky-400">
                詳しく見る
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
