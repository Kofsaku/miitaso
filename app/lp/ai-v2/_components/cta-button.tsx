"use client"

const CAL_URL = "https://cal.com/miitaso/ai-strategy-consultation"
const DOC_URL = "https://miitaso.com/docs/dx-failure-5patterns.pdf"

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName)
  }
}

export function CTAButton({
  variant = "main",
  label,
  microcopy,
  inverted = false,
}: {
  variant?: "main" | "sub"
  label?: string
  microcopy?: string
  inverted?: boolean
}) {
  if (variant === "sub") {
    return (
      <div>
        <a
          href={DOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Lead")}
          className={`group inline-flex max-w-full items-center gap-3 font-[var(--font-sans-jp)] text-[13px] tracking-[0.05em] font-medium px-1 py-2 border-b transition-colors ${
            inverted
              ? "text-[#F5F1E8]/85 border-[#F5F1E8]/30 hover:text-[#F5F1E8] hover:border-[#F5F1E8]"
              : "text-[#0E1B2C]/75 border-[#0E1B2C]/25 hover:text-[#0E1B2C] hover:border-[#0E1B2C]"
          }`}
        >
          <span className="font-[var(--font-display)] italic text-[15px] tracking-tight">
            ↓
          </span>
          <span className="min-w-0 leading-[1.7]">
            {label || "『DX投資が無駄になる5つのパターン』を読む"}
          </span>
          <span className="text-[10px] tracking-[0.15em] opacity-60">PDF</span>
        </a>
      </div>
    )
  }

  return (
    <div>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Lead")}
        className={`group inline-flex items-center justify-between gap-3 md:gap-6 font-[var(--font-sans-jp)] text-[15px] md:text-base font-medium tracking-[0.04em] pl-5 md:pl-7 pr-4 md:pr-5 py-4 md:py-5 transition-all w-full md:w-auto ${
          inverted
            ? "bg-[#F5F1E8] text-[#0E1B2C] hover:bg-[#FFFFFF]"
            : "bg-[#0E1B2C] text-[#F5F1E8] hover:bg-[#1B2A40]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-3 leading-[1.55]">
          <span className="font-[var(--font-display)] italic text-[18px] leading-none opacity-70 -mt-0.5">
            ✦
          </span>
          {label || "30分の経営者向けAI活用相談を予約する"}
        </span>
        <span className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] opacity-60 group-hover:opacity-90 transition-opacity flex-shrink-0">
          NO FEE
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </a>
      {microcopy && (
        <p
          className={`text-[11px] mt-3 leading-[1.7] tracking-[0.06em] font-[var(--font-sans-jp)] ${
            inverted ? "text-[#F5F1E8]/55" : "text-[#0E1B2C]/55"
          }`}
        >
          {microcopy}
        </p>
      )}
    </div>
  )
}
