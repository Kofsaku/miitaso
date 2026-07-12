/**
 * 章ごとの粒子目標座標を手続き生成する純関数群。
 * ワールド座標系: カメラ(0,0,9)/fov50 の z=0 平面。x±7.5 / y±4.5 / z±3.5 に収める。
 */

export type ShapeName =
  | "chaos"
  | "constellation"
  | "pipeline"
  | "wireframe"
  | "graph"
  | "path"
  | "lattice"

/** 章番号(0..6) → 形状名 */
export const CHAPTER_SHAPES: ShapeName[] = [
  "chaos",
  "constellation",
  "pipeline",
  "wireframe",
  "graph",
  "path",
  "lattice",
]

/** 決定的な擬似乱数（テスト可能性とSSR/CSR一致のため Math.random は使わない） */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Box-Muller。クラスタのガウス分布に使う */
function gaussian(rand: () => number): number {
  const u = Math.max(rand(), 1e-9)
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function chaos(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    out[i * 3] = (rand() * 2 - 1) * 7
    out[i * 3 + 1] = (rand() * 2 - 1) * 4
    out[i * 3 + 2] = (rand() * 2 - 1) * 3
  }
  return out
}

/** 3サービスに対応する3つの星座クラスタ */
function constellation(count: number, rand: () => number): Float32Array {
  const centers = [
    [-3.4, 0.6, 0],
    [0, -0.4, 0],
    [3.4, 0.6, 0],
  ]
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const c = centers[i % 3]
    out[i * 3] = clamp(c[0] + gaussian(rand) * 0.9, -7.5, 7.5)
    out[i * 3 + 1] = clamp(c[1] + gaussian(rand) * 0.7, -4.5, 4.5)
    out[i * 3 + 2] = clamp(c[2] + gaussian(rand) * 0.5, -3.5, 3.5)
  }
  return out
}

/** アイデア→コードの光の流れ。5本の正弦ストリーム */
function pipeline(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const lanes = [-2.4, -1.2, 0, 1.2, 2.4]
  for (let i = 0; i < count; i++) {
    const lane = lanes[i % lanes.length]
    const t = rand()
    const x = -6 + t * 12
    out[i * 3] = x
    out[i * 3 + 1] = clamp(lane * 0.9 + Math.sin(x * 0.8 + lane * 2.1) * 0.55 + gaussian(rand) * 0.08, -4.5, 4.5)
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.5
  }
  return out
}

/** 3枚の画面ワイヤーフレーム（枠＋ヘッダーライン） */
function wireframe(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const screens = [-3.6, 0, 3.6]
  const w = 2.7
  const h = 1.8
  for (let i = 0; i < count; i++) {
    const cx = screens[i % 3]
    const r = rand()
    let x: number, y: number
    if (r < 0.72) {
      // 外周
      const t = rand() * 4
      const side = Math.floor(t)
      const f = t - side
      if (side === 0) { x = -w / 2 + f * w; y = h / 2 }
      else if (side === 1) { x = w / 2; y = h / 2 - f * h }
      else if (side === 2) { x = w / 2 - f * w; y = -h / 2 }
      else { x = -w / 2; y = -h / 2 + f * h }
    } else if (r < 0.86) {
      // タイトルバー
      x = -w / 2 + rand() * w
      y = h / 2 - 0.32
    } else {
      // 内側の行（コンテンツ表現）
      x = -w / 2 + 0.2 + rand() * (w - 0.4)
      y = h / 2 - 0.7 - Math.floor(rand() * 3) * 0.38
    }
    out[i * 3] = cx + x
    out[i * 3 + 1] = y + 0.2
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.15
  }
  return out
}

/** 立ち上がる4本の棒グラフ（右肩上がり＝実績の成長）。列を締めてバーを明確に */
function graph(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const cols = [-3.6, -1.2, 1.2, 3.6]
  const heights = [1.5, 2.4, 3.2, 4.0]
  for (let i = 0; i < count; i++) {
    const c = i % 4
    // 横方向のジッターを締めて柱として読ませる（端はわずかに柔らかく）
    out[i * 3] = cols[c] + (rand() * 2 - 1) * 0.34
    out[i * 3 + 1] = -2.2 + rand() * heights[c]
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.3
  }
  return out
}

/** 一本の道＋ステップの光点（4ノード濃縮） */
function path(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const nodeTs = [0.12, 0.38, 0.64, 0.9]
  for (let i = 0; i < count; i++) {
    let t: number
    if (rand() < 0.45) {
      // ノード周辺に濃縮
      t = clamp(nodeTs[i % 4] + gaussian(rand) * 0.02, 0, 1)
    } else {
      t = rand()
    }
    const x = -5.5 + t * 11
    out[i * 3] = x
    out[i * 3 + 1] = clamp(Math.sin(t * Math.PI * 2.2) * 1.5 + gaussian(rand) * 0.07, -4.5, 4.5)
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.3
  }
  return out
}

/** 整然とした3D格子（静まり＝完成） */
function lattice(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const nx = 16
  const ny = 9
  const nz = 4
  const cells = nx * ny * nz
  for (let i = 0; i < count; i++) {
    const cell = i % cells
    const ix = cell % nx
    const iy = Math.floor(cell / nx) % ny
    const iz = Math.floor(cell / (nx * ny))
    out[i * 3] = -6 + (ix / (nx - 1)) * 12 + gaussian(rand) * 0.02
    out[i * 3 + 1] = -3.2 + (iy / (ny - 1)) * 6.4 + gaussian(rand) * 0.02
    out[i * 3 + 2] = -1.5 + (iz / (nz - 1)) * 3 + gaussian(rand) * 0.02
  }
  return out
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v))
}

const GENERATORS: Record<ShapeName, (count: number, rand: () => number) => Float32Array> = {
  chaos,
  constellation,
  pipeline,
  wireframe,
  graph,
  path,
  lattice,
}

export function generateShape(name: ShapeName, count: number, seed = 1): Float32Array {
  return GENERATORS[name](count, mulberry32(seed * 7919 + name.length))
}
