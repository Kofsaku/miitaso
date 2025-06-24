"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react"
import Link from "next/link"

export default function BlogPreviewPage() {
  const [previewData, setPreviewData] = useState({
    title: "プレビュー記事",
    description: "これはプレビュー用のサンプル記事です。",
    content: "プレビューするコンテンツがありません。",
    category: "技術",
    date: new Date().toLocaleDateString("ja-JP"),
    readTime: "5分",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("blog-preview-data")
    if (savedData) {
      const data = JSON.parse(savedData)
      setPreviewData({
        ...data,
        date: data.date || new Date().toLocaleDateString("ja-JP"),
        readTime: Math.max(1, Math.ceil(data.content?.length / 400)) + "分",
      })
    }
  }, [])

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-medium mt-4 mb-2">
            {line.substring(4)}
          </h3>
        )
      } else if (line.trim() === "") {
        return <br key={index} />
      } else {
        return (
          <p key={index} className="mb-4 leading-7">
            {line}
          </p>
        )
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 px-4 md:px-6 lg:px-8">
          {/* Preview Header */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">
                  プレビューモード
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => window.close()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  エディターに戻る
                </Button>
                <Button size="sm" onClick={() => window.print()}>
                  印刷
                </Button>
              </div>
            </div>
          </div>

          {/* Article Preview */}
          <article className="mx-auto max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {previewData.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{previewData.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{previewData.readTime}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                {previewData.title || "タイトルがありません"}
              </h1>
              {previewData.description && (
                <p className="text-lg text-muted-foreground leading-7">
                  {previewData.description}
                </p>
              )}
            </div>
            
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {formatContent(previewData.content)}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}