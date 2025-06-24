import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  slug: z.string().optional(),
  featuredImage: z.string().optional(),
  categoryName: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED']).default('PUBLISHED'),
  publishedAt: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' | null;
    const categoryId = searchParams.get('categoryId');
    const tagId = searchParams.get('tagId');
    const authorId = searchParams.get('authorId');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'publishedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const where: any = {};

    if (status) {
      where.status = status;
    } else {
      where.status = 'PUBLISHED';
    }

    if (categoryId) {
      where.categories = {
        some: {
          categoryId,
        },
      };
    }

    if (tagId) {
      where.tags = {
        some: {
          tagId,
        },
      };
    }

    if (authorId) {
      where.authorId = authorId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
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
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPostSchema.parse(body);

    const { categoryIds, tagIds, categoryName, ...postData } = validatedData;

    // スラッグを自動生成
    const slug = postData.slug || postData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    // 抜粋を自動生成
    const excerpt = postData.excerpt || postData.content
      .replace(/[#*`]/g, '')
      .substring(0, 200) + '...';

    const readingTime = Math.ceil(postData.content.split(' ').length / 200);

    // 重複スラッグのチェック
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    // デフォルトカテゴリを作成または取得
    let category = null;
    if (categoryName || categoryIds?.length) {
      const catName = categoryName || '未分類';
      category = await prisma.category.upsert({
        where: { name: catName },
        update: {},
        create: {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
        },
      });
    }

    // デフォルトユーザーを作成または取得
    const defaultUser = await prisma.user.upsert({
      where: { email: 'admin@miitaso.com' },
      update: {},
      create: {
        email: 'admin@miitaso.com',
        name: 'Admin User',
        password: 'hashed_password', // 実際のハッシュ化されたパスワード
      },
    });

    const post = await prisma.blogPost.create({
      data: {
        title: postData.title,
        content: postData.content,
        excerpt,
        slug: finalSlug,
        status: postData.status || 'PUBLISHED',
        readingTime,
        authorId: defaultUser.id,
        publishedAt: postData.status === 'PUBLISHED' ? new Date() : null,
        ...(category && {
          categories: {
            create: [{
              category: {
                connect: { id: category.id },
              },
            }],
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}