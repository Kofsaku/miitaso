import { describe, expect, it } from "vitest"
import { degrade, resolveQuality } from "../quality"

describe("resolveQuality", () => {
  it("デスクトップ既定はhigh 24000/postfx有効", () => {
    expect(resolveQuality({ coarsePointer: false })).toEqual({
      tier: "high", count: 24000, postfx: true, maxDpr: 1.75,
    })
  })
  it("タッチ端末はlow 4500/postfx無効", () => {
    expect(resolveQuality({ coarsePointer: true })).toEqual({
      tier: "low", count: 4500, postfx: false, maxDpr: 1.5,
    })
  })
  it("メモリ4GB以下のデスクトップはmid", () => {
    expect(resolveQuality({ coarsePointer: false, deviceMemory: 4 }).tier).toBe("mid")
  })
})

describe("degrade", () => {
  it("high→mid→low→low", () => {
    const high = resolveQuality({ coarsePointer: false })
    const mid = degrade(high)
    expect(mid.tier).toBe("mid")
    expect(mid.count).toBe(12000)
    expect(mid.postfx).toBe(false)
    const low = degrade(mid)
    expect(low.tier).toBe("low")
    expect(degrade(low)).toEqual(low)
  })
})
