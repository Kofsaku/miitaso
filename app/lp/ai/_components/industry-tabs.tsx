"use client"

import { useState } from "react"
import {
  ShoppingCart,
  Wheat,
  Scale,
  Building2,
  UtensilsCrossed,
  Factory,
} from "lucide-react"

const industries = [
  {
    id: "ec",
    label: "EC事業者",
    icon: ShoppingCart,
    target: "月商500万〜3,000万のEC事業者向け",
    problems: [
      "問い合わせ対応に毎日2〜3時間取られている",
      "商品説明文の作成が追いつかない",
      "レビューが増えても分析できていない",
    ],
    solutions: [
      {
        title: "問い合わせ自動応答（AIチャットボット）",
        desc: "よくある質問への回答をAIが24時間自動対応。スタッフは複雑な問い合わせだけに集中できるようになります。",
        metric: "対応時間 最大70%削減",
      },
      {
        title: "商品説明文の自動生成",
        desc: "商品画像と基本情報を入力するだけで、SEOに最適化された商品説明文を自動生成。作成時間を大幅に短縮できます。",
        metric: "作成時間 最大1/6に",
      },
      {
        title: "レビュー分析で商品改善",
        desc: "数百件のレビューをAIが自動分析。改善すべきポイント、顧客が評価しているポイントを可視化。",
        metric: "改善速度UP",
      },
      {
        title: "在庫予測・発注最適化",
        desc: "過去の販売データとトレンドからAIが需要を予測。欠品・過剰在庫を防ぎ、キャッシュフローを改善。",
        metric: "在庫ロス削減",
      },
    ],
  },
  {
    id: "food",
    label: "食品・農業",
    icon: Wheat,
    target: "年商1億〜10億の食品メーカー・農業法人向け",
    problems: [
      "受発注がFAX・電話で、ミスと手間が多い",
      "ベテラン社員の知識が共有されていない",
      "需要予測ができず、廃棄ロスが出ている",
    ],
    solutions: [
      {
        title: "受発注のAI自動処理",
        desc: "FAXや電話の注文内容をAIが自動で読み取り・データ化。手入力ミスの防止と受注処理の大幅な時間短縮を実現。",
        metric: "受注処理 大幅削減",
      },
      {
        title: "品質管理の画像認識",
        desc: "AIカメラによる外観検査で、選別・検品を自動化。熟練者の目に頼らない安定した品質管理を実現。",
        metric: "検品の安定化",
      },
      {
        title: "需要予測で廃棄ロス削減",
        desc: "過去の出荷データ・季節変動・天候データからAIが需要を予測。最適な生産量を算出し、フードロスを削減。",
        metric: "廃棄ロス削減",
      },
      {
        title: "営業ナレッジの自動蓄積",
        desc: "営業日報やメールからAIが顧客情報・商談内容を自動抽出。属人的な営業ノウハウを組織の資産に変換。",
        metric: "ナレッジ共有",
      },
    ],
  },
  {
    id: "professional",
    label: "士業",
    icon: Scale,
    target: "税理士・社労士・弁護士事務所向け",
    problems: [
      "同じ質問に何度も回答している",
      "書類作成の下準備に時間がかかる",
      "法改正の情報収集が追いつかない",
    ],
    solutions: [
      {
        title: "定型相談のAI自動回答",
        desc: "顧問先からの「よくある質問」にAIが自動回答。先生の時間を高付加価値業務に集中させます。",
        metric: "定型対応の自動化",
      },
      {
        title: "書類ドラフトの自動生成",
        desc: "過去の書類テンプレートと顧客情報からAIが下書きを自動作成。先生は確認・修正だけでOK。",
        metric: "作成時間の短縮",
      },
      {
        title: "法改正情報の自動収集・要約",
        desc: "官報・通達・判例をAIが自動収集し、関連する顧問先への影響を要約。見落としリスクを排除。",
        metric: "自動収集",
      },
      {
        title: "顧問先管理の効率化",
        desc: "メール・電話・面談の記録をAIが自動整理。次回アクションの提案まで行い、フォロー漏れを防止。",
        metric: "フォロー漏れ防止",
      },
    ],
  },
  {
    id: "realestate",
    label: "不動産",
    icon: Building2,
    target: "不動産仲介・管理会社向け",
    problems: [
      "物件問い合わせへの初期対応に時間がかかる",
      "物件と顧客ニーズのマッチングが属人的",
      "契約書類の準備に手間がかかる",
    ],
    solutions: [
      {
        title: "物件問い合わせの自動初期対応",
        desc: "Webサイトやポータルサイトからの問い合わせにAIが即時対応。希望条件をヒアリングし、物件提案まで自動化。",
        metric: "即時対応",
      },
      {
        title: "AI物件マッチング",
        desc: "顧客の希望条件と物件データベースをAIが照合。営業担当者の経験に頼らない、精度の高いマッチングを実現。",
        metric: "成約率の向上",
      },
      {
        title: "内見予約の自動スケジューリング",
        desc: "顧客・物件オーナー・営業担当の空き状況をAIが調整。予約調整の電話・メールを大幅に削減。",
        metric: "調整工数の削減",
      },
      {
        title: "契約書類の自動生成",
        desc: "物件情報と顧客情報から契約書類のドラフトをAIが自動作成。記入ミスを防ぎ、準備時間を短縮。",
        metric: "準備時間の短縮",
      },
    ],
  },
  {
    id: "restaurant",
    label: "飲食・サービス",
    icon: UtensilsCrossed,
    target: "飲食チェーン・サービス業向け",
    problems: [
      "電話予約の対応が営業の妨げになっている",
      "SNS投稿やメニュー更新が後回しになりがち",
      "顧客の声を活かしきれていない",
    ],
    solutions: [
      {
        title: "予約管理のAI自動化",
        desc: "電話予約をAI音声対応に。24時間受付で取りこぼしゼロ。Web予約との一元管理も実現。",
        metric: "24時間受付",
      },
      {
        title: "SNS投稿・メニュー紹介の自動生成",
        desc: "料理写真をアップロードするだけで、Instagram投稿文やメニュー説明をAIが自動作成。",
        metric: "作成時間の短縮",
      },
      {
        title: "顧客フィードバック自動分析",
        desc: "Googleレビュー・アンケートをAIが自動分析。「味」「接客」「雰囲気」など軸ごとの評価トレンドを可視化。",
        metric: "自動分析",
      },
      {
        title: "シフト最適化",
        desc: "曜日・天候・イベント情報からAIが来客数を予測し、最適なシフトを自動提案。人件費を最適化。",
        metric: "人件費の最適化",
      },
    ],
  },
  {
    id: "other",
    label: "製造・建設・物流",
    icon: Factory,
    target: "製造業・建設業・物流業向け",
    problems: [
      "日報や報告書の作成に現場の時間が取られる",
      "マニュアルが膨大で必要な情報を探せない",
      "見積もり作成に時間がかかる",
    ],
    solutions: [
      {
        title: "日報・報告書の自動生成",
        desc: "現場での音声入力や写真からAIが日報を自動作成。作業員の負担を減らし、記録の質を向上。",
        metric: "作成時間の大幅短縮",
      },
      {
        title: "社内マニュアルのAI検索",
        desc: "膨大なマニュアル・図面・仕様書をAIが理解。自然言語で質問するだけで必要な情報を即座に回答。",
        metric: "即時回答",
      },
      {
        title: "見積書の自動作成",
        desc: "過去の見積もりデータとAIが連携。案件情報を入力するだけで、精度の高い見積書を自動生成。",
        metric: "作成の効率化",
      },
      {
        title: "予防保全・異常検知",
        desc: "設備のセンサーデータやログをAIが監視。故障の兆候を事前に検知し、計画外の停止を防止。",
        metric: "予防保全",
      },
    ],
  },
]

