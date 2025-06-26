#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function exportData() {
  try {
    console.log('📥 データベースからデータをエクスポート中...')

    // 全記事データを取得
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
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
    })

    // カテゴリデータを取得
    const categories = await prisma.category.findMany()

    // タグデータを取得
    const tags = await prisma.tag.findMany()

    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      posts: posts.map(post => ({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        viewCount: post.viewCount || 0,
        author: post.author,
        categories: post.categories.map(pc => pc.category.name),
        tags: post.tags.map(pt => pt.tag.name),
      })),
      categories: categories.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      })),
      tags: tags.map(tag => ({
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
      })),
    }

    console.log(`✅ エクスポート完了: ${exportData.posts.length}件の記事`)
    
    // JSONファイルに保存
    const exportPath = path.join(process.cwd(), 'export-data.json')
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2))
    console.log(`💾 ファイル保存: ${exportPath}`)

    return exportData
  } catch (error) {
    console.error('❌ エクスポートエラー:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function deployToStaging(data) {
  console.log('🚢 ステージング環境にデプロイ中...')
  
  try {
    const fetch = (await import('node-fetch')).default
    
    const response = await fetch('https://miitaso-71ge-pusaq2u1g-kofsakus-projects.vercel.app/api/blog/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Deploy failed: ${response.status} - ${errorText}`)
    }

    const result = await response.json()

    console.log('✅ デプロイ完了!')
    console.log(`📊 結果:`)
    console.log(`  - 新規追加: ${result.results.imported}件`)
    console.log(`  - 更新: ${result.results.updated}件`)
    console.log(`  - スキップ: ${result.results.skipped}件`)

    if (result.results.errors.length > 0) {
      console.log(`⚠️  エラー:`)
      result.results.errors.forEach(error => console.log(`    ${error}`))
    }

    return result
  } catch (error) {
    console.error('❌ デプロイエラー:', error.message)
    throw error
  }
}

async function main() {
  try {
    const data = await exportData()
    await deployToStaging(data)
    console.log('🎉 ステージングデプロイが正常に完了しました!')
  } catch (error) {
    console.error('❌ 処理に失敗しました:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { exportData, deployToStaging }