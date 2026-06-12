"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "AI導入支援", href: "/services/ai" },
  { label: "ソフトウェア開発", href: "/services/development" },
  { label: "新規事業支援", href: "/services/new-business" },
  { label: "会社概要", href: "/about" },
]

/**
 * ダーク固定ヘッダー。fixed のため、各ページのヒーローは
 * pt-32 以上の上余白を取ること。
 */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Escape キーでモバイルメニューを閉じる
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            width={60}
            height={40}
            alt="miitaso"
            className="h-8 w-auto invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
          >
            無料相談
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 md:hidden"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-nav" className="border-t border-white/10 bg-[#030712] md:hidden">
          <nav className="container flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
            >
              無料相談
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
