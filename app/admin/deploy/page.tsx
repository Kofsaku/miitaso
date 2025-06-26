"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Upload, 
  Download, 
  Rocket, 
  RefreshCw, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Database,
  Cloud,
  ArrowUpDown
} from "lucide-react"

interface DeployResult {
  success: boolean
  results?: {
    imported: number
    updated: number
    skipped: number
    errors: string[]
  }
  error?: string
}

export default function DeployPage() {
  const [deploying, setDeploying] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [lastResult, setLastResult] = useState<DeployResult | null>(null)
  const [productionUrl, setProductionUrl] = useState(process.env.NEXT_PUBLIC_PRODUCTION_URL || "https://www.miitaso.com")

  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await fetch('/api/blog/export')
      if (response.ok) {
        const data = await response.json()
        
        // JSONファイルとしてダウンロード
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `blog-export-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        setLastResult({
          success: true,
          results: {
            imported: 0,
            updated: 0,
            skipped: 0,
            errors: []
          }
        })
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: 'エクスポートに失敗しました'
      })
    } finally {
      setExporting(false)
    }
  }

  const handleImport = async (file: File) => {
    setImporting(true)
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      const response = await fetch('/api/blog/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()
        setLastResult(result)
      } else {
        setLastResult({
          success: false,
          error: 'インポートに失敗しました'
        })
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: 'ファイルの読み込みに失敗しました'
      })
    } finally {
      setImporting(false)
    }
  }

  const handleDeploy = async () => {
    if (!productionUrl) {
      alert('本番環境のURLを設定してください')
      return
    }
    
    setDeploying(true)
    try {
      // ローカルデータをエクスポート
      const exportResponse = await fetch('/api/blog/export')
      const exportData = await exportResponse.json()
      
      // 本番環境にインポート
      const importResponse = await fetch(`${productionUrl}/api/blog/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData),
      })
      
      if (importResponse.ok) {
        const result = await importResponse.json()
        setLastResult(result)
      } else {
        setLastResult({
          success: false,
          error: 'デプロイに失敗しました'
        })
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: 'デプロイに失敗しました'
      })
    } finally {
      setDeploying(false)
    }
  }

  const handleSyncFromProduction = async () => {
    if (!productionUrl) {
      alert('本番環境のURLを設定してください')
      return
    }
    
    setSyncing(true)
    try {
      // 本番環境からデータを取得
      const exportResponse = await fetch(`${productionUrl}/api/blog/export`)
      const exportData = await exportResponse.json()
      
      // ローカルにインポート
      const importResponse = await fetch('/api/blog/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData),
      })
      
      if (importResponse.ok) {
        const result = await importResponse.json()
        setLastResult(result)
      } else {
        setLastResult({
          success: false,
          error: '同期に失敗しました'
        })
      }
    } catch (error) {
      setLastResult({
        success: false,
        error: '同期に失敗しました'
      })
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">デプロイ・同期</h1>
        <p className="text-muted-foreground mt-1">ローカルと本番環境間でブログコンテンツを同期します</p>
      </div>

      {/* 設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productionUrl">本番環境URL</Label>
            <Input
              id="productionUrl"
              value={productionUrl}
              onChange={(e) => setProductionUrl(e.target.value)}
              placeholder="https://your-domain.vercel.app"
            />
          </div>
        </CardContent>
      </Card>

      {/* デプロイ・同期アクション */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              ローカル → 本番
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ローカルで作成したコンテンツを本番環境にデプロイします
            </p>
            <Button 
              onClick={handleDeploy} 
              disabled={deploying || !productionUrl}
              className="w-full"
            >
              {deploying ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Rocket className="mr-2 h-4 w-4" />
              )}
              {deploying ? 'デプロイ中...' : 'デプロイ開始'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              本番 → ローカル
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              本番環境のコンテンツをローカルに同期します
            </p>
            <Button 
              onClick={handleSyncFromProduction} 
              disabled={syncing || !productionUrl}
              variant="outline"
              className="w-full"
            >
              {syncing ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {syncing ? '同期中...' : '同期開始'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* マニュアル操作 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              エクスポート
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              現在のコンテンツをJSONファイルとしてダウンロードします
            </p>
            <Button 
              onClick={handleExport} 
              disabled={exporting}
              variant="outline"
              className="w-full"
            >
              {exporting ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {exporting ? 'エクスポート中...' : 'エクスポート'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              インポート
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              JSONファイルからコンテンツをインポートします
            </p>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImport(file)
                  }
                }}
                className="hidden"
                id="import-file"
              />
              <Button 
                onClick={() => document.getElementById('import-file')?.click()}
                disabled={importing}
                variant="outline"
                className="w-full"
              >
                {importing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {importing ? 'インポート中...' : 'ファイルを選択'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 結果表示 */}
      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {lastResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              実行結果
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastResult.success ? (
              <div className="space-y-2">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    操作が正常に完了しました
                  </AlertDescription>
                </Alert>
                {lastResult.results && (
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium text-green-800">新規作成</div>
                      <div className="text-green-600">{lastResult.results.imported}件</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium text-blue-800">更新</div>
                      <div className="text-blue-600">{lastResult.results.updated}件</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium text-gray-800">スキップ</div>
                      <div className="text-gray-600">{lastResult.results.skipped}件</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {lastResult.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}