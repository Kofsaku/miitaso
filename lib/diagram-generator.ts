interface DiagramConfig {
  title: string
  description: string
  type: 'flow' | 'comparison' | 'timeline' | 'process' | 'table'
  startIndex: number
  endIndex: number
}

export function extractDiagramConfigs(content: string): DiagramConfig[] {
  // 図解マークアップの検出
  const diagramRegex = /【図解：([^】]+)】\s*\n((?:(?!【図解：).)*?)(?=\n\n|$)/gs
  const diagramMatches = [...content.matchAll(diagramRegex)]
  
  // 比較表マークアップの検出（改行なしの表も含む）
  const tableRegex = /比較表：([^\n]+)\n\n((?:\|[^\n]*\n?)+)/gs
  const tableMatches = [...content.matchAll(tableRegex)]
  
  const configs: DiagramConfig[] = []
  
  // 図解の処理
  diagramMatches.forEach(match => {
    const title = match[1].trim()
    const description = match[2].trim()
    
    let type: DiagramConfig['type'] = 'flow'
    if (description.includes('従来') && description.includes('比較')) {
      type = 'comparison'
    } else if (description.includes('→') || description.includes('ステップ')) {
      type = 'process'
    } else if (description.includes('時系列') || description.includes('期間')) {
      type = 'timeline'
    }
    
    configs.push({
      title,
      description,
      type,
      startIndex: match.index!,
      endIndex: match.index! + match[0].length
    })
  })
  
  // 比較表の処理
  tableMatches.forEach(match => {
    const title = match[1].trim()
    const tableContent = match[2].trim()
    
    configs.push({
      title,
      description: tableContent,
      type: 'table',
      startIndex: match.index!,
      endIndex: match.index! + match[0].length
    })
  })
  
  return configs.sort((a, b) => a.startIndex - b.startIndex)
}

export async function generateDiagramSVG(config: DiagramConfig): Promise<string> {
  try {
    const response = await fetch('/api/diagram/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    
    if (!response.ok) throw new Error('図解生成に失敗しました')
    
    const { svg } = await response.json()
    return svg
  } catch (error) {
    console.error('図解生成エラー:', error)
    return generateFallbackDiagram(config)
  }
}

function generateFallbackDiagram(config: DiagramConfig): string {
  if (config.type === 'table') {
    return generateTableSVG(config)
  }
  
  // シンプルなフォールバック図解
  return `<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="300" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2" rx="8"/>
    <text x="300" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#495057">${config.title}</text>
    <foreignObject x="20" y="80" width="560" height="200">
      <div style="font-size: 14px; line-height: 1.5; color: #6c757d; padding: 20px;">
        ${config.description.replace(/\n/g, '<br>')}
      </div>
    </foreignObject>
  </svg>`
}

function generateTableSVG(config: DiagramConfig): string {
  const lines = config.description.split('\n').filter(line => line.trim() && line.includes('|'))
  
  if (lines.length < 2) {
    return `<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="200" fill="#ffffff" stroke="#e9ecef" stroke-width="2" rx="8"/>
      <text x="300" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">${config.title}</text>
      <text x="300" y="100" text-anchor="middle" font-size="14" fill="#ef4444">テーブル形式が正しくありません</text>
    </svg>`
  }
  
  const headerLine = lines[0]
  const dataLines = lines.slice(1).filter(line => !line.match(/^[\s\-\|]+$/)) // セパレータ行を除外
  
  // ヘッダーの解析
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h)
  const colCount = headers.length
  const rowCount = dataLines.length + 1 // ヘッダー行含む
  
  const cellWidth = Math.max(180, Math.min(250, 800 / colCount))
  const cellHeight = 40
  const totalWidth = cellWidth * colCount + 40
  const totalHeight = cellHeight * rowCount + 80
  
  let svg = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${totalWidth}" height="${totalHeight}" fill="#ffffff" stroke="#e9ecef" stroke-width="2" rx="8"/>
    <text x="${totalWidth/2}" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">${config.title}</text>`
  
  // ヘッダー行
  headers.forEach((header, colIndex) => {
    const x = 20 + colIndex * cellWidth
    const y = 50
    const headerText = header.length > 15 ? header.substring(0, 12) + '...' : header
    svg += `
      <rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="#3b82f6" stroke="#2563eb" stroke-width="1"/>
      <text x="${x + cellWidth/2}" y="${y + cellHeight/2 + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="white">${headerText}</text>`
  })
  
  // データ行
  dataLines.forEach((line, rowIndex) => {
    const cells = line.split('|').map(c => c.trim()).filter(c => c)
    cells.forEach((cell, colIndex) => {
      if (colIndex < colCount) {
        const x = 20 + colIndex * cellWidth
        const y = 50 + (rowIndex + 1) * cellHeight
        const fillColor = rowIndex % 2 === 0 ? '#f8f9fa' : '#ffffff'
        const cellText = cell.length > 20 ? cell.substring(0, 17) + '...' : cell
        svg += `
          <rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="${fillColor}" stroke="#e9ecef" stroke-width="1"/>
          <text x="${x + cellWidth/2}" y="${y + cellHeight/2 + 5}" text-anchor="middle" font-size="11" fill="#374151">${cellText}</text>`
      }
    })
  })
  
  svg += '</svg>'
  return svg
}

export function processContentWithDiagrams(content: string): string {
  const configs = extractDiagramConfigs(content)
  let processedContent = content
  let offset = 0
  
  configs.forEach((config, index) => {
    const placeholder = `<div data-diagram-id="${index}" class="diagram-placeholder"></div>`
    const startIndex = config.startIndex + offset
    const endIndex = config.endIndex + offset
    
    processedContent = processedContent.slice(0, startIndex) + placeholder + processedContent.slice(endIndex)
    offset += placeholder.length - (endIndex - startIndex)
  })
  
  return processedContent
}