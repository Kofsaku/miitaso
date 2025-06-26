"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Save,
  Eye,
  Send,
  Calendar,
  Tag,
  FileText,
  ArrowLeft,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const mockPosts = {
  "1": {
    title: "Next.js 14の新機能と活用方法",
    description: "Next.js 14で導入された新機能について、実践的な活用方法を解説します。",
    content: `# Next.js 14の新機能と活用方法

Next.js 14では、多くの新機能が導入されました。その中でも特に注目すべき機能について解説します。

## Server Actions
Server Actionsは、クライアントサイドから直接サーバーサイドの関数を呼び出すことができる新機能です。
これにより、APIルートを作成することなく、サーバーサイドの処理を実行できます。

## Partial Prerendering
Partial Prerenderingは、ページの一部を静的に、一部を動的にレンダリングできる機能です。
これにより、パフォーマンスと動的コンテンツの両立が可能になります。

## Metadata APIの強化
Metadata APIが強化され、より柔軟なメタデータの管理が可能になりました。
動的なメタデータの生成もサポートされています。`,
    category: "技術",
    tags: "Next.js, React, Web開発",
    status: "published",
    publishDate: "2024-04-01",
  },
  "2": {
    title: "TypeScriptで型安全な開発を実現する方法",
    description: "TypeScriptの型システムを活用して、より安全なコードを書くためのテクニックを紹介します。",
    content: `# TypeScriptで型安全な開発を実現する方法

TypeScriptの型システムを活用することで、より安全なコードを書くことができます。

## 型の活用
TypeScriptの型システムを最大限に活用することで、実行時エラーを防ぐことができます。
特に、ユニオン型やインターフェースを効果的に使用することで、コードの安全性が向上します。

## ジェネリックの活用
ジェネリックを使用することで、より柔軟で再利用可能なコードを書くことができます。
型パラメータを活用することで、型安全性を保ちながら汎用的なコードを実装できます。`,
    category: "技術",
    tags: "TypeScript, JavaScript, 型安全",
    status: "published",
    publishDate: "2024-03-15",
  },
  "3": {
    title: "モダンなUIデザインのトレンド2024",
    description: "2024年に注目すべきUIデザインのトレンドと、実践的なデザイン手法を解説します。",
    content: `# モダンなUIデザインのトレンド2024

2024年のUIデザインのトレンドについて解説します。

## ミニマリズム
シンプルでクリーンなデザインが主流となっています。
余白を効果的に使用し、ユーザーの集中力を高めることが重要です。

## ダークモード
ダークモードは、ユーザーの目への負担を軽減し、バッテリー消費を抑えることができます。
適切なコントラストと色の選択が重要です。`,
    category: "デザイン",
    tags: "UI, UX, デザイン, トレンド",
    status: "draft",
    publishDate: "2024-03-01",
  },
  "4": {
    title: "アイデアが思いつかない人へ。実は○○を見るだけで解決！",
    description: "プロダクト開発のアイデアが思いつかない方へ。日常の「不満」に注目することで、自然とアイデアが生まれる方法を解説します。",
    content: `# アイデアが思いつかない人へ。実は○○を見るだけで解決！

こんにちは、「0からプロダクト開発」の津端です！
このブログでは、初心者でもゼロからアプリなどのプロダクトを作れるようになるためのステップを、わかりやすく・実践的にお届けしていきます。

## はじめに

「何か作ってみたいけど、いいアイデアが浮かばない…」という悩みを持つ方のために、
実は、ある一つのことに注意することができると自然がアイデアが見つかるようになるんです。`,
    category: "プロダクト開発",
    tags: "アイデア, プロダクト開発, 起業",
    status: "published",
    publishDate: "2024-04-15",
  },
}

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
    publishDate: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = () => {
      const post = mockPosts[params.id as keyof typeof mockPosts]
      if (post) {
        setFormData(post)
      }
      setLoading(false)
    }

    loadPost()
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (status: string) => {
    try {
      const updatedData = { ...formData, status }
      console.log("Updating post:", updatedData)
      
      if (status === "published") {
        toast.success("記事を公開しました")
      } else {
        toast.success("変更を保存しました")
      }
      
      setTimeout(() => {
        router.push("/admin/blog/posts")
      }, 1000)
    } catch (error) {
      toast.error("保存中にエラーが発生しました")
    }
  }

  const handleDelete = async () => {
    if (confirm("この記事を削除してもよろしいですか？")) {
      try {
        console.log("Deleting post:", params.id)
        toast.success("記事を削除しました")
        router.push("/admin/blog/posts")
      } catch (error) {
        toast.error("削除中にエラーが発生しました")
      }
    }
  }

  const handlePreview = () => {
    window.open(`/blog/${params.id}`, "_blank")
  }

  if (loading) {
    return <div className="flex justify-center py-12">読み込み中...</div>
  }

  if (!mockPosts[params.id as keyof typeof mockPosts]) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
        <Button asChild>
          <Link href="/admin/blog/posts">記事一覧に戻る</Link>
        </Button>
      </div>
    )
  }

  const previewContent = formData.content || "プレビューするコンテンツがありません。"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/blog/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              記事一覧に戻る
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">記事編集</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="mr-2 h-4 w-4" />
            下書き保存
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            プレビュー
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            削除
          </Button>
          <Button onClick={() => handleSave("published")}>
            <Send className="mr-2 h-4 w-4" />
            公開
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                記事内容
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">タイトル *</Label>
                <Input
                  id="title"
                  placeholder="記事のタイトルを入力してください"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  placeholder="記事の簡単な説明を入力してください"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Content Editor with Preview */}
              <div className="space-y-2">
                <Label>コンテンツ *</Label>
                <Tabs defaultValue="editor" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">エディター</TabsTrigger>
                    <TabsTrigger value="preview">プレビュー</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" className="mt-4">
                    <Textarea
                      placeholder="記事の内容をMarkdownで入力してください..."
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="min-h-[400px] font-mono"
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-4">
                    <div className="min-h-[400px] rounded-md border p-4 prose prose-sm max-w-none dark:prose-invert">
                      {previewContent.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                公開設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="published">公開</SelectItem>
                    <SelectItem value="scheduled">予約投稿</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="publishDate">公開日時</Label>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => handleInputChange("publishDate", e.target.value)}
                  />
                </div>
              )}

              <Separator />

              <div className="flex justify-center">
                <Badge variant={formData.status === "published" ? "default" : "secondary"}>
                  {formData.status === "draft" && "下書き"}
                  {formData.status === "published" && "公開済み"}
                  {formData.status === "scheduled" && "予約投稿"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Category and Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                カテゴリーとタグ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="技術">技術</SelectItem>
                    <SelectItem value="デザイン">デザイン</SelectItem>
                    <SelectItem value="プロダクト開発">プロダクト開発</SelectItem>
                    <SelectItem value="ビジネス">ビジネス</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">タグ</Label>
                <Input
                  id="tags"
                  placeholder="タグをカンマ区切りで入力"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  例: React, TypeScript, Next.js
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Post Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                記事情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>公開日:</span>
                <span>{formData.publishDate}</span>
              </div>
              <div className="flex justify-between">
                <span>文字数:</span>
                <span>{formData.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span>予想読了時間:</span>
                <span>{Math.max(1, Math.ceil(formData.content.length / 400))}分</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}