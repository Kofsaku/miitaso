import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, resourceId } = await request.json()

    if (!email || !resourceId) {
      return NextResponse.json(
        { error: "メールアドレスとリソースIDが必要です" },
        { status: 400 }
      )
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      )
    }

    // ここで実際のメール送信処理を行う
    // 現在はダミーレスポンスを返す
    console.log(`Resource download request: ${email} - ${resourceId}`)

    // リソース情報の定義
    const resources = {
      "dx-strategy-assessment": {
        title: "DX戦略診断書",
        filename: "dx-strategy-assessment.html",
        fileUrl: "/resources/files/dx-strategy-assessment.html"
      },
      "mvp-development-checklist": {
        title: "MVP開発チェックリスト", 
        filename: "mvp-development-checklist.html",
        fileUrl: "/resources/files/mvp-development-checklist.html"
      },
      "product-requirements-template": {
        title: "プロダクト要件定義テンプレート",
        filename: "product-requirements-template.xlsx",
        fileUrl: "/resources/files/product-requirements-template.xlsx"
      },
      "ui-ux-improvement-guide": {
        title: "UI/UX改善ガイド",
        filename: "ui-ux-improvement-guide.pdf",
        fileUrl: "/resources/files/ui-ux-improvement-guide.pdf"
      },
      "roi-calculation-template": {
        title: "DX投資ROI計算テンプレート",
        filename: "roi-calculation-template.xlsx",
        fileUrl: "/resources/files/roi-calculation-template.xlsx"
      },
      "security-checklist": {
        title: "セキュリティ対策チェックリスト",
        filename: "security-checklist.pdf",
        fileUrl: "/resources/files/security-checklist.pdf"
      },
      "agile-development-playbook": {
        title: "アジャイル開発プレイブック",
        filename: "agile-development-playbook.pdf",
        fileUrl: "/resources/files/agile-development-playbook.pdf"
      },
      "data-driven-decision-framework": {
        title: "データドリブン意思決定フレームワーク",
        filename: "data-driven-decision-framework.pdf",
        fileUrl: "/resources/files/data-driven-decision-framework.pdf"
      },
      "cloud-migration-strategy": {
        title: "クラウド移行戦略ガイド",
        filename: "cloud-migration-strategy.pdf",
        fileUrl: "/resources/files/cloud-migration-strategy.pdf"
      },
      "api-design-best-practices": {
        title: "API設計ベストプラクティス集",
        filename: "api-design-best-practices.pdf",
        fileUrl: "/resources/files/api-design-best-practices.pdf"
      }
    }

    const resource = resources[resourceId as keyof typeof resources]
    if (!resource) {
      return NextResponse.json(
        { error: "指定されたリソースが見つかりません" },
        { status: 404 }
      )
    }

    // メール送信の処理をここに実装
    // 例: SendGrid, Amazon SES, Nodemailer等を使用
    
    // リードデータの保存処理をここに実装
    // 例: データベースまたはCRMシステムへの保存

    return NextResponse.json({
      success: true,
      message: `${resource.title}をメールアドレスに送信しました`,
      resourceTitle: resource.title,
      downloadUrl: resource.fileUrl
    })

  } catch (error) {
    console.error("Resource download error:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    )
  }
}