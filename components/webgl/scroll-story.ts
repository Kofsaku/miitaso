import { storyState } from "./story-state"

const HOLD = 0.3 // 各章の前後30%は形状を保持し、中間40%でモーフする

/**
 * スクロール基準位置y（ビューポート中心の絶対Y）と章アンカー中心の配列から
 * (from, to, mix) を求める純関数。
 */
export function computeStory(
  y: number,
  anchors: number[]
): { from: number; to: number; mix: number } {
  if (anchors.length < 2) return { from: 0, to: 0, mix: 0 }
  const last = anchors.length - 1
  if (y <= anchors[0]) return { from: 0, to: 1, mix: 0 }
  if (y >= anchors[last]) return { from: last - 1, to: last, mix: 1 }
  let i = 0
  while (i < last - 1 && y >= anchors[i + 1]) i++
  const t = (y - anchors[i]) / (anchors[i + 1] - anchors[i])
  const mix = Math.min(1, Math.max(0, (t - HOLD) / (1 - HOLD * 2)))
  return { from: i, to: i + 1, mix }
}

/** [data-story-chapter] 要素の中心絶対Yを章番号順に返す（ブラウザ専用） */
export function measureChapters(): number[] {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-story-chapter]")
  )
  return els
    .map((el) => {
      const rect = el.getBoundingClientRect()
      return {
        n: Number(el.dataset.storyChapter ?? 0),
        center: rect.top + window.scrollY + rect.height / 2,
      }
    })
    .sort((a, b) => a.n - b.n)
    .map((e) => e.center)
}

/** スクロールイベントからstoryStateを更新する（ブラウザ専用） */
export function updateStoryFromScroll(
  scrollY: number,
  viewportH: number,
  docH: number,
  anchors: number[]
): void {
  const s = computeStory(scrollY + viewportH / 2, anchors)
  storyState.from = s.from
  storyState.to = s.to
  storyState.mix = s.mix
  const scrollable = Math.max(1, docH - viewportH)
  storyState.progress = Math.min(1, Math.max(0, scrollY / scrollable))
}
