"use client"

import { useEffect, useRef } from "react"
import { computeStory, measureChapters } from "./scroll-story"

const CHAPTERS = [
  ["00", "思考"],
  ["01", "サービス"],
  ["02", "考え方"],
  ["03", "プロダクト"],
  ["04", "実績"],
  ["05", "進め方"],
  ["06", "ご相談"],
] as const

/**
 * 画面右端に固定表示するチャプターナビゲーションHUD。
 * スクロール位置から現在章を自前で算出するため、WebGL非対応・
 * reduced-motionの静的フォールバック時もハイライトが機能する。
 * lg未満は非表示（CSSで制御）。
 */
export function ChapterHud() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-hud-item]"))
    let anchors = measureChapters()
    let last = -1
    const update = () => {
      const s = computeStory(window.scrollY + window.innerHeight / 2, anchors)
      const active = s.mix > 0.5 ? s.to : s.from
      if (active === last) return
      last = active
      items.forEach((item, i) => {
        item.dataset.active = i === active ? "true" : "false"
      })
    }
    const remeasure = () => {
      anchors = measureChapters()
      update()
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", remeasure)
    const t = setTimeout(remeasure, 1200)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", remeasure)
      clearTimeout(t)
    }
  }, [])

  const jump = (n: number) => {
    const el = document.querySelector<HTMLElement>(`[data-story-chapter="${n}"]`)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 40
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: n === 0 ? 0 : top, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <nav
      ref={rootRef}
      aria-label="ページ内チャプター"
      className="corp-hud fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
    >
      {CHAPTERS.map(([num, label], i) => (
        <button
          key={num}
          type="button"
          data-hud-item
          data-active={i === 0 ? "true" : "false"}
          onClick={() => jump(i)}
          className="group flex items-center gap-3 py-1.5 text-right"
          aria-label={`${num} ${label}へ移動`}
        >
          <span className="corp-hud-label font-mono text-[10px] tracking-[0.25em] text-slate-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-data-[active=true]:text-sky-300 group-data-[active=true]:opacity-100">
            {num} {label}
          </span>
          <span className="corp-hud-dot h-px w-4 bg-slate-600 transition-all duration-300 group-hover:bg-slate-300 group-data-[active=true]:w-7 group-data-[active=true]:bg-sky-400" />
        </button>
      ))}
    </nav>
  )
}
