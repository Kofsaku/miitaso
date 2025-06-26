#!/usr/bin/env node

const https = require('https')
const fs = require('fs')
const path = require('path')

// 設定
const LOCAL_API = process.env.LOCAL_API || 'http://localhost:3000'
const PRODUCTION_API = process.env.PRODUCTION_API || 'https://your-domain.vercel.app'
const API_KEY = process.env.DEPLOY_API_KEY || 'your-secret-key'

console.log('🚀 ブログコンテンツのデプロイを開始します...')

async function fetchLocalData() {
  console.log('📥 ローカルデータをエクスポート中...')
  
  try {
    const response = await fetch(`${LOCAL_API}/api/blog/export`)
    
    if (!response.ok) {
      throw new Error(`Export failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    // ローカルにバックアップを保存
    const backupPath = path.join(process.cwd(), 'backups', `backup-${Date.now()}.json`)
    if (!fs.existsSync(path.dirname(backupPath))) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true })
    }
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2))
    
    console.log(`✅ エクスポート完了: ${data.posts.length}件の記事`)
    console.log(`💾 バックアップ保存: ${backupPath}`)
    
    return data
  } catch (error) {
    console.error('❌ エクスポートエラー:', error.message)
    process.exit(1)
  }
}

async function deployToProduction(data) {
  console.log('🚢 本番環境にデプロイ中...')
  
  try {
    const response = await fetch(`${PRODUCTION_API}/api/blog/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`Deploy failed: ${response.status}`)
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
    process.exit(1)
  }
}

async function main() {
  try {
    // ローカルからデータをエクスポート
    const localData = await fetchLocalData()
    
    // 本番環境にデプロイ
    await deployToProduction(localData)
    
    console.log('🎉 デプロイが正常に完了しました!')
  } catch (error) {
    console.error('❌ デプロイに失敗しました:', error.message)
    process.exit(1)
  }
}

// コマンドライン引数の処理
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
ブログコンテンツデプロイツール

使用方法:
  npm run deploy:content        # ローカル → 本番にデプロイ
  npm run deploy:content --help # このヘルプを表示

環境変数:
  LOCAL_API=http://localhost:3000          # ローカルAPI URL
  PRODUCTION_API=https://your-domain.com   # 本番API URL
  DEPLOY_API_KEY=your-secret-key          # デプロイ用APIキー
`)
  process.exit(0)
}

if (require.main === module) {
  main()
}

module.exports = { fetchLocalData, deployToProduction }