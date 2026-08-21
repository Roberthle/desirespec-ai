'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

type Pacing = 'slow' | 'medium' | 'fast'

interface ScenarioState {
  tension: number    // 0–100
  arousal: number    // 0–100
  pacing: Pacing
  depth: number      // narrative depth level 1–5
}

interface Choice {
  text: string
  effect: Partial<ScenarioState> & { tension?: number; arousal?: number }
  nextNode: string
}

interface ScenarioNode {
  id: string
  type: 'prompt' | 'outcome'
  title?: string
  prompt: string
  subtext?: string
  choices?: Choice[]
  outcomeLabel?: string
}

interface Archetype {
  id: string
  label: string
  icon: string
  tagline: string
  color: string
  nodes: ScenarioNode[]
}

// ─── Scenario data ────────────────────────────────────────────────────

const ARCHETYPES: Archetype[] = [
  {
    id: 'slow-burn-noir',
    label: 'Slow Burn Noir',
    icon: '〜',
    tagline: 'Rain, low light, deliberate tension',
    color: '#c8860a',
    nodes: [
      {
        id: 'sbn-1', type: 'prompt',
        title: 'Late evening. A single lamp.',
        prompt: 'The room is quiet except for rain against glass. You\'ve been talking for hours. The conversation slows. The air thickens. What do you do first?',
        choices: [
          { text: 'Let the silence grow — hold eye contact for 6 full seconds', effect: { tension: 18, arousal: 8, pacing: 'slow' }, nextNode: 'sbn-2a' },
          { text: 'Lean slightly closer — say nothing yet', effect: { tension: 22, arousal: 12, pacing: 'slow' }, nextNode: 'sbn-2b' },
          { text: 'Reach across — let your hand rest near theirs without contact', effect: { tension: 28, arousal: 15, pacing: 'medium' }, nextNode: 'sbn-2c' },
        ],
      },
      {
        id: 'sbn-2a', type: 'prompt',
        title: 'The held gaze.',
        prompt: 'Six seconds of eye contact. Their breathing shifts almost imperceptibly. The silence is charged now. How do you break it?',
        choices: [
          { text: 'Speak quietly — "I\'ve been thinking about this all evening"', effect: { tension: 30, arousal: 20, pacing: 'slow' }, nextNode: 'sbn-3' },
          { text: 'Don\'t speak — let your gaze drop slowly to their mouth, then back up', effect: { tension: 38, arousal: 28, pacing: 'slow' }, nextNode: 'sbn-3' },
        ],
      },
      {
        id: 'sbn-2b', type: 'prompt',
        title: 'Proximity calibration.',
        prompt: 'You\'ve closed the distance by half. You can hear their breath. The lamp throws warm light across their face. What now?',
        choices: [
          { text: 'Exhale slowly — let them feel the warmth without contact', effect: { tension: 35, arousal: 22, pacing: 'slow' }, nextNode: 'sbn-3' },
          { text: 'Speak their name — once, quietly, mid-breath', effect: { tension: 40, arousal: 30, pacing: 'medium' }, nextNode: 'sbn-3' },
        ],
      },
      {
        id: 'sbn-2c', type: 'prompt',
        title: 'The almost-touch.',
        prompt: 'Your hand rests 2 centimeters from theirs. Neither of you moves. This is the threshold — the longest pause.',
        choices: [
          { text: 'Hold the pause for 5 full seconds — then make contact', effect: { tension: 45, arousal: 35, pacing: 'slow' }, nextNode: 'sbn-3' },
          { text: 'Slowly rotate your hand — palm open, invitation', effect: { tension: 42, arousal: 38, pacing: 'medium' }, nextNode: 'sbn-3' },
        ],
      },
      {
        id: 'sbn-3', type: 'prompt',
        title: 'The first contact.',
        prompt: 'Touch has arrived — or is seconds away. The nervous system is primed. Sacral tension rising. How do you direct the energy?',
        choices: [
          { text: 'Feather-trace the inside of their wrist — 3cm/sec — no pressure', effect: { tension: 60, arousal: 52, pacing: 'slow' }, nextNode: 'sbn-4' },
          { text: 'Press your forehead lightly against theirs — breathe together', effect: { tension: 55, arousal: 58, pacing: 'slow' }, nextNode: 'sbn-4' },
          { text: 'Exhale against the side of their neck — lips at 1cm', effect: { tension: 65, arousal: 62, pacing: 'medium' }, nextNode: 'sbn-4' },
        ],
      },
      {
        id: 'sbn-4', type: 'prompt',
        title: 'Deepening.',
        prompt: 'The arc is building. Both nervous systems are attuning. You can feel their heartrate through their skin. What is the next deliberate choice?',
        choices: [
          { text: 'Move to the nape — slow circular pressure with thumb pad', effect: { tension: 78, arousal: 72, pacing: 'slow' }, nextNode: 'sbn-outcome' },
          { text: 'Pull back 2 inches — make them come to you', effect: { tension: 82, arousal: 68, pacing: 'slow' }, nextNode: 'sbn-outcome' },
          { text: 'Speak one true sentence — low, slow, chest voice', effect: { tension: 75, arousal: 78, pacing: 'medium' }, nextNode: 'sbn-outcome' },
        ],
      },
      {
        id: 'sbn-outcome', type: 'outcome',
        prompt: 'The slow burn has reached its peak gradient. Maximum tension without resolution — the nervous system\'s most receptive state.',
        outcomeLabel: 'Noir Arc Complete',
      },
    ],
  },
  {
    id: 'high-tension',
    label: 'High-Tension Spontaneous',
    icon: '↑',
    tagline: 'Unexpected momentum, fast initiation',
    color: '#d4601a',
    nodes: [
      {
        id: 'ht-1', type: 'prompt',
        title: 'Unplanned. Immediate.',
        prompt: 'The moment was not arranged. You are mid-conversation, mid-laugh — and suddenly the energy shifts. A magnetic current between you. The window is 15 seconds. How do you move?',
        choices: [
          { text: 'Step directly into their space — eyes locked', effect: { tension: 35, arousal: 28, pacing: 'fast' }, nextNode: 'ht-2a' },
          { text: 'Touch first — hand on forearm, firmly, briefly', effect: { tension: 30, arousal: 32, pacing: 'fast' }, nextNode: 'ht-2b' },
          { text: 'Verbal — one short sentence, low and direct', effect: { tension: 28, arousal: 35, pacing: 'medium' }, nextNode: 'ht-2c' },
        ],
      },
      {
        id: 'ht-2a', type: 'prompt',
        title: 'Close range.',
        prompt: 'You are inside their personal space. They haven\'t moved back. Their pupils are dilated — you can see it. What next?',
        choices: [
          { text: 'Place a hand on their waist — firm, intentional, no hesitation', effect: { tension: 55, arousal: 48, pacing: 'fast' }, nextNode: 'ht-3' },
          { text: 'Hold position — let them close the final gap', effect: { tension: 62, arousal: 45, pacing: 'medium' }, nextNode: 'ht-3' },
        ],
      },
      {
        id: 'ht-2b', type: 'prompt',
        title: 'Contact initiated.',
        prompt: 'Your hand made contact — they leaned into it slightly. The signal is clear. The momentum is yours. How do you accelerate?',
        choices: [
          { text: 'Slide hand up from forearm — slow — stop at inner elbow', effect: { tension: 52, arousal: 50, pacing: 'medium' }, nextNode: 'ht-3' },
          { text: 'Pull them toward you — one motion, confident', effect: { tension: 58, arousal: 55, pacing: 'fast' }, nextNode: 'ht-3' },
        ],
      },
      {
        id: 'ht-2c', type: 'prompt',
        title: 'Words as catalysts.',
        prompt: 'Your sentence landed. They\'ve gone quiet — which is everything. You\'ve named the energy in the room. Now act.',
        choices: [
          { text: 'Move into them immediately — physical confirmation', effect: { tension: 50, arousal: 52, pacing: 'fast' }, nextNode: 'ht-3' },
          { text: 'Hold — let the sentence breathe for 3 seconds first', effect: { tension: 60, arousal: 48, pacing: 'medium' }, nextNode: 'ht-3' },
        ],
      },
      {
        id: 'ht-3', type: 'prompt',
        title: 'Momentum decision.',
        prompt: 'The energy is electric and escalating. You\'ve created a runway. Now the critical question — sustain or release?',
        choices: [
          { text: 'Sustain — pull back 30% and make them chase', effect: { tension: 82, arousal: 65, pacing: 'medium' }, nextNode: 'ht-outcome' },
          { text: 'Release — allow the full momentum to complete', effect: { tension: 72, arousal: 88, pacing: 'fast' }, nextNode: 'ht-outcome' },
          { text: 'Redirect — shift to slow breath sync — massive contrast', effect: { tension: 90, arousal: 75, pacing: 'slow' }, nextNode: 'ht-outcome' },
        ],
      },
      {
        id: 'ht-outcome', type: 'outcome',
        prompt: 'High-voltage arc completed. The spontaneous pathway generates the highest short-cycle arousal peaks — but requires precise calibration to prevent premature resolution.',
        outcomeLabel: 'High-Tension Arc Complete',
      },
    ],
  },
  {
    id: 'sensory-overhaul',
    label: 'Sensory Overhaul',
    icon: '◈',
    tagline: 'Controlled environment, layered inputs',
    color: '#e8a020',
    nodes: [
      {
        id: 'so-1', type: 'prompt',
        title: 'The designed environment.',
        prompt: 'The space has been intentionally prepared. 2200K amber light. Skin temperature air. A single low-frequency tone. They have just entered. What is the first sensory layer you introduce?',
        choices: [
          { text: 'Scent — warm cedarwood diffusing near the entrance', effect: { tension: 15, arousal: 20, pacing: 'slow' }, nextNode: 'so-2a' },
          { text: 'Sound — binaural 10Hz tone barely audible through speakers', effect: { tension: 18, arousal: 22, pacing: 'slow' }, nextNode: 'so-2b' },
          { text: 'Lighting — shift from overhead to a single amber lamp source', effect: { tension: 12, arousal: 18, pacing: 'slow' }, nextNode: 'so-2c' },
        ],
      },
      {
        id: 'so-2a', type: 'prompt',
        title: 'Olfactory priming active.',
        prompt: 'Scent has entered the limbic system directly. No rational processing — pure affect. 90 seconds have passed. What do you layer next?',
        choices: [
          { text: 'Temperature — warm compress on nape of neck — 38°C', effect: { tension: 30, arousal: 38, pacing: 'slow' }, nextNode: 'so-3' },
          { text: 'Touch — slow fingertip trace down the spine', effect: { tension: 35, arousal: 42, pacing: 'slow' }, nextNode: 'so-3' },
        ],
      },
      {
        id: 'so-2b', type: 'prompt',
        title: 'Auditory entrainment.',
        prompt: 'The binaural tone is shifting brainwave state toward alpha — relaxed alertness. Their breathing has slowed already. Next layer?',
        choices: [
          { text: 'Scent — introduce warm sandalwood from behind them', effect: { tension: 28, arousal: 35, pacing: 'slow' }, nextNode: 'so-3' },
          { text: 'Proximity — stand close enough for them to feel body heat', effect: { tension: 32, arousal: 38, pacing: 'slow' }, nextNode: 'so-3' },
        ],
      },
      {
        id: 'so-2c', type: 'prompt',
        title: 'Visual field transformed.',
        prompt: 'The amber light narrows attention — the nervous system flags "safe" and begins downregulating cortisol. What arrives next in the sensory sequence?',
        choices: [
          { text: 'Sound — add soft low-frequency rumble at 40Hz', effect: { tension: 25, arousal: 32, pacing: 'slow' }, nextNode: 'so-3' },
          { text: 'Touch — hands on both shoulders from behind — hold 8 seconds', effect: { tension: 30, arousal: 38, pacing: 'slow' }, nextNode: 'so-3' },
        ],
      },
      {
        id: 'so-3', type: 'prompt',
        title: 'Multi-layer activation.',
        prompt: 'Three sensory systems are engaged simultaneously. Their interoceptive awareness is heightened. They are acutely present. The sacral and vagus pathways are primed. You choose the final escalation vector.',
        choices: [
          { text: 'Temperature contrast — ice cube trace, followed by warm breath on same path', effect: { tension: 65, arousal: 68, pacing: 'medium' }, nextNode: 'so-4' },
          { text: 'Pressure — sustained firm palm on sacral plexus — 30 full seconds', effect: { tension: 58, arousal: 72, pacing: 'slow' }, nextNode: 'so-4' },
          { text: 'Breath — exhale slowly across inner wrist, then inner elbow, tracing vagus branches', effect: { tension: 60, arousal: 65, pacing: 'slow' }, nextNode: 'so-4' },
        ],
      },
      {
        id: 'so-4', type: 'prompt',
        title: 'Peak sensory state.',
        prompt: 'They are in full-body heightened awareness. The environment, scent, sound, temperature, and touch have stacked into a compound arousal state. One choice remains.',
        choices: [
          { text: 'Remove one sensory input — create contrast and craving', effect: { tension: 85, arousal: 80, pacing: 'slow' }, nextNode: 'so-outcome' },
          { text: 'Layer all inputs simultaneously for 60 seconds', effect: { tension: 75, arousal: 90, pacing: 'medium' }, nextNode: 'so-outcome' },
        ],
      },
      {
        id: 'so-outcome', type: 'outcome',
        prompt: 'Sensory Overhaul complete. Maximum multi-modal activation achieved. This pathway produces the longest sustained arousal states and highest reported depth of physical connection.',
        outcomeLabel: 'Sensory Arc Complete',
      },
    ],
  },
]

