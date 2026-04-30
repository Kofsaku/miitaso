"use client"

import { useState } from "react"

// ============================================================
// Dummy Data
// ============================================================

const accessData = [
  { time: "09:15", name: "田中 太郎", dept: "営業部", action: "入室", place: "会議室A", date: "2026-04-28" },
  { time: "09:32", name: "鈴木 花子", dept: "開発部", action: "退室", place: "5F執務室", date: "2026-04-28" },
  { time: "09:45", name: "佐藤 次郎", dept: "総務部", action: "入室", place: "3F応接室", date: "2026-04-28" },
  { time: "10:02", name: "山田 美咲", dept: "人事部", action: "入室", place: "会議室B", date: "2026-04-28" },
  { time: "10:18", name: "高橋 健一", dept: "営業部", action: "退室", place: "会議室A", date: "2026-04-28" },
  { time: "10:30", name: "渡辺 恵子", dept: "開発部", action: "入室", place: "4Fラボ", date: "2026-04-28" },
  { time: "10:45", name: "中村 大輔", dept: "経理部", action: "入室", place: "6F執務室", date: "2026-04-28" },
  { time: "11:00", name: "小林 由美", dept: "総務部", action: "退室", place: "3F応接室", date: "2026-04-28" },
  { time: "11:15", name: "加藤 翔太", dept: "開発部", action: "入室", place: "5F執務室", date: "2026-04-28" },
]

const inventoryData = [
  { code: "PRT-4520N", name: "京セラ TK-5281K トナー", cat: "印刷部材", qty: 2, reorder: 5, lastIn: "2026-04-15", warehouse: "本社倉庫", status: "不足" },
  { code: "SRV-DL380", name: "HPE ProLiant DL380 Gen11", cat: "サーバー", qty: 3, reorder: 2, lastIn: "2026-04-20", warehouse: "DC-東京", status: "正常" },
  { code: "SW-C9300L", name: "Cisco Catalyst 9300L-48P", cat: "NW機器", qty: 1, reorder: 3, lastIn: "2026-03-10", warehouse: "DC-東京", status: "不足" },
  { code: "UPS-SMT15", name: "APC Smart-UPS 1500VA", cat: "電源設備", qty: 8, reorder: 4, lastIn: "2026-04-22", warehouse: "DC-東京", status: "正常" },
  { code: "HDD-ST8000", name: "Seagate Exos 8TB 3.5inch", cat: "ストレージ", qty: 4, reorder: 10, lastIn: "2026-04-01", warehouse: "本社倉庫", status: "不足" },
  { code: "CAB-LC10M", name: "光ファイバ LC-LC 10m", cat: "配線部材", qty: 42, reorder: 20, lastIn: "2026-03-28", warehouse: "本社倉庫", status: "正常" },
  { code: "SFP-10GSR", name: "Cisco SFP-10G-SR", cat: "NW機器", qty: 3, reorder: 6, lastIn: "2026-04-18", warehouse: "DC-東京", status: "不足" },
  { code: "MEM-32GR", name: "Samsung 32GB DDR5 RDIMM", cat: "サーバー", qty: 12, reorder: 8, lastIn: "2026-04-05", warehouse: "DC-大阪", status: "正常" },
  { code: "FW-PA3260", name: "Palo Alto PA-3260", cat: "セキュリティ", qty: 1, reorder: 1, lastIn: "2026-04-10", warehouse: "DC-東京", status: "正常" },
]

// ============================================================
// Before: Access Control (Legacy Style)
// ============================================================

