import type { ReactNode } from "react"

type MarqueeProps = {
  /** 流すコンテンツ。各アイテム自身に px-6 等の横余白を持たせること（コピー間の継ぎ目を揃えるため） */
  children: ReactNode
  /** 1周にかける秒数（小さいほど速い） */
  duration?: number
  /** 逆方向に流す */
  reverse?: boolean
  /** hoverで一時停止（デフォルト有効） */
  pauseOnHover?: boolean
  /** 端のフェード色。設置セクションの背景色に合わせる（default=#030712 / alt=#070b14） */
  fadeColor?: string
  className?: string
}

/**
 * テキスト/子要素を無限スクロールするマーキー（CSS keyframes のみ）。
 * コンテンツを2回複製し translateX(-50%) でシームレスにループする。
 * prefers-reduced-motion 時は globals.css の全体ルールにより静止する。
 */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  fadeColor = "#030712",
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden ${
        pauseOnHover ? "corp-marquee-group" : ""
      } ${className}`}
    >
      <div
        className={`corp-marquee flex w-max items-center ${
          reverse ? "corp-marquee-reverse" : ""
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>

      {/* 端のフェード */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />
    </div>
  )
}
