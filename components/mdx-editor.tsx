'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Image, Upload, Table2, Plus } from 'lucide-react'

interface MDXEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MDXEditor({ value, onChange, placeholder }: MDXEditorProps) {
  const [uploading, setUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        // カーソル位置に画像を挿入
        const textarea = textareaRef.current
        if (textarea) {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          // 元のファイル名を使用してalt textを設定
          const altText = result.originalName || file.name
          const imageMarkdown = `\n![${altText}](${result.url})\n`
          
          const newValue = value.substring(0, start) + imageMarkdown + value.substring(end)
          onChange(newValue)
          
          // カーソル位置を調整
          setTimeout(() => {
            if (textarea) {
              textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length
              textarea.focus()
            }
          }, 0)
        }
      } else {
        alert('画像のアップロードに失敗しました: ' + result.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('画像のアップロードに失敗しました')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 画像ファイルかチェック
      if (file.type.startsWith('image/')) {
        handleImageUpload(file)
      } else {
        alert('画像ファイルを選択してください')
      }
    }
    // ファイル選択をリセット
    event.target.value = ''
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleImageUpload(imageFile)
    } else {
      alert('画像ファイルをドロップしてください')
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const insertTableTemplate = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      const tableTemplate = `
比較表：タイトル名

| 項目 | カラム1 | カラム2 |
|------|---------|---------|
| 行1 | データ1 | データ2 |
| 行2 | データ3 | データ4 |
| 行3 | データ5 | データ6 |

`
      
      const newValue = value.substring(0, start) + tableTemplate + value.substring(end)
      onChange(newValue)
      
      // カーソル位置を調整
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + tableTemplate.length
          textarea.focus()
        }
      }, 0)
    }
  }

  const insertSimpleTable = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      const simpleTable = `
| ヘッダー1 | ヘッダー2 | ヘッダー3 |
|-----------|-----------|-----------|
| データ1   | データ2   | データ3   |
| データ4   | データ5   | データ6   |

`
      
      const newValue = value.substring(0, start) + simpleTable + value.substring(end)
      onChange(newValue)
      
      // カーソル位置を調整
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + simpleTable.length
          textarea.focus()
        }
      }, 0)
    }
  }

  return (
    <div className="w-full">
      {/* ツールバー */}
      <div className="border-b p-2 flex items-center gap-2 flex-wrap border border-gray-200 rounded-t-md bg-gray-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Upload className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Image className="h-4 w-4 mr-2" />
          )}
          {uploading ? 'アップロード中...' : '画像を挿入'}
        </Button>
        
        <div className="h-4 w-px bg-gray-300" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={insertTableTemplate}
          title="比較表を挿入"
        >
          <Table2 className="h-4 w-4 mr-2" />
          比較表
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={insertSimpleTable}
          title="シンプルなテーブルを挿入"
        >
          <Plus className="h-4 w-4 mr-2" />
          テーブル
        </Button>
        
        <span className="text-xs text-muted-foreground">
          画像をドラッグ&ドロップまたはクリックして挿入 | テーブルボタンでマークダウン表を簡単作成
        </span>
      </div>
      
      {/* 隠れたファイル入力 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* エディタ - 標準のtextarea要素を使用 */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        placeholder={placeholder || 'ここにMarkdownを入力してください...\n\n画像を挿入するには「画像を挿入」ボタンをクリックするか、画像ファイルをここにドラッグ&ドロップしてください。'}
        className="w-full border border-gray-200 rounded-b-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm p-4"
        style={{ 
          minHeight: '500px',
          height: 'auto',
          fieldSizing: 'content'
        } as React.CSSProperties}
      />
    </div>
  )
}