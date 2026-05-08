"use client"

import { useEffect, useState } from "react"

const CAL_URL = "https://cal.com/miitaso/ai-bootcamp-consultation"

export function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-white/95 backdrop-blur border-t border-[#E5E7EB] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full rounded-lg bg-[#E8704C] text-white font-bold text-[14px] py-3.5"
      >
        無料相談を予約する →
      </a>
    </div>
  )
}
