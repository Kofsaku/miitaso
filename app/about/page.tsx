import React from "react"
import { Metadata } from "next"
import { Header } from "@/components/header"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Building2, Users, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "会社概要 - miitaso",
  description: "miitasoの会社概要。私たちのミッション、ビジョン、チームについてご紹介します。",
  alternates: {
    canonical: 'https://miitaso.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  会社概要
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  革新的なプロダクト開発で、あなたのビジョンを現実に
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">私たちについて</h2>
                <p className="text-muted-foreground md:text-xl">
                  miitasoは、革新的なプロダクト開発を専門とする会社です。私たちは最先端の技術とデザインを駆使して、クライアントのビジョンを現実のプロダクトへと変換します。
                </p>
                <p className="text-muted-foreground md:text-xl">
                  2022年の設立以来、様々な業界のクライアントと協力し、ユーザー中心の革新的なソリューションを提供してきました。私たちのチームは、経験豊富な開発者、デザイナー、プロダクトマネージャーで構成されており、クライアントのニーズに合わせた最適なソリューションを提供します。
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/we.png?height=400&width=600"
                  width={400}
                  height={267}
                  alt="Company Office"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">ミッション</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  テクノロジーの力で、ビジネスと社会に革新をもたらす
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
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
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">信頼性</h3>
                <p className="text-sm text-muted-foreground">
                  クライアントとの信頼関係を最も重視し、約束を守り、期待を超える成果を提供します。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
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
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">革新</h3>
                <p className="text-sm text-muted-foreground">
                  常に最新の技術とトレンドを取り入れ、革新的なソリューションを提供します。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
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
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">協働</h3>
                <p className="text-sm text-muted-foreground">
                  クライアントとの密接な協力関係を築き、共に成功を目指します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">創業者挨拶</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  テクノロジーの力で、より良い社会を創造する
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-5xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <Image
                    src="/tsubata.png?height=400&width=300"
                    width={300}
                    height={400}
                    alt="津端晃作"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-2xl font-bold">代表取締役 津端晃作</h3>
                  <p className="text-muted-foreground">
                    私たちmiitasoは、テクノロジーの力で社会に革新をもたらすことを使命として設立されました。
                    デジタル化が進む現代において、企業や組織が直面する課題は複雑化しています。
                    私たちは、最新の技術と豊富な経験を活かし、お客様のビジネスを次のステージへと導きます。
                  </p>
                  <p className="text-muted-foreground">
                    創業以来、多くの企業様と共に歩み、デジタル変革を実現してまいりました。
                    これからも、お客様の成功を第一に考え、最高のサービスを提供し続けてまいります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">会社概要</h2>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">会社名</th>
                      <td className="py-4 px-6">株式会社miitaso</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">事業内容</th>
                      <td className="py-4 px-6">ソフトウェア開発、新規事業コンサルティング</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">所在地</th>
                      <td className="py-4 px-6">東京都中央区銀座1丁目12番4号N&E BLD.6F</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">設立</th>
                      <td className="py-4 px-6">2024年12月</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">代表者</th>
                      <td className="py-4 px-6">津端晃作</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">スタッフ数</th>
                      <td className="py-4 px-6">10名（業務委託を含む）</td>
                    </tr>
                    <tr>
                      <th className="py-4 px-6 text-left bg-muted/50 font-semibold">運営サービス</th>
                      <td className="py-4 px-6">多数</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
