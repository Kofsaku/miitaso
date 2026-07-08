import { mulberry32 } from "./morph-targets"
import { runtimeTargets } from "./story-state"
import { rectPerimeterPositions, visiblePlaneSize } from "./world-mapping"

const CAMERA_FOV = 50
const CAMERA_DIST = 9

/**
 * 「miitaso」の文字形状を2Dキャンバスにラスタライズして粒子座標に変換する。
 * ブラウザ専用（イントロ演出でのみ呼ばれる）。
 */
export function applyWordmarkTarget(count = 4000): void {
  const canvas = document.createElement("canvas")
  canvas.width = 600
  canvas.height = 160
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.font = "700 120px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#fff"
  ctx.fillText("miitaso", 300, 80)
  const img = ctx.getImageData(0, 0, 600, 160).data
  const pts: number[] = []
  for (let y = 0; y < 160; y += 2) {
    for (let x = 0; x < 600; x += 2) {
      if (img[(y * 600 + x) * 4 + 3] > 128) pts.push(x, y)
    }
  }
  if (pts.length < 20) return // ラスタライズ失敗時はワードマークなしで進む
  const out = new Float32Array(count * 3)
  const rand = mulberry32(11)
  const scale = 9 / 600 // 600px幅 → ワールド9ユニット幅
  for (let i = 0; i < count; i++) {
    const k = Math.floor(rand() * (pts.length / 2)) * 2
    out[i * 3] = (pts[k] - 300) * scale
    out[i * 3 + 1] = (80 - pts[k + 1]) * scale
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.15
  }
  runtimeTargets.wordmark = out
  runtimeTargets.version += 1
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
