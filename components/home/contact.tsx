"use client"

import { useEffect, useRef, useState } from "react"
import { Toaster, toast } from "sonner"
import { Send, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Glow } from "@/components/corporate/backgrounds"
import { Section, SectionHeading } from "@/components/corporate/section"

const inputClass =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-0"

const textareaClass =
  "rounded-lg border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-0"

/**
 * お問い合わせフォーム。
 * 送信ロジック（/api/contact + reCAPTCHA + sonner toast）は
 * 既存 components/sections/contact.tsx から無変更で移植。見た目のみダーク。
 */
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  // 送信完了でセクション全体が差し替わるため、完了見出しへフォーカスを移す
  // （スクリーンリーダー/キーボード利用者が成功を確実に検知できるように）
  useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus()
    }
  }, [isSubmitted])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (typeof window === "undefined" || !(window as any).grecaptcha) {
          reject(new Error("reCAPTCHAが読み込まれていません"))
          return
        }
        ;(window as any).grecaptcha.ready(() => {
          ;(window as any).grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
              action: "contact_form",
            })
            .then(resolve)
            .catch(reject)
        })
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "lp_contact",
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "送信に失敗しました")
      }

      setIsSubmitted(true)
      toast.success("お問い合わせを受け付けました")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "送信に失敗しました"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" theme="dark" />
      {isSubmitted ? (
        <Section
          id="contact"
          variant="alt"
          className="scroll-mt-16"
          decoration={<Glow className="-top-24 left-1/2 -translate-x-1/2" />}
        >
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-2xl font-bold tracking-tight text-white focus:outline-none"
            >
              お問い合わせありがとうございます
            </h2>
            <p className="mt-4 leading-relaxed text-slate-400">
              内容を確認の上、2営業日以内にご連絡いたします。
            </p>
          </div>
        </Section>
      ) : (
        <Section
          id="contact"
          variant="alt"
          className="scroll-mt-16"
          decoration={<Glow className="-top-24 left-1/2 -translate-x-1/2" />}
        >
          <SectionHeading
            label="CONTACT"
            title="お問い合わせ"
            lead="AI導入のご相談、アプリ開発のご依頼、新規事業のご相談など、お気軽にお問い合わせください。相談は無料です。"
            align="center"
          />

          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                お名前 <span className="text-rose-400">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                メールアドレス <span className="text-rose-400">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-300">
                ご相談内容 <span className="text-rose-400">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="ご相談内容をお書きください"
                rows={5}
                required
                className={textareaClass}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                "送信中..."
              ) : (
                <>
                  送信する
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              このサイトはreCAPTCHAによって保護されています。
            </p>
          </form>
        </Section>
      )}
    </>
  )
}
