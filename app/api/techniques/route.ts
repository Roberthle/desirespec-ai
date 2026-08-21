import { NextRequest, NextResponse } from 'next/server'
import { getTechniques, searchTechniques } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    const limit = Number(searchParams.get('limit') ?? 20)
    const offset = Number(searchParams.get('offset') ?? 0)

    const techniques = q ? searchTechniques(q) : getTechniques(limit, offset)
    return NextResponse.json({ techniques, total: techniques.length })
  } catch (err) {
    console.error('[techniques]', err)
    return NextResponse.json({ error: 'Failed to fetch techniques' }, { status: 500 })
  }
}
