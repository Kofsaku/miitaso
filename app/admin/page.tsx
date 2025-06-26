import { redirect } from "next/navigation"

export default function AdminPage() {
  // /admin から /admin/dashboard にリダイレクト
  redirect("/admin/dashboard")
}