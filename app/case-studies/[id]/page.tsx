import { getCaseStudyById } from "@/app/data/case-studies"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, TrendingUp, Users, Lightbulb, CheckCircle2, Cpu, Rocket, Palette, BarChart3 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface CaseStudyPageProps {
  params: {
    id: string
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyById(parseInt(params.id))

  if (!caseStudy) {
    notFound()
  }

  const serviceIcons = {
    product: Cpu,
    mvp: Rocket,
    consulting: Lightbulb,
    design: Palette
  }
  const ServiceIcon = serviceIcons[caseStudy.serviceType] || TrendingUp

  // Extract sections from content
  const sections = caseStudy.content.split('<h2>').filter(Boolean)
  
  // Extract all metrics
  const allMetrics = caseStudy.content.match(/<strong>(.*?)<\/strong>/g)
    ?.map(m => m.replace(/<\/?strong>/g, ''))
    || []

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/case-studies" className="flex items-center gap-2 hover:gap-3 transition-all">
                <ArrowLeft className="h-4 w-4" />
                事例一覧に戻る
              </Link>
            </Button>

            <div className="space-y-12">
              {/* Hero Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl" />
                <div className="relative p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-background shadow-lg">
                        <ServiceIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{caseStudy.category}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{caseStudy.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{caseStudy.serviceType}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                    {caseStudy.title}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {caseStudy.description}
                  </p>
                </div>
              </div>

              {/* Key Metrics Highlight */}
              {allMetrics.length > 0 && (
                <Card className="p-8 bg-gradient-to-br from-background to-muted/30">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    主な成果指標
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allMetrics.slice(0, 6).map((metric, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-tight">{metric}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Content Sections */}
              <div className="space-y-12">
                {sections.map((section, index) => {
                  const [title, ...content] = section.split('</h2>')
                  if (!title || !content.length) return null
                  
                  const cleanTitle = title.trim()
                  const cleanContent = content.join('</h2>').trim()
                  
                  // Determine icon based on section title
                  let SectionIcon = Lightbulb
                  if (cleanTitle.includes('課題')) SectionIcon = TrendingUp
                  if (cleanTitle.includes('成果')) SectionIcon = BarChart3
                  if (cleanTitle.includes('ソリューション')) SectionIcon = Lightbulb
                  
                  return (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <SectionIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">{cleanTitle}</h2>
                      </div>
                      <div 
                        className="prose prose-lg max-w-none prose-headings:font-semibold prose-h3:text-xl prose-p:text-muted-foreground prose-ul:space-y-2 prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Call to Action */}
              <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">同様の課題をお持ちですか？</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    私たちは、お客様のビジネス課題に合わせた最適なソリューションをご提案いたします。
                    まずはお気軽にご相談ください。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        無料相談を予約する
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/services">
                        サービス詳細を見る
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}