// ─── SVG silhouette — proximity-driven ───────────────────────────────

function ProximitySilhouette({
  tension,
  pacing,
  color,
}: {
  tension: number
  pacing: Pacing
  color: string
}) {
  // Gap between figures shrinks as tension rises: 28px → 4px
  const gap = Math.round(28 - (tension / 100) * 24)
  // Stroke weight shifts with pacing
  const sw = pacing === 'slow' ? 0.8 : pacing === 'medium' ? 1.2 : 1.8
  // Glow opacity scales with tension
  const glowOpacity = (tension / 100) * 0.18

  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="fb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={glowOpacity * 2} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fb-left" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.1)" />
        </linearGradient>
        <linearGradient id="fb-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.1)" />
        </linearGradient>
      </defs>

      {/* Tension glow between figures */}
      <ellipse
        cx="100" cy="80"
        rx={gap * 1.5} ry={50}
        fill="url(#fb-glow)"
      />

      {/* Left figure */}
      <path
        d={`M${100 - gap - 16} 15 C${100 - gap - 18} 30 ${100 - gap - 20} 48 ${100 - gap - 18} 65 C${100 - gap - 14} 82 ${100 - gap - 8} 88 ${100 - gap} 90 L${100 - gap} 130 C${100 - gap} 145 ${100 - gap - 4} 155 ${100 - gap - 8} 158`}
        stroke="url(#fb-left)"
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* Right figure */}
      <path
        d={`M${100 + gap + 16} 15 C${100 + gap + 18} 30 ${100 + gap + 20} 48 ${100 + gap + 18} 65 C${100 + gap + 14} 82 ${100 + gap + 8} 88 ${100 + gap} 90 L${100 + gap} 130 C${100 + gap} 145 ${100 + gap + 4} 155 ${100 + gap + 8} 158`}
        stroke="url(#fb-right)"
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* Near-touch connection arcs — appear at high tension */}
      {tension > 40 && [75, 88, 100].map((y, i) => (
        <motion.path
          key={i}
          d={`M${100 - gap + 2} ${y} Q100 ${y + 2} ${100 + gap - 2} ${y}`}
          stroke={color}
          strokeWidth="0.4"
          strokeDasharray="1.5 2.5"
          strokeOpacity={Math.min(0.7, (tension - 40) / 60)}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          fill="none"
        />
      ))}
    </svg>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────

