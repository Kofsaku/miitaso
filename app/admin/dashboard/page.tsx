"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  FileText,
  Eye,
  TrendingUp,
  Users,
  PlusCircle,
  BarChart3,
} from "lucide-react"

interface Stats {
  totalPosts: number
  totalViews: number
  publishedPosts: number
  draftPosts: number
}

interface Post {
  id: string
  title: string
  slug: string
  viewCount: number
  publishedAt: string
  status: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // 統計データの取得
        const statsResponse = await fetch('/api/blog/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }

        // 最近の記事の取得
        const postsResponse = await fetch('/api/blog/posts?limit=5&orderBy=publishedAt&order=desc')
        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setRecentPosts(postsData.posts || [])
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
        </div>
        <div className="text-center py-12">
          読み込み中...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <Button asChild>
          <Link href="/blog/editor">
            <PlusCircle className="mr-2 h-4 w-4" />
            新規記事作成
          </Link>
        </Button>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総記事数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPosts || 0}</div>
            <p className="text-xs text-muted-foreground">
              公開: {stats?.publishedPosts || 0}, 下書き: {stats?.draftPosts || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総閲覧数</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalViews?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">累計</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公開記事</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.publishedPosts || 0}</div>
            <p className="text-xs text-muted-foreground">公開中</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">下書き記事</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.draftPosts || 0}</div>
            <p className="text-xs text-muted-foreground">作成中</p>
          </CardContent>
        </Card>
      </div>

      {/* 最近の記事 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            最近の記事
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              まだ記事がありません。
              <div className="mt-4">
                <Button asChild>
                  <Link href="/blog/editor">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    最初の記事を作成する
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.viewCount} views
                      </span>
                      <span className={`capitalize rounded-full px-2 py-0.5 text-xs ${
                        post.status === 'PUBLISHED' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {post.status === 'PUBLISHED' ? '公開' : '下書き'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* クイックアクション */}
      <Card>
        <CardHeader>
          <CardTitle>クイックアクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/blog/editor">
                <PlusCircle className="h-6 w-6 mb-2" />
                新規記事作成
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/posts">
                <FileText className="h-6 w-6 mb-2" />
                記事一覧
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/categories">
                <Users className="h-6 w-6 mb-2" />
                カテゴリ管理
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/tags">
                <TrendingUp className="h-6 w-6 mb-2" />
                タグ管理
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}