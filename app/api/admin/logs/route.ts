import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const password = request.headers.get("x-admin-password")

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const sql = getDb()
  const page = Number(request.nextUrl.searchParams.get("page") || "0")
  const perPage = 50
  const offset = page * perPage

  const logs = await sql`SELECT id, access_time, domain, created_at::text as created_at FROM access_logs ORDER BY created_at DESC LIMIT ${perPage} OFFSET ${offset}`
  const countResult = await sql`SELECT COUNT(*) as total FROM access_logs`
  const total = Number(countResult[0].total)

  return NextResponse.json({
    logs,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  })
}
