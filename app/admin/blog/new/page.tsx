"use client"

import { useState } from "react"
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
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
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
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewPostPage() {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (status: string) => {
    try {
      const updatedData = { ...formData, status }
      console.log("Saving post:", updatedData)
      
      if (status === "published") {
        toast.success("記事を公開しました")
      } else {
        toast.success("下書きを保存しました")
      }
      
      setTimeout(() => {
        router.push("/admin/blog/posts")
      }, 1000)
    } catch (error) {
      toast.error("保存中にエラーが発生しました")
    }
  }

  const handlePreview = () => {
    window.open("/blog/preview", "_blank")
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
          <h1 className="text-3xl font-bold">新規記事作成</h1>
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
                <span>作成日:</span>
                <span>{new Date().toLocaleDateString("ja-JP")}</span>
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