"use client"

import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CHAPTER_SHAPES, generateShape, mulberry32 } from "./morph-targets"
import { runtimeTargets, storyState } from "./story-state"
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
      uSize: { value: 40 },
      uColorA: { value: COLOR_A },
      uColorB: { value: COLOR_B },
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
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

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
