"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"

type ToolType = "ideaGeneration" | "ideaRefinement" | "requirementDraft" | "leanCanvas"

interface ToolFormProps {
  toolType: ToolType
  onSubmit: (formData: Record<string, string>) => Promise<void>
  loading: boolean
  initialData?: Record<string, string>
}

export function ToolForm({ toolType, onSubmit, loading, initialData = {} }: ToolFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error:", error)
      toast.error("エラーが発生しました。もう一度お試しください。")
    }
  }

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getFields = () => {
    switch (toolType) {
      case "ideaGeneration":
        return [
          { key: "industry", label: "業界/分野", type: "text" },
          { key: "targetUser", label: "ターゲットユーザー", type: "text" },
          { key: "problem", label: "解決したい課題", type: "textarea" },
          { key: "competitors", label: "既存の競合サービス", type: "textarea" },
          { key: "budget", label: "予算規模", type: "text" }
        ]
      case "ideaRefinement":
        return [
          { key: "idea", label: "現在のアイデア概要", type: "textarea" },
          { key: "challenges", label: "想定される課題", type: "textarea" },
          { key: "users", label: "想定されるユーザー", type: "text" },
          { key: "similarServices", label: "既存の類似サービス", type: "textarea" }
        ]
      case "requirementDraft":
        return [
          { key: "projectOverview", label: "プロジェクト概要", type: "textarea" },
          { key: "userStories", label: "主要なユーザーストーリー", type: "textarea" },
          { key: "requiredFeatures", label: "必須機能", type: "textarea" },
          { key: "techStack", label: "技術スタック", type: "text" },
          { key: "budgetAndTimeline", label: "予算と期間", type: "text" }
        ]
      case "leanCanvas":
        return [
          { key: "businessIdea", label: "ビジネスアイデア概要", type: "textarea" },
          { key: "targetMarket", label: "ターゲット市場", type: "text" },
          { key: "competition", label: "競合状況", type: "textarea" },
          { key: "revenueModel", label: "収益モデル", type: "text" },
          { key: "costStructure", label: "コスト構造", type: "textarea" }
        ]
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {getFields().map(field => (
        <div key={field.key} className="space-y-2">
          <label htmlFor={field.key} className="text-sm font-medium">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.key}
              value={formData[field.key] || ""}
              onChange={e => handleChange(field.key, e.target.value)}
              className="min-h-[100px]"
              required
            />
          ) : (
            <Input
              id={field.key}
              type="text"
              value={formData[field.key] || ""}
              onChange={e => handleChange(field.key, e.target.value)}
              required
            />
          )}
        </div>
      ))}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            分析中...
          </div>
        ) : (
          "AIに分析を依頼"
        )}
      </Button>
    </form>
  )
} 