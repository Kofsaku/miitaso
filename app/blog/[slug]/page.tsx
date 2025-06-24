"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CommentSection } from "@/components/comment-section"
import { LikeBookmarkButton } from "@/components/like-bookmark-button"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

interface BlogPost {
  id: string
  title: string
  content: string
  publishedAt: string
  readingTime: number
  categories: { name: string }[]
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/posts/slug/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
          
          // MDXコンテンツをシリアライズ
          const mdxSource = await serialize(data.content || '')
          setMdxSource(mdxSource)
        } else if (response.status === 404) {
          setPost(null)
        }
      } catch (error) {
        console.error('記事の取得に失敗しました:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

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

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container flex flex-col items-center justify-center py-12">
            <h1 className="text-2xl font-bold">記事が見つかりません</h1>
            <Link href="/blog" className="mt-4">
              <Button variant="outline">ブログ一覧に戻る</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ブログ一覧に戻る
              </Button>
            </Link>
            <div className="mb-8">
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
              <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
            </div>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {mdxSource && <MDXRemote {...mdxSource} />}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
} 