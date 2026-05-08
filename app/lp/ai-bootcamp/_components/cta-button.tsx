"use client"

const CAL_URL = "https://cal.com/miitaso/ai-bootcamp-consultation"

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName)
  }
}

export function PrimaryCTA({
  label = "無料相談を予約する",
  full = false,
  size = "md",
}: {
  label?: string
  full?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const sizeClass =
    size === "lg"
      ? "px-8 py-5 text-[16px]"
      : size === "sm"
      ? "px-5 py-3 text-[13px]"
      : "px-7 py-4 text-[15px]"
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("Lead")}
      className={`group inline-flex ${
        full ? "w-full" : ""
      } items-center justify-center gap-2 rounded-lg bg-[#E8704C] hover:bg-[#D8623F] text-white font-bold tracking-wide transition-colors ${sizeClass}`}
    >
      <span>{label}</span>
      <svg
        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  )
}

export function SecondaryCTA({
  label = "ライトプランから試す",
  full = false,
  size = "md",
  href,
}: {
  label?: string
  full?: boolean
  size?: "sm" | "md" | "lg"
  href?: string
}) {
  const sizeClass =
    size === "lg"
      ? "px-8 py-5 text-[16px]"
      : size === "sm"
      ? "px-5 py-3 text-[13px]"
      : "px-7 py-4 text-[15px]"
  return (
    <a
      href={href || "#pricing"}
      onClick={() => trackEvent("ViewContent")}
      className={`inline-flex ${
        full ? "w-full" : ""
      } items-center justify-center gap-2 rounded-lg border border-[#0F1F3D] bg-white text-[#0F1F3D] hover:bg-[#0F1F3D] hover:text-white font-bold tracking-wide transition-colors ${sizeClass}`}
    >
      {label}
    </a>
  )
}
