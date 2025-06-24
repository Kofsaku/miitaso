import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 仮のユーザーID（実際の実装では認証ユーザーのIDを使用）
    const guestUser = await prisma.user.findFirst({
      where: { email: 'guest@example.com' },
    })

    if (!guestUser) {
      return NextResponse.json(
        { message: 'ユーザーが見つかりません' },
        { status: 404 }
      )
    }

    const userId = guestUser.id

    // 記事の存在確認
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { message: '記事が見つかりません' },
        { status: 404 }
      )
    }

    // 既存のブックマークをチェック
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    })

    if (existingBookmark) {
      // 既にブックマークしている場合は削除（トグル）
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      })
      return NextResponse.json({ message: 'ブックマークを取り消しました' })
    } else {
      // ブックマークを追加
      await prisma.bookmark.create({
        data: {
          userId,
          postId: params.id,
        },
      })
      return NextResponse.json({ message: 'ブックマークしました' })
    }
  } catch (error) {
    console.error('ブックマークの処理に失敗しました:', error)
    return NextResponse.json(
      { message: 'ブックマークの処理に失敗しました' },
      { status: 500 }
    )
  }
}