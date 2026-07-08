"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing"
import { degrade, detectEnv, resolveQuality, type Quality } from "./quality"
import { measureChapters, updateStoryFromScroll } from "./scroll-story"
import { storyState } from "./story-state"
import { ParticleField } from "./particle-field"

/** FPSを監視し45を2秒下回ったら品質を1段階落とす */
function FpsWatchdog({ onDegrade }: { onDegrade: () => void }) {
  const acc = useRef({ time: 0, frames: 0 })
  useFrame((_, delta) => {
    acc.current.time += delta
    acc.current.frames += 1
    if (acc.current.time >= 2) {
      const fps = acc.current.frames / acc.current.time
      acc.current.time = 0
      acc.current.frames = 0
      if (fps < 45) onDegrade()
    }
  })
  return null
}

/** 章切替の瞬間だけ色収差を効かせる */
function TransitionAberration() {
  const ref = useRef<{ offset: THREE.Vector2 } | null>(null)
  useFrame(() => {
    if (!ref.current) return
    const energy = 4 * storyState.mix * (1 - storyState.mix) // mix=0.5で最大
    const amount = energy * 0.0018
    ref.current.offset.set(amount, amount * 0.6)
  })
  return (
    <ChromaticAberration
      ref={ref as never}
      offset={new THREE.Vector2(0, 0)}
    />
  )
}

/**
 * WebGLシーン本体。スクロール購読・品質管理もここが持つ。
 * StageLoaderからdynamic importされる（default export）。
 */
export default function WebglScene() {
  const [quality, setQuality] = useState<Quality>(() => resolveQuality(detectEnv()))

  // スクロール→storyState更新（Lenis導入後もwindowスクロールイベントは発火する）
  useEffect(() => {
    let anchors = measureChapters()
    const update = () => {
      updateStoryFromScroll(
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
        anchors
      )
    }
    const remeasure = () => {
      anchors = measureChapters()
      update()
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", remeasure)
    // フォント読込等でレイアウトが動くため少し遅れて再計測
    const t = setTimeout(remeasure, 1200)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", remeasure)
      clearTimeout(t)
    }
  }, [])

  // マウスアクティブ（タッチ端末は常に0）
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const on = () => { storyState.mouseActive = 1 }
    const off = () => { storyState.mouseActive = 0 }
    window.addEventListener("pointermove", on, { passive: true })
    document.documentElement.addEventListener("mouseleave", off)
    return () => {
      window.removeEventListener("pointermove", on)
      document.documentElement.removeEventListener("mouseleave", off)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ fov: 50, position: [0, 0, 9], near: 0.1, far: 60 }}
        dpr={[1, quality.maxDpr]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <ParticleField key={quality.count} count={quality.count} />
        {quality.tier !== "low" && (
          <FpsWatchdog onDegrade={() => setQuality((q) => degrade(q))} />
        )}
        {quality.postfx && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <TransitionAberration />
            <Vignette eskil={false} offset={0.18} darkness={0.78} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
