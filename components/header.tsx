"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              width={60}
              height={40}
              alt="miitaso logo"
              className="h-10 w-auto"
            />
            <span className="hidden font-bold sm:inline-block">
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/services"
              className={`flex items-center text-sm font-medium ${
                isActive("/services") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              サービス
            </Link>
            <Link
              href="/tools"
              className={`flex items-center text-sm font-medium ${
                isActive("/tools") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              ツール
            </Link>
            <Link
              href="/about"
              className={`flex items-center text-sm font-medium ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              会社概要
            </Link>
            <Link
              href="/case-studies"
              className={`flex items-center text-sm font-medium ${
                isActive("/case-studies") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              事例
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <Button variant="default" asChild>
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
