import { NextRequest, NextResponse } from 'next/server'

interface DiagramRequest {
  title: string
  description: string
  type: 'flow' | 'comparison' | 'timeline' | 'process' | 'table'
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, type }: DiagramRequest = await request.json()
    
    // AIプロンプトを構築
    const prompt = buildDiagramPrompt(title, description, type)
    
    // OpenAI API呼び出し（実装は環境に応じて調整）
    const svg = await generateDiagramWithAI(prompt)
    
    return NextResponse.json({ svg })
  } catch (error) {
    console.error('図解生成エラー:', error)
    return NextResponse.json(
      { error: '図解の生成に失敗しました' },
      { status: 500 }
    )
  }
}

function buildDiagramPrompt(title: string, description: string, type: string): string {
  const basePrompt = `以下の内容をもとに、わかりやすいSVG図解を生成してください。

タイトル: ${title}
説明: ${description}
図解タイプ: ${type}

要件:
- 幅800px、高さ400px以内のSVG
- 日本語対応
- 清潔でモダンなデザイン
- 色は#3b82f6, #10b981, #f59e0b, #ef4444などを使用
- 矢印や図形で視覚的にわかりやすく表現`

  switch (type) {
    case 'comparison':
      return basePrompt + `
- 左右に分けて比較表示
- 違いを明確に表現
- 対比要素をハイライト`
    case 'process':
      return basePrompt + `
- ステップを矢印で繋げて表示
- 各ステップを番号付きで表現
- フローの方向を明確に`
    case 'timeline':
      return basePrompt + `
- 時系列で横に並べて表示
- 期間を線で表現
- 時間軸を明確に示す`
    case 'table':
      return basePrompt + `
- 表形式で整理して表示
- ヘッダーを強調
- 行ごとに色分けして見やすく`
    default:
      return basePrompt + `
- フローチャート形式で表示
- 関係性を矢印で表現
- 階層構造を明確に`
  }
}

async function generateDiagramWithAI(prompt: string): Promise<string> {
  // シンプルなSVG図解を生成
  return generateFallbackSVG(prompt)
}


function generateFallbackSVG(prompt: string): string {
  // プロンプトから基本情報を抽出
  const titleMatch = prompt.match(/タイトル:\s*([^\n]+)/)
  const typeMatch = prompt.match(/図解タイプ:\s*([^\n]+)/)
  
  const title = titleMatch?.[1] || '図解'
  const type = typeMatch?.[1] || 'flow'
  
  if (type === 'comparison') {
    return `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" rx="12"/>
      <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#1f2937">${title}</text>
      
      <!-- 左側 -->
      <rect x="50" y="60" width="300" height="300" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="8"/>
      <text x="200" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">従来型開発</text>
      <text x="200" y="130" text-anchor="middle" font-size="14" fill="#374151">企画 → 設計 → 開発</text>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#374151">→ テスト → リリース</text>
      <text x="200" y="180" text-anchor="middle" font-size="14" fill="#374151">期間: 12-18ヶ月</text>
      <text x="200" y="200" text-anchor="middle" font-size="14" fill="#374151">高コスト・高リスク</text>
      
      <!-- 右側 -->
      <rect x="450" y="60" width="300" height="300" fill="#dcfce7" stroke="#10b981" stroke-width="2" rx="8"/>
      <text x="600" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#065f46">MVP開発</text>
      <text x="600" y="130" text-anchor="middle" font-size="14" fill="#374151">仮説 → MVP開発</text>
      <text x="600" y="150" text-anchor="middle" font-size="14" fill="#374151">→ 検証 → 改善</text>
      <text x="600" y="180" text-anchor="middle" font-size="14" fill="#374151">期間: 1-3ヶ月</text>
      <text x="600" y="200" text-anchor="middle" font-size="14" fill="#374151">低コスト・早期検証</text>
      
      <!-- 矢印 -->
      <path d="M 370 210 L 430 210" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280"/>
        </marker>
      </defs>
      <text x="400" y="230" text-anchor="middle" font-size="12" fill="#6b7280">移行</text>
    </svg>`
  }
  
  return `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="400" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2" rx="12"/>
    <text x="400" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="#1f2937">${title}</text>
    <text x="400" y="200" text-anchor="middle" font-size="16" fill="#6b7280">図解を生成中...</text>
    <text x="400" y="220" text-anchor="middle" font-size="14" fill="#9ca3af">より詳細な図解にはAI APIキーの設定が必要です</text>
  </svg>`
}