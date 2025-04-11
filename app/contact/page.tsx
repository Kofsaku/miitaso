import React from "react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
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
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  お問い合わせフォーム
                </h2>
                <p className="text-muted-foreground">
                  以下のフォームに必要事項をご記入の上、送信してください。
                  内容を確認の上、担当者よりご連絡させていただきます。
                </p>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        お名前
                      </label>
                      <Input id="name" placeholder="山田 太郎" required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        会社名
                      </label>
                      <Input id="company" placeholder="株式会社〇〇" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        メールアドレス
                      </label>
                      <Input id="email" type="email" placeholder="example@company.com" required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        電話番号
                      </label>
                      <Input id="phone" type="tel" placeholder="03-1234-5678" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        ご相談内容
                      </label>
                      <select
                        id="service"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">選択してください</option>
                        <option value="product">プロダクト開発</option>
                        <option value="mvp">MVP開発</option>
                        <option value="consulting">コンサルティング</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        お問い合わせ内容
                      </label>
                      <Textarea
                        id="message"
                        placeholder="お問い合わせ内容をご記入ください"
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      送信する
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
                        <h3 className="font-medium">電話番号</h3>
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
                        <h3 className="font-medium">メールアドレス</h3>
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
                        <h3 className="font-medium">所在地</h3>
                        <p className="text-muted-foreground">
                          東京都渋谷区渋谷1-1-1
                          <br />
                          渋谷スクエアビル 5F
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
  )
} 