import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Noto_Sans_JP, Inter } from "next/font/google"

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-sans-bc",
})

const num = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-num-bc",
})

export const metadata: Metadata = {
  title: "30日AI営業ページ内製化ブートキャンプ | 株式会社miitaso",
  description:
    "情シス不在の年商1-10億BtoB中小企業の社長へ。30日で営業ページ・問い合わせ返信・商談オペをAIで内製化できる体に変える伴走プログラム。",
  openGraph: {
    title: "30日AI営業ページ内製化ブートキャンプ | miitaso",
    description:
      "外注先から、内製化された営業組織へ。30日で、AIを使える会社に変わる。",
    type: "website",
    locale: "ja_JP",
    url: "https://miitaso.com/lp/ai-bootcamp",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://miitaso.com/lp/ai-bootcamp" },
}

export default function LPLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${sans.variable} ${num.variable}`}>{children}</div>
  )
}
