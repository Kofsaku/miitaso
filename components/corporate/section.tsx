import type { ReactNode } from "react"
import { ScrambleText } from "@/components/webgl/scramble-text"

type SectionProps = {
  id?: string
  /**
   * default = bg-[#030712] / alt = bg-[#070b14]（交互セクション用）
   * transparent = 背景なし（トップページのWebGLキャンバスを透かす）
   */
  variant?: "default" | "alt" | "transparent"
  className?: string
  /** セクション全幅に重ねる装飾（GridBackground / Glow 等の絶対配置要素） */
  decoration?: ReactNode
  /** 章ラベル（例: "01 設計"）。トップページのスクロール物語用 */
  chapter?: string
  children: ReactNode
}

const VARIANT_BG: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-[#030712]",
  alt: "bg-[#070b14]",
  transparent: "",
}

/**
 * ダークセクションの共通ラッパー。
 * py-24 md:py-32 + container + max-w-6xl をまとめて提供する。
 */
export function Section({
  id,
  variant = "default",
  className = "",
  decoration,
  chapter,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-32 ${VARIANT_BG[variant]} ${className}`}
    >
      {decoration}
      {variant === "transparent" ? (
        // 粒子キャンバスを透かすセクションでは、テキスト域の背景輝度を
        // 安定させるスクリムを敷く。中心を強め・床(0.22)を広げてテキストの
        // 可読性を確保しつつ、端はフェードさせて章間ギャップの演出を残す
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(96%_82%_at_50%_42%,rgba(3,7,18,0.78)_0%,rgba(3,7,18,0.5)_46%,rgba(3,7,18,0.22)_78%,transparent_100%)]"
        />
      ) : null}
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {chapter ? (
            <div className="mb-10 flex items-center gap-4 md:mb-14">
              <p className="font-mono text-xs tracking-[0.3em] text-sky-400/80">
                / <ScrambleText text={chapter} />
              </p>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"
              />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  )
}

type SectionHeadingProps = {
  /** 等幅英語ラベル（例: "AI INTEGRATION"） */
  label: string
  /** H2 見出し。強調語は呼び出し側で gradient span を入れる */
  title: ReactNode
  /** リード文（text-slate-400 max-w-2xl） */
  lead?: ReactNode
  align?: "left" | "center"
  className?: string
}

/**
 * セクション頭の定型: mono英語ラベル → H2 → リード文。
 */
export function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div
      data-particle-avoid
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
        <ScrambleText text={label} />
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-2xl leading-relaxed text-slate-300 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
