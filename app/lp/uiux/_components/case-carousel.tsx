"use client"

import { useState, useCallback } from "react"

// ============================================================
// Case Study Data
// ============================================================

const cases = [
  {
    id: "access",
    company: "セキュリティシステム大手 A社様",
    industry: "セキュリティシステム企業",
    service: "クラウド型入退室管理システム",
    challenge: "自社システムのUIが10年以上前の設計のまま。既存のシステム会社に相談したが「デザインは対応できない」と言われた。",
    support: "既存システムのUI/UXデザイン改善 + フロントエンド実装",
    structure: "miitasoがUI/UX + フロントエンド、サーバーサイドは既存の開発会社が担当",
    scale: "約300万円",
    point: "既存の開発会社と協業し、サーバーサイドには一切手を加えず、UIレイヤーのみを刷新。開発体制を崩すことなく、システムの使いやすさを大幅に改善。",
  },
  {
    id: "inventory",
    company: "ITインフラ・通信 B社様",
    industry: "ITインフラ構築・運用企業",
    service: "機材・資材在庫管理システム",
    challenge: "サーバー・NW機器・配線部材など数百品目をExcelと古い社内システムで管理。型番の入力ミスや在庫不足の見落としで、現場作業が止まることが月に数回発生。",
    support: "在庫一覧画面のUI全面刷新 + 在庫レベル可視化ダッシュボード新設",
    structure: "miitasoがUI設計 + フロントエンド実装、APIは既存システムをそのまま活用",
    scale: "約200万円",
    point: "型番ベースの検索性を大幅改善し、在庫レベルをプログレスバーで可視化。発注点を下回った機材のアラートを自動表示し、機材切れによる現場停止がゼロに。",
  },
  {
    id: "attendance",
    company: "人材サービス C社様",
    industry: "人材派遣・紹介企業",
    service: "勤怠管理・シフト管理システム",
    challenge: "自社開発の勤怠管理システムが、スマホ非対応で外出先から打刻できない。派遣スタッフからの不満が多く、競合他社に人材が流出するリスクがあった。",
    support: "レスポンシブUI化 + モバイル打刻画面の新規デザイン",
    structure: "miitasoがUI/UXデザイン + React実装、バックエンドAPIは既存のまま",
    scale: "約250万円",
    point: "スマホ対応により外出先からの打刻が可能に。派遣スタッフの満足度が向上し、システム起因の離職相談がゼロに。",
  },
]

// ============================================================
// Before UIs
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
  { code: "PRT-4520N", name: "京セラ TK-5281K トナー", cat: "印刷部材", qty: 2, reorder: 5, status: "不足" },
  { code: "SRV-DL380", name: "HPE ProLiant DL380 Gen11", cat: "サーバー", qty: 3, reorder: 2, status: "正常" },
  { code: "SW-C9300L", name: "Cisco Catalyst 9300L-48P", cat: "NW機器", qty: 1, reorder: 3, status: "不足" },
  { code: "UPS-SMT15", name: "APC Smart-UPS 1500VA", cat: "電源設備", qty: 8, reorder: 4, status: "正常" },
  { code: "HDD-ST8000", name: "Seagate Exos 8TB 3.5inch", cat: "ストレージ", qty: 4, reorder: 10, status: "不足" },
  { code: "CAB-LC10M", name: "光ファイバケーブル LC-LC 10m", cat: "配線部材", qty: 42, reorder: 20, status: "正常" },
  { code: "SFP-10GSR", name: "Cisco SFP-10G-SR モジュール", cat: "NW機器", qty: 3, reorder: 6, status: "不足" },
  { code: "MEM-32GR", name: "Samsung 32GB DDR5 RDIMM", cat: "サーバー", qty: 12, reorder: 8, status: "正常" },
  { code: "FW-PA3260", name: "Palo Alto PA-3260", cat: "セキュリティ", qty: 1, reorder: 1, status: "正常" },
]

