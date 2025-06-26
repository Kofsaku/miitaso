"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CommentSection } from "@/components/comment-section"
import { LikeBookmarkButton } from "@/components/like-bookmark-button"
import { TableOfContents } from "@/components/table-of-contents"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react"
import { useSession, SessionProvider } from "next-auth/react"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

interface BlogPost {
  id: string
  title: string
  content: string
  publishedAt: string
  readingTime: number
  categories: { name: string }[]
  mdxSource?: any
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

function BlogPostContent({ params }: BlogPostPageProps) {
  const { data: session } = useSession()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR'

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/posts/slug/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
          
          // サーバーサイドでシリアライズされたMDXソースを使用
          if (data.mdxSource) {
            setMdxSource(data.mdxSource)
          } else {
            // フォールバック: クライアントサイドでシリアライズ
            const mdxSource = await serialize(data.content || '')
            setMdxSource(mdxSource)
          }
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
        <main className="flex-1">
          <article className="container py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </article>
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">記事が見つかりません</h1>
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
        <div className="container mx-auto px-4 py-6 md:py-12 lg:py-16 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <Link href="/blog">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ブログ一覧に戻る
              </Button>
            </Link>
            
            {isAdmin && (
              <Button asChild>
                <Link href={`/blog/editor?id=${post.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  記事を編集
                </Link>
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* 左サイドバー（目次） - デスクトップのみ */}
            <div className="hidden lg:block lg:order-1">
              <TableOfContents content={post.content} />
            </div>
            
            {/* メインコンテンツ */}
            <div className="lg:order-2">
              <article className="max-w-4xl mx-auto">
                {/* モバイル用目次 */}
                <div className="lg:hidden mb-8">
                  <TableOfContents content={post.content} />
                </div>
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
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
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                    {post.title}
                  </h1>
                </div>
                
                <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg prose-h1:hidden">
                  {mdxSource && <MDXRemote {...mdxSource} />}
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <SessionProvider>
      <BlogPostContent params={params} />
    </SessionProvider>
  )
}