"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

export type TerminalLine = {
  /** 表示するテキスト */
  text: string
  /** 行頭プロンプト（例: "$"）。省略時はなし */
  prompt?: string
  /** タイプ完了後に行末へ緑チェックを表示 */
  done?: boolean
  /** タイプせず一括表示（コマンド出力行などに） */
  instant?: boolean
  /** 行テキストの色等を上書き（例: "text-emerald-400"） */
  className?: string
}

type TerminalProps = {
  lines: TerminalLine[]
  /** ウィンドウタイトル（mono表示の装飾英語） */
  title?: string
  /** 1文字あたりのタイプ速度(ms) */
  speed?: number
  /** ビューポート進入からタイプ開始までの待ち(ms) */
  startDelay?: number
  className?: string
}

/**
 * タイピングアニメ付きターミナル風ウィンドウ。
 * ビューポート進入で1回だけ再生して停止（ループしない）。
 * prefers-reduced-motion 時は全行を即時表示。
 */
export function Terminal({
  lines,
  title = "miitaso — terminal",
  speed = 28,
  startDelay = 300,
  className = "",
}: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // ビューポート進入で開始（reduced-motion 時は即完了状態）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true)
      setLineIndex(lines.length)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lines.length])

  // タイピング進行
  useEffect(() => {
    if (!started || lineIndex >= lines.length) return
    const current = lines[lineIndex]
    if (current.instant || charCount >= current.text.length) {
      // 行完了 → 少し待って次の行へ
      const timer = setTimeout(
        () => {
          setLineIndex((i) => i + 1)
          setCharCount(0)
        },
        current.instant ? 160 : 380
      )
      return () => clearTimeout(timer)
    }
    const wait = lineIndex === 0 && charCount === 0 ? startDelay : speed
    const timer = setTimeout(() => setCharCount((c) => c + 1), wait)
    return () => clearTimeout(timer)
  }, [started, lineIndex, charCount, lines, speed, startDelay])

  const finished = lineIndex >= lines.length

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b1120]/90 shadow-2xl backdrop-blur ${className}`}
    >
      {/* タイトルバー（macOS風3ドット） */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-slate-500">{title}</span>
      </div>

      {/* 本文 */}
      <div className="space-y-2 p-5 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => {
          const isPast = i < lineIndex
          const isCurrent = i === lineIndex && started && !finished
          const text = isPast
            ? line.text
            : isCurrent
              ? line.instant
                ? line.text
                : line.text.slice(0, charCount)
              : line.text
          return (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                isPast || isCurrent ? "" : "invisible"
              }`}
            >
              {line.prompt ? (
                <span className="shrink-0 text-sky-400">{line.prompt}</span>
              ) : null}
              <span className={`break-all ${line.className ?? "text-slate-300"}`}>
                {text}
                {isCurrent && !line.instant ? (
                  <span
                    aria-hidden
                    className="corp-cursor-blink ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-sky-400 sm:h-4"
                  />
                ) : null}
                {isPast && line.done ? (
                  <Check
                    aria-hidden
                    className="ml-2 inline-block h-3.5 w-3.5 text-emerald-400"
                  />
                ) : null}
              </span>
            </div>
          )
        })}
        {/* 再生完了後の待機プロンプト */}
        {finished && (
          <div className="flex items-start gap-2">
            <span className="shrink-0 text-sky-400">$</span>
            <span
              aria-hidden
              className="corp-cursor-blink inline-block h-3.5 w-[7px] translate-y-[2px] bg-sky-400 sm:h-4"
            />
          </div>
        )}
      </div>
    </div>
  )
}
