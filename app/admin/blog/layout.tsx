"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  PlusCircle,
  Settings,
  Menu,
  Home,
  Edit,
  Eye,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "ダッシュボード",
    href: "/admin/blog",
    icon: Home,
  },
  {
    title: "記事一覧",
    href: "/admin/blog/posts",
    icon: FileText,
  },
  {
    title: "新規作成",
    href: "/admin/blog/new",
    icon: PlusCircle,
  },
  {
    title: "設定",
    href: "/admin/blog/settings",
    icon: Settings,
  },
]

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">ブログ管理</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-muted"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <ScrollArea className="flex-1">
            <SidebarContent />
          </ScrollArea>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed left-4 top-20 z-40"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ScrollArea className="h-full">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}