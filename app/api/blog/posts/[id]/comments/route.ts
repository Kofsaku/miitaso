import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: params.id,
        status: 'APPROVED',
        parentId: null, // トップレベルのコメントのみ
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        replies: {
          where: {
            status: 'APPROVED',
          },
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // likesカウントを追加
    const commentsWithLikes = comments.map(comment => ({
      ...comment,
      likes: comment._count.likes,
      replies: comment.replies?.map(reply => ({
        ...reply,
        likes: reply._count.likes,
      })),
    }))

    return NextResponse.json({ comments: commentsWithLikes })
  } catch (error) {
    console.error('コメントの取得に失敗しました:', error)
    return NextResponse.json(
      { message: 'コメントの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { content, parentId } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json(
        { message: 'コメント内容は必須です' },
        { status: 400 }
      )
    }

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

    // 仮の作者情報（実際の実装では認証ユーザーの情報を使用）
    const guestAuthor = await prisma.user.findFirst({
      where: { email: 'guest@example.com' },
    })

    if (!guestAuthor) {
      // ゲストユーザーが存在しない場合は作成
      const newGuestAuthor = await prisma.user.create({
        data: {
          name: 'ゲストユーザー',
          email: 'guest@example.com',
          password: 'dummy_password',
          role: 'WRITER',
        },
      })
    }

    const authorId = guestAuthor?.id || (await prisma.user.findFirst({
      where: { email: 'guest@example.com' },
    }))?.id

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: params.id,
        authorId: authorId!,
        parentId: parentId || null,
        status: 'PENDING', // デフォルトは承認待ち
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('コメントの作成に失敗しました:', error)
    return NextResponse.json(
      { message: 'コメントの作成に失敗しました' },
      { status: 500 }
    )
  }
}