import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "miitaso | 考えるだけでも、作るだけでもない。",
  description:
    "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
  icons: {
    icon: "/fav.png",
  },
  metadataBase: new URL("https://miitaso.com"),
  openGraph: {
    title: "miitaso | 考えるだけでも、作るだけでもない。",
    description:
      "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
    url: "https://miitaso.com",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "miitaso | 考えるだけでも、作るだけでもない。",
    description:
      "提案書で終わるコンサルと、言われた通りに作る開発会社の間。経営課題の定義からシステムの実装・運用まで、エンジニア出身のコンサルタントが成果に伴走します。AI導入支援・ソフトウェア開発・新規事業支援。",
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
