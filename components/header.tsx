"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const navigationItems = [
    { href: "/services", label: "サービス" },
    { href: "/case-studies", label: "事例" },
    { href: "/pricing", label: "料金" },
    { href: "/blog", label: "ブログ" },
    {
      label: "サポート",
      items: [
        { href: "/tools", label: "ツール" },
        { href: "/faq", label: "よくある質問" },
      ],
    },
    { href: "/about", label: "会社概要" },
    { href: "/estimate", label: "無料お見積" },
  ]

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
          <nav className="hidden lg:flex gap-6">
            {navigationItems.map((item) => {
              if (item.items) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary outline-none">
                      {item.label}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link
                            href={subItem.href}
                            className={isActive(subItem.href) ? "text-primary" : ""}
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`flex items-center text-sm font-medium ${
                    isActive(item.href!) ? "text-foreground font-semibold pointer-events-none" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          <Button variant="default" asChild className="hidden sm:inline-flex">
            <Link href="/contact">無料相談を申し込む</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item) => {
                  if (item.items) {
                    return (
                      <div key={item.label} className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground px-2">
                          {item.label}
                        </h3>
                        <div className="pl-4 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 px-2 text-sm rounded-md hover:bg-accent ${
                                isActive(subItem.href) ? "text-primary font-medium" : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={() => isActive(item.href!) ? undefined : setIsOpen(false)}
                      className={`block py-2 px-2 text-sm rounded-md ${
                        isActive(item.href!) ? "text-foreground font-semibold bg-accent pointer-events-none" : "hover:bg-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="pt-4 mt-4 border-t">
                  <Button variant="default" asChild className="w-full">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      無料相談を申し込む
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
