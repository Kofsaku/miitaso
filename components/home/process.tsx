import { StepFlow } from "@/components/corporate/service-page"

const steps = [
  {
    title: "ヒアリング",
    description:
      "現状の課題と目的をうかがいます。アイデア段階・構想段階のご相談でも構いません。",
  },
  {
    title: "設計",
    description:
      "課題を要件に落とし込み、技術選定とスコープを設計します。小さく始める計画を立てます。",
  },
  {
    title: "AI駆動開発",
    description:
      "Claude等のAIを開発プロセスに組み込み、設計・実装・検証のサイクルを高速に回します。",
  },
  {
    title: "運用伴走",
    description:
      "リリースして終わりにしません。運用しながら改善を続け、次の打ち手まで伴走します。",
  },
]

/**
 * プロセス4ステップ。サービス詳細ページと同じ StepFlow を使って見た目を揃える。
 */
export function Process() {
  return (
    <StepFlow
      label="PROCESS"
      title="進め方"
      lead="同じチームが、ヒアリングから運用まで一気通貫で担当します。"
      steps={steps}
    />
  )
}
