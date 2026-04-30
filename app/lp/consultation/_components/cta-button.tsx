"use client"

const CAL_URL = "https://cal.com/miitaso/free-consultation"
const LINE_URL = "https://line.me/R/ti/p/YOUR_LINE_ID" // TODO: replace

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    ;(window as any).fbq("track", eventName)
  }
}

export function CTAButton({
  variant = "main",
  label,
  microcopy,
}: {
  variant?: "main" | "sub"
  label?: string
  microcopy?: string
}) {
  if (variant === "sub") {
    return (
      <div>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Contact")}
          className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 hover:border-white/80 text-white hover:bg-white/10 font-bold text-sm px-6 py-3 transition-all"
        >
          {label || "まずはLINEで情報を受け取る"}
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
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg px-8 py-4 md:py-5 transition-all w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-[1.02]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {label || "30分無料相談を予約する（無料）"}
      </a>
      {microcopy && (
        <p className="text-xs text-[#888] mt-2">{microcopy}</p>
      )}
    </div>
  )
}
