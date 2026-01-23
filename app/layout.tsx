import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "miitaso | アイデアを、動くプロダクトに。",
  description:
    "新規事業の立ち上げからアプリ開発まで。企画・設計・開発・運用をワンストップでサポートします。",
  icons: {
    icon: "/fav.png",
  },
  metadataBase: new URL("https://miitaso.com"),
  alternates: {
    canonical: "https://miitaso.com",
  },
  openGraph: {
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "新規事業の立ち上げからアプリ開発まで。企画・設計・開発・運用をワンストップでサポートします。",
    url: "https://miitaso.com",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "新規事業の立ち上げからアプリ開発まで。企画・設計・開発・運用をワンストップでサポートします。",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-ZNH7T9XEWK" />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
        {children}
      </body>
    </html>
  )
}
