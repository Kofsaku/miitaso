import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET(request: NextRequest) {
  try {
    // 全記事データを取得
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    // カテゴリデータを取得
    const categories = await prisma.category.findMany()

    // タグデータを取得
    const tags = await prisma.tag.findMany()

    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      posts: posts.map(post => ({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        viewCount: post.viewCount,
        author: post.author,
        categories: post.categories.map(pc => pc.category.name),
        tags: post.tags.map(pt => pt.tag.name),
      })),
      categories: categories.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      })),
      tags: tags.map(tag => ({
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
      })),
    }

    return NextResponse.json(exportData, {
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500, headers: corsHeaders }
    )
  }
}