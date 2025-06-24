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

    // 既存のいいねをチェック
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    })

    if (existingLike) {
      // 既にいいねしている場合は削除（トグル）
      await prisma.like.delete({
        where: { id: existingLike.id },
      })
    } else {
      // いいねを追加
      await prisma.like.create({
        data: {
          userId,
          postId: params.id,
        },
      })
    }

    // 新しいいいね数を取得
    const likesCount = await prisma.like.count({
      where: { postId: params.id },
    })

    return NextResponse.json({
      message: existingLike ? 'いいねを取り消しました' : 'いいねしました',
      likesCount,
    })
  } catch (error) {
    console.error('いいねの処理に失敗しました:', error)
    return NextResponse.json(
      { message: 'いいねの処理に失敗しました' },
      { status: 500 }
    )
  }
}