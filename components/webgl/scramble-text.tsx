"use client"

import { useEffect, useRef } from "react"

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_#$%&"

/**
 * ビューポート進入時に文字がデコード（スクランブル→確定）される演出。
 * SSRでは最終テキストがそのまま出るためSEO・非JS環境に影響しない。
 * reduced-motion時はアニメーションしない。等幅・英数字ラベル用。
 */
export function ScrambleText({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const run = () => {
      const duration = 600 + text.length * 25
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const solved = Math.floor(t * text.length)
        let out = ""
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (i < solved || ch === " " || ch === "/") {
            out += ch
          } else {
            out += CHARSET[Math.floor(Math.random() * CHARSET.length)]
          }
        }
        el.textContent = out
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          el.textContent = text
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        run()
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = text
    }
  }, [text])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  )
}
