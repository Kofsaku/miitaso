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

    // 既存のいいねをチェック
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId: params.id,
        },
      },
    })

    if (existingLike) {
      // 既にいいねしている場合は削除（トグル）
      await prisma.commentLike.delete({
        where: { id: existingLike.id },
      })
      return NextResponse.json({ message: 'いいねを取り消しました' })
    } else {
      // いいねを追加
      await prisma.commentLike.create({
        data: {
          userId,
          commentId: params.id,
        },
      })
      return NextResponse.json({ message: 'いいねしました' })
    }
  } catch (error) {
    console.error('いいねの処理に失敗しました:', error)
    return NextResponse.json(
      { message: 'いいねの処理に失敗しました' },
      { status: 500 }
    )
  }
}