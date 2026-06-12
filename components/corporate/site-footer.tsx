import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

const serviceLinks = [
  { label: "AI導入支援", href: "/services/ai" },
  { label: "ソフトウェア開発", href: "/services/development" },
  { label: "新規事業支援", href: "/services/new-business" },
]

const companyLinks = [
  { label: "プロダクト", href: "/#products" },
  { label: "会社概要", href: "/about" },
  { label: "プライバシーポリシー", href: "/privacy" },
]

/**
 * ダークフッター（サーバーコンポーネント）。
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030712] py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand */}
            <div className="space-y-5">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.png"
                  width={60}
                  height={40}
                  alt="miitaso"
                  className="h-8 w-auto invert"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                考えるだけでも、作るだけでもない。
                <br />
                課題の定義から実装・運用まで、一貫して伴走します。
              </p>
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F</span>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Services
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} miitaso. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
