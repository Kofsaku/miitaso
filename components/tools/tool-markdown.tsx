"use client"

import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkCjkFriendly from "remark-cjk-friendly"

// ツール結果用のダークテーマ Markdown 描画（prose非依存・素のTailwind）。
const components: Components = {
  h2: ({ node, ...props }) => (
    <h2
      {...props}
      className="mt-7 mb-3 border-l-2 border-sky-400/60 pl-3 text-lg font-semibold text-white first:mt-0"
    />
  ),
  h3: ({ node, ...props }) => (
    <h3 {...props} className="mt-5 mb-2 text-base font-semibold text-slate-100" />
  ),
  p: ({ node, ...props }) => (
    <p {...props} className="my-3 leading-relaxed text-slate-300" />
  ),
  ul: ({ node, ...props }) => (
    <ul {...props} className="my-3 space-y-1.5 pl-1" />
  ),
  ol: ({ node, ...props }) => (
    <ol {...props} className="my-3 list-decimal space-y-1.5 pl-5" />
  ),
  li: ({ node, children, ...props }) => (
    <li {...props} className="flex gap-2 text-slate-300">
      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70" />
      <span className="flex-1 leading-relaxed">{children}</span>
    </li>
  ),
  strong: ({ node, ...props }) => (
    <strong {...props} className="font-semibold text-white" />
  ),
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-400 underline underline-offset-2 hover:text-sky-300"
    />
  ),
  hr: ({ node, ...props }) => <hr {...props} className="my-6 border-white/10" />,
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="my-4 border-l-2 border-white/15 pl-4 text-slate-400" />
  ),
  code: ({ node, ...props }) => (
    <code {...props} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-sky-200" />
  ),
}

export function ToolMarkdown({ children }: { children: string }) {
  return (
    <div className="text-[15px]">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkCjkFriendly]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
