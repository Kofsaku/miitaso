import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cpu,
  Database,
  Globe,
  Lightbulb,
  MessageSquare,
  Rocket,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    アイデアを現実に変える
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    私たちは最先端の技術とデザインで、あなたのビジョンを革新的なプロダクトへと変換します。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="inline-flex items-center" asChild>
                    <Link href="/services">
                      サービスを見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">お問い合わせ</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">サービス</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">私たちのサービス</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  最先端の技術とデザインで、あなたのビジネスを次のレベルへ
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>プロダクト開発</CardTitle>
                  <CardDescription className="text-md mt-2">
                    アイデアから完成品まで、ユーザー中心の革新的なプロダクトを開発します。
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>ユーザー体験設計</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>フロントエンド・バックエンド開発</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>品質保証とテスト</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>MVP開発</CardTitle>
                  <CardDescription className="text-md mt-2">
                    最小限の機能で最大の価値を提供する製品を迅速に開発します。
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>迅速なプロトタイピング</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>市場検証</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>反復的な改善</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>コンサルティング</CardTitle>
                  <CardDescription className="text-md mt-2">
                    プロダクト戦略から技術選定まで、専門知識でビジネスをサポートします。
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>プロダクト戦略</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>技術スタック選定</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>開発プロセス最適化</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/services">サービスの詳細を見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">会社概要</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">私たちについて</h2>
                <p className="text-muted-foreground md:text-xl">
                  テックイノベーションは、革新的なプロダクト開発を専門とする会社です。私たちは最先端の技術とデザインを駆使して、クライアントのビジョンを現実のプロダクトへと変換します。
                </p>
                <p className="text-muted-foreground md:text-xl">
                  2022年以来、様々な業界のクライアントと協力し、ユーザー中心の革新的なソリューションを提供してきました。私たちのチームは、経験豊富な開発者、デザイナー、プロダクトマネージャーで構成されており、クライアントのニーズに合わせた最適なソリューションを提供します。
                </p>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/about">詳細を見る</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="About Image 1"
                      className="rounded-lg object-cover"
                    />
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="About Image 2"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="grid gap-4">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="About Image 3"
                      className="rounded-lg object-cover"
                    />
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="About Image 4"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">事例</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">成功事例</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが手がけた革新的なプロジェクトをご紹介します
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
              <Card>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Case Study 1"
                  className="w-full rounded-t-lg object-cover"
                />
                <CardHeader>
                  <CardTitle>フィンテックアプリ開発</CardTitle>
                  <CardDescription>
                    大手金融機関向けに、ユーザーフレンドリーなモバイルバンキングアプリを開発
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    最新のセキュリティ基準を満たしながら、直感的なユーザーインターフェースを実現。リリース後6ヶ月で50万ダウンロードを達成。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Case Study 2"
                  className="w-full rounded-t-lg object-cover"
                />
                <CardHeader>
                  <CardTitle>ヘルスケアプラットフォーム</CardTitle>
                  <CardDescription>医療機関と患者をつなぐオンライン予約・遠隔診療システムの構築</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    MVPから始め、ユーザーフィードバックを基に機能を拡張。現在100以上の医療機関が導入し、月間利用者数は10万人を超える。
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/case-studies">すべての事例を見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">技術スタック</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私たちが使用する最先端の技術
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">フロントエンド</h3>
                <p className="text-sm text-muted-foreground text-center">React, Vue, Next.js, TypeScript</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">バックエンド</h3>
                <p className="text-sm text-muted-foreground text-center">Node.js, Python, Go, GraphQL</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">クラウド</h3>
                <p className="text-sm text-muted-foreground text-center">AWS, GCP, Azure, Vercel</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">AI/ML</h3>
                <p className="text-sm text-muted-foreground text-center">TensorFlow, PyTorch, OpenAI</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">お問い合わせ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  プロジェクトについて相談する
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  新しいプロジェクトや既存のプロダクトの改善について、お気軽にご相談ください。私たちの専門家チームがあなたのビジョンを実現するお手伝いをします。
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>経験豊富な専門家チーム</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>迅速な開発プロセス</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <span>革新的なソリューション</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/contact">お問い合わせする</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>お問い合わせフォーム</CardTitle>
                    <CardDescription>
                      以下のフォームに必要事項をご記入ください。担当者が48時間以内にご連絡いたします。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            お名前
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="山田 太郎"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            会社名
                          </label>
                          <input
                            id="company"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="株式会社〇〇"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          メールアドレス
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="example@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          お問い合わせ内容
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="プロジェクトの詳細や目標などをお書きください"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        送信する
                      </Button>
                    </form>
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
