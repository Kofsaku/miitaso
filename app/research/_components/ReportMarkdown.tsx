"use client"

import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

// research レポート用の自己完結 Markdown 表示（Notion風・ライトテーマ）。
// @tailwindcss/typography(prose) には依存せず、素の Tailwind ユーティリティで
// 各要素を直接スタイリングする＝プラグイン登録の有無に関係なく確実に効く。
// （node は hast の内部ノードなので DOM に渡さないよう必ず除外する）
const components: Components = {
  h1: ({ node, className, children, ...props }) => (
    <h1
      {...props}
      className="mt-2 mb-6 text-2xl sm:text-[1.9rem] font-bold leading-snug tracking-tight text-zinc-900"
    >
      {children}
    </h1>
  ),
  h2: ({ node, className, children, ...props }) => (
    <h2
      {...props}
      className="mt-12 mb-4 scroll-mt-24 border-b border-zinc-200 pb-2 text-xl sm:text-2xl font-bold tracking-tight text-zinc-900"
    >
      {children}
    </h2>
  ),
  h3: ({ node, className, children, ...props }) => (
    <h3
      {...props}
      className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold text-zinc-900"
    >
      {children}
    </h3>
  ),
  h4: ({ node, className, children, ...props }) => (
    <h4 {...props} className="mt-6 mb-2 text-base font-semibold text-zinc-900">
      {children}
    </h4>
  ),
  p: ({ node, className, children, ...props }) => (
    <p {...props} className="my-4 text-base leading-[1.85] text-zinc-700">
      {children}
    </p>
  ),
  ul: ({ node, className, children, ...props }) => (
    <ul
      {...props}
      className="my-4 space-y-2 pl-6 list-disc marker:text-emerald-500"
    >
      {children}
    </ul>
  ),
  ol: ({ node, className, children, ...props }) => (
    <ol
      {...props}
      className="my-4 space-y-2 pl-6 list-decimal marker:font-semibold marker:text-emerald-600"
    >
      {children}
    </ol>
  ),
  li: ({ node, className, children, ...props }) => (
    <li
      {...props}
      className="pl-1 text-base leading-[1.8] text-zinc-700 [&>ol]:mt-2 [&>ul]:mt-2"
    >
      {children}
    </li>
  ),
  a: ({ node, className, href, children, ...props }) => {
    const external = href?.startsWith("http")
    return (
      <a
        {...props}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 transition-colors hover:text-emerald-800 hover:decoration-emerald-500 break-words"
      >
        {children}
      </a>
    )
  },
  strong: ({ node, className, children, ...props }) => (
    <strong {...props} className="font-semibold text-zinc-900">
      {children}
    </strong>
  ),
  em: ({ node, className, children, ...props }) => (
    <em {...props} className="italic text-zinc-700">
      {children}
    </em>
  ),
  blockquote: ({ node, className, children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 rounded-r-lg border-l-4 border-emerald-300 bg-emerald-50/60 px-5 py-3 text-zinc-700 [&>p]:my-0"
    >
      {children}
    </blockquote>
  ),
  hr: ({ node, className, ...props }) => (
    <hr {...props} className="my-10 border-zinc-200" />
  ),
  code: ({ node, className, children, ...props }) => {
    const isBlock = /\blanguage-/.test(className || "")
    if (isBlock) {
      // コードブロック: rehype-highlight の hljs クラスを保持（github.css が着色）
      return (
        <code {...props} className={`${className ?? ""} text-sm`}>
          {children}
        </code>
      )
    }
    // インラインコード
    return (
      <code
        {...props}
        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800"
      >
        {children}
      </code>
    )
  },
  pre: ({ node, className, children, ...props }) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed"
    >
      {children}
    </pre>
  ),
  table: ({ node, className, children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200">
      <table {...props} className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ node, className, children, ...props }) => (
    <thead {...props} className="bg-zinc-50">
      {children}
    </thead>
  ),
  th: ({ node, className, children, ...props }) => (
    <th
      {...props}
      className="border-b border-zinc-200 px-4 py-2.5 text-left align-top font-semibold text-zinc-700"
    >
      {children}
    </th>
  ),
  td: ({ node, className, children, ...props }) => (
    <td
      {...props}
      className="border-b border-zinc-100 px-4 py-2.5 align-top text-zinc-700"
    >
      {children}
    </td>
  ),
}

export function ReportMarkdown({ source }: { source: string }) {
  return (
    <div className="text-zinc-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
