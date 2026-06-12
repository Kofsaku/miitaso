import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  /** default = bg-[#030712] / alt = bg-[#070b14]（交互セクション用） */
  variant?: "default" | "alt"
  className?: string
  /** セクション全幅に重ねる装飾（GridBackground / Glow 等の絶対配置要素） */
  decoration?: ReactNode
  children: ReactNode
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
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-32 ${
        variant === "alt" ? "bg-[#070b14]" : "bg-[#030712]"
      } ${className}`}
    >
      {decoration}
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
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
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">{label}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-2xl leading-relaxed text-slate-400 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
