"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Loader2, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react"
import { ToolMarkdown } from "./tool-markdown"

type Citation = { title: string; url: string }
type Check = { id: string; label: string; status: "pass" | "warn" | "fail"; detail: string }

type SecurityResult = {
  url: string
  grade: string
  counts: { pass: number; warn: number; fail: number }
  checks: Check[]
  summary: string
}

export type ToolFormProps = {
  endpoint: string
  inputName: "idea" | "url"
  inputType: "textarea" | "url"
  placeholder: string
  buttonLabel: string
  loadingLabel: string
  resultType: "markdown" | "security"
  maxLength: number
  recaptchaAction: string
  samples?: string[]
  /** 結果の上に出す注意書き（任意） */
  note?: string
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (key: string, opts: { action: string }) => Promise<string>
    }
  }
}

async function getRecaptchaToken(action: string): Promise<string | undefined> {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!key || typeof window === "undefined" || !window.grecaptcha) return undefined
  try {
    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window.grecaptcha!.execute(key, { action }).then(resolve).catch(reject)
      })
    })
  } catch {
    return undefined
  }
}

export function ToolForm(props: ToolFormProps) {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [markdown, setMarkdown] = useState("")
  const [citations, setCitations] = useState<Citation[]>([])
  const [security, setSecurity] = useState<SecurityResult | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = value.trim()
    if (!input) {
      setError(props.inputName === "url" ? "URLを入力してください。" : "内容を入力してください。")
      return
    }
    setLoading(true)
    setError("")
    setMarkdown("")
    setCitations([])
    setSecurity(null)
    try {
      const recaptchaToken = await getRecaptchaToken(props.recaptchaAction)
      const res = await fetch(props.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [props.inputName]: input, recaptchaToken }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || "エラーが発生しました。時間をおいて再度お試しください。")
        return
      }
      if (props.resultType === "security") {
        setSecurity(data as SecurityResult)
      } else {
        setMarkdown(data.report || "")
        setCitations(Array.isArray(data.citations) ? data.citations : [])
      }
    } catch {
      setError("通信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setLoading(false)
    }
  }

  const hasResult = markdown || security

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#050a18]/70 p-6 backdrop-blur md:p-8">
        {props.inputType === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, props.maxLength))}
            placeholder={props.placeholder}
            rows={4}
            className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] p-4 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          />
        ) : (
          <input
            type="text"
            inputMode="url"
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, props.maxLength))}
            placeholder={props.placeholder}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          />
        )}

        {props.samples && props.samples.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="py-1 text-xs text-slate-500">例：</span>
            {props.samples.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue(s)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400 transition hover:border-sky-400/40 hover:text-sky-300"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-slate-500">
            {value.length}/{props.maxLength}
          </span>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-gray-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {props.loadingLabel}
              </>
            ) : (
              props.buttonLabel
            )}
          </button>
        </div>
        {props.note && <p className="mt-4 text-xs leading-relaxed text-slate-500">{props.note}</p>}
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {loading && !hasResult && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#050a18]/50 px-6 py-8 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
          <span>{props.loadingLabel}（数十秒かかることがあります）</span>
        </div>
      )}

      {security && <SecurityResultView data={security} />}

      {markdown && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#050a18]/70 p-6 backdrop-blur md:p-8">
          <ToolMarkdown>{markdown}</ToolMarkdown>
          {citations.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                参照した情報源
              </p>
              <ul className="space-y-1">
                {citations.map((c) => (
                  <li key={c.url} className="truncate text-sm">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {hasResult && <ResultCta />}
    </div>
  )
}

function SecurityResultView({ data }: { data: SecurityResult }) {
  const gradeColor =
    data.grade === "A"
      ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
      : data.grade === "B"
        ? "text-sky-400 border-sky-400/30 bg-sky-400/10"
        : data.grade === "C"
          ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
          : "text-rose-400 border-rose-400/30 bg-rose-400/10"

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#050a18]/70 p-6 backdrop-blur md:p-8">
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl font-bold ${gradeColor}`}>
          {data.grade}
        </div>
        <div>
          <p className="truncate text-sm text-slate-400">{data.url}</p>
          <p className="mt-1 text-sm text-slate-300">
            <span className="text-emerald-400">{data.counts.pass} 良好</span>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-amber-400">{data.counts.warn} 要改善</span>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-rose-400">{data.counts.fail} 要対応</span>
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5">
        {data.checks.map((c) => (
          <li key={c.id} className="flex items-start gap-3">
            <StatusIcon status={c.status} />
            <div>
              <p className="text-sm font-medium text-white">{c.label}</p>
              <p className="text-sm text-slate-400">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {data.summary && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <ToolMarkdown>{data.summary}</ToolMarkdown>
        </div>
      )}
    </div>
  )
}

function StatusIcon({ status }: { status: "pass" | "warn" | "fail" }) {
  if (status === "pass") return <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
  if (status === "warn") return <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
  return <ShieldX className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
}

function ResultCta() {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-sky-400/20 bg-gradient-to-r from-sky-400/[0.07] to-violet-500/[0.07] p-6 sm:flex-row sm:items-center">
      <div>
        <p className="font-semibold text-white">この結果をもとに、次の一手を一緒に考えませんか？</p>
        <p className="mt-1 text-sm text-slate-400">
          ここから先——「何を作らないか」「一番大きいリスクをどう確かめるか」の設計が私たちの仕事です。
        </p>
      </div>
      <Link
        href="/#contact"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
      >
        無料で相談する
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}
