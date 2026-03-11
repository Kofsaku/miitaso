import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sql = getDb()

    const time = body.time || new Date().toISOString()
    const ip = body.ip || request.headers.get("x-forwarded-for") || "unknown"
    const ua = body.ua || request.headers.get("user-agent") || ""
    const url = body.url || ""

    await sql`INSERT INTO access_logs (access_time, ip, user_agent, url) VALUES (${time}, ${ip}, ${ua}, ${url})`

    return NextResponse.json({ status: "ok" }, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  } catch {
    return NextResponse.json({ status: "error" }, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
