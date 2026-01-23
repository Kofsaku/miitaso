import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  const scrollToContact = () => {
    if (typeof window !== "undefined") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full border-t border-slate-100 bg-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                width={60}
                height={40}
                alt="miitaso"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              アイデアを、動くプロダクトに。
              <br />
              新規事業・アプリ開発をワンストップでサポート。
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">会社情報</h3>
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>〒104-0061 東京都中央区銀座1丁目12番4号N&E BLD.6F</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} miitaso. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
