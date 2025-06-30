"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Eye, Trash2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-hot-toast"

// ダミーデータ
const allPosts = [
  {
    id: "1",
    title: "Next.js 14の新機能と活用方法",
    status: "published",
    category: "技術",
    author: "開発チーム",
    publishedAt: "2024-04-01",
    views: 1420,
    comments: 12
  },
  {
    id: "2",
    title: "TypeScriptで型安全な開発を実現する方法",
    status: "published",
    category: "技術",
    author: "開発チーム",
    publishedAt: "2024-03-15",
    views: 980,
    comments: 8
  },
  {
    id: "3",
    title: "モダンなUIデザインのトレンド2024",
    status: "published",
    category: "デザイン",
    author: "デザインチーム",
    publishedAt: "2024-03-01",
    views: 1150,
    comments: 15
  },
  {
    id: "4",
    title: "アイデアが思いつかない人へ。実は○○を見るだけで解決！",
    status: "published",
    category: "プロダクト開発",
    author: "PM",
    publishedAt: "2024-04-15",
    views: 2300,
    comments: 24
  },
  {
    id: "5",
    title: "新機能についての記事（下書き）",
    status: "draft",
    category: "技術",
    author: "開発チーム",
    publishedAt: null,
    views: 0,
    comments: 0
  }
]

interface BlogPost {
  id: string
  title: string
  status: string
  category: string
  author: string
  publishedAt: string | null
  views: number
  comments: number
  slug: string
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const fetchPosts = async () => {
    try {
      // 管理画面ではすべてのステータスの記事を取得
      const params = new URLSearchParams({
        limit: '100', // 管理画面なのですべての記事を表示
        showAll: 'true', // 管理画面用フラグ
        orderBy: 'updatedAt' // 更新日時でソートして最新のものから表示
      });
      
      const response = await fetch(`/api/blog/posts?${params}`)
      console.log('管理画面 API呼び出し:', `/api/blog/posts?${params}`);
      
      if (response.ok) {
        const data = await response.json()
        console.log('APIから取得したデータ:', data);
        console.log('取得した記事数:', data.posts?.length || 0);
        console.log('ドラフト記事数:', data.posts?.filter((p: any) => p.status === 'DRAFT').length || 0);
        
        // APIから返されたデータを管理画面用に変換
        const transformedPosts = data.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          status: post.status,
          category: post.categories?.[0]?.name || '未分類',
          author: post.author?.name || '管理者',
          publishedAt: post.publishedAt,
          views: post.viewCount || 0,
          comments: 0, // コメント数は実装されていない
          slug: post.slug,
        })).sort((a, b) => {
          // 下書きを上に表示し、公開済みを下に表示
          if (a.status === 'DRAFT' && b.status !== 'DRAFT') return -1;
          if (a.status !== 'DRAFT' && b.status === 'DRAFT') return 1;
          return 0;
        })
        
        console.log('変換後の記事数:', transformedPosts.length);
        console.log('変換後のドラフト記事数:', transformedPosts.filter(p => p.status === 'DRAFT').length);
        setPosts(transformedPosts)
      } else {
        console.error('API呼び出しエラー:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('記事の取得に失敗しました:', error)
    }
  }

  const handleStatusChange = async (postId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success(`記事を${newStatus === 'PUBLISHED' ? '公開' : '下書きに'}しました`)
        fetchPosts()
      } else {
        toast.error('ステータス変更に失敗しました')
      }
    } catch (error) {
      toast.error('ステータス変更に失敗しました')
    }
  }

  const handleDelete = async (postId: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？この操作は取り消せません。`)) {
      return
    }

    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('記事を削除しました')
        fetchPosts()
      } else {
        toast.error('記事の削除に失敗しました')
      }
    } catch (error) {
      toast.error('記事の削除に失敗しました')
    }
  }

  useEffect(() => {
    console.log('管理画面の初期化開始');
    setLoading(true)
    fetchPosts().finally(() => {
      setLoading(false)
      console.log('管理画面の初期化完了');
    })
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && post.status === 'PUBLISHED') ||
      (statusFilter === 'draft' && post.status === 'DRAFT')
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    
    // デバッグ用ログ
    if (post.status === 'DRAFT') {
      console.log(`ドラフト記事フィルタリング:`, {
        title: post.title,
        statusFilter,
        matchesSearch,
        matchesStatus,
        matchesCategory,
        finalResult: matchesSearch && matchesStatus && matchesCategory
      });
    }
    
    return matchesSearch && matchesStatus && matchesCategory
  })
  
  // フィルタリング結果をログ出力
  console.log('フィルタリング結果:', {
    totalPosts: posts.length,
    filteredPosts: filteredPosts.length,
    draftPosts: posts.filter(p => p.status === 'DRAFT').length,
    filteredDraftPosts: filteredPosts.filter(p => p.status === 'DRAFT').length,
    statusFilter,
    searchTerm
  })

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">記事管理</h1>
        </div>
        <div className="text-center py-12">
          読み込み中...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">記事管理</h1>
          <p className="text-muted-foreground">すべてのブログ記事の管理</p>
        </div>
        <Button asChild>
          <Link href="/blog/editor">
            <Plus className="h-4 w-4 mr-2" />
            新規記事作成
          </Link>
        </Button>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総記事数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公開済み記事</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'PUBLISHED').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総閲覧数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">下書き記事</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'DRAFT').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle>フィルター</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="記事を検索..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="すべてのステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="published">公開済み</SelectItem>
                <SelectItem value="draft">下書き</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="すべてのカテゴリ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのカテゴリ</SelectItem>
                <SelectItem value="技術">技術</SelectItem>
                <SelectItem value="デザイン">デザイン</SelectItem>
                <SelectItem value="プロダクト開発">プロダクト開発</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 記事一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>記事一覧 ({filteredPosts.length}件)</CardTitle>
          <CardDescription>管理しているすべての記事</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {posts.length === 0 ? "まだ記事がありません。" : "条件に一致する記事がありません。"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          href={post.status === 'DRAFT' ? `/blog/editor?id=${post.id}` : `/blog/${post.slug}`}
                          className="text-lg font-semibold hover:underline"
                        >
                          {post.title}
                        </Link>
                        <Badge
                          variant={post.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className={post.status === 'PUBLISHED' ? 'bg-green-600' : 'bg-gray-500'}
                        >
                          {post.status === 'PUBLISHED' ? '公開済み' : '下書き'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.category}</span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ja-JP') : '未公開'}</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={post.status === 'DRAFT' ? `/blog/editor?id=${post.id}` : `/blog/${post.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/editor?id=${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(
                              post.id, 
                              post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
                            )}
                          >
                            {post.status === 'PUBLISHED' ? '下書きにする' : '公開する'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(post.id, post.title)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}