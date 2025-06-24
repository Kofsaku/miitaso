import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file received' })
    }

    // ファイルをBase64に変換
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type
    
    // Data URLを生成
    const dataUrl = `data:${mimeType};base64,${base64}`

    return NextResponse.json({ 
      success: true, 
      url: dataUrl,
      filename: file.name
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' })
  }
}