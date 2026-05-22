import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tsubata's Japan",
  description: "Authentic Japanese Properties, Curated by an Insider",
};

export default function JapanPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
