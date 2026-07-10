"use client"

import dynamic from "next/dynamic"
import { Component, useEffect, useState, type ReactNode } from "react"
import { GridBackground, Glow } from "@/components/corporate/backgrounds"
import { storyState } from "./story-state"

const WebglScene = dynamic(() => import("./scene"), { ssr: false })

/** WebGL不可・エラー・reduced-motion時の静的背景（現行デザインを踏襲） */
function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <GridBackground fade />
      <Glow className="-top-24 left-1/4 h-96 w-96" />
      <Glow className="-bottom-24 right-0 h-80 w-80 bg-violet-500/10" />
    </div>
  )
}

class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    // クラッシュ時もstatic経路と同じ状態に収束させる（中途半端なイントロ値を残さない）
    storyState.intro = 1
    storyState.heroConverge = 1
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** intro-overlay等からも参照するためexport */
export function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    )
  } catch {
    return false
  }
}

/**
 * トップページ用WebGLステージの入口。
 * SSRでは何も描かず、クライアントで環境判定してからシーンを遅延マウントする。
 */
export function StageLoader() {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending")

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !webglSupported()) {
      // イントロ・収束演出も無効化しておく（粒子が存在しないため）
      storyState.intro = 1
      storyState.heroConverge = 1
      setMode("static")
      return
    }
    setMode("webgl")
    // GPUコンテキストロスト（ドライバ再起動等）→ 静的背景へ切替
    const onLost = () => {
      storyState.intro = 1
      storyState.heroConverge = 1
      setMode("static")
    }
    window.addEventListener("miitaso:webgl-lost", onLost)
    return () => window.removeEventListener("miitaso:webgl-lost", onLost)
  }, [])

  if (mode === "pending") return <StaticBackdrop />
  if (mode === "static") return <StaticBackdrop />
  return (
    <SceneErrorBoundary fallback={<StaticBackdrop />}>
      <WebglScene />
    </SceneErrorBoundary>
  )
}