function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, params)
  }
}

export function IndustryTabs() {
  const [activeTab, setActiveTab] = useState("ec")

  const active = industries.find((i) => i.id === activeTab)!

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
        {industries.map((industry) => {
          const Icon = industry.icon
          return (
            <button
              key={industry.id}
              onClick={() => {
                setActiveTab(industry.id)
                trackEvent("industry_tab_click", { industry: industry.id })
              }}
              className={`flex items-center gap-1.5 px-3 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeTab === industry.id
                  ? "bg-[#1A3C6E] text-white shadow-md"
                  : "bg-white text-[#555] border border-gray-200 hover:border-[#2E75B6] hover:text-[#1A3C6E]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {industry.label}
            </button>
          )
        })}
      </div>

      {/* Target Description */}
      <p className="text-center text-sm text-[#2E75B6] font-medium mb-6">
        {active.target}
      </p>

      {/* Current Problems */}
      <div className="bg-[#FFF8F5] border border-orange-100 rounded-xl p-5 md:p-6 mb-8">
        <h4 className="text-sm font-bold text-[#333] mb-3">
          こんな課題はありませんか？
        </h4>
        <div className="space-y-2">
          {active.problems.map((problem, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-[#555]">
              <svg
                className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span className="leading-relaxed">{problem}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {active.solutions.map((solution, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="font-bold text-[#1A3C6E] text-sm md:text-base leading-snug">
                {solution.title}
              </h4>
              <span className="flex-shrink-0 text-xs font-bold text-[#2E75B6] bg-[#F0F6FF] px-2.5 py-1 rounded-full whitespace-nowrap">
                {solution.metric}
              </span>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              {solution.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
