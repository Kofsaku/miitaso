"use client"

import { useEffect, useState } from "react"

const CAL_URL = "https://cal.com/miitaso/ai-strategy-consultation"

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName)
  }
}

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let viewContentFired = false

    const handleScroll = () => {
      setVisible(window.scrollY > 600)

      if (!viewContentFired) {
        const scrollPercent =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)
        if (scrollPercent >= 0.5) {
          viewContentFired = true
          trackEvent("ViewContent")
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F5F1E8] border-t border-[#0E1B2C]/15 px-3 py-2.5">
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Lead")}
        className="flex items-center justify-between gap-2 w-full bg-[#0E1B2C] hover:bg-[#1B2A40] text-[#F5F1E8] font-[var(--font-sans-jp)] font-medium tracking-[0.04em] text-[14px] py-3.5 px-5 rounded-none text-center transition-colors min-h-[52px]"
      >
        <span className="flex items-center gap-2">
          <span className="font-[var(--font-display)] italic text-[15px] leading-none opacity-70">
            ✦
          </span>
          30分のAI活用相談（無料）
        </span>
        <svg
          className="w-4 h-4 opacity-70"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  )
}
