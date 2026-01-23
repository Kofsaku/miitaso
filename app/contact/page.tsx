'use client'

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import Head from "next/head"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // reCAPTCHA v3でトークン取得
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (typeof window === 'undefined' || !(window as any).grecaptcha) {
          reject(new Error('reCAPTCHAが読み込まれていません'))
          return
        }
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact_form' })
            .then(resolve)
            .catch(reject)
        })
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "送信に失敗しました")
      }

      toast.success("お問い合わせを受け付けました。担当者より3日以内にご連絡させていただきます。")
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "送信に失敗しました")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>お問い合わせ - miitaso</title>
        <meta name="description" content="miitasoへのお問い合わせページ。プロジェクトのご相談、お見積もり、その他のご質問をお気軽にお寄せください。" />
        <link rel="canonical" href="https://miitaso.com/contact" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Header />
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  お問い合わせ
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ご質問やご相談がございましたら、お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* コンタクトフォームセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  お問い合わせフォーム
                </h2>
                <p className="text-muted-foreground">
                  以下のフォームに必要事項をご記入の上、送信してください。
                  内容を確認の上、担当者よりご連絡させていただきます。
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        お名前
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田 太郎"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        会社名
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="株式会社〇〇"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        メールアドレス
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@company.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        電話番号
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03-1234-5678"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        ご相談内容
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">選択してください</option>
                        <option value="product">プロダクト開発</option>
                        <option value="mvp">MVP開発</option>
                        <option value="consulting">コンサルティング</option>
                        <option value="uiux">UI/UX作成・改善</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        お問い合わせ内容
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="お問い合わせ内容をご記入ください"
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "送信中..." : "無料相談を申し込む"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* 連絡先情報 */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>連絡先情報</CardTitle>
                    <CardDescription>
                      お電話やメールでのお問い合わせも承っております。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">電話番号</h3>
                        <p className="text-muted-foreground">03-1234-5678</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">メールアドレス</h3>
                        <p className="text-muted-foreground">info@miitaso.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">所在地</h3>
                        <p className="text-muted-foreground">
                          〒104-0061 東京都中央区銀座1丁目12番4号
                          <br />
                          N&E BLD.6F
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>営業時間</CardTitle>
                    <CardDescription>
                      平日のご相談を承っております。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">月曜日 - 金曜日</span>
                        <span className="font-medium">9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">土曜日・日曜日</span>
                        <span className="font-medium">休業</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">祝日</span>
                        <span className="font-medium">休業</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>
    </>
  )
} 