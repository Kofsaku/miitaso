"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 md:py-28 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              お問い合わせありがとうございます
            </h2>
            <p className="text-slate-600">
              内容を確認の上、2営業日以内にご連絡いたします。
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-600 font-medium mb-2">CONTACT</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            お問い合わせ
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            新規事業のご相談、アプリ開発のご依頼など、お気軽にお問い合わせください。
            <br />
            相談は無料です。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              お名前 <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="山田 太郎"
              required
              className="bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              ご相談内容 <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ご相談内容をお書きください"
              rows={5}
              required
              className="bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? (
              "送信中..."
            ) : (
              <>
                送信する
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            このサイトはreCAPTCHAによって保護されています。
          </p>
        </form>
      </div>
    </section>
  )
}
