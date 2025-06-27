'use client'

interface TableProps {
  headers: string[]
  rows: string[][]
  title?: string
}

export function CustomTable({ headers, rows, title }: TableProps) {
  return (
    <div className="my-6 w-full max-w-none">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
          {title}
        </h3>
      )}
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, index) => (
                <th 
                  key={index}
                  className="py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                  style={{ 
                    paddingLeft: index === 0 ? '24px' : '16px',
                    paddingRight: '16px'
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="py-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0"
                    style={{ 
                      paddingLeft: cellIndex === 0 ? '24px' : '16px',
                      paddingRight: '16px'
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function parseMarkdownTable(content: string): { headers: string[], rows: string[][], title?: string } | null {
  // 比較表の形式を検出
  const tableMatch = content.match(/比較表：([^\n]+)\n\n((?:\|[^\n]*\n?)+)/s)
  
  if (tableMatch) {
    const title = tableMatch[1].trim()
    const tableContent = tableMatch[2].trim()
    
    const lines = tableContent.split('\n').filter(line => line.trim() && line.includes('|'))
    
    if (lines.length < 2) return null
    
    const headerLine = lines[0]
    const dataLines = lines.slice(1).filter(line => !line.match(/^[\s\-\|]+$/)) // セパレータ行を除外
    
    const headers = headerLine.split('|').map(h => h.trim()).filter(h => h)
    const rows = dataLines.map(line => 
      line.split('|').map(c => c.trim()).filter(c => c).slice(0, headers.length)
    )
    
    return { headers, rows, title }
  }
  
  // 通常のマークダウンテーブルを検出
  const lines = content.split('\n').filter(line => line.trim() && line.includes('|'))
  
  if (lines.length < 2) return null
  
  const headerLine = lines[0]
  const dataLines = lines.slice(1).filter(line => !line.match(/^[\s\-\|]+$/))
  
  if (dataLines.length === 0) return null
  
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h)
  const rows = dataLines.map(line => 
    line.split('|').map(c => c.trim()).filter(c => c).slice(0, headers.length)
  )
  
  return { headers, rows }
}