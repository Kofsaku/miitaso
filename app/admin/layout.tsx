"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminAuth } from "@/components/admin-auth"
import { SessionProvider, signOut } from "next-auth/react"
import {
  BarChart3,
  FileText,
  Menu,
  Settings,
  Tag,
  Hash,
  MessageSquare,
  Users,
  Home,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "ダッシュボード",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "記事管理",
    icon: FileText,
    children: [
      {
        title: "記事一覧",
        href: "/admin/posts",
      },
      {
        title: "設定",
        href: "/admin/posts/settings",
      },
    ],
  },
  {
    title: "デプロイ・同期",
    href: "/admin/deploy",
    icon: Settings,
  },
  {
    title: "カテゴリ管理",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "タグ管理",
    href: "/admin/tags",
    icon: Hash,
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // 管理画面は完全に独立したレイアウトを使用
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['記事管理'])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center border-b border-gray-700 px-6">
        <div className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6" />
          <span>管理画面</span>
        </div>
      </div>
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {sidebarNavItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className="flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-7 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            pathname === child.href
                              ? "bg-blue-600 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          <div className="border-t border-gray-700 my-4"></div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            サイトに戻る
          </Link>
        </nav>
      </div>
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          ログアウト
        </button>
      </div>
    </div>
  )

  return (
    <SessionProvider>
      <AdminAuth>
        <div className="flex h-screen bg-gray-100">
        {/* サイドバー */}
        <div className="hidden w-64 md:block">
          <SidebarContent />
        </div>
        
        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* トップバー */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
                <h1 className="text-xl font-semibold tracking-tight text-gray-900">ブログ管理システム</h1>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </header>
          
          {/* メインコンテンツエリア */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      </AdminAuth>
    </SessionProvider>
  )
}