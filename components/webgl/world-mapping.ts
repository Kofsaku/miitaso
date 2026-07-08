import { mulberry32 } from "./morph-targets"

type PlaneSize = { width: number; height: number }
type PixelRect = { x: number; y: number; width: number; height: number }

/** カメラfov(度)と距離から、z=0平面の可視サイズを求める */
export function visiblePlaneSize(
  fovDeg: number,
  dist: number,
  aspect: number
): PlaneSize {
  const height = 2 * dist * Math.tan((fovDeg * Math.PI) / 360)
  return { height, width: height * aspect }
}

/** ピクセル座標→z=0平面のワールド座標 */
export function pixelToWorld(
  px: number,
  py: number,
  vw: number,
  vh: number,
  plane: PlaneSize
): { x: number; y: number } {
  return {
    x: (px / vw - 0.5) * plane.width,
    y: (0.5 - py / vh) * plane.height,
  }
}

/**
 * DOM矩形（px）を粒子目標に変換する。
 * 70%を外周、14%をタイトルバー線、16%を内側の行に配る（ターミナル枠の見立て）。
 */
export function rectPerimeterPositions(
  rect: PixelRect,
  vw: number,
  vh: number,
  plane: PlaneSize,
  count: number,
  seed = 3
): Float32Array {
  const rand = mulberry32(seed)
  const tl = pixelToWorld(rect.x, rect.y, vw, vh, plane)
  const br = pixelToWorld(rect.x + rect.width, rect.y + rect.height, vw, vh, plane)
  const w = br.x - tl.x
  const h = tl.y - br.y
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = rand()
    let x: number, y: number
    if (r < 0.7) {
      const t = rand() * 4
      const side = Math.floor(t)
      const f = t - side
      if (side === 0) { x = tl.x + f * w; y = tl.y }
      else if (side === 1) { x = br.x; y = tl.y - f * h }
      else if (side === 2) { x = br.x - f * w; y = br.y }
      else { x = tl.x; y = br.y + f * h }
    } else if (r < 0.84) {
      x = tl.x + rand() * w
      y = tl.y - h * 0.12
    } else {
      x = tl.x + w * 0.08 + rand() * w * 0.84
      y = tl.y - h * (0.25 + Math.floor(rand() * 4) * 0.17)
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.1
  }
  return out
}
