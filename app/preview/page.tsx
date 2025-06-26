'use client'

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, FileText, Download } from "lucide-react"

const previewResources = [
  {
    title: "DX戦略診断書",
    description: "20ページ相当の包括的なDX戦略ガイド",
    format: "HTML",
    url: "/api/resources/files/dx-strategy-assessment.html",
    features: [
      "エグゼクティブサマリー",
      "5段階成熟度診断",
      "業界比較・競合分析", 
      "ROI予測と投資効果分析",
      "実装ロードマップ",
      "組織変革ガイド"
    ]
  },
  {
    title: "MVP開発チェックリスト",
    description: "86項目の詳細なプロジェクト管理チェックリスト",
    format: "HTML (インタラクティブ)",
    url: "/api/resources/files/mvp-development-checklist.html",
    features: [
      "15フェーズに分けた体系的アプローチ",
      "市場調査からスケールアップまで",
      "担当者・期限・ステータス管理",
      "重要度と所要時間の設定",
      "実際のプロジェクトで使用可能",
      "Excel/Googleスプレッドシート対応"
    ]
  }
]

export default function PreviewPage() {
  const handlePreview = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  リソースプレビュー
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  実際のリソース内容を確認できます。
                  <br />
                  ブラウザで直接プレビューするか、ダウンロードしてご利用ください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* プレビューセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {previewResources.map((resource, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{resource.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">形式: {resource.format}</p>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">主な内容：</h4>
                      <ul className="space-y-1">
                        {resource.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => handlePreview(resource.url)}
                          variant="default"
                          className="w-full"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          プレビュー
                        </Button>
                        <Button
                          onClick={() => handleDownload(resource.url, resource.title)}
                          variant="outline"
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          ダウンロード
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        ※ プレビューで内容を確認してからダウンロードできます
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 直接リンク */}
        <section className="w-full py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">直接アクセス用URL</h2>
              <p className="text-muted-foreground">開発・テスト用の直接リンクです</p>
              <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DX戦略診断書</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-sm bg-gray-100 p-2 rounded block mb-2">
                      /api/resources/files/dx-strategy-assessment.html
                    </code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePreview('/api/resources/files/dx-strategy-assessment.html')}
                    >
                      直接アクセス
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">MVP開発チェックリスト</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="text-sm bg-gray-100 p-2 rounded block mb-2">
                      /api/resources/files/mvp-development-checklist.html
                    </code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePreview('/api/resources/files/mvp-development-checklist.html')}
                    >
                      直接アクセス
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}