function AccessBefore() {
  return (
    <div style={{
      fontFamily: "'MS Gothic', 'MS PGothic', 'Meiryo', monospace",
      background: "#C0C0C0",
      border: "2px outset #fff",
      fontSize: "11px",
      color: "#000",
      width: "100%",
      overflow: "hidden",
    }}>
      {/* Title bar */}
      <div style={{
        background: "linear-gradient(to right, #000080, #1084d0)",
        color: "#fff",
        padding: "2px 4px",
        fontSize: "11px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span>入退室管理システム Ver.2.3.1</span>
        <div style={{ display: "flex", gap: "1px" }}>
          {["_", "□", "×"].map((b) => (
            <span key={b} style={{
              background: "#C0C0C0",
              border: "1px outset #fff",
              width: "16px",
              height: "14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#000",
              cursor: "default",
            }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Menu bar */}
      <div style={{
        background: "#F0F0F0",
        borderBottom: "1px solid #808080",
        padding: "1px 0",
        display: "flex",
      }}>
        {["ファイル(F)", "編集(E)", "表示(V)", "ツール(T)", "ヘルプ(H)"].map((m) => (
          <span key={m} style={{ padding: "1px 8px", cursor: "default", fontSize: "11px" }}>{m}</span>
        ))}
      </div>

      {/* Search bar */}
      <div style={{
        background: "#F0F0F0",
        padding: "4px 6px",
        borderBottom: "1px solid #808080",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "11px" }}>検索:</span>
        <input readOnly style={{ border: "1px inset #808080", background: "#fff", padding: "1px 3px", fontSize: "11px", width: "120px" }} />
        {["検索", "印刷", "CSV出力", "閉じる"].map((btn) => (
          <button key={btn} style={{ border: "2px outset #fff", background: "#C0C0C0", padding: "1px 8px", fontSize: "11px", cursor: "default" }}>{btn}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: "2px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#D4D0C8" }}>
              {["日時", "名前", "部署", "入室/退室", "場所"].map((h) => (
                <th key={h} style={{ border: "1px solid #808080", padding: "2px 4px", fontWeight: "normal", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accessData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F0F0F0" }}>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", whiteSpace: "nowrap" }}>{row.date} {row.time}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.name}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.dept}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.action}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div style={{ background: "#F0F0F0", borderTop: "1px solid #808080", padding: "1px 6px", fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
        <span>全 {accessData.length} 件</span>
        <span>2026/04/28 11:20</span>
      </div>
    </div>
  )
}

// ============================================================
// After: Access Control (Modern Style) — Compact horizontal layout
// ============================================================

function AccessAfter() {
  return (
    <div className="bg-[#F8FAFC] rounded-lg overflow-hidden text-[11px] w-full border border-gray-200">
      {/* Top nav bar instead of sidebar */}
      <div className="bg-[#1A2332] text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/90">AccessFlow</span>
        <div className="flex gap-3">
          {["ダッシュボード", "入退室ログ", "ユーザー管理", "レポート", "設定"].map((item, i) => (
            <span key={item} className={`text-[9px] cursor-default ${i === 1 ? "text-white border-b border-white/60 pb-0.5" : "text-gray-400"}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="p-2.5">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[
            { label: "今日の入室", value: "24", color: "text-[#1A3C6E]" },
            { label: "現在在室", value: "18", color: "text-[#2E75B6]" },
            { label: "異常検知", value: "0", color: "text-gray-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-md p-2 border border-gray-100 shadow-sm">
              <div className="text-[9px] text-gray-500">{kpi.label}</div>
              <div className={`text-base font-bold ${kpi.color}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex-1 relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="bg-white border border-gray-200 rounded-md py-1 pl-6 pr-2 text-[10px] text-gray-400 cursor-default">名前・部署で検索...</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] text-gray-600 cursor-default">全部署</div>
          <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] text-gray-600 cursor-default">全拠点</div>
        </div>

        {/* Table — compact, 5 rows */}
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["時刻", "名前", "部署", "ステータス", "場所"].map((h) => (
                  <th key={h} className="text-left py-1 px-2 font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accessData.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                  <td className="py-1 px-2 text-gray-500">{row.time}</td>
                  <td className="py-1 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[7px] font-bold flex-shrink-0">{row.name[0]}</div>
                      <span className="text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-1 px-2 text-gray-600">{row.dept}</td>
                  <td className="py-1 px-2">
                    <span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                      row.action === "入室" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}>{row.action}</span>
                  </td>
                  <td className="py-1 px-2 text-gray-600">{row.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-t border-gray-200 text-[9px] text-gray-500">
            <span>1-5 / 24件</span>
            <div className="flex gap-0.5">
              {["1", "2", "3", "4"].map((p) => (
                <span key={p} className={`w-4 h-4 flex items-center justify-center rounded cursor-default ${p === "1" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Before: Inventory (Legacy Style)
// ============================================================

function InventoryBefore() {
  return (
    <div style={{
      fontFamily: "'MS Gothic', 'MS PGothic', 'Meiryo', monospace",
      background: "#C0C0C0",
      border: "2px outset #fff",
      fontSize: "11px",
      color: "#000",
      width: "100%",
      overflow: "hidden",
    }}>
      <div style={{
        background: "linear-gradient(to right, #000080, #1084d0)",
        color: "#fff",
        padding: "2px 4px",
        fontSize: "11px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span>在庫管理システム Ver.1.8.0</span>
        <div style={{ display: "flex", gap: "1px" }}>
          {["_", "□", "×"].map((b) => (
            <span key={b} style={{ background: "#C0C0C0", border: "1px outset #fff", width: "16px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#000", cursor: "default" }}>{b}</span>
          ))}
        </div>
      </div>

      <div style={{ background: "#F0F0F0", borderBottom: "1px solid #808080", padding: "1px 0", display: "flex" }}>
        {["ファイル(F)", "編集(E)", "表示(V)", "マスタ(M)", "ヘルプ(H)"].map((m) => (
          <span key={m} style={{ padding: "1px 8px", cursor: "default", fontSize: "11px" }}>{m}</span>
        ))}
      </div>

      <div style={{ background: "#F0F0F0", padding: "4px 6px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
        {["発注", "入荷", "棚卸", "マスタ管理", "印刷"].map((btn) => (
          <button key={btn} style={{ border: "2px outset #fff", background: "#C0C0C0", padding: "1px 8px", fontSize: "11px", cursor: "default" }}>{btn}</button>
        ))}
      </div>

      <div style={{ padding: "2px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#D4D0C8" }}>
              {["商品CD", "商品名", "カテゴリ", "在庫数", "発注点", "最終入荷", "倉庫", "状態"].map((h) => (
                <th key={h} style={{ border: "1px solid #808080", padding: "2px 3px", fontWeight: "normal", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F0F0F0" }}>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.code}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.name}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.cat}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", color: row.status === "不足" ? "#CC0000" : "#000", textAlign: "right" }}>{row.qty}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", textAlign: "right" }}>{row.reorder}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", whiteSpace: "nowrap" }}>{row.lastIn}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.warehouse}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: "#F0F0F0", borderTop: "1px solid #808080", padding: "1px 6px", fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
        <span>全 {inventoryData.length} 件 | 在庫不足: {inventoryData.filter(d => d.status === "不足").length} 件</span>
        <span>最終更新: 2026/04/28</span>
      </div>
    </div>
  )
}

// ============================================================
// After: Inventory (Modern Style) — Compact horizontal layout
// ============================================================

function InventoryAfter() {
  return (
    <div className="bg-[#F8FAFC] rounded-lg overflow-hidden text-[11px] w-full border border-gray-200">
      {/* Top nav bar */}
      <div className="bg-[#1A2332] text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/90">StockHub</span>
        <div className="flex gap-3">
          {["ダッシュボード", "在庫一覧", "入出荷管理", "発注管理", "レポート"].map((item, i) => (
            <span key={item} className={`text-[9px] cursor-default ${i === 1 ? "text-white border-b border-white/60 pb-0.5" : "text-gray-400"}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="p-2.5">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[
            { label: "総SKU数", value: "142", color: "text-gray-800" },
            { label: "在庫不足", value: "5", color: "text-red-600", bg: "bg-red-50 border-red-100" },
            { label: "今月入荷", value: "38", color: "text-[#1A3C6E]" },
            { label: "回転率", value: "4.2", color: "text-[#2E75B6]" },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-md p-1.5 border shadow-sm ${kpi.bg || "bg-white border-gray-100"}`}>
              <div className="text-[8px] text-gray-500">{kpi.label}</div>
              <div className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Category tabs + Search */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {["全て", "サーバー", "NW機器", "電源", "部材"].map((tab, i) => (
              <span key={tab} className={`px-2 py-0.5 rounded-md text-[9px] cursor-default ${i === 0 ? "bg-[#1A2332] text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{tab}</span>
            ))}
          </div>
          <div className="flex-1 min-w-[80px]">
            <div className="bg-white border border-gray-200 rounded-md py-1 px-2 text-[10px] text-gray-400 cursor-default">検索...</div>
          </div>
        </div>

        {/* Table — compact, 5 rows */}
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["商品", "カテゴリ", "在庫レベル", "状態"].map((h) => (
                  <th key={h} className="text-left py-1 px-2 font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.slice(0, 5).map((row, i) => {
                const pct = Math.min(100, Math.round((row.qty / (row.reorder * 2)) * 100))
                const barColor = row.status === "不足" ? "bg-red-400" : "bg-emerald-400"
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                    <td className="py-1 px-2">
                      <div className="text-gray-800 font-medium">{row.name}</div>
                      <div className="text-[8px] text-gray-400">{row.code}</div>
                    </td>
                    <td className="py-1 px-2 text-gray-600">{row.cat}</td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[9px] text-gray-500 w-5 text-right">{row.qty}</span>
                      </div>
                    </td>
                    <td className="py-1 px-2">
                      <span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                        row.status === "不足" ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-t border-gray-200 text-[9px] text-gray-500">
            <span>1-5 / 142件</span>
            <div className="flex gap-0.5">
              {["1", "2", "3"].map((p) => (
                <span key={p} className={`w-4 h-4 flex items-center justify-center rounded cursor-default ${p === "1" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Main Exported Component (Hero section)
// ============================================================

type Theme = "access" | "inventory"
type View = "before" | "after"

export function DemoMockups() {
  const [theme, setTheme] = useState<Theme>("access")
  const [view, setView] = useState<View>("before")

  const themeOptions: { key: Theme; label: string }[] = [
    { key: "access", label: "入退室管理" },
    { key: "inventory", label: "在庫管理" },
  ]

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      {/* Theme Tabs */}
      <div className="flex bg-white/10 rounded-lg p-0.5 mb-2 border border-white/20">
        {themeOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setTheme(opt.key)}
            className={`flex-1 text-xs py-1.5 rounded-md transition-all font-medium ${
              theme === opt.key ? "bg-white/20 text-white shadow-sm" : "text-blue-200 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Before / After Toggle */}
      <div className="flex bg-white/10 rounded-lg p-0.5 mb-3 border border-white/20">
        <button
          onClick={() => setView("before")}
          className={`flex-1 text-xs py-1.5 rounded-md transition-all font-medium ${
            view === "before" ? "bg-red-500/30 text-red-200 shadow-sm" : "text-blue-200 hover:text-white"
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setView("after")}
          className={`flex-1 text-xs py-1.5 rounded-md transition-all font-medium ${
            view === "after" ? "bg-emerald-500/30 text-emerald-200 shadow-sm" : "text-blue-200 hover:text-white"
          }`}
        >
          After
        </button>
      </div>

      {/* Mockup Display */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20">
        {theme === "access" && view === "before" && <AccessBefore />}
        {theme === "access" && view === "after" && <AccessAfter />}
        {theme === "inventory" && view === "before" && <InventoryBefore />}
        {theme === "inventory" && view === "after" && <InventoryAfter />}
      </div>

      <p className="text-center text-[10px] text-blue-200/60 mt-2">
        ※ クリックして切り替えられます
      </p>
    </div>
  )
}

