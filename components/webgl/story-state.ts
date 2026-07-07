/**
 * スクロール物語の共有状態。
 * DOM側（Lenis/GSAP/イントロ）が書き、WebGL側（useFrame）が毎フレーム読む。
 * Reactの再レンダリングを避けるため可変シングルトンにしている。
 */
export const storyState = {
  /** 現在章と次章のインデックス（0..6） */
  from: 0,
  to: 0,
  /** from→toの補間 0..1 */
  mix: 0,
  /** 0=ワードマーク表示中 → 1=通常（イントロ完了） */
  intro: 1,
  /** ヒーロー: 0=カオス → 1=ターミナル枠に収束 */
  heroConverge: 0,
  /** ページ全体のスクロール進捗 0..1 */
  progress: 0,
  /** マウス演出の強さ 0=非アクティブ, 1=アクティブ（タッチ端末は常時0） */
  mouseActive: 0,
}

/**
 * 実行時にDOM計測から生成する粒子目標（ワードマーク文字・ターミナル枠）。
 * versionの増加をparticle-fieldが検知してGPUバッファを更新する。
 */
export const runtimeTargets: {
  wordmark: Float32Array | null
  terminal: Float32Array | null
  version: number
} = {
  wordmark: null,
  terminal: null,
  version: 0,
}
