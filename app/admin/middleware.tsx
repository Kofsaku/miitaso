"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin?callbackUrl=/admin")
    } else if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
      router.push("/")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}