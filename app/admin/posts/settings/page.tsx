"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Settings, Globe, Eye, FileText } from "lucide-react"

interface BlogSettings {
  siteName: string
  siteDescription: string
  postsPerPage: number
  enableComments: boolean
  enableLikes: boolean
  enableBookmarks: boolean
  metaTitle: string
  metaDescription: string
  enableSEO: boolean
}

export default function PostSettings() {
  const [settings, setSettings] = useState<BlogSettings>({
    siteName: "Miitaso Blog",
    siteDescription: "最新の技術情報をお届けするブログ",
    postsPerPage: 10,
    enableComments: true,
    enableLikes: true,
    enableBookmarks: true,
    metaTitle: "Miitaso Blog - 技術ブログ",
    metaDescription: "最新の技術情報と開発ノウハウをお届けするブログです",
    enableSEO: true,
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('設定の保存に失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (key: keyof BlogSettings, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">設定</h1>
          <p className="text-muted-foreground mt-1">ブログの基本設定を管理します</p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "保存中..." : saved ? "保存完了" : "設定を保存"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* 基本設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              基本設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">サイト名</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="サイト名を入力"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siteDescription">サイト説明</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                placeholder="サイトの説明を入力"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="postsPerPage">1ページあたりの記事数</Label>
              <Input
                id="postsPerPage"
                type="number"
                min="1"
                max="50"
                value={settings.postsPerPage}
                onChange={(e) => handleInputChange('postsPerPage', parseInt(e.target.value) || 10)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 機能設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              機能設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>コメント機能</Label>
                <p className="text-sm text-muted-foreground">
                  記事にコメントを投稿できるようにします
                </p>
              </div>
              <Switch
                checked={settings.enableComments}
                onCheckedChange={(checked) => handleInputChange('enableComments', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>いいね機能</Label>
                <p className="text-sm text-muted-foreground">
                  記事にいいねを付けられるようにします
                </p>
              </div>
              <Switch
                checked={settings.enableLikes}
                onCheckedChange={(checked) => handleInputChange('enableLikes', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ブックマーク機能</Label>
                <p className="text-sm text-muted-foreground">
                  記事をブックマークできるようにします
                </p>
              </div>
              <Switch
                checked={settings.enableBookmarks}
                onCheckedChange={(checked) => handleInputChange('enableBookmarks', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-0.5">
                <Label>SEO機能を有効にする</Label>
                <p className="text-sm text-muted-foreground">
                  サイトマップやメタタグを自動生成します
                </p>
              </div>
              <Switch
                checked={settings.enableSEO}
                onCheckedChange={(checked) => handleInputChange('enableSEO', checked)}
              />
            </div>
            
            {settings.enableSEO && (
              <>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="metaTitle">メタタイトル</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    placeholder="サイトのメタタイトルを入力"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="metaDescription">メタ説明</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    placeholder="サイトのメタ説明を入力"
                    rows={3}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 保存ボタン */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "保存中..." : saved ? "保存完了" : "設定を保存"}
          </Button>
        </div>
      </div>
    </div>
  )
}