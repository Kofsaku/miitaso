import type { Metadata } from "next"
import type { ReactNode } from "react"
import Script from "next/script"
import { Shippori_Mincho_B1, Noto_Sans_JP, Cormorant_Garamond } from "next/font/google"

const mincho = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-mincho",
})

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans-jp",
})

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
})

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_PIXEL_ID"

export const metadata: Metadata = {
  title: "AI内製化伴走 | 株式会社miitaso — DX投資が現場に届かなかった経営者へ",
  description:
    "年商10〜30億・専任情シス不在の中堅企業に特化した6ヶ月のAI内製化伴走プログラム。業務設計・ワークフロー・運用マニュアル・社内引継ぎセッションを納品物とプロセスとして提供します。",
  openGraph: {
    title: "AI内製化伴走 | 株式会社miitaso",
    description:
      "DXに数千万を投じても、現場が使わなかった会社の経営者へ。6ヶ月、社内推進担当への移管まで伴走します。",
    type: "website",
    locale: "ja_JP",
    url: "https://miitaso.com/lp/ai-v2",
    images: [
      {
        url: "https://miitaso.com/og-ai-naiseika.png",
        width: 1200,
        height: 630,
        alt: "miitaso AI内製化伴走プログラム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI内製化伴走 | 株式会社miitaso",
    description:
      "中堅企業に特化した、6ヶ月のAI内製化伴走。業務設計・ワークフロー・運用マニュアル・社内引継ぎセッションを納品物として提供。",
  },
  alternates: {
    canonical: "https://miitaso.com/lp/ai-v2",
  },
}

export default function LPLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${mincho.variable} ${sans.variable} ${display.variable}`}>
      {PIXEL_ID !== "YOUR_PIXEL_ID" && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      {children}
    </div>
  )
}
