import { NextResponse } from 'next/server'

const ESCALATION_CARDS = [
  { id: 1, level: 1, title: 'Eye Contact Hold', category: 'Banter', description: 'Sustained gaze for 6 seconds — the threshold where comfort becomes tension.', instruction: 'Hold eye contact through the natural breaking point. Breathe slowly. Let silence work.' },
  { id: 2, level: 1, title: 'Proximity Shift', category: 'Banter', description: 'Close the physical gap by 40% without explanation — let the energy explain itself.', instruction: 'Move closer on a natural conversational beat. Hold position. Do not acknowledge the shift.' },
  { id: 3, level: 1, title: 'The Name Drop', category: 'Banter', description: 'Use their name mid-sentence, unexpectedly, in a lower register.', instruction: 'Drop the name after the first clause of a sentence. Pause for 2 seconds after. Resume normally.' },
  { id: 4, level: 2, title: 'Wrist Trace', category: 'Sensory', description: 'Single fingertip following inner wrist vein pathways at 2cm/sec.', instruction: 'Take their wrist gently. Trace visibly — follow the pathway, do not invent one. End at the pulse point.' },
  { id: 5, level: 2, title: 'Spine Arc', category: 'Sensory', description: 'Continuous single-stroke trace from nape to sacrum — 8 full seconds.', instruction: 'One finger. Begin at C7. Increase pressure at thoracic curve. Feather out at sacrum. Never retrace.' },
  { id: 6, level: 2, title: 'Breath on Nape', category: 'Sensory', description: 'Controlled exhale at 1cm from the neck — warmth before touch.', instruction: 'Position mouth at 1cm. Exhale fully and slowly. Hold position 3 seconds. Pull back slowly.' },
  { id: 7, level: 2, title: 'Scalp Release', category: 'Sensory', description: 'Distributed fingertip pressure across the scalp — occipital still-point finish.', instruction: 'Start at temples. Rotate slowly. Migrate to occipital base. Two thumbs — 20 second hold.' },
  { id: 8, level: 3, title: 'The Controlled Pause', category: 'Emotional', description: 'Stop all action at peak intensity. Hold completely still for 10 seconds.', instruction: 'One word: "Wait." Stillness for 10 seconds. Resume at 20% slower than before the pause.' },
  { id: 9, level: 3, title: 'Forehead Touch', category: 'Emotional', description: 'Press foreheads together — shared breath, eyes open or closed.', instruction: 'Approach slowly. Make contact. Match breath for 6 full cycles. No talking.' },
  { id: 10, level: 3, title: 'Verbal Specificity', category: 'Emotional', description: 'Name exactly what you want in one precise, unhurried sentence.', instruction: 'Present tense. Anatomically specific. Delivered at resting cadence. Begin within 3 seconds of speaking.' },
  { id: 11, level: 4, title: 'Temperature Contrast', category: 'Escalation', description: 'Warm breath followed by cool touch on the same skin patch — sensitivity amplified 3×.', instruction: 'Exhale warm breath. 3 second pause. Place cool fingertips on exact same area. Repeat 3 cycles.' },
  { id: 12, level: 4, title: 'Inner Thigh Trace', category: 'Escalation', description: 'Feather trace along inner thigh at 2cm/sec — pudendal nerve territory.', instruction: 'Begin at knee. Slow pace. Stop 10cm from apex. Hold. Let them close the gap or not.' },
  { id: 13, level: 5, title: 'Breath Sync Arc', category: 'Somatic', description: 'Deliberately entrain breath rates — shared arousal builds as one arc.', instruction: 'Slow your breath visibly. Wait 90 seconds for entrainment. Gradually accelerate together.' },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const levelParam = searchParams.get('level')
    const level = levelParam ? Number(levelParam) : undefined
    const cards = level !== undefined
      ? ESCALATION_CARDS.filter(c => c.level === level)
      : ESCALATION_CARDS
    return NextResponse.json({ cards, total: cards.length })
  } catch (err) {
    console.error('[escalation-cards]', err)
    return NextResponse.json({ error: 'Failed to fetch escalation cards' }, { status: 500 })
  }
}
