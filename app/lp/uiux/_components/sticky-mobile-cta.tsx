"use client"

import { useEffect, useState } from "react"

const CAL_URL = "https://cal.com/miitaso/free-ui-review" // TODO: replace with actual URL

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName)
  }
}

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let scroll50Fired = false

    const handleScroll = () => {
      setVisible(window.scrollY > 600)

      if (!scroll50Fired) {
        const scrollPercent =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)
        if (scrollPercent >= 0.5) {
          scroll50Fired = true
          trackEvent("scroll_50")
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_click")}
        className="flex items-center justify-center gap-2 w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-base py-3.5 rounded-lg text-center transition-colors min-h-[52px]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        30分無料UI診断を予約する
      </a>
    </div>
  )
}
