import { mulberry32 } from "./morph-targets"
import { runtimeTargets } from "./story-state"
import { rectPerimeterPositions, visiblePlaneSize } from "./world-mapping"

const CAMERA_FOV = 50
const CAMERA_DIST = 9

/**
 * 任意のテキストを2Dキャンバスにラスタライズして粒子座標に変換する。
 * ブラウザ専用。失敗時は null。
 */
export function rasterizeText(
  text: string,
  count: number,
  worldWidth = 9,
  seed = 11
): Float32Array | null {
  const canvas = document.createElement("canvas")
  canvas.width = 600
  canvas.height = 160
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  // 長い単語でもキャンバス内に収まるようフォントサイズを調整
  const fontSize = Math.min(120, Math.floor(560 / Math.max(1, text.length * 0.62)) * 1.0)
  ctx.font = `700 ${fontSize}px Inter, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#fff"
  ctx.fillText(text, 300, 80)
  const img = ctx.getImageData(0, 0, 600, 160).data
  const pts: number[] = []
  for (let y = 0; y < 160; y += 2) {
    for (let x = 0; x < 600; x += 2) {
      if (img[(y * 600 + x) * 4 + 3] > 128) pts.push(x, y)
    }
  }
  if (pts.length < 20) return null
  const out = new Float32Array(count * 3)
  const rand = mulberry32(seed)
  const scale = worldWidth / 600
  for (let i = 0; i < count; i++) {
    const k = Math.floor(rand() * (pts.length / 2)) * 2
    out[i * 3] = (pts[k] - 300) * scale
    out[i * 3 + 1] = (80 - pts[k + 1]) * scale
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.15
  }
  return out
}

/**
 * 「miitaso」ワードマークを粒子目標に変換する（イントロ演出用）。
 */
export function applyWordmarkTarget(count = 4000): void {
  const out = rasterizeText("miitaso", count)
  if (!out) return // ラスタライズ失敗時はワードマークなしで進む
  runtimeTargets.wordmark = out
  runtimeTargets.version += 1
}

/** 章境界タイポグラフィ: 到達章(to)ごとに粒子が描く英単語 */
export const CHAPTER_WORDS = [
  "THINK", // 00 思考（toとしては未使用だが添字を揃える）
  "DESIGN", // 01 設計
  "BUILD", // 02 実装
  "PRODUCT", // 03 成果物
  "PROOF", // 04 実績
  "PROCESS", // 05 進め方
  "YOUR TURN", // 06 次はあなた
] as const

const wordCache = new Map<string, Float32Array>()

/** 章ワードの粒子座標（キャッシュ付き）。ブラウザ専用 */
export function chapterWordTarget(chapter: number, count: number): Float32Array | null {
  const word = CHAPTER_WORDS[chapter]
  if (!word) return null
  const key = `${word}:${count}`
  const cached = wordCache.get(key)
  if (cached) return cached
  const out = rasterizeText(word, count, 8, 29 + chapter)
  if (!out) return null
  wordCache.set(key, out)
  return out
}

/**
 * ヒーローのターミナルwindowのDOM矩形を粒子の収束目標に変換する。
 * ヒーローはページ先頭にあるため、絶対座標（rect + scrollY）を
 * 「スクロール0のビューポート座標」として扱える。
 */
export function applyTerminalTarget(count = 6000): void {
  const el = document.querySelector("[data-terminal-anchor]")
  if (!el) return
  const rect = el.getBoundingClientRect()
  const plane = visiblePlaneSize(
    CAMERA_FOV,
    CAMERA_DIST,
    window.innerWidth / window.innerHeight
  )
  runtimeTargets.terminal = rectPerimeterPositions(
    {
      x: rect.left,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    },
    window.innerWidth,
    window.innerHeight,
    plane,
    count
  )
  runtimeTargets.version += 1
}
