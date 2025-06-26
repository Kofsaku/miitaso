import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 記事統計の取得
    const totalPosts = await prisma.blogPost.count()
    const publishedPosts = await prisma.blogPost.count({
      where: { status: 'PUBLISHED' }
    })
    const draftPosts = await prisma.blogPost.count({
      where: { status: 'DRAFT' }
    })

    // 総閲覧数の取得
    const totalViewsResult = await prisma.blogPost.aggregate({
      _sum: {
        viewCount: true
      }
    })

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews: totalViewsResult._sum.viewCount || 0,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('統計データの取得に失敗しました:', error)
    return NextResponse.json(
      { message: '統計データの取得に失敗しました' },
      { status: 500 }
    )
  }
}