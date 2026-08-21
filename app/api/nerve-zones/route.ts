import { NextResponse } from 'next/server'

const NERVE_ZONES = [
  { id: 1, slug: 'nape', label: 'Nape', silhouette: 'neutral', cx: 0.50, cy: 0.12, radius: 0.06, pathway: 'Vagus', sensitivity: 'High', description: 'Dense vagal innervation — sustained touch here lowers heart rate and activates the parasympathetic response.' },
  { id: 2, slug: 'behind-ear', label: 'Behind Ear', silhouette: 'neutral', cx: 0.68, cy: 0.10, radius: 0.05, pathway: 'Trigeminal', sensitivity: 'High', description: 'Auricular branch of the vagus nerve — warm breath here triggers immediate galvanic skin response.' },
  { id: 3, slug: 'inner-wrist', label: 'Inner Wrist', silhouette: 'neutral', cx: 0.18, cy: 0.52, radius: 0.05, pathway: 'Ulnar', sensitivity: 'Medium', description: 'Ulnar nerve territory with visible vein pathways — tracing these activates deep sensory awareness.' },
  { id: 4, slug: 'inner-thigh', label: 'Inner Thigh', silhouette: 'neutral', cx: 0.36, cy: 0.70, radius: 0.07, pathway: 'Pudendal', sensitivity: 'Very High', description: 'Pudendal nerve proximity — highest arousal response per surface area of any zone.' },
  { id: 5, slug: 'lower-abdomen', label: 'Lower Abdomen', silhouette: 'neutral', cx: 0.50, cy: 0.58, radius: 0.06, pathway: 'Sacral', sensitivity: 'High', description: 'Sacral plexus territory — sustained warmth here triggers full pelvic floor relaxation.' },
  { id: 6, slug: 'sacral', label: 'Sacral Base', silhouette: 'neutral', cx: 0.50, cy: 0.66, radius: 0.06, pathway: 'Sacral', sensitivity: 'High', description: 'S2–S4 nerve roots — the primary sacral plexus gateway for arousal cascade.' },
  { id: 7, slug: 'collarbone', label: 'Collarbone', silhouette: 'neutral', cx: 0.38, cy: 0.22, radius: 0.06, pathway: 'Vagus', sensitivity: 'Medium', description: 'Supraclavicular nerve branch — tracing the collarbone activates chest-level vagal response.' },
  { id: 8, slug: 'scalp-base', label: 'Scalp Base', silhouette: 'neutral', cx: 0.50, cy: 0.08, radius: 0.05, pathway: 'Occipital', sensitivity: 'High', description: 'Occipital nerve cluster — pressure here induces still-point response and full-body parasympathetic release.' },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const silhouette = searchParams.get('silhouette') ?? 'neutral'
    const zones = silhouette === 'neutral'
      ? NERVE_ZONES
      : NERVE_ZONES.filter(z => z.silhouette === silhouette || z.silhouette === 'neutral')
    return NextResponse.json({ zones, total: zones.length })
  } catch (err) {
    console.error('[nerve-zones]', err)
    return NextResponse.json({ error: 'Failed to fetch nerve zones' }, { status: 500 })
  }
}
