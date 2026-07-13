// reCAPTCHA v3 サーバー検証（フォーム/ツール共通）。
// トークンが無い/秘密鍵が無い/ネットワーク失敗時は "skip"（ツールを固く止めない）。
// 検証できて score < 0.5 のときだけ "fail"。

export type RecaptchaResult = "ok" | "skip" | "fail"

export async function verifyRecaptcha(
  token: unknown,
  minScore = 0.5
): Promise<RecaptchaResult> {
  if (!token || typeof token !== "string") return "skip"
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return "skip"
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    })
    const data = await res.json()
    if (!data?.success) return "fail"
    if (typeof data.score === "number" && data.score < minScore) return "fail"
    return "ok"
  } catch {
    return "skip"
  }
}
