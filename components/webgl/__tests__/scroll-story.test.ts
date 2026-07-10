import { describe, expect, it } from "vitest"
import { advanceWordEnvelope, computeStory, wordBell } from "../scroll-story"

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

describe("wordBell", () => {
  it("遷移の端では0（単語は出ない）", () => {
    expect(wordBell(0)).toBe(0)
    expect(wordBell(0.05)).toBe(0)
    expect(wordBell(0.95)).toBe(0)
    expect(wordBell(1)).toBe(0)
  })

  it("中間帯(0.3〜0.7)は完全形成を保持する台形", () => {
    expect(wordBell(0.3)).toBe(1)
    expect(wordBell(0.5)).toBe(1)
    expect(wordBell(0.7)).toBe(1)
  })

  it("立ち上がり(0.1→0.3)と溶け(0.7→0.9)は単調", () => {
    expect(wordBell(0.15)).toBeGreaterThan(0)
    expect(wordBell(0.15)).toBeLessThan(wordBell(0.25))
    expect(wordBell(0.8)).toBeGreaterThan(0)
    expect(wordBell(0.8)).toBeGreaterThan(wordBell(0.85))
  })
})

describe("advanceWordEnvelope", () => {
  const step = (env: { mix: number; hold: number }, bell: number, pending: boolean, frames: number, dt = 1 / 60) => {
    let e = env
    for (let i = 0; i < frames; i++) e = advanceWordEnvelope(e, bell, pending, dt)
    return e
  }

  it("帯域に入ると素早く完全形成に向かう（attack）", () => {
    const e = step({ mix: 0, hold: 0 }, 1, false, 30) // 0.5秒
    expect(e.mix).toBeGreaterThan(0.9)
  })

  it("一瞬（2フレーム）帯域に触れただけでも形成が完走する（ワンショット）", () => {
    let e = step({ mix: 0, hold: 0 }, 1, false, 2) // 帯域内 2フレームだけ
    expect(e.mix).toBeLessThan(0.3)
    e = step(e, 0, false, 30) // 帯域外 0.5秒
    expect(e.mix).toBeGreaterThan(0.9) // holdが残っているため形成が続く
  })

  it("帯域を離れて保持時間経過後、ゆっくり残像として溶ける", () => {
    let e = step({ mix: 0, hold: 0 }, 1, false, 60) // 形成完了
    e = step(e, 0, false, 54) // 0.9秒 = 保持ぶん
    expect(e.mix).toBeGreaterThan(0.85) // 保持中はほぼ完全形成のまま
    const after1s = step(e, 0, false, 60) // さらに1秒
    expect(after1s.mix).toBeLessThan(e.mix) // 減衰が始まっている
    expect(after1s.mix).toBeGreaterThan(0.2) // ただし1秒ではまだ視認できる（残像）
    const after3s = step(after1s, 0, false, 120)
    expect(after3s.mix).toBeLessThan(0.1) // 約3秒で消える
  })

  it("pendingSwapでも保持時間内は完全形成を保つ（高速スクロール直後に読ませる）", () => {
    const e = step({ mix: 0, hold: 0 }, 1, false, 60) // 形成完了（hold=0.9）
    const during = step(e, 0, true, 48) // pendingで0.8秒経過
    expect(during.mix).toBeGreaterThan(0.95) // 保持中は崩れない
    const after = step(during, 0, true, 90) // さらに1.5秒
    expect(after.mix).toBeLessThan(0.25) // 保持切れ後はやや速めに畳む
  })
})
