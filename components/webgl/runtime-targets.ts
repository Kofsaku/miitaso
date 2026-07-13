import { mulberry32 } from "./morph-targets"
import { runtimeTargets } from "./story-state"
import { rectPerimeterPositions, visiblePlaneSize } from "./world-mapping"

const CAMERA_FOV = 50
const CAMERA_DIST = 9

/**
 * 現在のビューポートで英単語が横幅に収まる worldWidth を返す。
 * 広い画面では従来通り8。縦長のスマホ/タブレットでは可視幅に合わせて
 * 単語を縮め、全文字が画面内に収まるようにする（見切れ防止）。
 */
function fitWordWidth(): number {
  if (typeof window === "undefined") return 8
  const aspect = window.innerWidth / window.innerHeight
  const plane = visiblePlaneSize(CAMERA_FOV, CAMERA_DIST, aspect)
  return Math.min(8, plane.width * 0.82)
}

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
  // サンプル間隔を広げると、同じ粒子数がより少ない目標点へ集まり、
  // 文字が「塗り」ではなく「発光する点の集合」として粒子感を保つ
  for (let y = 0; y < 160; y += 3) {
    for (let x = 0; x < 600; x += 3) {
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
  const out = rasterizeText("miitaso", count, fitWordWidth())
  if (!out) return // ラスタライズ失敗時はワードマークなしで進む
  runtimeTargets.wordmark = out
  runtimeTargets.version += 1
}

/** 章境界タイポグラフィ: 到達章(to)ごとに粒子が描く英単語 */
// 章＝セクション＝背景ワードを一致させる。空文字の章はワードを出さない（＝中身とズレない）。
export const CHAPTER_WORDS = [
  "THINK", // 00 Hero（toとしては未使用）
  "", // 01 こんなこと（課題）＝ワードなし
  "SOLVE", // 02 サービス
  "PROCESS", // 03 進め方
  "PROOF", // 04 実績
  "PRODUCT", // 05 自社プロダクト＆ツール
  "YOUR TURN", // 06 ご相談
] as const

const wordCache = new Map<string, Float32Array>()

/** 章ワードの粒子座標（キャッシュ付き）。ブラウザ専用 */
export function chapterWordTarget(chapter: number, count: number): Float32Array | null {
  const word = CHAPTER_WORDS[chapter]
  if (!word) return null
  const w = fitWordWidth()
  // 画面幅バケットをキーに含め、リサイズで別幅になったら再ラスタライズする
  const key = `${word}:${count}:${Math.round(w * 4)}`
  const cached = wordCache.get(key)
  if (cached) return cached
  const out = rasterizeText(word, count, w, 29 + chapter)
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
