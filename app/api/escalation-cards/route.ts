import { NextRequest, NextResponse } from 'next/server'
import { getEscalationCards } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const levelParam = searchParams.get('level')
    const level = levelParam ? Number(levelParam) : undefined
    const cards = getEscalationCards(level)
    return NextResponse.json({ cards, total: cards.length })
  } catch (err) {
    console.error('[escalation-cards]', err)
    return NextResponse.json({ error: 'Failed to fetch escalation cards' }, { status: 500 })
  }
}
