import { avoidZones } from "./story-state"

export type AvoidRect = { x: number; yAbs: number; w: number; h: number }

/**
 * 絶対Y座標の回避矩形から、現在のビューポートに掛かるものだけを
 * スクリーン座標(vec4: x, y, w, h)としてFloat32Arrayに詰める純関数。
 * 返り値は詰めた矩形数（最大 max 個）。
 */
export function packVisibleRects(
  rects: AvoidRect[],
  scrollY: number,
  viewportH: number,
  out: Float32Array,
  max = 8
): number {
  let n = 0
  for (const r of rects) {
    const y = r.yAbs - scrollY
    if (y > viewportH || y + r.h < 0) continue
    out[n * 4] = r.x
    out[n * 4 + 1] = y
    out[n * 4 + 2] = r.w
    out[n * 4 + 3] = r.h
    n += 1
    if (n >= max) break
  }
  return n
}

/**
 * [data-particle-avoid] 要素を計測して avoidZones を更新する（ブラウザ専用）。
 * 絶対Y座標で保持するため、スクロールしても再計測は不要。
 * レイアウト変化時（resize・フォント読込）にのみ呼び直す。
 */
export function measureAvoidZones(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-particle-avoid]")
  avoidZones.rects = Array.from(els).map((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.left, yAbs: r.top + window.scrollY, w: r.width, h: r.height }
  })
}
