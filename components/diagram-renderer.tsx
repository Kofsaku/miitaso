'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { extractDiagramConfigs, generateDiagramSVG, processContentWithDiagrams } from '@/lib/diagram-generator'
import { CustomTable, parseMarkdownTable } from './custom-table'

interface DiagramRendererProps {
  content: string
}

interface DiagramData {
  id: string
  svg: string
  title: string
}

export function DiagramRenderer({ content }: DiagramRendererProps) {
  // 図解機能は無効化 - 何も処理しない
  return null
}

// MDXコンテンツに図解プレースホルダーを挿入するコンポーネント
export function ProcessedMDXContent({ children, content }: { children: React.ReactNode, content: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const timer = setTimeout(() => {
      const proseContainer = document.querySelector('.prose')
      if (!proseContainer) return
      
      // まず通常のマークダウンテーブルを処理
      const tableData = parseMarkdownTable(content)
      if (tableData) {
        // テーブルのマークアップを探して置換
        const walker = document.createTreeWalker(
          proseContainer,
          NodeFilter.SHOW_TEXT,
          null
        )
        
        const textNodes: Text[] = []
        let node
        while (node = walker.nextNode()) {
          textNodes.push(node as Text)
        }
        
        for (const textNode of textNodes) {
          const text = textNode.textContent || ''
          if (text.includes('|') && (text.includes('項目') || text.includes('MVP'))) {
            // テーブル用のコンテナを作成
            const tableContainer = document.createElement('div')
            tableContainer.className = 'table-container my-6'
            
            // テキストを削除してテーブルを挿入
            textNode.textContent = ''
            textNode.parentNode?.insertBefore(tableContainer, textNode.nextSibling)
            
            // シンプルなテーブルHTML
            tableContainer.innerHTML = `
              <div class="my-6 w-full max-w-none">
                ${tableData.title ? `<h3 class="text-lg font-semibold mb-4 text-center text-gray-800">${tableData.title}</h3>` : ''}
                <div class="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr class="bg-gray-50 border-b border-gray-200">
                        ${tableData.headers.map((header, index) => `<th class="py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0" style="padding-left: ${index === 0 ? '24px' : '16px'}; padding-right: 16px;">${header}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      ${tableData.rows.map((row, rowIndex) => `
                        <tr class="hover:bg-gray-50 transition-colors">
                          ${row.map((cell, cellIndex) => `<td class="py-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0" style="padding-left: ${cellIndex === 0 ? '24px' : '16px'}; padding-right: 16px;">${cell}</td>`).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `
            break
          }
        }
      }
      
      // 図解機能は無効化 - 通常のテキストとして表示
    }, 200) // MDXのレンダリングを待つ
    
    return () => clearTimeout(timer)
  }, [content, mounted])

  return <>{children}</>
}