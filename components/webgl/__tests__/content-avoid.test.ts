import { describe, expect, it } from "vitest"
import { packVisibleRects, type AvoidRect } from "../content-avoid"

const rect = (yAbs: number, h = 100): AvoidRect => ({ x: 10, yAbs, w: 300, h })

describe("packVisibleRects", () => {
  it("ビューポート内の矩形だけをスクリーン座標で詰める", () => {
    const out = new Float32Array(8 * 4)
    const n = packVisibleRects([rect(500)], 400, 900, out)
    expect(n).toBe(1)
    expect(out[0]).toBe(10) // x
    expect(out[1]).toBe(100) // y = 500 - 400
    expect(out[2]).toBe(300) // w
    expect(out[3]).toBe(100) // h
  })

  it("ビューポート外（上下）の矩形はスキップする", () => {
    const out = new Float32Array(8 * 4)
    const rects = [rect(0), rect(5000), rect(1000)] // 上に外れ / 下に外れ / 内
    const n = packVisibleRects(rects, 900, 900, out)
    expect(n).toBe(1)
    expect(out[1]).toBe(100) // 1000 - 900
  })

  it("部分的に見えている矩形は含める", () => {
    const out = new Float32Array(8 * 4)
    // 上端が欠けている（yAbs=350, h=100, scrollY=400 → y=-50..50）
    expect(packVisibleRects([rect(350)], 400, 900, out)).toBe(1)
    // 下端が欠けている（y=880..980, viewport 900）
    expect(packVisibleRects([rect(1280)], 400, 900, out)).toBe(1)
  })

  it("最大8個で打ち切る", () => {
    const out = new Float32Array(8 * 4)
    const rects = Array.from({ length: 12 }, (_, i) => rect(400 + i * 10))
    expect(packVisibleRects(rects, 400, 900, out)).toBe(8)
  })

  it("空配列なら0を返す", () => {
    const out = new Float32Array(8 * 4)
    expect(packVisibleRects([], 0, 900, out)).toBe(0)
  })
})
