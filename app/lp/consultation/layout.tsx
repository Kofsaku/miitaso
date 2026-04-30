import type { Metadata } from "next"
import Script from "next/script"
import { Noto_Sans_JP } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_PIXEL_ID"

export const metadata: Metadata = {
  title: "30分無料相談 | miitaso Inc. - 新規事業の専門家に相談する",
  description:
    "戦略立案からMVP開発まで一気通貫で支援。160社超の実績を持つ専門家が、あなたの課題を30分で整理します。",
  openGraph: {
    title: "30分無料相談 | miitaso Inc.",
    description:
      "戦略立案からMVP開発まで一気通貫で支援。160社超の実績を持つ専門家が、あなたの課題を30分で整理します。",
    type: "website",
    locale: "ja_JP",
    url: "https://miitaso.com/lp/consultation",
    images: [
      {
        url: "https://miitaso.com/og-consultation.png",
        width: 1200,
        height: 630,
        alt: "miitaso Inc. 30分無料相談",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30分無料相談 | miitaso Inc.",
    description:
      "戦略立案からMVP開発まで一気通貫で支援。160社超の実績を持つ専門家が、あなたの課題を30分で整理します。",
  },
  alternates: {
    canonical: "https://miitaso.com/lp/consultation",
  },
}

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={notoSansJP.className}>
      {/* Meta Pixel */}
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
      {children}
    </div>
  )
}
