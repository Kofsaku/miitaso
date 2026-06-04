import crypto from "crypto"

const LINE_API = "https://api.line.me/v2/bot/message"

/**
 * LINE Webhookの署名検証（X-Line-Signature）。
 * 生のリクエストボディに対して HMAC-SHA256(channelSecret) を計算し、base64で比較する。
 * ※ 必ず JSON.parse 前の「生ボディ文字列」で検証すること。
 */
export function verifyLineSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET
  if (!secret || !signature) return false
  const hash = crypto.createHmac("sha256", secret).update(rawBody).digest("base64")
  const a = Buffer.from(hash)
  const b = Buffer.from(signature)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export type LineMessage = { type: "text"; text: string }

export function textMessage(text: string): LineMessage {
  return { type: "text", text }
}

async function send(endpoint: "reply" | "push", payload: object): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set")
  const res = await fetch(`${LINE_API}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`LINE ${endpoint} failed: ${res.status} ${body}`)
  }
}

/** 受信直後の即時返信（reply tokenは数十秒で失効するので、調査を待たせず即ackに使う） */
export async function replyMessage(replyToken: string, messages: LineMessage[]): Promise<void> {
  await send("reply", { replyToken, messages })
}

/** 任意のタイミングで送る（調査完了通知は reply ではなくこちら） */
export async function pushMessage(to: string, messages: LineMessage[]): Promise<void> {
  await send("push", { to, messages })
}
