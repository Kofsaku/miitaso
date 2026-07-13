/** デバイス性能に応じた描画品質プロファイル */
export type Quality = {
  tier: "high" | "mid" | "low"
  count: number
  postfx: boolean
  maxDpr: number
}

// high と mid は粒子数を揃える（count が同じなら key={quality.count} が変わらず
// 劣化時に ParticleField を再マウントしない＝ガクつきが出ない）。
// 最初の劣化は Bloom(postfx) を落とし DPR を下げるだけで大きく軽くなる。
const TIERS: Record<Quality["tier"], Quality> = {
  high: { tier: "high", count: 16000, postfx: true, maxDpr: 1.5 },
  mid: { tier: "mid", count: 16000, postfx: false, maxDpr: 1.25 },
  low: { tier: "low", count: 4500, postfx: false, maxDpr: 1.25 },
}

export function resolveQuality(env: {
  coarsePointer: boolean
  deviceMemory?: number
}): Quality {
  if (env.coarsePointer) return TIERS.low
  if (env.deviceMemory !== undefined && env.deviceMemory <= 4) return TIERS.mid
  return TIERS.high
}

/** FPS低下時に1段階劣化させる（lowで底打ち） */
export function degrade(q: Quality): Quality {
  if (q.tier === "high") return TIERS.mid
  return TIERS.low
}

/** ブラウザ環境の検出（SSRでは呼ばない） */
export function detectEnv(): { coarsePointer: boolean; deviceMemory?: number } {
  return {
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    deviceMemory: (navigator as { deviceMemory?: number }).deviceMemory,
  }
}
