import { NextRequest, NextResponse } from 'next/server'
import db from '../../../../lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { endpoint, keys } = body

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription payload' }, { status: 400 })
    }

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO push_subscriptions (endpoint, p256dh, auth)
      VALUES (?, ?, ?)
    `)
    stmt.run(endpoint, keys.p256dh, keys.auth)

    return NextResponse.json({ success: true, message: 'Subscription saved.' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
