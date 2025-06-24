"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Plus } from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingTime: number
  status: string
  categories: { name: string }[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog/posts?status=PUBLISHED')
        if (response.ok) {
          const data = await response.json()
          setPosts(data.posts || [])
        }
      } catch (error) {
        console.error('ブログ記事の取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div>読み込み中...</div>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  ブログ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  技術、デザイン、ビジネスに関する最新の知見と洞察を共有します。
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">まだ記事がありません。</p>
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="group-hover:underline">
                          続きを読む
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 