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

/**
 * 章境界タイポグラフィの形成帯ベル（台形）。
 * mix 0.10-0.30で立ち上がり、0.30-0.70は1を保持、0.70-0.90で落ちる。
 * advanceWordEnvelope の「帯域に入ったか」の判定に使う。
 */
export function wordBell(mix: number): number {
  const s = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }
  return s(0.1, 0.3, mix) * (1 - s(0.7, 0.9, mix))
}

export type WordEnvelope = {
  /** 単語の形成量 0..1（シェーダーの uWordMix へ渡す） */
  mix: number
  /** 帯域を離れてからの保持残り秒数 */
  hold: number
}

/** 帯域を離れても単語を保持する秒数（高速スクロールでも読める滞在時間） */
const WORD_HOLD_SECONDS = 0.9

/**
 * 単語形成のワンショット・エンベロープを1フレーム進める純関数。
 * 帯域に一度でも触れたら素早く完全形成し（attack~0.3秒）、帯域を離れても
 * WORD_HOLD_SECONDS は完全形成のまま保持したのち、残像として溶ける。
 * 保持は pendingSwap（到達章が変わり単語の差し替え待ち）でも尊重する
 * ——高速スクロールで次章へ突き抜けた直後こそ読ませたい時間のため。
 * pendingSwap中は保持切れ後の畳みだけやや速める（次の単語への切替を早く）。
 */
export function advanceWordEnvelope(
  env: WordEnvelope,
  bell: number,
  pendingSwap: boolean,
  delta: number
): WordEnvelope {
  // タブ復帰・ジャンク等で巨大なdeltaが来ても1フレームで崩壊しないよう上限を設ける
  const dt = Math.min(delta, 0.1)
  const inBand = !pendingSwap && bell > 0.15
  const hold = inBand ? WORD_HOLD_SECONDS : Math.max(0, env.hold - dt)
  const target = inBand || hold > 0 ? 1 : 0
  const rate = target > env.mix ? 7 : pendingSwap ? 1.6 : 1.0
  const mix = env.mix + (target - env.mix) * Math.min(1, dt * rate)
  return { mix, hold }
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
