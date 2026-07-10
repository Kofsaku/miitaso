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
import { measureAvoidZones } from "./content-avoid"
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

/**
 * シネマティック・カメラリグ。章ごとに微妙に異なるポーズへ滑らかに遷移し、
 * マウスパララックスとスクロール速度FOVキックを重ねる。
 * 章0はターミナル収束のスクリーン座標整合のため恒等ポーズ＋パララックス無効。
 */
const CAMERA_POSES: [number, number, number][] = [
  [0, 0, 9], // 00 思考（恒等: ターミナル収束の座標系を保つ）
  [0.9, 0.35, 8.6], // 01 設計
  [-1.1, 0.25, 8.4], // 02 実装
  [0.8, -0.3, 8.8], // 03 成果物
  [-0.9, 0.4, 8.5], // 04 実績
  [1.0, 0.3, 8.3], // 05 進め方
  [0, 0.15, 8.9], // 06 次はあなた
]

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera
    const t = storyState.from + storyState.mix
    const i = Math.min(Math.floor(t), CAMERA_POSES.length - 1)
    const f0 = Math.min(Math.max(t - i, 0), 1)
    const f = f0 * f0 * (3 - 2 * f0) // smoothstep
    const a = CAMERA_POSES[i]
    const b = CAMERA_POSES[Math.min(i + 1, CAMERA_POSES.length - 1)]
    // 章0付近ではパララックスを消してターミナル収束のズレを防ぐ
    const par = Math.min(1, t) * storyState.mouseActive
    const tx = a[0] + (b[0] - a[0]) * f + mouse.current.x * 0.45 * par
    const ty = a[1] + (b[1] - a[1]) * f - mouse.current.y * 0.3 * par
    const tz = a[2] + (b[2] - a[2]) * f
    const k = Math.min(1, delta * 2.2)
    cam.position.x += (tx - cam.position.x) * k
    cam.position.y += (ty - cam.position.y) * k
    cam.position.z += (tz - cam.position.z) * k
    cam.lookAt(0, 0, 0)
    // スクロール速度FOVキック（疾走感）。章0はターミナル収束の整合を守るため無効
    const fovTarget = 50 + storyState.scrollVelocity * 5 * Math.min(1, t)
    if (Math.abs(cam.fov - fovTarget) > 0.02) {
      cam.fov += (fovTarget - cam.fov) * Math.min(1, delta * 4)
      cam.updateProjectionMatrix()
    }
  })
  return null
}

/** 章切替の瞬間とスクロール高速時だけ色収差を効かせる */
function TransitionAberration() {
  const ref = useRef<{ offset: THREE.Vector2 } | null>(null)
  useFrame(() => {
    if (!ref.current) return
    const energy = 4 * storyState.mix * (1 - storyState.mix) // mix=0.5で最大
    const amount = energy * 0.001 + storyState.scrollVelocity * 0.0012
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
      measureAvoidZones()
      update()
    }
    measureAvoidZones()
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", remeasure)
    // フォント読込等でレイアウトが動くため少し遅れて再計測
    const t = setTimeout(remeasure, 1200)
    // アコーディオン開閉などレイアウト高さの変化にも追従（debounce付き）
    let debounce: ReturnType<typeof setTimeout> | undefined
    const ro = new ResizeObserver(() => {
      clearTimeout(debounce)
      debounce = setTimeout(remeasure, 200)
    })
    ro.observe(document.body)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", remeasure)
      clearTimeout(t)
      clearTimeout(debounce)
      ro.disconnect()
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
        onCreated={({ gl }) => {
          // コンテキストロスト時は静的背景へフォールバック（stage-loaderが受ける）
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault()
            window.dispatchEvent(new Event("miitaso:webgl-lost"))
          })
        }}
      >
        <ParticleField key={quality.count} count={quality.count} />
        <CameraRig />
        {quality.tier !== "low" && (
          <FpsWatchdog onDegrade={() => setQuality((q) => degrade(q))} />
        )}
        {quality.postfx && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.35}
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
