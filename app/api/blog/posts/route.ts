import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { calculateReadingTime } from '@/lib/utils';
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
    const showAll = searchParams.get('showAll') === 'true'; // 管理画面用フラグ
    const categoryId = searchParams.get('categoryId');
    const categoryName = searchParams.get('categoryName');
    const tagId = searchParams.get('tagId');
    const authorId = searchParams.get('authorId');
    const search = searchParams.get('search');
    const orderBy = searchParams.get('orderBy') || 'publishedAt';
    const order = searchParams.get('order') || 'desc';

    const where: any = {};

    if (status) {
      where.status = status;
    } else if (!showAll) {
      // showAllがfalseの場合のみ公開済みのみを表示（公開サイト用）
      where.status = 'PUBLISHED';
    }
    // showAllがtrueの場合はすべてのステータスを表示（管理画面用）

    if (categoryId) {
      where.categories = {
        some: {
          categoryId,
        },
      };
    }

    if (categoryName) {
      where.categories = {
        some: {
          category: {
            name: categoryName,
          },
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
          [orderBy]: order,
        },
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          publishedAt: true,
          updatedAt: true,
          readingTime: true,
          status: true,
          viewCount: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    const transformedPosts = posts.map(post => ({
      ...post,
      categories: post.categories.map(pc => pc.category),
    }));

    return NextResponse.json({
      posts: transformedPosts,
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

    const readingTime = calculateReadingTime(postData.content);

    // 重複スラッグのチェック
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    // カテゴリーの処理
    let categoryConnections = [];
    if (categoryIds?.length) {
      // 指定されたカテゴリーIDが存在するかチェック
      const existingCategories = await prisma.category.findMany({
        where: { id: { in: categoryIds } }
      });
      categoryConnections = existingCategories.map(cat => ({
        category: { connect: { id: cat.id } }
      }));
    } else if (categoryName) {
      // 後方互換性のため、categoryNameも処理
      const catSlug = categoryName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      
      let category = await prisma.category.findFirst({
        where: {
          OR: [
            { name: categoryName },
            { slug: catSlug }
          ]
        }
      });
      
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: categoryName,
            slug: catSlug,
          },
        });
      }
      
      categoryConnections = [{ category: { connect: { id: category.id } } }];
    }

    // タグの処理
    let tagConnections = [];
    if (tagIds?.length) {
      const existingTags = await prisma.tag.findMany({
        where: { id: { in: tagIds } }
      });
      tagConnections = existingTags.map(tag => ({
        tag: { connect: { id: tag.id } }
      }));
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
        status: postData.status || 'DRAFT',
        readingTime,
        authorId: defaultUser.id,
        publishedAt: (postData.status || 'DRAFT') === 'PUBLISHED' ? new Date() : null,
        ...(categoryConnections.length > 0 && {
          categories: {
            create: categoryConnections,
          },
        }),
        ...(tagConnections.length > 0 && {
          tags: {
            create: tagConnections,
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
        tags: {
          include: {
            tag: true,
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