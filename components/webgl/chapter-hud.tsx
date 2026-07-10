"use client"

import { useEffect, useRef } from "react"
import { storyState } from "./story-state"

const CHAPTERS = [
  ["00", "思考"],
  ["01", "設計"],
  ["02", "実装"],
  ["03", "成果物"],
  ["04", "実績"],
  ["05", "進め方"],
  ["06", "次はあなた"],
] as const

/**
 * 画面右端に固定表示するチャプターナビゲーションHUD。
 * storyStateをrAFで読んで現在章をハイライトし、クリックで該当章へスクロールする。
 * lg未満・reduced-motion時は非表示（CSSで制御）。
 */
export function ChapterHud() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-hud-item]"))
    let raf = 0
    let last = -1
    const tick = () => {
      const active = storyState.mix > 0.5 ? storyState.to : storyState.from
      if (active !== last) {
        last = active
        items.forEach((item, i) => {
          item.dataset.active = i === active ? "true" : "false"
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const jump = (n: number) => {
    const el = document.querySelector<HTMLElement>(`[data-story-chapter="${n}"]`)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 40
    window.scrollTo({ top: n === 0 ? 0 : top, behavior: "smooth" })
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
