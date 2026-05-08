"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animState, setAnimState] = useState<"idle" | "hidden" | "visible">("idle")

  useEffect(() => {
    if (!ref.current) return

    // Check if already in viewport
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setAnimState("visible")
      return
    }

    // Not in viewport — hide and observe
    setAnimState("hidden")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimState("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${animState !== "idle" ? "transition-all duration-700 ease-out" : ""} ${
        animState === "hidden"
          ? "opacity-0 translate-y-6"
          : "opacity-100 translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
