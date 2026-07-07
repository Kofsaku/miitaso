import { describe, expect, it } from "vitest"
import { computeStory } from "../scroll-story"

const anchors = [0, 1000, 2000, 3000]

describe("computeStory", () => {
  it("先頭より上では章0でmix 0", () => {
    expect(computeStory(-100, anchors)).toEqual({ from: 0, to: 1, mix: 0 })
    expect(computeStory(0, anchors)).toEqual({ from: 0, to: 1, mix: 0 })
  })
  it("アンカー中間で保持帯（前後30%）を除いた線形mix", () => {
    // t=0.5 → mix=(0.5-0.3)/0.4=0.5
    expect(computeStory(500, anchors).mix).toBeCloseTo(0.5)
    // t=0.2 → 保持帯なので0
    expect(computeStory(200, anchors).mix).toBe(0)
    // t=0.8 → 保持帯なので1
    expect(computeStory(800, anchors).mix).toBe(1)
  })
  it("2番目の区間はfrom=1,to=2", () => {
    const s = computeStory(1500, anchors)
    expect(s.from).toBe(1)
    expect(s.to).toBe(2)
    expect(s.mix).toBeCloseTo(0.5)
  })
  it("最終アンカー以降はmix 1で張り付く", () => {
    expect(computeStory(3500, anchors)).toEqual({ from: 2, to: 3, mix: 1 })
  })
  it("アンカーが1つ以下なら章0固定", () => {
    expect(computeStory(500, [0])).toEqual({ from: 0, to: 0, mix: 0 })
    expect(computeStory(500, [])).toEqual({ from: 0, to: 0, mix: 0 })
  })
})
