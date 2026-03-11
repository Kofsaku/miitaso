"use client"

import { useState, useCallback, useEffect } from "react"

type LogEntry = {
  id: number
  access_time: string
  ip: string
  user_agent: string
  url: string
  created_at: string
}

type LogResponse = {
  logs: LogEntry[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [data, setData] = useState<LogResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const getStoredPassword = () => {
    try { return sessionStorage.getItem("admin_pwd") || "" } catch { return "" }
  }

  const fetchLogs = useCallback(
    async (page: number, pwd?: string) => {
      const usePwd = pwd || password || getStoredPassword()
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`/api/admin/logs?page=${page}`, {
          headers: { "x-admin-password": usePwd },
        })
        if (!res.ok) {
          if (res.status === 401) {
            setAuthenticated(false)
            sessionStorage.removeItem("admin_pwd")
            setError("パスワードが正しくありません")
            return
          }
          throw new Error("Failed to fetch logs")
        }
        const json = await res.json()
        setData(json)
        setCurrentPage(page)
        setAuthenticated(true)
        setPassword(usePwd)
        sessionStorage.setItem("admin_pwd", usePwd)
      } catch {
        setError("ログの取得に失敗しました")
      } finally {
        setLoading(false)
      }
    },
    [password]
  )

  useEffect(() => {
    const stored = getStoredPassword()
    if (stored) {
      setPassword(stored)
      fetchLogs(0, stored)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLogs(0, password)
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <form onSubmit={handleLogin} style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "320px" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", marginBottom: "1rem", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "0.5rem", background: "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {loading ? "読み込み中..." : "ログイン"}
          </button>
          {error && <p style={{ color: "red", marginTop: "0.5rem", fontSize: "0.875rem" }}>{error}</p>}
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Access Logs</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => fetchLogs(currentPage)}
            disabled={loading}
            style={{ padding: "0.5rem 1rem", background: "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {loading ? "更新中..." : "更新"}
          </button>
          <button
            onClick={() => { setAuthenticated(false); setData(null); setPassword(""); sessionStorage.removeItem("admin_pwd") }}
            style={{ padding: "0.5rem 1rem", background: "#999", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            ログアウト
          </button>
        </div>
      </div>

      {data && (
        <>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            合計: {data.total}件 | ページ: {data.page + 1} / {data.totalPages || 1}
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left", whiteSpace: "nowrap" }}>受信日時</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left", whiteSpace: "nowrap" }}>アクセス日時</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left", whiteSpace: "nowrap" }}>IPアドレス</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left" }}>URL</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left" }}>User Agent</th>
                </tr>
              </thead>
              <tbody>
                {data.logs.map((log, i) => (
                  <tr key={log.id || i} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={{ padding: "0.5rem", border: "1px solid #ddd", whiteSpace: "nowrap" }}>{log.created_at}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ddd", whiteSpace: "nowrap" }}>{log.access_time}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ddd", whiteSpace: "nowrap" }}>{log.ip}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ddd", wordBreak: "break-all" }}>{log.url}</td>
                    <td style={{ padding: "0.5rem", border: "1px solid #ddd", wordBreak: "break-all", maxWidth: "300px" }}>{log.user_agent}</td>
                  </tr>
                ))}
                {data.logs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>ログがありません</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
            <button
              onClick={() => fetchLogs(currentPage - 1)}
              disabled={currentPage === 0 || loading}
              style={{ padding: "0.5rem 1rem", border: "1px solid #ddd", borderRadius: "4px", cursor: currentPage === 0 ? "default" : "pointer", opacity: currentPage === 0 ? 0.5 : 1 }}
            >
              前へ
            </button>
            <button
              onClick={() => fetchLogs(currentPage + 1)}
              disabled={currentPage >= data.totalPages - 1 || loading}
              style={{ padding: "0.5rem 1rem", border: "1px solid #ddd", borderRadius: "4px", cursor: currentPage >= data.totalPages - 1 ? "default" : "pointer", opacity: currentPage >= data.totalPages - 1 ? 0.5 : 1 }}
            >
              次へ
            </button>
          </div>
        </>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  )
}
