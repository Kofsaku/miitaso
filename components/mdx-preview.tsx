'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'

interface MDXPreviewProps {
  content: string
}

// プレビューでは実際の表示と同じようにTailwind proseクラスに任せる

export function MDXPreview({ content }: MDXPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="h-full w-full border rounded-md p-4 flex items-center justify-center text-gray-500">
        プレビューエリア - MDXコンテンツを入力してください
      </div>
    )
  }

  return (
    <div className="h-full w-full border rounded-md p-2 overflow-y-auto prose prose-gray prose-sm max-w-none dark:prose-invert prose-h1:hidden">
      <Suspense fallback={<div>読み込み中...</div>}>
        <MDXRemote source={content} />
      </Suspense>
    </div>
  )
}