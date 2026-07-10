"use client"

import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CHAPTER_SHAPES, generateShape, mulberry32 } from "./morph-targets"
import { avoidZones, runtimeTargets, storyState } from "./story-state"
import { packVisibleRects } from "./content-avoid"
import { chapterWordTarget } from "./runtime-targets"
import { particleFragmentShader, particleVertexShader } from "./shaders"

const COLOR_A = new THREE.Color("#38bdf8") // sky-400
const COLOR_B = new THREE.Color("#8b5cf6") // violet-500

/**
 * 粒子システム本体。章別目標座標をattributeに焼き、
 * 毎フレームstoryStateをuniformへ流し込むだけ（CPU負荷は一定）。
 */
export function ParticleField({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const appliedVersion = useRef(-1)
  const mouse = useRef({ x: 0, y: 0 })
  // 品質degrade再マウント時に過去クリックが幻発火しないよう現在seqから開始
  const burstSeq = useRef(storyState.burst.seq)
  const burstSlot = useRef(0)
  const wordChapter = useRef(-1)
  const prevMouse = useRef(new THREE.Vector2(0, 0))

  const attributes = useMemo(() => {
    const chaos = generateShape("chaos", count)
    const rand = mulberry32(99)
    const randoms = new Float32Array(count)
    for (let i = 0; i < count; i++) randoms[i] = rand()
    return {
      chaos,
      constellation: generateShape("constellation", count),
      pipeline: generateShape("pipeline", count),
      wireframe: generateShape("wireframe", count),
      graph: generateShape("graph", count),
      path: generateShape("path", count),
      lattice: generateShape("lattice", count),
      // 実行時計測前はカオスのコピー（＝収束しても違和感なし）
      terminal: chaos.slice(),
      wordmark: chaos.slice(),
      word: chaos.slice(),
      randoms,
    }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uMix: { value: 0 },
      uIntro: { value: 1 },
      uHeroConverge: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uMouseActive: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 3.5 },
      uColorA: { value: COLOR_A },
      uColorB: { value: COLOR_B },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uAvoidRects: { value: new Float32Array(8 * 4) },
      uAvoidCount: { value: 0 },
      uBurstPos: { value: new Float32Array(4 * 3) },
      uBurstTime: { value: new Float32Array(4).fill(-100) },
      uVelocity: { value: 0 },
      uWordActive: { value: 0 },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
    }),
    []
  )

  // 実行時目標（ワードマーク/ターミナル枠）の反映
  const applyRuntimeTargets = () => {
    const geo = geometryRef.current
    if (!geo || appliedVersion.current === runtimeTargets.version) return
    appliedVersion.current = runtimeTargets.version
    for (const [name, data] of [
      ["aWordmark", runtimeTargets.wordmark],
      ["aTerminal", runtimeTargets.terminal],
    ] as const) {
      if (!data) continue
      const attr = geo.getAttribute(name) as THREE.BufferAttribute
      // 粒子数と長さが違う場合は繰り返しで埋める
      const arr = attr.array as Float32Array
      for (let i = 0; i < arr.length; i++) arr[i] = data[i % data.length]
      attr.needsUpdate = true
    }
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    // クリック衝撃波（マウス/ペンのみ。タッチはスクロール操作のたびに発火して煩いため除外）
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      storyState.burst.x = e.clientX
      storyState.burst.y = e.clientY
      storyState.burst.seq += 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [])

  // 章ワードを事前ラスタライズしてスクロール中の同期生成ジャンクを防ぐ
  useEffect(() => {
    const t = setTimeout(() => {
      for (let c = 1; c < 7; c++) chapterWordTarget(c, count)
    }, 800)
    return () => clearTimeout(t)
  }, [count])

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return
    applyRuntimeTargets()
    const u = mat.uniforms
    u.uTime.value += delta
    u.uFrom.value = storyState.from
    u.uTo.value = storyState.to
    u.uMix.value = storyState.mix
    u.uIntro.value = storyState.intro
    u.uHeroConverge.value = storyState.heroConverge
    u.uPixelRatio.value = state.gl.getPixelRatio()
    // マウスをワールド座標へ（z=0平面）＋ダンピング
    const { width, height } = state.viewport
    const wx = (mouse.current.x / state.size.width - 0.5) * width
    const wy = (0.5 - mouse.current.y / state.size.height) * height
    const v = u.uMouse.value as THREE.Vector3
    v.x += (wx - v.x) * Math.min(1, delta * 6)
    v.y += (wy - v.y) * Math.min(1, delta * 6)
    u.uMouseActive.value +=
      (storyState.mouseActive - u.uMouseActive.value) * Math.min(1, delta * 4)

    // テキスト回避矩形: ビューポートに掛かるものだけスクリーン座標で渡す
    u.uResolution.value.set(state.size.width, state.size.height)
    u.uAvoidCount.value = packVisibleRects(
      avoidZones.rects,
      window.scrollY,
      state.size.height,
      u.uAvoidRects.value as Float32Array
    )

    // クリック衝撃波: 新規バーストをワールド座標(z=0平面)へ変換し4スロットに巡回記録
    if (storyState.burst.seq !== burstSeq.current) {
      burstSeq.current = storyState.burst.seq
      const slot = burstSlot.current
      burstSlot.current = (slot + 1) % 4
      const bp = u.uBurstPos.value as Float32Array
      bp[slot * 3] = (storyState.burst.x / state.size.width - 0.5) * width
      bp[slot * 3 + 1] = (0.5 - storyState.burst.y / state.size.height) * height
      bp[slot * 3 + 2] = 0
      ;(u.uBurstTime.value as Float32Array)[slot] = u.uTime.value
    }

    // カーソル移動速度（ワールド単位/秒）→ 渦の強さ
    const mv = u.uMouseVel.value as THREE.Vector2
    const dt = Math.max(delta, 1 / 240)
    const instX = (v.x - prevMouse.current.x) / dt
    const instY = (v.y - prevMouse.current.y) / dt
    prevMouse.current.set(v.x, v.y)
    mv.x += (instX - mv.x) * Math.min(1, delta * 8)
    mv.y += (instY - mv.y) * Math.min(1, delta * 8)

    // 章境界タイポグラフィ: 到達章が変わったら描く単語を差し替える
    if (storyState.to !== wordChapter.current) {
      wordChapter.current = storyState.to
      const target = chapterWordTarget(storyState.to, count)
      if (target && geometryRef.current) {
        const attr = geometryRef.current.getAttribute("aWord") as THREE.BufferAttribute
        ;(attr.array as Float32Array).set(target)
        attr.needsUpdate = true
        u.uWordActive.value = 1
      } else {
        u.uWordActive.value = 0
      }
    }

    // スクロール速度 → ゆらぎ増幅（Lenisが書き、ここで減衰させる）
    u.uVelocity.value += (storyState.scrollVelocity - u.uVelocity.value) * Math.min(1, delta * 5)
    storyState.scrollVelocity *= Math.exp(-delta * 2.5)
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[attributes.chaos, 3]} />
        <bufferAttribute attach="attributes-aConstellation" args={[attributes.constellation, 3]} />
        <bufferAttribute attach="attributes-aPipeline" args={[attributes.pipeline, 3]} />
        <bufferAttribute attach="attributes-aWireframe" args={[attributes.wireframe, 3]} />
        <bufferAttribute attach="attributes-aGraph" args={[attributes.graph, 3]} />
        <bufferAttribute attach="attributes-aPath" args={[attributes.path, 3]} />
        <bufferAttribute attach="attributes-aLattice" args={[attributes.lattice, 3]} />
        <bufferAttribute attach="attributes-aTerminal" args={[attributes.terminal, 3]} />
        <bufferAttribute attach="attributes-aWordmark" args={[attributes.wordmark, 3]} />
        <bufferAttribute attach="attributes-aWord" args={[attributes.word, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[attributes.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
