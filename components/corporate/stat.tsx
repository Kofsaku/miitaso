"use client"

import { useEffect, useRef, useState } from "react"

type StatProps = {
  /**
   * 表示する値。"2,000" / 500 / "8位→2位" など。
   * 数値として解釈できればカウントアップ、できなければ文字列のまま表示（fallback）。
   */
  value: number | string
  /** 値の前に付ける文字（例: "¥"） */
  prefix?: string
  /** 値の後ろに付ける文字（例: "万円", "カ国"） */
  suffix?: string
  /** 値の下に出すキャプション */
  label?: string
  /** カウントアップ時間(ms) */
  duration?: number
  className?: string
  /** 指定すると値のデフォルトスタイルを置き換える */
  valueClassName?: string
  /** 指定するとキャプションのデフォルトスタイルを置き換える */
  labelClassName?: string
}

function parseNumeric(value: number | string): { num: number; decimals: number } | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? { num: value, decimals: 0 } : null
  }
  const cleaned = value.replace(/,/g, "").trim()
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null
  const num = parseFloat(cleaned)
  const decimals = cleaned.includes(".") ? cleaned.split(".")[1].length : 0
  return { num, decimals }
}

/**
 * ビューポート進入時に数値をカウントアップ表示するスタッツ。
 * 「8位→2位」のような非数値はそのまま文字列表示にフォールバックする。
 * prefers-reduced-motion 時はアニメーションせず最終値を即表示。
 */
export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 1600,
  className = "",
  valueClassName,
  labelClassName,
}: StatProps) {
  const parsed = parseNumeric(value)
  const ref = useRef<HTMLDivElement>(null)
  // 初期HTML（SSR・非JS環境・クローラー）には最終値を出す。
  // カウントアップはビューポート進入時に 0 にリセットしてから開始する。
  const [display, setDisplay] = useState(parsed?.num ?? 0)

  useEffect(() => {
    if (!parsed) return
    const target = parsed.num
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setDisplay(0)
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
          setDisplay(target * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
    // value は固定で渡される想定（マウント時に1回だけ設定）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valueCls =
    valueClassName ?? "text-4xl font-bold tracking-tight text-white md:text-5xl"
  const labelCls = labelClassName ?? "mt-2 text-sm text-slate-500"

  const formatted = parsed
    ? display.toLocaleString("ja-JP", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : null

  // スクリーンリーダー向けの静的な最終値（カウントアップの中間値を読ませない）
  const finalFormatted = parsed
    ? parsed.num.toLocaleString("ja-JP", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : String(value)

  return (
    <div ref={ref} className={className}>
      <div className={valueCls}>
        <span aria-hidden="true">
          {prefix}
          {parsed ? <span className="tabular-nums">{formatted}</span> : <span>{value}</span>}
          {suffix}
        </span>
        <span className="sr-only">{`${prefix}${finalFormatted}${suffix}`}</span>
      </div>
      {label ? <p className={labelCls}>{label}</p> : null}
    </div>
  )
}
