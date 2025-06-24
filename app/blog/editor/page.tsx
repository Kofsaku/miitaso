'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { MDXEditor } from '@/components/mdx-editor'
import { MDXPreview } from '@/components/mdx-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Eye, Edit, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

const defaultContent = `# ブログ記事のタイトル

## はじめに

ここにブログ記事の内容を書いてください。MDXを使用しているため、マークダウン記法とReactコンポーネントを組み合わせることができます。

## 見出し2

### 見出し3

段落テキストの例です。**太字**や*斜体*、\`インラインコード\`なども使用できます。

- リストアイテム1
- リストアイテム2
- リストアイテム3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

> 引用文の例です。
> 複数行の引用も可能です。

\`\`\`javascript
// コードブロックの例
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## まとめ

MDXエディタの使用例でした。左側で編集して、右側でプレビューを確認できます。
`

export default function BlogEditor() {
  const router = useRouter()
  const [content, setContent] = useState(defaultContent)
  const [title, setTitle] = useState('新しいブログ記事')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('editor')
  const [saving, setSaving] = useState(false)

  // タイトルからスラッグを自動生成する関数
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  // タイトルが変更されたときにスラッグを自動生成
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!slug) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('タイトルと内容を入力してください')
      return
    }
    
    if (!slug.trim()) {
      alert('URLスラッグを入力してください')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || content.slice(0, 200) + '...',
          status: 'PUBLISHED',
          categoryName: category || '未分類',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert('記事を保存しました')
        router.push(`/blog/${data.slug}`)
      } else {
        const error = await response.json()
        alert(error.message || '保存に失敗しました')
      }
    } catch (error) {
      console.error('保存エラー:', error)
      alert('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ブログ一覧に戻る
                </Link>
              </Button>
              <h1 className="text-xl font-semibold">MDXエディタ</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? '保存中...' : '保存'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>記事情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="ブログ記事のタイトルを入力"
                />
              </div>
              <div>
                <Label htmlFor="slug">URLスラッグ</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-slug"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  英数字とハイフンのみ使用可能（例: my-awesome-post）
                </p>
              </div>
              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="カテゴリ名を入力（省略可）"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">記事の概要</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="記事の概要を入力（省略可：自動生成されます）"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Layout */}
        <div className="hidden md:block h-[calc(100vh-300px)]">
          <ResizablePanelGroup direction="horizontal" className="h-full border rounded-lg">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  エディタ
                </h3>
                <MDXEditor value={content} onChange={setContent} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  プレビュー
                </h3>
                <MDXPreview content={content} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor" className="flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                エディタ
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                プレビュー
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="h-[calc(100vh-400px)]">
              <MDXEditor value={content} onChange={setContent} />
            </TabsContent>
            <TabsContent value="preview" className="h-[calc(100vh-400px)]">
              <MDXPreview content={content} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}