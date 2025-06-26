import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serialize } from 'next-mdx-remote/serialize';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
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
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // ビュー数を増やす
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    // MDXコンテンツをサーバーサイドでシリアライズ
    const mdxSource = await serialize(post.content || '');

    return NextResponse.json({
      ...post,
      categories: post.categories.map(pc => pc.category),
      tags: post.tags.map(pt => pt.tag),
      mdxSource,
    });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}