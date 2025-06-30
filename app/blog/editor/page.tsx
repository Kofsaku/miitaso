'use client'

import { useState, useEffect, Suspense, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { MDXEditor } from '@/components/mdx-editor'
import { MDXPreview } from '@/components/mdx-preview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Combobox } from '@/components/ui/combobox'
import { ArrowLeft, Save, Eye, Edit, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'

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

// 文字数統計コンポーネントを最適化
const ContentStats = ({ content }: { content: string }) => {
  const stats = useMemo(() => {
    const totalLength = content.length
    const withoutSpaces = content.replace(/\s+/g, '').length
    const readingTime = Math.ceil(withoutSpaces / 400)
    
    return {
      totalLength: totalLength.toLocaleString(),
      withoutSpaces: withoutSpaces.toLocaleString(),
      readingTime
    }
  }, [content])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">
          {stats.totalLength}
        </div>
        <div className="text-sm text-muted-foreground">総文字数</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">
          {stats.withoutSpaces}
        </div>
        <div className="text-sm text-muted-foreground">文字数（空白除く）</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {stats.readingTime}
        </div>
        <div className="text-sm text-muted-foreground">読了時間（分）</div>
      </div>
    </div>
  )
}

function BlogEditorComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')
  const [content, setContent] = useState(defaultContent)
  const [title, setTitle] = useState('新しいブログ記事')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState<{id: string, name: string}[]>([])
  const [availableTags, setAvailableTags] = useState<{id: string, name: string}[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('editor')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const isEditing = !!postId

  // タイトルからスラッグを自動生成する関数
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  // タイトルが変更されたときにスラッグを自動生成
  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle)
    if (!slug || (!isEditing && !slug)) {
      setSlug(generateSlug(newTitle))
    }
  }, [slug, isEditing])

  // カテゴリーとタグのデータを読み込む
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/blog/categories'),
          fetch('/api/blog/tags')
        ])
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setAvailableCategories(categoriesData.categories || [])
        }
        
        if (tagsRes.ok) {
          const tagsData = await tagsRes.json()
          setAvailableTags(tagsData || [])
        }
      } catch (error) {
        console.error('Error loading categories/tags:', error)
      }
    }
    
    fetchCategoriesAndTags()
  }, [])

  // 既存の投稿データを読み込む
  useEffect(() => {
    if (postId) {
      setLoading(true)
      fetch(`/api/blog/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            toast.error('投稿の読み込みに失敗しました')
            router.push('/blog/editor')
            return
          }
          setTitle(data.title || '')
          setSlug(data.slug || '')
          setContent(data.content || '')
          setExcerpt(data.excerpt || '')
          setStatus(data.status || 'DRAFT')
          // カテゴリとタグのIDを設定
          const categoryIds = data.categories?.map((c: any) => c.category?.id || c.categoryId) || []
          const tagIds = data.tags?.map((t: any) => t.tag?.id || t.tagId) || []
          setSelectedCategories(categoryIds)
          setSelectedTags(tagIds)
        })
        .catch(error => {
          console.error('Error loading post:', error)
          toast.error('投稿の読み込みに失敗しました')
          router.push('/blog/editor')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [postId, router])

  const handleSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('タイトルと内容を入力してください')
      return
    }
    
    if (!slug.trim()) {
      toast.error('URLスラッグを入力してください')
      return
    }

    setSaving(true)
    try {
      const url = isEditing ? `/api/blog/posts/${postId}` : '/api/blog/posts'
      const method = isEditing ? 'PUT' : 'POST'
      
      const requestData = {
        title,
        slug,
        content,
        excerpt: excerpt || content.slice(0, 200) + '...',
        status: status || 'PUBLISHED',
        categoryIds: selectedCategories,
        tagIds: selectedTags,
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(isEditing ? '記事を更新しました' : '記事を保存しました')
        router.push(`/blog/${data.slug}`)
      } else {
        const error = await response.json()
        toast.error(error.message || '保存に失敗しました')
      }
    } catch (error) {
      console.error('保存エラー:', error)
      toast.error('保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }, [title, content, slug, excerpt, status, selectedCategories, selectedTags, isEditing, postId, router])

  // 入力ハンドラを最適化
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  const handleSlugChange = useCallback((newSlug: string) => {
    setSlug(newSlug)
  }, [])

  const handleExcerptChange = useCallback((newExcerpt: string) => {
    setExcerpt(newExcerpt)
  }, [])

  const handleCategoryToggle = useCallback((categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }, [])

  const handleTagToggle = useCallback((tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }, [])

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus)
  }, [])

  const handleAddNewCategory = useCallback(async () => {
    if (!newCategoryName.trim()) return
    
    try {
      const response = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryName.trim(),
        }),
      })

      if (response.ok) {
        const newCategory = await response.json()
        setAvailableCategories(prev => [...prev, newCategory])
        setSelectedCategories(prev => [...prev, newCategory.id])
        setNewCategoryName('')
        toast.success('新しいカテゴリーを追加しました')
      } else {
        const error = await response.json()
        toast.error(error.message || 'カテゴリーの追加に失敗しました')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      toast.error('カテゴリーの追加に失敗しました')
    }
  }, [newCategoryName])

  // Enterキーでのフォーム送信を防ぐ
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>記事データを読み込み中...</span>
        </div>
      </div>
    )
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
              <h1 className="text-xl font-semibold">
                {isEditing ? 'ブログ記事編集' : 'ブログ記事作成'} - MDXエディタ
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={handleSave} disabled={saving || loading}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
{saving 
                  ? (isEditing ? '更新中...' : '保存中...') 
                  : (isEditing 
                    ? '更新' 
                    : (status === 'PUBLISHED' ? '公開' : '下書き保存')
                  )
                }
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
            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
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
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="url-slug"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  英数字とハイフンのみ使用可能（例: my-awesome-post）
                </p>
              </div>
              <div>
                <Label htmlFor="categories">カテゴリー</Label>
                <div className="space-y-4">
                  {/* 選択されたカテゴリーの表示 */}
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(categoryId => {
                      const category = availableCategories.find(c => c.id === categoryId)
                      return category ? (
                        <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                          {category.name}
                          <button 
                            type="button"
                            onClick={() => handleCategoryToggle(categoryId)}
                            className="ml-1 rounded-full hover:bg-gray-600 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                  
                  {/* 既存カテゴリーの選択 */}
                  <div>
                    <Label className="text-sm font-medium">既存のカテゴリーから選択</Label>
                    <Select onValueChange={handleCategoryToggle}>
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories
                          .filter(category => !selectedCategories.includes(category.id))
                          .map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* 新しいカテゴリーの作成 */}
                  <div>
                    <Label className="text-sm font-medium">新しいカテゴリーを作成</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        placeholder="カテゴリー名を入力..."
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddNewCategory()
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleAddNewCategory}
                        disabled={!newCategoryName.trim()}
                      >
                        作成して追加
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="tags">タグ</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tagId => {
                      const tag = availableTags.find(t => t.id === tagId)
                      return tag ? (
                        <Badge key={tagId} variant="outline" className="flex items-center gap-1">
                          {tag.name}
                          <button 
                            type="button"
                            onClick={() => handleTagToggle(tagId)}
                            className="ml-1 rounded-full hover:bg-gray-600 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                  <Select onValueChange={handleTagToggle}>
                    <SelectTrigger>
                      <SelectValue placeholder="タグを選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTags
                        .filter(tag => !selectedTags.includes(tag.id))
                        .map(tag => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="status">公開ステータス</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLISHED">公開</SelectItem>
                    <SelectItem value="DRAFT">下書き</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="excerpt">記事の概要</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => handleExcerptChange(e.target.value)}
                  placeholder="記事の概要を入力（省略可：自動生成されます）"
                  rows={3}
                />
              </div>
              <ContentStats content={content} />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Desktop Layout */}
        <div className="hidden md:block mb-8">
          <div className="border rounded-lg h-[calc(100vh-500px)] min-h-[500px] grid grid-cols-2 gap-0">
            <div className="border-r border-gray-200 h-full p-4 flex flex-col">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                エディタ
              </h3>
              <div className="flex-1 min-h-0">
                <MDXEditor value={content} onChange={handleContentChange} />
              </div>
            </div>
            <div className="h-full p-4 flex flex-col">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                プレビュー
              </h3>
              <div className="flex-1 min-h-0">
                <MDXPreview content={content} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mb-8">
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
            <TabsContent value="editor" className="min-h-[400px]">
              <MDXEditor value={content} onChange={handleContentChange} />
            </TabsContent>
            <TabsContent value="preview" className="min-h-[400px] overflow-auto">
              <MDXPreview content={content} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function BlogEditor() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span>読み込み中...</span>
        </div>
      </div>
    }>
      <BlogEditorComponent />
    </Suspense>
  )
}