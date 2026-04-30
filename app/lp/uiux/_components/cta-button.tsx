"use client"

const CAL_URL = "https://cal.com/miitaso/free-ui-review" // TODO: replace with actual Calendly/Cal.com URL

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName)
  }
}

export function CTAButton({
  variant = "main",
  label,
  microcopy,
  dark = false,
}: {
  variant?: "main" | "sub"
  label?: string
  microcopy?: string
  dark?: boolean
}) {
  if (variant === "sub") {
    return (
      <div>
        <a
          href="mailto:info@miitaso.com?subject=UI改善サービス資料のご請求&body=UI改善サービスの資料を希望します。%0A%0A会社名：%0Aお名前：%0Aご連絡先："
          onClick={() => trackEvent("document_download")}
          className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 hover:border-white/80 text-white hover:bg-white/10 font-bold text-sm px-6 py-3 transition-all"
        >
          {label || "まずはサービス資料をダウンロードする"}
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
        onClick={() => trackEvent("cta_click")}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-base md:text-lg px-8 py-4 md:py-5 transition-all w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-[1.02]"
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
        {label || "30分無料UI診断を予約する（無料）"}
      </a>
      {microcopy && (
        <p className={`text-xs mt-2 ${dark ? "text-blue-100/70" : "text-[#888]"}`}>{microcopy}</p>
      )}
    </div>
  )
}
