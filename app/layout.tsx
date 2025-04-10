import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "miitaso | プロダクト開発・MVP開発・コンサルティング",
  description:
    "最先端の技術とデザインで、あなたのビジョンを革新的なプロダクトへと変換します。プロダクト開発、MVP開発、コンサルティングサービスを提供しています。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'