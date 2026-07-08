"use client"

import { useEffect, useRef } from "react"

/**
 * カスタムカーソル（ドット＋追従リング）。
 * a / button / [data-magnetic] ホバーでリング拡大。
 * タッチ端末・reduced-motionでは何もしない。
 */
export function CursorFx() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    document.body.classList.add("corp-custom-cursor")
    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let scale = 1
    let hover = false
    let raf = 0
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      hover = Boolean(
        (e.target as Element | null)?.closest?.("a, button, [data-magnetic]")
      )
    }
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      scale += ((hover ? 1.8 : 1) - scale) * 0.2
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${scale})`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      document.body.classList.remove("corp-custom-cursor")
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-sky-300"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-sky-300/60"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </div>
  )
}