function TensionBar({
  label,
  value,
  color,
  pulseAbove,
}: {
  label: string
  value: number
  color: string
  pulseAbove: number
}) {
  const isPulsing = value >= pulseAbove
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-[#f5e8c8]/40 uppercase tracking-wider">{label}</span>
        <motion.span
          className="text-xs font-medium"
          style={{ color }}
          animate={isPulsing ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Math.round(value)}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: isPulsing ? `0 0 8px ${color}` : 'none',
          }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export default function FantasySandbox() {
  const [activeArchetypeId, setActiveArchetypeId] = useState<string | null>(null)
  const [currentNodeId, setCurrentNodeId] = useState<string>('')
  const [state, setState] = useState<ScenarioState>({
    tension: 0,
    arousal: 0,
    pacing: 'slow',
    depth: 0,
  })
  const [history, setHistory] = useState<string[]>([])

  const archetype = ARCHETYPES.find(a => a.id === activeArchetypeId)
  const nodeMap = archetype
    ? Object.fromEntries(archetype.nodes.map(n => [n.id, n]))
    : {}
  const currentNode = archetype ? nodeMap[currentNodeId] : null

  function startScenario(archetypeId: string) {
    const a = ARCHETYPES.find(x => x.id === archetypeId)!
    setActiveArchetypeId(archetypeId)
    setCurrentNodeId(a.nodes[0].id)
    setState({ tension: 0, arousal: 0, pacing: 'slow', depth: 0 })
    setHistory([])
  }

  function makeChoice(choice: Choice) {
    const newState: ScenarioState = {
      tension: Math.min(100, state.tension + (choice.effect.tension ?? 0)),
      arousal: Math.min(100, state.arousal + (choice.effect.arousal ?? 0)),
      pacing: (choice.effect.pacing as Pacing) ?? state.pacing,
      depth: state.depth + 1,
    }
    setState(newState)
    setHistory(h => [...h, currentNodeId])
    setCurrentNodeId(choice.nextNode)
  }

  function goBack() {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setCurrentNodeId(prev)
  }

  function reset() {
    setActiveArchetypeId(null)
    setCurrentNodeId('')
    setState({ tension: 0, arousal: 0, pacing: 'slow', depth: 0 })
    setHistory([])
  }

  const pacingLabel: Record<Pacing, string> = {
    slow: 'Slow Burn',
    medium: 'Measured',
    fast: 'High Velocity',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-5">
        <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">Interactive</p>
        <h2
          className="text-2xl font-light text-[#f5e8c8]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Fantasy Sandbox
        </h2>
        <p className="text-[#f5e8c8]/35 text-sm mt-1">
          Immersive decision pathways · Dynamic tension engine · Responsive silhouettes
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Archetype selector ── */}
        {!activeArchetypeId && (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {ARCHETYPES.map(a => (
              <motion.button
                key={a.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startScenario(a.id)}
                className="glass-panel p-6 text-left flex flex-col gap-3"
              >
                <div className="text-3xl" style={{ color: a.color }}>{a.icon}</div>
                <div>
                  <h3
                    className="text-xl font-light text-[#f5e8c8] mb-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {a.label}
                  </h3>
                  <p className="text-xs text-[#f5e8c8]/35">{a.tagline}</p>
                </div>
                <div
                  className="mt-auto text-xs px-3 py-1 rounded-full self-start"
                  style={{
                    background: `${a.color}15`,
                    border: `1px solid ${a.color}30`,
                    color: a.color,
                  }}
                >
                  Begin →
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ── Active scenario ── */}
        {activeArchetypeId && archetype && currentNode && (
          <motion.div
            key="scenario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {/* Left: SVG + stats */}
            <div className="flex flex-col gap-4">
              {/* Silhouette */}
              <div className="glass-panel p-4 flex items-center justify-center" style={{ height: 200 }}>
                <ProximitySilhouette
                  tension={state.tension}
                  pacing={state.pacing}
                  color={archetype.color}
                />
              </div>

              {/* Stats */}
              <div className="glass-panel p-4 flex flex-col gap-3">
                <TensionBar
                  label="Tension"
                  value={state.tension}
                  color={archetype.color}
                  pulseAbove={70}
                />
                <TensionBar
                  label="Arousal"
                  value={state.arousal}
                  color="#d4601a"
                  pulseAbove={80}
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#f5e8c8]/30">Pacing</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${archetype.color}12`,
                      border: `1px solid ${archetype.color}25`,
                      color: archetype.color,
                    }}
                  >
                    {pacingLabel[state.pacing]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#f5e8c8]/30">Depth</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: i < state.depth
                            ? archetype.color
                            : 'rgba(245,232,200,0.08)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-2">
                {history.length > 0 && (
                  <button
                    onClick={goBack}
                    className="flex-1 py-2 rounded-xl text-xs text-[#f5e8c8]/35 hover:text-[#f5e8c8]/55 transition-colors"
                    style={{ border: '1px solid rgba(245,232,200,0.08)' }}
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={reset}
                  className="flex-1 py-2 rounded-xl text-xs text-[#f5e8c8]/25 hover:text-[#f5e8c8]/45 transition-colors"
                  style={{ border: '1px solid rgba(245,232,200,0.06)' }}
                >
                  ↺ Restart
                </button>
              </div>
            </div>

            {/* Right: Node content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-7 h-full flex flex-col"
                >
                  {currentNode.type === 'prompt' ? (
                    <>
                      <div
                        className="text-xs uppercase tracking-[0.25em] mb-2"
                        style={{ color: archetype.color }}
                      >
                        {archetype.label}
                      </div>
                      {currentNode.title && (
                        <h3
                          className="text-2xl font-light text-[#f5e8c8] mb-4"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {currentNode.title}
                        </h3>
                      )}
                      <p className="text-[#f5e8c8]/70 leading-relaxed mb-8 text-base italic flex-1"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
                        &ldquo;{currentNode.prompt}&rdquo;
                      </p>
                      <div className="flex flex-col gap-3">
                        {currentNode.choices?.map((choice, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => makeChoice(choice)}
                            className="flex items-start gap-4 p-4 rounded-xl text-left transition-all group"
                            style={{
                              background: `${archetype.color}08`,
                              border: `1px solid ${archetype.color}18`,
                            }}
                          >
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-medium"
                              style={{
                                background: `${archetype.color}18`,
                                color: archetype.color,
                                border: `1px solid ${archetype.color}35`,
                              }}
                            >
                              {i + 1}
                            </span>
                            <span className="text-sm text-[#f5e8c8]/65 group-hover:text-[#f5e8c8]/85 transition-colors leading-relaxed">
                              {choice.text}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Outcome card */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center h-full gap-6"
                    >
                      <div className="text-5xl" style={{ color: archetype.color }}>
                        {archetype.icon}
                      </div>
                      <div>
                        <p
                          className="text-xs uppercase tracking-[0.3em] mb-2"
                          style={{ color: archetype.color }}
                        >
                          {currentNode.outcomeLabel}
                        </p>
                        <p
                          className="text-lg font-light text-[#f5e8c8]/70 leading-relaxed max-w-md"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {currentNode.prompt}
                        </p>
                      </div>
                      {/* Final score summary */}
                      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                        {[
                          { label: 'Peak Tension', value: state.tension, color: archetype.color },
                          { label: 'Peak Arousal', value: state.arousal, color: '#d4601a' },
                        ].map(s => (
                          <div
                            key={s.label}
                            className="p-3 rounded-xl text-center"
                            style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}
                          >
                            <div className="text-2xl font-light" style={{ color: s.color }}>
                              {Math.round(s.value)}
                            </div>
                            <div className="text-xs text-[#f5e8c8]/30 mt-0.5">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startScenario(archetype.id)}
                          className="px-6 py-2.5 rounded-2xl text-sm transition-all"
                          style={{
                            background: `${archetype.color}15`,
                            border: `1px solid ${archetype.color}30`,
                            color: archetype.color,
                          }}
                        >
                          Replay Scenario
                        </button>
                        <button
                          onClick={reset}
                          className="px-6 py-2.5 rounded-2xl text-sm text-[#f5e8c8]/35 hover:text-[#f5e8c8]/55 transition-colors"
                          style={{ border: '1px solid rgba(245,232,200,0.08)' }}
                        >
                          All Archetypes
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
