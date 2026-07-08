"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

/** カーソルに吸い付くラッパー（CTAボタン用） */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)"
  }
  return (
    <div
      ref={ref}
      data-magnetic
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
