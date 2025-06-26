#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 設定
const LOCAL_API = process.env.LOCAL_API || 'http://localhost:3000'
const PRODUCTION_API = process.env.PRODUCTION_API || 'https://your-domain.vercel.app'

console.log('⬇️  本番環境からローカルに同期を開始します...')

async function fetchProductionData() {
  console.log('📥 本番環境からデータを取得中...')
  
  try {
    const response = await fetch(`${PRODUCTION_API}/api/blog/export`)
    
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    console.log(`✅ 取得完了: ${data.posts.length}件の記事`)
    
    return data
  } catch (error) {
    console.error('❌ 取得エラー:', error.message)
    process.exit(1)
  }
}

async function syncToLocal(data) {
  console.log('🔄 ローカル環境に同期中...')
  
  try {
    const response = await fetch(`${LOCAL_API}/api/blog/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status}`)
    }
    
    const result = await response.json()
    
    console.log('✅ 同期完了!')
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
    console.error('❌ 同期エラー:', error.message)
    process.exit(1)
  }
}

async function main() {
  try {
    // 本番環境からデータを取得
    const productionData = await fetchProductionData()
    
    // ローカルバックアップを作成
    const backupPath = path.join(process.cwd(), 'backups', `production-backup-${Date.now()}.json`)
    if (!fs.existsSync(path.dirname(backupPath))) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true })
    }
    fs.writeFileSync(backupPath, JSON.stringify(productionData, null, 2))
    console.log(`💾 本番データバックアップ: ${backupPath}`)
    
    // ローカルに同期
    await syncToLocal(productionData)
    
    console.log('🎉 同期が正常に完了しました!')
  } catch (error) {
    console.error('❌ 同期に失敗しました:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { fetchProductionData, syncToLocal }