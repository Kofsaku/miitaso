import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const importData = await request.json()

    if (!importData.version || !importData.posts) {
      return NextResponse.json(
        { error: 'Invalid import data format' },
        { status: 400 }
      )
    }

    const results = {
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
    }

    // デフォルトユーザーを作成または取得
    const defaultUser = await prisma.user.upsert({
      where: { email: 'admin@miitaso.com' },
      update: {},
      create: {
        email: 'admin@miitaso.com',
        name: 'Admin User',
        password: 'hashed_password',
      },
    })

    // カテゴリを事前作成
    const categoryMap = new Map()
    if (importData.categories) {
      for (const catData of importData.categories) {
        const category = await prisma.category.upsert({
          where: { name: catData.name },
          update: {
            slug: catData.slug,
            description: catData.description,
          },
          create: {
            name: catData.name,
            slug: catData.slug || catData.name.toLowerCase().replace(/\s+/g, '-'),
            description: catData.description,
          },
        })
        categoryMap.set(catData.name, category.id)
      }
    }

    // タグを事前作成
    const tagMap = new Map()
    if (importData.tags) {
      for (const tagData of importData.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagData.name },
          update: {
            slug: tagData.slug,
          },
          create: {
            name: tagData.name,
            slug: tagData.slug || tagData.name.toLowerCase().replace(/\s+/g, '-'),
          },
        })
        tagMap.set(tagData.name, tag.id)
      }
    }

    // 記事をインポート
    for (const postData of importData.posts) {
      try {
        const existingPost = await prisma.blogPost.findUnique({
          where: { slug: postData.slug },
        })

        if (existingPost) {
          // 既存記事を更新
          await prisma.blogPost.update({
            where: { slug: postData.slug },
            data: {
              title: postData.title,
              content: postData.content,
              excerpt: postData.excerpt,
              status: postData.status,
              publishedAt: postData.publishedAt ? new Date(postData.publishedAt) : null,
              readingTime: postData.readingTime,
              viewCount: postData.viewCount || 0,
            },
          })
          results.updated++
        } else {
          // 新規記事を作成
          const post = await prisma.blogPost.create({
            data: {
              title: postData.title,
              slug: postData.slug,
              content: postData.content,
              excerpt: postData.excerpt,
              status: postData.status,
              publishedAt: postData.publishedAt ? new Date(postData.publishedAt) : null,
              readingTime: postData.readingTime,
              viewCount: postData.viewCount || 0,
              authorId: defaultUser.id,
            },
          })

          // カテゴリを関連付け
          if (postData.categories && postData.categories.length > 0) {
            for (const categoryName of postData.categories) {
              const categoryId = categoryMap.get(categoryName)
              if (categoryId) {
                await prisma.blogPostCategory.create({
                  data: {
                    postId: post.id,
                    categoryId: categoryId,
                  },
                })
              }
            }
          }

          // タグを関連付け
          if (postData.tags && postData.tags.length > 0) {
            for (const tagName of postData.tags) {
              const tagId = tagMap.get(tagName)
              if (tagId) {
                await prisma.blogPostTag.create({
                  data: {
                    postId: post.id,
                    tagId: tagId,
                  },
                })
              }
            }
          }

          results.imported++
        }
      } catch (error) {
        console.error(`Error importing post ${postData.title}:`, error)
        results.errors.push(`Failed to import: ${postData.title}`)
        results.skipped++
      }
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import data' },
      { status: 500 }
    )
  }
}