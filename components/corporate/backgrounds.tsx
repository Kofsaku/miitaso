type GridBackgroundProps = {
  /** 中央から端に向かってグリッドをフェードアウトさせる */
  fade?: boolean
  className?: string
}

/**
 * 微細グリッド背景（スタイルガイド指定のCSS値）。
 * 親要素に relative を付けて使う。
 */
export function GridBackground({ fade = false, className = "" }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        ...(fade
          ? {
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }
          : {}),
      }}
    />
  )
}

type GlowProps = {
  /**
   * 位置・サイズ・色の上書き。
   * 例: "-top-24 left-1/4 h-80 w-80" / 色変更は "bg-violet-500/20"
   */
  className?: string
}

/**
 * 発光ブロブ（bg-sky-500/20 blur-[120px] の絶対配置 div）。
 * 親要素に relative + overflow-hidden を付けて使う。1〜2個/セクションまで。
 */
export function Glow({ className = "" }: GlowProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-72 w-72 rounded-full bg-sky-500/20 blur-[120px] ${className}`}
    />
  )
}
