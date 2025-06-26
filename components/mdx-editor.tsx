'use client'

import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Image, Upload } from 'lucide-react'

interface MDXEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MDXEditor({ value, onChange, placeholder }: MDXEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          const imageMarkdown = `\n![${file.name}](${result.url})\n`
          
          const newValue = value.substring(0, start) + imageMarkdown + value.substring(end)
          onChange(newValue)
          
          // カーソル位置を調整
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length
            textarea.focus()
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

  if (!mounted) {
    return (
      <div className="h-full w-full border rounded-md">
        <div className="h-full w-full p-4 text-muted-foreground">
          エディターを読み込み中...
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full border rounded-md flex flex-col">
      {/* ツールバー */}
      <div className="border-b p-2 flex items-center gap-2">
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
        <span className="text-xs text-muted-foreground">
          画像をドラッグ&ドロップまたはクリックして挿入
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
      
      {/* エディタ */}
      <div className="flex-1 overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          placeholder={placeholder || 'ここにMarkdownを入力してください...\n\n画像を挿入するには「画像を挿入」ボタンをクリックするか、画像ファイルをここにドラッグ&ドロップしてください。'}
          className="w-full h-full border-0 resize-none focus:ring-0 font-mono text-sm"
        />
      </div>
    </div>
  )
}