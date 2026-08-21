import { NextRequest, NextResponse } from 'next/server'
import { getNerveZones } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const silhouette = searchParams.get('silhouette') ?? 'neutral'
    const zones = getNerveZones(silhouette)
    return NextResponse.json({ zones, total: zones.length })
  } catch (err) {
    console.error('[nerve-zones]', err)
    return NextResponse.json({ error: 'Failed to fetch nerve zones' }, { status: 500 })
  }
}
