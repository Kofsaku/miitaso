import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TableOfContents } from "@/components/table-of-contents"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { MDXRemote } from "next-mdx-remote"
import { notFound } from "next/navigation"
import { DiagramRenderer, ProcessedMDXContent } from "@/components/diagram-renderer"
import remarkGfm from "remark-gfm"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blog/posts/slug/${slug}`, {
      cache: 'no-store' // キャッシュを無効化
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.categories?.map((cat: any) => cat.name).join(', '),
    authors: [{ name: 'miitaso' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['miitaso'],
      siteName: 'miitaso',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@miitaso',
    },
    alternates: {
      canonical: `https://miitaso.com/blog/${params.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  const session = await getServerSession(authOptions)
  
  if (!post) {
    notFound()
  }

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'miitaso',
      url: 'https://miitaso.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'miitaso',
      url: 'https://miitaso.com',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://miitaso.com/blog/${params.slug}`,
    },
    articleSection: post.categories?.[0]?.name || '未分類',
    keywords: post.categories?.map((cat: any) => cat.name).join(', '),
    wordCount: post.content?.split(' ').length || 0,
    timeRequired: `PT${post.readingTime || 1}M`,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              {post.status === 'DRAFT' && isAdmin && (
                <div className="max-w-4xl mx-auto mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">この記事は下書きです。管理者のみ表示されています。</span>
                  </div>
                </div>
              )}
              <article className="max-w-4xl mx-auto">
                {/* モバイル用目次 */}
                <div className="lg:hidden mb-8">
                  <TableOfContents content={post.content} />
                </div>
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    {post.status === 'DRAFT' && isAdmin && (
                      <span className="rounded-full bg-yellow-100 dark:bg-yellow-900 px-3 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                        下書き
                      </span>
                    )}
                    {post.categories?.length > 0 && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {post.categories[0].name}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('ja-JP')}</span>
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
                
                <ProcessedMDXContent content={post.content}>
                  <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg prose-h1:hidden prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50 prose-th:text-left prose-th:font-semibold prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 dark:prose-th:border-gray-600 dark:prose-th:bg-gray-800 dark:prose-td:border-gray-600">
                    <MDXRemote 
                      source={post.content} 
                      options={{
                        mdxOptions: {
                          remarkPlugins: [remarkGfm],
                        },
                      }}
                    />
                  </div>
                </ProcessedMDXContent>
                <DiagramRenderer content={post.content} />
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}