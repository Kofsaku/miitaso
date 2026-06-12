import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "miitaso | アイデアを、動くプロダクトに。",
  description:
    "AI導入支援・ソフトウェア開発・新規事業支援。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
  icons: {
    icon: "/fav.png",
  },
  metadataBase: new URL("https://miitaso.com"),
  openGraph: {
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "AI導入支援・ソフトウェア開発・新規事業支援。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
    url: "https://miitaso.com",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "miitaso | アイデアを、動くプロダクトに。",
    description:
      "AI導入支援・ソフトウェア開発・新規事業支援。自らAIプロダクトを開発・運用する開発会社が、構想から運用まで伴走します。",
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
