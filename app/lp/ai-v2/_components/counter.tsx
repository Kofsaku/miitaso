"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedCounter({
  target,
  suffix,
  label,
}: {
  target: string
  suffix: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  const numericTarget = parseInt(target.replace(/,/g, ""), 10)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const duration = 1500
    const steps = 40
    const increment = numericTarget / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), numericTarget)
      setCount(current)
      if (step >= steps) {
        clearInterval(timer)
        setCount(numericTarget)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [started, numericTarget])

  const displayNumber = started
    ? count.toLocaleString()
    : "0"

  return (
    <div
      ref={ref}
      className="text-center bg-[#F5F7FA] rounded-xl p-5 md:p-6 border border-gray-100"
    >
      <div className="text-[#1A3C6E] whitespace-nowrap">
        <span className="text-3xl md:text-4xl font-bold">{displayNumber}</span>
        <span className="text-sm md:text-base font-bold">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-[#555] mt-2">{label}</div>
    </div>
  )
}
