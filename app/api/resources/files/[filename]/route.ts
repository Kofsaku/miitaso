import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    // ファイル名のバリデーション（セキュリティ対策）
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return NextResponse.json(
        { error: "無効なファイル名です" },
        { status: 400 }
      )
    }

    // 許可されたファイル拡張子の確認
    const allowedExtensions = ['.pdf', '.xlsx', '.docx', '.zip', '.html', '.md', '.csv']
    const fileExtension = filename.substring(filename.lastIndexOf('.'))
    
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: "サポートされていないファイル形式です" },
        { status: 400 }
      )
    }

    // ファイルパスの構築
    const filePath = join(process.cwd(), 'public', 'resources', 'files', filename)
    
    try {
      // ファイルを読み込み
      const fileBuffer = await readFile(filePath)
      
      // MIMEタイプの設定
      const mimeTypes: { [key: string]: string } = {
        '.pdf': 'application/pdf',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.zip': 'application/zip',
        '.html': 'text/html',
        '.md': 'text/markdown',
        '.csv': 'text/csv'
      }
      
      const mimeType = mimeTypes[fileExtension] || 'application/octet-stream'
      
      // レスポンスヘッダーの設定
      const headers = new Headers()
      headers.set('Content-Type', mimeType)
      
      // ブラウザで表示するファイル形式
      const viewableExtensions = ['.html', '.md']
      if (!viewableExtensions.includes(fileExtension)) {
        headers.set('Content-Disposition', `attachment; filename="${filename}"`)
      }
      
      headers.set('Cache-Control', 'private, max-age=3600') // 1時間キャッシュ
      
      return new NextResponse(fileBuffer, {
        status: 200,
        headers
      })
      
    } catch (fileError) {
      console.error('File read error:', fileError)
      return NextResponse.json(
        { error: "ファイルが見つかりません" },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error("File download error:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    )
  }
}