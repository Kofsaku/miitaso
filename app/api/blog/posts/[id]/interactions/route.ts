import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 仮のユーザーID（実際の実装では認証ユーザーのIDを使用）
    const guestUser = await prisma.user.findFirst({
      where: { email: 'guest@example.com' },
    })

    if (!guestUser) {
      return NextResponse.json({
        liked: false,
        bookmarked: false,
        likesCount: 0,
      })
    }

    const userId = guestUser.id

    // いいね状態をチェック
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    })

    // ブックマーク状態をチェック
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    })

    // 総いいね数を取得
    const likesCount = await prisma.like.count({
      where: { postId: params.id },
    })

    return NextResponse.json({
      liked: !!like,
      bookmarked: !!bookmark,
      likesCount,
    })
  } catch (error) {
    console.error('インタラクション状態の取得に失敗しました:', error)
    return NextResponse.json(
      { message: 'インタラクション状態の取得に失敗しました' },
      { status: 500 }
    )
  }
}