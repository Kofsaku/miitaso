"use client"

import { useEffect, useRef } from "react"

/** 画面上端のスクロール進捗バー（storyStateに依存せず単独で動く） */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const doc = document.documentElement
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable))
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
