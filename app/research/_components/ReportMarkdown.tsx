"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import "highlight.js/styles/github-dark.css"

// research レポート用の自己完結 Markdown 表示。
// app/internal 配下（git管理外）に依存しないようにする。
export function ReportMarkdown({ source }: { source: string }) {
  return (
    <article className="prose prose-invert prose-zinc max-w-none prose-headings:scroll-mt-24 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-table:text-sm prose-code:before:hidden prose-code:after:hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          a({ href, children, ...rest }) {
            const isExternal = href?.startsWith("http")
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...rest}
              >
                {children}
              </a>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 rounded border border-zinc-800">
                <table className="w-full">{children}</table>
              </div>
            )
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
