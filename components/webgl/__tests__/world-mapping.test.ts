import { describe, expect, it } from "vitest"
import {
  pixelToWorld,
  rectPerimeterPositions,
  visiblePlaneSize,
} from "../world-mapping"

describe("visiblePlaneSize", () => {
  it("fov50/dist9で高さ≈8.39", () => {
    const { height, width } = visiblePlaneSize(50, 9, 16 / 9)
    expect(height).toBeCloseTo(2 * 9 * Math.tan((25 * Math.PI) / 180), 5)
    expect(width).toBeCloseTo(height * (16 / 9), 5)
  })
})

describe("pixelToWorld", () => {
  const plane = { width: 14, height: 8 }
  it("画面中央は原点", () => {
    expect(pixelToWorld(500, 400, 1000, 800, plane)).toEqual({ x: 0, y: 0 })
  })
  it("左上は(-w/2, +h/2)", () => {
    expect(pixelToWorld(0, 0, 1000, 800, plane)).toEqual({ x: -7, y: 4 })
  })
  it("右下は(+w/2, -h/2)", () => {
    expect(pixelToWorld(1000, 800, 1000, 800, plane)).toEqual({ x: 7, y: -4 })
  })
})

describe("rectPerimeterPositions", () => {
  it("count*3を返し、全点が矩形のワールド境界内", () => {
    const plane = { width: 14, height: 8 }
    const rect = { x: 500, y: 200, width: 300, height: 200 }
    const p = rectPerimeterPositions(rect, 1000, 800, plane, 600)
    expect(p.length).toBe(1800)
    const tl = { x: (500 / 1000 - 0.5) * 14, y: (0.5 - 200 / 800) * 8 }
    const br = { x: (800 / 1000 - 0.5) * 14, y: (0.5 - 400 / 800) * 8 }
    for (let i = 0; i < p.length; i += 3) {
      expect(p[i]).toBeGreaterThanOrEqual(tl.x - 0.01)
      expect(p[i]).toBeLessThanOrEqual(br.x + 0.01)
      expect(p[i + 1]).toBeLessThanOrEqual(tl.y + 0.01)
      expect(p[i + 1]).toBeGreaterThanOrEqual(br.y - 0.01)
    }
  })
})
