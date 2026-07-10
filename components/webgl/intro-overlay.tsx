"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { storyState } from "./story-state"
import { applyTerminalTarget, applyWordmarkTarget } from "./runtime-targets"
import { webglSupported } from "./stage-loader"

const SEEN_KEY = "miitaso-intro-seen"

// Safariプライベートモード等でストレージが例外を投げても
// イントロ進行（＝コンテンツ再表示）を止めないための安全ラッパ
function safeGetSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1"
  } catch {
    return false
  }
}
function safeSetSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1")
  } catch {
    /* 記憶できないだけ（毎回イントロが出る）で害はない */
  }
}

const BOOT_LINES = [
  "BOOT PARTICLE ENGINE — 24,000 UNITS",
  "COMPILING SHADERS … OK",
  "MEASURING DOM TARGETS … OK",
  "LINKING SCROLL STORY … OK",
]

/**
 * 初回訪問イントロ（約2.2秒）: 粒子ワードマーク＋起動ログ＋カウンター00→100
 * → 散開 → ターミナル収束（heroConverge 0→1）を発火する。
 * 2回目以降・reduced-motion・WebGL不可時は即スキップ。
 */
export function IntroOverlay() {
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen = safeGetSeen()

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
    setRunning(true)

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        safeSetSeen()
        document.body.classList.remove("intro-active")
        document.body.classList.add("intro-done")
        setRunning(false)
        converge()
      },
    })
    // カウンター 000→100（1.3秒）
    tl.to(counter, {
      v: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        const el = document.getElementById("intro-counter")
        if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0")
      },
    }, 0)
    // カウンター完了後にワードマークが散開して物語へ
    tl.to(storyState, { intro: 1, duration: 0.8, ease: "power2.inOut" }, 1.4)
    // HUDはtween生成時点で未マウントのため、実行時にターゲット解決する
    tl.call(
      () => {
        const el = document.getElementById("intro-hud")
        if (el) gsap.to(el, { opacity: 0, duration: 0.35, ease: "power1.out" })
      },
      undefined,
      1.4
    )
    return () => {
      tl.kill()
      document.body.classList.remove("intro-active")
      setRunning(false)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  if (!running) return null
  return (
    <div
      id="intro-hud"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] font-mono"
    >
      {/* 起動ログ（左下） */}
      <div className="absolute bottom-8 left-6 space-y-1.5 md:bottom-10 md:left-10">
        {BOOT_LINES.map((line, i) => (
          <p
            key={line}
            className="corp-boot-line text-[10px] tracking-[0.2em] text-slate-500"
            style={{ animationDelay: `${150 + i * 260}ms` }}
          >
            {line}
          </p>
        ))}
      </div>
      {/* カウンター（右下） */}
      <div className="absolute bottom-6 right-6 flex items-end gap-2 md:bottom-8 md:right-10">
        <span
          id="intro-counter"
          className="text-5xl font-bold tabular-nums tracking-tight text-white/90 md:text-6xl"
        >
          000
        </span>
        <span className="mb-2 text-xs tracking-[0.3em] text-sky-400">%</span>
      </div>
    </div>
  )
}
