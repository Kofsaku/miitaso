import { describe, expect, it } from "vitest"
import {
  CHAPTER_SHAPES,
  generateShape,
  mulberry32,
  type ShapeName,
} from "../morph-targets"

const ALL: ShapeName[] = [
  "chaos", "constellation", "pipeline", "wireframe", "graph", "path", "lattice",
]

describe("mulberry32", () => {
  it("同じseedで同じ列を返す", () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })
  it("0以上1未満を返す", () => {
    const r = mulberry32(7)
    for (let i = 0; i < 100; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe("generateShape", () => {
  it("count*3の長さを返す", () => {
    for (const name of ALL) {
      expect(generateShape(name, 500).length).toBe(1500)
    }
  })
  it("同じ引数で決定的", () => {
    for (const name of ALL) {
      expect(generateShape(name, 300, 5)).toEqual(generateShape(name, 300, 5))
    }
  })
  it("全形状がワールド境界内 (|x|<=7.5, |y|<=4.5, |z|<=3.5)", () => {
    for (const name of ALL) {
      const p = generateShape(name, 900)
      for (let i = 0; i < p.length; i += 3) {
        expect(Math.abs(p[i])).toBeLessThanOrEqual(7.5)
        expect(Math.abs(p[i + 1])).toBeLessThanOrEqual(4.5)
        expect(Math.abs(p[i + 2])).toBeLessThanOrEqual(3.5)
      }
    }
  })
  it("constellationはi%3で3クラスタに分かれ、平均が各中心の近くにある", () => {
    const p = generateShape("constellation", 3000)
    const centers = [
      [-3.4, 0.6], [0, -0.4], [3.4, 0.6],
    ]
    for (let c = 0; c < 3; c++) {
      let sx = 0, sy = 0, n = 0
      for (let i = c; i < 3000; i += 3) {
        sx += p[i * 3]; sy += p[i * 3 + 1]; n++
      }
      expect(Math.abs(sx / n - centers[c][0])).toBeLessThan(0.4)
      expect(Math.abs(sy / n - centers[c][1])).toBeLessThan(0.4)
    }
  })
  it("graphは4本の棒（xが±3/±1の近傍に集まる）", () => {
    const p = generateShape("graph", 2000)
    const cols = [-3, -1, 1, 3]
    for (let i = 0; i < p.length; i += 3) {
      const nearest = Math.min(...cols.map((c) => Math.abs(p[i] - c)))
      expect(nearest).toBeLessThanOrEqual(0.7)
    }
  })
  it("CHAPTER_SHAPESは7章分", () => {
    expect(CHAPTER_SHAPES).toEqual([
      "chaos", "constellation", "pipeline", "wireframe", "graph", "path", "lattice",
    ])
  })
})
