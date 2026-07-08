"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { storyState } from "./story-state"
import { applyTerminalTarget, applyWordmarkTarget } from "./runtime-targets"
import { webglSupported } from "./stage-loader"

const SEEN_KEY = "miitaso-intro-seen"

/**
 * 初回訪問イントロ（合計1.5秒）: 粒子ワードマーク保持0.7s → 散開0.8s。
 * 完了後にターミナル収束（heroConverge 0→1）を発火する。
 * 2回目以降・reduced-motion・WebGL不可時は即スキップ。
 */
export function IntroOverlay() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen = sessionStorage.getItem(SEEN_KEY) === "1"

    const converge = () => {
      applyTerminalTarget()
      gsap.to(storyState, {
        heroConverge: 1,
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0.4,
      })
    }
    const onResize = () => applyTerminalTarget()
    window.addEventListener("resize", onResize)

    // WebGL不可時にイントロを走らせるとコンテンツを隠したまま
    // ワードマークが出ない（粒子が存在しない）ため、必ずスキップする。
    if (reduced || seen || !webglSupported()) {
      storyState.intro = 1
      converge()
      return () => window.removeEventListener("resize", onResize)
    }

    storyState.intro = 0
    applyWordmarkTarget()
    document.body.classList.add("intro-active")
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1")
        document.body.classList.remove("intro-active")
        document.body.classList.add("intro-done")
        converge()
      },
    })
    tl.to(storyState, { intro: 1, duration: 0.8, ease: "power2.inOut" }, 0.7)
    return () => {
      tl.kill()
      document.body.classList.remove("intro-active")
      window.removeEventListener("resize", onResize)
    }
  }, [])
  return null
}
