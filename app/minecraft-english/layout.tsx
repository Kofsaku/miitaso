import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "マイクラ English | 遊んでたら、英語ができてた。 - miitaso",
  description:
    "マインクラフトの実況を見ているだけで、気づいたら英語が聞き取れるようになる。Comprehensible Input に基づいた新しい英語学習体験を YouTube で届けます。",
  openGraph: {
    title: "マイクラ English | 遊んでたら、英語ができてた。",
    description:
      "マインクラフトの実況を見ているだけで、気づいたら英語が聞き取れるようになる。Comprehensible Input に基づいた新しい英語学習体験。",
    url: "https://miitaso.com/minecraft-english",
    siteName: "miitaso",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "マイクラ English | 遊んでたら、英語ができてた。",
    description:
      "マインクラフトの実況を見ているだけで、気づいたら英語が聞き取れるようになる。新しい英語学習体験。",
  },
  alternates: {
    canonical: "https://miitaso.com/minecraft-english",
  },
}

export default function MinecraftEnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