const attendanceData = [
  { name: "田中 太郎", id: "EMP-001", date: "04/28", in: "09:02", out: "18:15", hours: "8:13", status: "出勤", overtime: "0:13" },
  { name: "鈴木 花子", id: "EMP-002", date: "04/28", in: "08:55", out: "17:30", hours: "7:35", status: "出勤", overtime: "-" },
  { name: "佐藤 次郎", id: "EMP-003", date: "04/28", in: "-", out: "-", hours: "-", status: "有休", overtime: "-" },
  { name: "山田 美咲", id: "EMP-004", date: "04/28", in: "09:30", out: "-", hours: "-", status: "勤務中", overtime: "-" },
  { name: "高橋 健一", id: "EMP-005", date: "04/28", in: "08:45", out: "20:30", hours: "10:45", status: "出勤", overtime: "2:45" },
  { name: "渡辺 恵子", id: "EMP-006", date: "04/28", in: "10:00", out: "-", hours: "-", status: "遅刻", overtime: "-" },
  { name: "中村 大輔", id: "EMP-007", date: "04/28", in: "09:00", out: "18:00", hours: "8:00", status: "出勤", overtime: "-" },
  { name: "小林 由美", id: "EMP-008", date: "04/28", in: "-", out: "-", hours: "-", status: "欠勤", overtime: "-" },
]

