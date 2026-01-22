'use client'

import { MDXRemote } from 'next-mdx-remote'
import { Suspense, memo, useMemo, useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'

interface MDXPreviewProps {
  content: string
}

// プレビューでは実際の表示と同じようにTailwind proseクラスに任せる

const MDXPreviewContent = memo(({ content }: { content: string }) => {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">読み込み中...</div>}>
      <MDXRemote 
        source={content} 
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </Suspense>
  )
})

MDXPreviewContent.displayName = 'MDXPreviewContent'

export const MDXPreview = memo(({ content }: MDXPreviewProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full w-full border rounded-md p-4 flex items-center justify-center text-gray-500">
        プレビューを読み込み中...
      </div>
    )
  }

  if (!content.trim()) {
    return (
      <div className="h-full w-full border rounded-md p-4 flex items-center justify-center text-gray-500">
        プレビューエリア - MDXコンテンツを入力してください
      </div>
    )
  }

  return (
    <div className="h-full w-full border rounded-md p-2 overflow-y-auto prose prose-gray prose-sm max-w-none dark:prose-invert prose-h1:hidden prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50 prose-th:text-left prose-th:font-semibold prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 dark:prose-th:border-gray-600 dark:prose-th:bg-gray-800 dark:prose-td:border-gray-600">
      <MDXPreviewContent content={content} />
    </div>
  )
})

MDXPreview.displayName = 'MDXPreview'