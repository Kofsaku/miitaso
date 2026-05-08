import Image from "next/image"
import { Sparkles, Calendar, Clock } from "lucide-react"
import { PrimaryCTA, SecondaryCTA } from "./cta-button"

export function HeroSection() {
  const chips = [
    { icon: Calendar, label: "30日伴走" },
    { icon: Sparkles, label: "成果物付き" },
    { icon: Clock, label: "週3〜5時間" },
  ]
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#FAFAF7] min-h-[640px] md:min-h-[720px] lg:min-h-[760px]"
    >
      {/* atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FFE9DD]/60 via-[#FFE9DD]/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#E0E7F4]/60 via-[#E0E7F4]/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0F1F3D 1px, transparent 1px), linear-gradient(90deg, #0F1F3D 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* RIGHT PHOTO LAYER — bleeds right, fades to left */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[55%] xl:w-[52%] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 12%, rgba(0,0,0,0.85) 28%, black 45%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 12%, rgba(0,0,0,0.85) 28%, black 45%, black 100%)",
          }}
        >
          <div className="absolute inset-0 hero-ken-burns">
            <Image
              src="/lp/ai-bootcamp/hero.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile dimmer for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF7]/85 via-[#FAFAF7]/40 to-transparent md:hidden" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-14 md:pt-24 lg:pt-28 pb-16 md:pb-24">
        <div className="md:max-w-[58%] lg:max-w-[56%] relative z-10">
          <h1
            className="font-[var(--font-sans-bc)] font-black leading-[1.18] text-[#0F1F3D] text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] tracking-[-0.02em]
              animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-backwards"
          >
            外注待ちで止まる
            <br />
            営業改善を、
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[#E8704C]">30日で社長自身</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E8704C]/15 -z-0 rounded-sm"
              />
            </span>
            が
            <br />
            回せる体に。
          </h1>

          <p
            className="mt-7 md:mt-8 text-[14px] md:text-[16px] leading-[2] text-[#475569] font-medium max-w-xl
              animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100 fill-mode-backwards"
          >
            LPの修正、営業資料の更新、問い合わせ返信の改善。
            <br className="hidden md:block" />
            小さな改善の積み重ねを、AIを使って自分の手で即日回せるように。
            <br className="hidden md:block" />
            30日で、外注待ちゼロの営業運用へ。
          </p>

          <div
            className="mt-7 flex flex-wrap gap-2.5
              animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-backwards"
          >
            {chips.map((c) => {
              const Icon = c.icon
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white border border-[#E5E7EB] px-3 py-1.5 text-[12px] md:text-[13px] font-bold text-[#0F1F3D] shadow-[0_1px_3px_rgba(15,31,61,0.05)]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#0F1F3D]" strokeWidth={2.5} />
                  {c.label}
                </span>
              )
            })}
          </div>

          <div
            className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3
              animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 fill-mode-backwards"
          >
            <PrimaryCTA size="lg" label="無料相談を予約する" />
            <SecondaryCTA size="lg" label="ライトプランを見る" />
          </div>
        </div>
      </div>

      {/* Subtle ken burns animation on photo */}
      <style>{`
        @keyframes hero-ken-burns {
          0%   { transform: scale(1.02) translate(0%, 0%); }
          100% { transform: scale(1.10) translate(-1%, -0.8%); }
        }
        .hero-ken-burns { animation: hero-ken-burns 18s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .hero-ken-burns { animation: none; }
        }
      `}</style>
    </section>
  )
}
