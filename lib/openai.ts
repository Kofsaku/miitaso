// OpenAI Chat Completions の薄いラッパー（SDK非依存・fetchのみ）。
// webSearch=true で検索対応モデルを使い、本文＋出典アノテーションを返す。

export type Citation = { title: string; url: string }
export type ChatResult = { text: string; citations: Citation[] }

type ChatOpts = {
  user: string
  system?: string
  model?: string
  /** trueで gpt-4o-mini-search-preview（Web検索付き）を既定に */
  webSearch?: boolean
  maxTokens?: number
  timeoutMs?: number
}

export async function chat(opts: ChatOpts): Promise<ChatResult> {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error("OPENAI_API_KEY is not set")

  const model =
    opts.model ?? (opts.webSearch ? "gpt-4o-mini-search-preview" : "gpt-4o-mini")

  const messages = [
    ...(opts.system ? [{ role: "system", content: opts.system }] : []),
    { role: "user", content: opts.user },
  ]

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 55000)
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      // 検索モデルは temperature 非対応のため送らない
      body: JSON.stringify({ model, messages, max_tokens: opts.maxTokens ?? 1200 }),
      signal: controller.signal,
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`openai_${res.status}: ${body.slice(0, 300)}`)
    }
    const data = await res.json()
    const msg = data?.choices?.[0]?.message
    const text: string = typeof msg?.content === "string" ? msg.content : ""
    const citations = extractCitations(msg?.annotations)
    return { text, citations }
  } finally {
    clearTimeout(timer)
  }
}

function extractCitations(annotations: unknown): Citation[] {
  if (!Array.isArray(annotations)) return []
  const out: Citation[] = []
  const seen = new Set<string>()
  for (const a of annotations) {
    const uc = (a as { url_citation?: { url?: string; title?: string } })?.url_citation ??
      (a as { url?: string; title?: string })
    const url = uc?.url
    if (!url || seen.has(url)) continue
    seen.add(url)
    out.push({ title: uc?.title || safeHost(url), url })
  }
  return out.slice(0, 12)
}

function safeHost(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
