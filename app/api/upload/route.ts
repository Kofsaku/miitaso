import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file received' })
    }

    // ファイル名を安全な形に変換
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = path.extname(file.name)
    const safeFileName = `${timestamp}_${randomString}${extension}`

    // ファイルをbufferに変換
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // publicディレクトリに保存
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, safeFileName)

    // ディレクトリが存在しない場合は作成
    try {
      await writeFile(filePath, buffer)
    } catch (err) {
      // ディレクトリが存在しない場合は作成して再試行
      const fs = require('fs')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
        await writeFile(filePath, buffer)
      } else {
        throw err
      }
    }

    // 公開URLを返す
    const publicUrl = `/uploads/${safeFileName}`

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: file.name,
      originalName: file.name
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' })
  }
}