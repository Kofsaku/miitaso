"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** 出現までの遅延（ミリ秒）。カードのスタッガーに使う */
  delay?: number
  className?: string
}

/**
 * スクロール出現アニメーション（IntersectionObserver）。
 * ビューポートに入ると opacity-0 / translate-y-6 から表示状態へ遷移する。
 * prefers-reduced-motion 時はアニメーションせず即表示。
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${reduced ? "" : "transition-all duration-700 ease-out"} ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 will-change-transform"
      } ${className}`}
      style={delay > 0 && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
