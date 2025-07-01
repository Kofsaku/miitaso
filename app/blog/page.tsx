"use client"

import { useState, useEffect, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Plus, Search, Filter } from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingTime: number
  status: string
  categories: { name: string }[]
  viewCount?: number
}

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  })
  const [categories, setCategories] = useState<string[]>([])
  
  const postsPerPage = 9

  // 記事とカテゴリを取得
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        status: 'PUBLISHED',
        page: currentPage.toString(),
        limit: postsPerPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { categoryName: selectedCategory })
      })
      
      const response = await fetch(`/api/blog/posts?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
        setPagination(data.pagination || {
          page: currentPage,
          limit: postsPerPage,
          total: 0,
          totalPages: 0
        })
      }
    } catch (error) {
      console.error('ブログ記事の取得に失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      if (response.ok) {
        const data = await response.json()
        const categoryNames = data.categories.map((cat: any) => cat.name)
        setCategories(categoryNames)
      }
    } catch (error) {
      console.error('カテゴリの取得に失敗しました:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [currentPage, searchTerm, selectedCategory])

  // 検索とフィルタのハンドラー
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function LoadingSkeleton() {
    return (
      <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="w-full py-20 md:py-32 bg-slate-100">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    ブログ
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    技術、デザイン、ビジネスに関する最新の知見と洞察を共有します。
                  </p>
                </div>
              </div>
              <LoadingSkeleton />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 bg-slate-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  ブログ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  技術、デザイン、ビジネスに関する最新の知見と洞察を共有します。
                </p>
              </div>
            </div>

            {/* 検索・フィルター */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="記事を検索..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="カテゴリで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべてのカテゴリ</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">まだ記事がありません。</p>
                </div>
              ) : (
                posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          {post.categories.length > 0 && (
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {post.categories[0].name}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readingTime}分</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                          続きを読む
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>

            {/* ページネーション */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2"
                >
                  前へ
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNumber)}
                        className="px-3 py-2 min-w-[40px]"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-2"
                >
                  次へ
                </Button>
              </div>
            )}

            {/* 結果表示 */}
            {!loading && posts.length > 0 && (
              <div className="text-center text-sm text-muted-foreground mt-8">
                {pagination.total}件中 {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, pagination.total)}件を表示
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 