"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { storyState } from "./story-state"

/**
 * Lenis慣性スクロール＋GSAP ScrollTrigger同期。
 * スクロール速度を storyState に流し、粒子のゆらぎ・ストリーク・FOVに反映する。
 * prefers-reduced-motion時は何もしない（ネイティブスクロールのまま）。
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on("scroll", (e: { velocity: number }) => {
      ScrollTrigger.update()
      const v = Math.min(1, Math.abs(e.velocity) / 60)
      if (v > storyState.scrollVelocity) storyState.scrollVelocity = v
    })
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
