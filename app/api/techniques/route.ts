import { NextResponse } from 'next/server'

// Static technique data — inlined to avoid better-sqlite3 native binary on Render free tier
const TECHNIQUES = [
  { id: 1, name: 'Feather Trace', category: 'Touch', level: 1, description: 'Light fingertip contact at 2–3cm/sec along the inner forearm — activates Type C tactile afferent fibers.', pressure_range: '0.1–0.3N', nerve_pathway: 'Ulnar', duration_seconds: 30 },
  { id: 2, name: 'Nape Hold', category: 'Pressure', level: 2, description: 'Sustained palm pressure at C7–T1 vertebra — triggers vagal tone increase and cortisol reduction.', pressure_range: '3–5N', nerve_pathway: 'Vagus', duration_seconds: 30 },
  { id: 3, name: 'Scalp Mapping', category: 'Pressure', level: 1, description: 'Distributed fingertip circles across the scalp — high follicle density creates parasympathetic cascade.', pressure_range: '1–2N', nerve_pathway: 'Trigeminal', duration_seconds: 60 },
  { id: 4, name: 'Spine Arc', category: 'Touch', level: 2, description: 'Single continuous stroke from C7 to sacrum — traces sacral plexus territory.', pressure_range: '0.5–1N', nerve_pathway: 'Sacral', duration_seconds: 8 },
  { id: 5, name: 'Wrist Pulse Point', category: 'Touch', level: 1, description: 'Fingertip hold at the radial pulse — creates biofeedback intimacy loop.', pressure_range: '0.2–0.5N', nerve_pathway: 'Ulnar', duration_seconds: 10 },
  { id: 6, name: 'Temperature Contrast', category: 'Sensory', level: 3, description: 'Alternating warm breath and cool touch on the same skin patch — contrast amplifies sensitivity 3×.', pressure_range: '0N (breath)', nerve_pathway: 'Mixed', duration_seconds: 20 },
  { id: 7, name: 'Occipital Release', category: 'Pressure', level: 2, description: 'Thumb pad pressure at the base of the skull — still-point technique inducing full-body relaxation.', pressure_range: '3–6N', nerve_pathway: 'Vagus', duration_seconds: 20 },
  { id: 8, name: 'Inner Thigh Trace', category: 'Touch', level: 3, description: 'Slow line contact along inner thigh — high pudendal nerve density, maximum arousal potential.', pressure_range: '0.1–0.3N', nerve_pathway: 'Pudendal', duration_seconds: 15 },
  { id: 9, name: 'Breath on Neck', category: 'Sensory', level: 2, description: 'Controlled exhale at 1–2cm from the nape — warm airflow activates thermoreceptors without contact.', pressure_range: '0N (breath)', nerve_pathway: 'Vagus', duration_seconds: 5 },
  { id: 10, name: 'Sternum Press', category: 'Pressure', level: 1, description: 'Palm contact at the sternum — activates cardiac coherence and creates deep safety response.', pressure_range: '2–4N', nerve_pathway: 'Vagus', duration_seconds: 30 },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.toLowerCase()
    const limit = Number(searchParams.get('limit') ?? 20)
    const offset = Number(searchParams.get('offset') ?? 0)

    let results = TECHNIQUES
    if (q) {
      results = TECHNIQUES.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.nerve_pathway.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }

    const paginated = results.slice(offset, offset + limit)
    return NextResponse.json({ techniques: paginated, total: results.length })
  } catch (err) {
    console.error('[techniques]', err)
    return NextResponse.json({ error: 'Failed to fetch techniques' }, { status: 500 })
  }
}
