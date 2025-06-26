'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { List, ChevronRight } from 'lucide-react'

interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // マークダウンから見出しを抽出
    const extractHeadings = () => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      const extractedHeadings: HeadingItem[] = []
      let match

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim()

        extractedHeadings.push({
          id,
          text,
          level
        })
      }

      setHeadings(extractedHeadings)
    }

    if (content) {
      extractHeadings()
    }
  }, [content])

  useEffect(() => {
    // 見出し要素にIDを設定し、スクロール位置を監視
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    )

    // 見出し要素を監視対象に追加
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  useEffect(() => {
    // 見出し要素にIDを設定
    const addIdsToHeadings = () => {
      headings.forEach((heading) => {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        elements.forEach((element) => {
          const elementText = element.textContent?.trim()
          if (elementText === heading.text) {
            element.id = heading.id
            element.classList.add('scroll-mt-24')
          }
        })
      })
    }

    // 初回実行を早めに
    addIdsToHeadings()
    
    // DOM要素が準備されるまで複数回試行
    const timeout = setTimeout(addIdsToHeadings, 100)
    const intervals = [300, 500].map(delay => 
      setTimeout(addIdsToHeadings, delay)
    )
    
    return () => {
      clearTimeout(timeout)
      intervals.forEach(clearTimeout)
    }
  }, [headings])

  const scrollToHeading = (id: string) => {
    console.log('Scrolling to:', id)
    const element = document.getElementById(id)
    console.log('Found element:', element)
    
    if (element) {
      const yOffset = -100 // ヘッダーの高さ分のオフセット
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      console.log('Scrolling to position:', y)
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    } else {
      // 要素が見つからない場合は再試行
      console.log('Element not found, retrying...')
      setTimeout(() => {
        const retryElement = document.getElementById(id)
        if (retryElement) {
          const yOffset = -100
          const y = retryElement.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          })
        }
      }, 500)
    }
    setIsOpen(false)
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* モバイル用トグルボタン */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            目次
          </div>
          <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </Button>
        {isOpen && (
          <Card className="mt-2">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left py-1 px-2 rounded text-sm hover:bg-muted transition-colors ${
                      activeId === heading.id ? 'bg-muted font-medium' : ''
                    }`}
                    style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        )}
      </div>

      {/* デスクトップ用固定目次 */}
      <div className="hidden md:block">
        <Card className="sticky top-24">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <List className="h-4 w-4 mr-2" />
              目次
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <nav className="space-y-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`block w-full text-left py-1 px-2 rounded text-sm hover:bg-muted transition-colors ${
                    activeId === heading.id ? 'bg-muted font-medium text-primary' : 'text-foreground'
                  }`}
                  style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </>
  )
}