// Legacy style wrapper
function LegacyFrame({ title, menuItems, toolbar, children }: {
  title: string
  menuItems: string[]
  toolbar: string[]
  children: React.ReactNode
}) {
  return (
    <div style={{
      fontFamily: "'MS Gothic', 'MS PGothic', 'Meiryo', monospace",
      background: "#C0C0C0", border: "2px outset #fff", fontSize: "11px", color: "#000", width: "100%", overflow: "hidden",
    }}>
      <div style={{
        background: "linear-gradient(to right, #000080, #1084d0)", color: "#fff", padding: "2px 4px", fontSize: "11px", fontWeight: "bold",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>{title}</span>
        <div style={{ display: "flex", gap: "1px" }}>
          {["_", "□", "×"].map((b) => (
            <span key={b} style={{ background: "#C0C0C0", border: "1px outset #fff", width: "16px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#000", cursor: "default" }}>{b}</span>
          ))}
        </div>
      </div>
      <div style={{ background: "#F0F0F0", borderBottom: "1px solid #808080", padding: "1px 0", display: "flex" }}>
        {menuItems.map((m) => (
          <span key={m} style={{ padding: "1px 8px", cursor: "default", fontSize: "11px" }}>{m}</span>
        ))}
      </div>
      <div style={{ background: "#F0F0F0", padding: "4px 6px", borderBottom: "1px solid #808080", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
        {toolbar.map((btn) => (
          <button key={btn} style={{ border: "2px outset #fff", background: "#C0C0C0", padding: "1px 8px", fontSize: "11px", cursor: "default" }}>{btn}</button>
        ))}
      </div>
      {children}
    </div>
  )
}

function AccessBefore() {
  return (
    <LegacyFrame title="入退室管理システム Ver.2.3.1" menuItems={["ファイル(F)", "編集(E)", "表示(V)", "ツール(T)", "ヘルプ(H)"]} toolbar={["検索", "印刷", "CSV出力", "閉じる"]}>
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
      <div style={{ background: "#F0F0F0", borderTop: "1px solid #808080", padding: "1px 6px", fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
        <span>全 {accessData.length} 件</span>
        <span>2026/04/28 11:20</span>
      </div>
    </LegacyFrame>
  )
}

function InventoryBefore() {
  return (
    <LegacyFrame title="在庫管理システム Ver.1.8.0" menuItems={["ファイル(F)", "編集(E)", "表示(V)", "マスタ(M)", "ヘルプ(H)"]} toolbar={["発注", "入荷", "棚卸", "マスタ管理", "印刷"]}>
      <div style={{ padding: "2px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#D4D0C8" }}>
              {["商品CD", "商品名", "カテゴリ", "在庫数", "発注点", "状態"].map((h) => (
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
    </LegacyFrame>
  )
}

function AttendanceBefore() {
  return (
    <LegacyFrame title="勤怠管理システム Ver.3.1.2" menuItems={["ファイル(F)", "編集(E)", "表示(V)", "集計(S)", "ヘルプ(H)"]} toolbar={["打刻", "修正申請", "月次集計", "シフト表", "印刷"]}>
      <div style={{ padding: "2px", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#D4D0C8" }}>
              {["社員ID", "氏名", "日付", "出勤", "退勤", "勤務時間", "残業", "状態"].map((h) => (
                <th key={h} style={{ border: "1px solid #808080", padding: "2px 3px", fontWeight: "normal", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F0F0F0" }}>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.id}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.name}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.date}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.in}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.out}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px" }}>{row.hours}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", color: row.overtime !== "-" && row.overtime !== "" ? "#CC0000" : "#000" }}>{row.overtime}</td>
                <td style={{ border: "1px solid #C0C0C0", padding: "1px 3px", color: row.status === "遅刻" || row.status === "欠勤" ? "#CC0000" : "#000" }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background: "#F0F0F0", borderTop: "1px solid #808080", padding: "1px 6px", fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
        <span>全 {attendanceData.length} 名 | 出勤: 4名 勤務中: 1名 有休: 1名 遅刻: 1名 欠勤: 1名</span>
        <span>2026/04/28</span>
      </div>
    </LegacyFrame>
  )
}

// ============================================================
// After UIs
// ============================================================

function ModernFrame({ appName, navItems, activeIndex, children }: {
  appName: string
  navItems: string[]
  activeIndex: number
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#F8FAFC] rounded-lg overflow-hidden text-[11px] w-full border border-gray-200">
      <div className="bg-[#1A2332] text-white px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white/90">{appName}</span>
        <div className="flex gap-3">
          {navItems.map((item, i) => (
            <span key={item} className={`text-[9px] cursor-default ${i === activeIndex ? "text-white border-b border-white/60 pb-0.5" : "text-white/40"}`}>{item}</span>
          ))}
        </div>
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  )
}

function AccessAfter() {
  return (
    <ModernFrame appName="AccessFlow" navItems={["ダッシュボード", "入退室ログ", "ユーザー管理", "レポート", "設定"]} activeIndex={1}>
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
      <div className="flex items-center gap-1.5 mb-2">
        <div className="flex-1 relative">
          <div className="bg-white border border-gray-200 rounded-md py-1 pl-6 pr-2 text-[10px] text-gray-400 cursor-default">名前・部署で検索...</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] text-gray-600 cursor-default">全部署</div>
        <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] text-gray-600 cursor-default">全拠点</div>
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full text-[10px]">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            {["時刻", "名前", "部署", "ステータス", "場所"].map((h) => (
              <th key={h} className="text-left py-1 px-2 font-medium text-gray-500">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {accessData.slice(0, 5).map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                <td className="py-1 px-2 text-gray-500">{row.time}</td>
                <td className="py-1 px-2"><div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[7px] font-bold flex-shrink-0">{row.name[0]}</div><span className="text-gray-800">{row.name}</span></div></td>
                <td className="py-1 px-2 text-gray-600">{row.dept}</td>
                <td className="py-1 px-2"><span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${row.action === "入室" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>{row.action}</span></td>
                <td className="py-1 px-2 text-gray-600">{row.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-t border-gray-200 text-[9px] text-gray-500">
          <span>1-5 / 24件</span>
          <div className="flex gap-0.5">{["1","2","3","4"].map((p)=>(<span key={p} className={`w-4 h-4 flex items-center justify-center rounded cursor-default ${p==="1"?"bg-blue-600 text-white":"hover:bg-gray-200"}`}>{p}</span>))}</div>
        </div>
      </div>
    </ModernFrame>
  )
}

function InventoryAfter() {
  return (
    <ModernFrame appName="StockHub" navItems={["ダッシュボード", "在庫一覧", "入出荷管理", "発注管理", "レポート"]} activeIndex={1}>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[
          { label: "総SKU数", value: "142", color: "text-gray-800", bg: "" },
          { label: "在庫不足", value: "5", color: "text-red-600", bg: "bg-red-50 border-red-100" },
          { label: "今月入荷", value: "38", color: "text-[#1A3C6E]", bg: "" },
          { label: "回転率", value: "4.2", color: "text-[#2E75B6]", bg: "" },
        ].map((kpi) => (
          <div key={kpi.label} className={`rounded-md p-1.5 border shadow-sm ${kpi.bg || "bg-white border-gray-100"}`}>
            <div className="text-[8px] text-gray-500">{kpi.label}</div>
            <div className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="flex gap-0.5">{["全て","サーバー","NW機器","電源","部材"].map((tab,i)=>(<span key={tab} className={`px-2 py-0.5 rounded-md text-[9px] cursor-default ${i===0?"bg-[#1A2332] text-white":"bg-white text-gray-600 border border-gray-200"}`}>{tab}</span>))}</div>
        <div className="flex-1"><div className="bg-white border border-gray-200 rounded-md py-1 px-2 text-[10px] text-gray-400 cursor-default">検索...</div></div>
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full text-[10px]">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            {["商品", "カテゴリ", "在庫レベル", "状態"].map((h) => (
              <th key={h} className="text-left py-1 px-2 font-medium text-gray-500">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {inventoryData.slice(0, 5).map((row, i) => {
              const pct = Math.min(100, Math.round((row.qty / (row.reorder * 2)) * 100))
              return (
                <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                  <td className="py-1 px-2"><div className="text-gray-800 font-medium">{row.name}</div><div className="text-[8px] text-gray-400">{row.code}</div></td>
                  <td className="py-1 px-2 text-gray-600">{row.cat}</td>
                  <td className="py-1 px-2"><div className="flex items-center gap-1.5"><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${row.status==="不足"?"bg-red-400":"bg-emerald-400"}`} style={{width:`${pct}%`}}/></div><span className="text-[9px] text-gray-500 w-5 text-right">{row.qty}</span></div></td>
                  <td className="py-1 px-2"><span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${row.status==="不足"?"bg-red-50 text-red-700 border border-red-200":"bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>{row.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-t border-gray-200 text-[9px] text-gray-500">
          <span>1-5 / 142件</span>
          <div className="flex gap-0.5">{["1","2","3"].map((p)=>(<span key={p} className={`w-4 h-4 flex items-center justify-center rounded cursor-default ${p==="1"?"bg-blue-600 text-white":"hover:bg-gray-200"}`}>{p}</span>))}</div>
        </div>
      </div>
    </ModernFrame>
  )
}

function AttendanceAfter() {
  return (
    <ModernFrame appName="WorkFlow" navItems={["ダッシュボード", "勤怠一覧", "シフト管理", "申請", "設定"]} activeIndex={1}>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[
          { label: "出勤", value: "42", color: "text-[#1A3C6E]", bg: "" },
          { label: "遅刻", value: "2", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
          { label: "有休", value: "3", color: "text-[#2E75B6]", bg: "" },
          { label: "残業平均", value: "1.2h", color: "text-gray-700", bg: "" },
        ].map((kpi) => (
          <div key={kpi.label} className={`rounded-md p-1.5 border shadow-sm ${kpi.bg || "bg-white border-gray-100"}`}>
            <div className="text-[8px] text-gray-500">{kpi.label}</div>
            <div className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full text-[10px]">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            {["名前", "出勤", "退勤", "勤務", "ステータス"].map((h) => (
              <th key={h} className="text-left py-1 px-2 font-medium text-gray-500">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {attendanceData.slice(0, 5).map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                <td className="py-1 px-2"><div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[7px] font-bold flex-shrink-0">{row.name[0]}</div><span className="text-gray-800">{row.name}</span></div></td>
                <td className="py-1 px-2 text-gray-600">{row.in || "-"}</td>
                <td className="py-1 px-2 text-gray-600">{row.out || "-"}</td>
                <td className="py-1 px-2 text-gray-600">{row.hours}</td>
                <td className="py-1 px-2"><span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                  row.status === "出勤" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                  row.status === "勤務中" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                  row.status === "有休" ? "bg-gray-100 text-gray-600 border border-gray-200" :
                  row.status === "遅刻" ? "bg-orange-50 text-orange-700 border border-orange-200" :
                  "bg-red-50 text-red-700 border border-red-200"
                }`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-t border-gray-200 text-[9px] text-gray-500">
          <span>1-5 / 48名</span>
          <div className="flex gap-0.5">{["1","2","3"].map((p)=>(<span key={p} className={`w-4 h-4 flex items-center justify-center rounded cursor-default ${p==="1"?"bg-blue-600 text-white":"hover:bg-gray-200"}`}>{p}</span>))}</div>
        </div>
      </div>
    </ModernFrame>
  )
}

// ============================================================
// Mockup resolver
// ============================================================

function MockupDisplay({ caseId, view }: { caseId: string; view: "before" | "after" }) {
  if (caseId === "access") return view === "before" ? <AccessBefore /> : <AccessAfter />
  if (caseId === "inventory") return view === "before" ? <InventoryBefore /> : <InventoryAfter />
  if (caseId === "attendance") return view === "before" ? <AttendanceBefore /> : <AttendanceAfter />
  return null
}

// ============================================================
// Exported: Case Study Carousel
// ============================================================

export function CaseCarousel() {
  const [current, setCurrent] = useState(0)
  const [view, setView] = useState<"before" | "after">("before")

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? cases.length - 1 : c - 1))
    setView("before")
  }, [])
  const next = useCallback(() => {
    setCurrent((c) => (c === cases.length - 1 ? 0 : c + 1))
    setView("before")
  }, [])

  const c = cases[current]

  return (
    <div>
      {/* Slide indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setView("before") }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-[#2E75B6] scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button onClick={prev} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Case content */}
      <div className="bg-[#F5F7FA] rounded-xl p-5 md:p-7 border border-gray-100">
        <h3 className="text-base md:text-lg font-bold text-[#1A3C6E] mb-4">
          事例 {current + 1}：{c.company}
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Left: case info */}
          <div className="space-y-2.5">
            {[
              { label: "業種", value: c.industry },
              { label: "対象システム", value: c.service },
              { label: "課題", value: c.challenge },
              { label: "支援内容", value: c.support },
              { label: "体制", value: c.structure },
              { label: "規模", value: c.scale },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] text-[#888] font-medium mb-0.5">{item.label}</p>
                <p className="text-sm text-[#333] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Right: Before/After mockup */}
          <div className="space-y-2">
            <div className="flex bg-gray-100 rounded-lg p-0.5 border border-gray-200">
              <button onClick={() => setView("before")} className={`flex-1 text-xs py-1.5 rounded-md transition-all font-medium ${view === "before" ? "bg-white text-gray-700 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>Before</button>
              <button onClick={() => setView("after")} className={`flex-1 text-xs py-1.5 rounded-md transition-all font-medium ${view === "after" ? "bg-white text-[#2E75B6] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>After</button>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <MockupDisplay caseId={c.id} view={view} />
            </div>
          </div>
        </div>

        {/* Point */}
        <div className="bg-white rounded-lg p-3 border-l-4 border-[#2E75B6] mt-4">
          <p className="text-sm text-[#555] leading-relaxed">
            <span className="font-bold text-[#1A3C6E]">ポイント：</span>{c.point}
          </p>
        </div>
      </div>
    </div>
  )
}
