import { getCaseStudyById } from "@/app/data/case-studies"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/case-studies" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                事例一覧に戻る
              </Link>
            </Button>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{caseStudy.category}</span>
                  <span>•</span>
                  <span>{caseStudy.serviceType}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-muted-foreground">{caseStudy.description}</p>
              </div>

              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.content }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 