'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'

interface MDXPreviewProps {
  content: string
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-medium mb-2" {...props} />,
  h5: (props: any) => <h5 className="text-base font-medium mb-2" {...props} />,
  h6: (props: any) => <h6 className="text-sm font-medium mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto mb-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
  ),
  img: (props: any) => (
    <img className="max-w-full h-auto rounded-md my-4" {...props} />
  ),
  hr: (props: any) => <hr className="border-gray-300 dark:border-gray-600 my-8" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-gray-300 dark:border-gray-600" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2" {...props} />
  ),
}

export function MDXPreview({ content }: MDXPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="h-full w-full border rounded-md p-4 flex items-center justify-center text-gray-500">
        プレビューエリア - MDXコンテンツを入力してください
      </div>
    )
  }

  return (
    <div className="h-full w-full border rounded-md p-4 overflow-y-auto prose prose-sm max-w-none dark:prose-invert">
      <Suspense fallback={<div>読み込み中...</div>}>
        <MDXRemote source={content} components={components} />
      </Suspense>
    </div>
  )
}