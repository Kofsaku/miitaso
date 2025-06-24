"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye, Trash2, BarChart3, Users, MessageSquare } from "lucide-react"

// ダミーデータ
const dashboardStats = {
  totalPosts: 12,
  publishedPosts: 8,
  draftPosts: 4,
  totalViews: 15420,
  totalComments: 89,
  subscribers: 234
}

const recentPosts = [
  {
    id: "1",
    title: "Next.js 14の新機能と活用方法",
    status: "published",
    views: 1420,
    createdAt: "2024-04-01",
    author: "開発チーム"
  },
  {
    id: "2",
    title: "TypeScriptで型安全な開発を実現する方法",
    status: "published",
    views: 980,
    createdAt: "2024-03-15",
    author: "開発チーム"
  },
  {
    id: "3",
    title: "新しい記事の下書き",
    status: "draft",
    views: 0,
    createdAt: "2024-04-10",
    author: "開発チーム"
  }
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">ブログ管理</h1>
              <p className="text-muted-foreground">ブログコンテンツの管理とダッシュボード</p>
            </div>
            <Button asChild>
              <Link href="/blog/editor">
                <Plus className="h-4 w-4 mr-2" />
                新規記事作成
              </Link>
            </Button>
          </div>

          {/* 統計カード */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総記事数</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalPosts}</div>
                <p className="text-xs text-muted-foreground">
                  公開済み: {dashboardStats.publishedPosts}件
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総PV数</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  全記事の合計ビュー数
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">コメント数</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalComments}</div>
                <p className="text-xs text-muted-foreground">
                  承認待ち: 5件
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">購読者数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.subscribers}</div>
                <p className="text-xs text-muted-foreground">
                  今月: +12人
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 最近の記事 */}
          <Card>
            <CardHeader>
              <CardTitle>最近の記事</CardTitle>
              <CardDescription>最新の記事とその状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{post.title}</h3>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status === "published" ? "公開済み" : "下書き"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        作成者: {post.author} | 作成日: {post.createdAt} | PV: {post.views}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/editor/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/posts">すべての記事を見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}