import type { Metadata } from "next";

const TITLE = "Tsubata's Japan — Authentic Japanese Properties, Curated by an Insider";
const DESCRIPTION =
  "Find your authentic Japanese home with Kosaku Tsubata. Personally inspected properties, AI-powered curation, licensed broker network. Free 15-min discovery call.";
const CANONICAL_URL = "https://www.miitaso.com/lp/japan-property";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      en: CANONICAL_URL,
      ja: CANONICAL_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "Tsubata's Japan",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function JapanPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
