"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Settings,
  Globe,
  Users,
  Mail,
  Shield,
  Database,
  Save,
} from "lucide-react"
import { toast } from "sonner"

export default function BlogSettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    blogTitle: "Miitaso Blog",
    blogDescription: "技術、デザイン、ビジネスに関する最新の知見と洞察を共有します。",
    blogUrl: "https://miitaso.com/blog",
    postsPerPage: "6",
    defaultCategory: "技術",
    
    // Author Settings
    authorName: "Miitaso Team",
    authorEmail: "blog@miitaso.com",
    authorBio: "プロダクト開発に関する知見を共有するチームです。",
    
    // Features
    enableComments: true,
    enableSocialShare: true,
    enableNewsletter: true,
    enableRss: true,
    
    // SEO Settings
    metaKeywords: "技術, デザイン, プロダクト開発, Next.js, TypeScript",
    googleAnalytics: "",
    googleSearchConsole: "",
    
    // Email Settings
    emailNotifications: true,
    emailDigest: "weekly",
  })

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    try {
      console.log("Saving settings:", settings)
      toast.success("設定を保存しました")
    } catch (error) {
      toast.error("設定の保存中にエラーが発生しました")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ブログ設定</h1>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              基本設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blogTitle">ブログタイトル</Label>
              <Input
                id="blogTitle"
                value={settings.blogTitle}
                onChange={(e) => handleInputChange("blogTitle", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="blogDescription">ブログ説明</Label>
              <Textarea
                id="blogDescription"
                value={settings.blogDescription}
                onChange={(e) => handleInputChange("blogDescription", e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="blogUrl">ブログURL</Label>
              <Input
                id="blogUrl"
                value={settings.blogUrl}
                onChange={(e) => handleInputChange("blogUrl", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postsPerPage">1ページあたりの記事数</Label>
                <Select
                  value={settings.postsPerPage}
                  onValueChange={(value) => handleInputChange("postsPerPage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultCategory">デフォルトカテゴリー</Label>
                <Select
                  value={settings.defaultCategory}
                  onValueChange={(value) => handleInputChange("defaultCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="技術">技術</SelectItem>
                    <SelectItem value="デザイン">デザイン</SelectItem>
                    <SelectItem value="プロダクト開発">プロダクト開発</SelectItem>
                    <SelectItem value="ビジネス">ビジネス</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Author Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              著者設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">著者名</Label>
              <Input
                id="authorName"
                value={settings.authorName}
                onChange={(e) => handleInputChange("authorName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="authorEmail">著者メール</Label>
              <Input
                id="authorEmail"
                type="email"
                value={settings.authorEmail}
                onChange={(e) => handleInputChange("authorEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="authorBio">著者プロフィール</Label>
              <Textarea
                id="authorBio"
                value={settings.authorBio}
                onChange={(e) => handleInputChange("authorBio", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              機能設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>コメント機能</Label>
                <p className="text-sm text-muted-foreground">
                  記事へのコメントを有効にする
                </p>
              </div>
              <Switch
                checked={settings.enableComments}
                onCheckedChange={(checked) => handleInputChange("enableComments", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ソーシャルシェア</Label>
                <p className="text-sm text-muted-foreground">
                  SNSシェアボタンを表示する
                </p>
              </div>
              <Switch
                checked={settings.enableSocialShare}
                onCheckedChange={(checked) => handleInputChange("enableSocialShare", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ニュースレター</Label>
                <p className="text-sm text-muted-foreground">
                  メールマガジン登録を有効にする
                </p>
              </div>
              <Switch
                checked={settings.enableNewsletter}
                onCheckedChange={(checked) => handleInputChange("enableNewsletter", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>RSSフィード</Label>
                <p className="text-sm text-muted-foreground">
                  RSSフィードを生成する
                </p>
              </div>
              <Switch
                checked={settings.enableRss}
                onCheckedChange={(checked) => handleInputChange("enableRss", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              SEO設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">メタキーワード</Label>
              <Input
                id="metaKeywords"
                value={settings.metaKeywords}
                onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                placeholder="キーワードをカンマ区切りで入力"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
              <Input
                id="googleAnalytics"
                value={settings.googleAnalytics}
                onChange={(e) => handleInputChange("googleAnalytics", e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="googleSearchConsole">Google Search Console</Label>
              <Input
                id="googleSearchConsole"
                value={settings.googleSearchConsole}
                onChange={(e) => handleInputChange("googleSearchConsole", e.target.value)}
                placeholder="verification code"
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              メール通知設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>メール通知</Label>
                <p className="text-sm text-muted-foreground">
                  新しいコメントやお問い合わせの通知を受け取る
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="emailDigest">ダイジェスト配信頻度</Label>
              <Select
                value={settings.emailDigest}
                onValueChange={(value) => handleInputChange("emailDigest", value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">毎日</SelectItem>
                  <SelectItem value="weekly">毎週</SelectItem>
                  <SelectItem value="monthly">毎月</SelectItem>
                  <SelectItem value="never">なし</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}