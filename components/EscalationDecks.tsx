'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────

interface Card {
  slug: string
  level: number
  level_name: string
  title: string
  subtitle: string
  body: string
  pacing: 'slow_burn' | 'high_tension'
}

const ALL_CARDS: Card[] = [
  { slug: 'l1-eye-contact', level: 1, level_name: 'Witty Banter', title: 'The 3-Second Hold', subtitle: 'Eye Contact Calibration', body: 'Hold eye contact 1 second longer than comfortable, then look away with a slight smile. The gap between "natural" and "intentional" is where tension begins.', pacing: 'slow_burn' },
  { slug: 'l1-name-effect', level: 1, level_name: 'Witty Banter', title: 'The Name Drop', subtitle: 'Personalization Signal', body: 'Use their first name once, mid-sentence, in an unexpected moment. "And honestly, [Name]—you\'re the only person I\'d debate this with." Names trigger a distinct neural response—attention sharpens involuntarily.', pacing: 'slow_burn' },
  { slug: 'l1-mirroring', level: 1, level_name: 'Witty Banter', title: 'Subtle Mirroring', subtitle: 'Body Language Sync', body: 'Slowly adopt their posture, gesture tempo, and breathing rate over 5-10 minutes. When mirroring is unconsciously detected, it creates profound feelings of being understood and seen.', pacing: 'slow_burn' },
  { slug: 'l1-banter', level: 1, level_name: 'Witty Banter', title: 'The Playful Challenge', subtitle: 'Light Intellectual Tension', body: 'Disagree with something minor and defend your position with amusement, not conviction. "I think you\'re completely wrong about that—and I\'m delighted by it." Tension + warmth = magnetic polarity.', pacing: 'slow_burn' },
  { slug: 'l2-touch-intro', level: 2, level_name: 'Sensory Awakening', title: 'The First Touch Ritual', subtitle: 'Intentional Contact', body: 'Reach across to point at something and let your hand land on their forearm for 2 seconds longer than necessary. Gauge: do they pull away, stay neutral, or lean slightly in? Your entire next sequence depends on this data point.', pacing: 'slow_burn' },
  { slug: 'l2-breath-sync', level: 2, level_name: 'Sensory Awakening', title: 'Breath Synchrony', subtitle: 'Parasympathetic Attunement', body: 'During a quiet moment, consciously slow your own breathing. Within 60-90 seconds, their breathing will often entrain to yours. This creates a sub-conscious physiological bond without any words.', pacing: 'slow_burn' },
  { slug: 'l2-scent', level: 2, level_name: 'Sensory Awakening', title: 'The Scent Moment', subtitle: 'Olfactory Priming', body: 'Lean in close to say something—close enough that they register your scent, then pull back before the moment becomes uncomfortable. Olfaction is the only sense with direct limbic system access—it bypasses rational filtering entirely.', pacing: 'slow_burn' },
  { slug: 'l3-vulnerability', level: 3, level_name: 'Emotional Deepening', title: 'Strategic Vulnerability', subtitle: 'Authentic Disclosure', body: 'Share something real that carries mild risk—a genuine fear, an unusual dream, a moment of past embarrassment. Vulnerability is contagious; authentic disclosure activates mirror neurons and creates rapid emotional reciprocity.', pacing: 'slow_burn' },
  { slug: 'l3-fantasy-adjacent', level: 3, level_name: 'Emotional Deepening', title: 'The Adjacent Fantasy', subtitle: 'Imagination Activation', body: 'Describe a scenario that is sensory and slightly provocative but grounded in plausibility: "I keep thinking about what it would be like to..." Let the sentence breathe before completing it. Imagination is the primary erogenous zone.', pacing: 'high_tension' },
  { slug: 'l4-anticipation', level: 4, level_name: 'Physical Escalation', title: 'The Pause Before', subtitle: 'Anticipatory Arousal', body: 'Move slowly toward contact—a hand, a face, a neck—and stop 2 inches short. Hold that position for 3-5 seconds. Let anticipation do the work. The dopaminergic anticipation state is neurologically more intense than arrival.', pacing: 'high_tension' },
  { slug: 'l4-breath-on-skin', level: 4, level_name: 'Physical Escalation', title: 'Breath on Skin', subtitle: 'Thermal Nerve Activation', body: 'Exhale slowly 1 inch from their nape or neck, without contact. The warm air activates vagus nerve thermoreceptors and creates an involuntary response that no amount of direct touch can replicate.', pacing: 'high_tension' },
  { slug: 'l5-nervous-system', level: 5, level_name: 'Deep Somatic Intimacy', title: 'Full Nervous System Surrender', subtitle: 'Parasympathetic Peak', body: 'The goal is no longer pleasure-seeking but nervous-system merging. Synchronize breath, heartrate (wrist-to-chest contact), and movement tempo. When two nervous systems attune completely, touch becomes secondary—the field between bodies carries the sensation.', pacing: 'slow_burn' },
  { slug: 'l5-bedroom-suspense', level: 5, level_name: 'Deep Somatic Intimacy', title: 'Bedroom Suspense Architecture', subtitle: 'Environment as Foreplay', body: 'Design the physical environment before arrival: 2200K amber light at 15% intensity, ambient low-frequency sound (binaural 40Hz), minimal exposed surfaces. The nervous system begins arousal response to environmental cues 15-20 minutes before physical contact—environment IS foreplay.', pacing: 'slow_burn' },
]

const LEVEL_COLORS: Record<number, string> = {
  1: '#6b8ea8',
  2: '#8a9e5c',
  3: '#c8860a',
  4: '#d4601a',
  5: '#e8a020',
}

const PACING_ICON: Record<string, string> = {
  slow_burn: '〜',
  high_tension: '↑',
}

// ─── Single card component ────────────────────────────────────────────

function DeckCard({
  card,
  index,
  total,
  onDismiss,
}: {
  card: Card
  index: number
  total: number
  onDismiss: (dir: 'left' | 'right') => void
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9])

  const levelColor = LEVEL_COLORS[card.level]

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x > 80) onDismiss('right')
    else if (info.offset.x < -80) onDismiss('left')
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, scale, position: 'absolute', width: '100%', zIndex: total - index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      animate={{ y: index * -4, scale: 1 - index * 0.03 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-7 cursor-grab select-none"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
    >
      {/* Level badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
            style={{ background: `${levelColor}22`, color: levelColor, border: `1px solid ${levelColor}44` }}
          >
            {card.level}
          </div>
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: levelColor }}
          >
            {card.level_name}
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: card.pacing === 'slow_burn' ? 'rgba(108,142,168,0.12)' : 'rgba(212,96,26,0.12)',
            color: card.pacing === 'slow_burn' ? '#6b8ea8' : '#d4601a',
            border: `1px solid ${card.pacing === 'slow_burn' ? 'rgba(108,142,168,0.2)' : 'rgba(212,96,26,0.2)'}`,
          }}
        >
          {PACING_ICON[card.pacing]} {card.pacing === 'slow_burn' ? 'Slow Burn' : 'High Tension'}
        </span>
      </div>

      {/* Content */}
      <h3
        className="text-2xl font-light text-[#f5e8c8] mb-1"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        {card.title}
      </h3>
      <p className="text-xs uppercase tracking-wider text-[#f5e8c8]/35 mb-5">
        {card.subtitle}
      </p>
      <p className="text-[#f5e8c8]/70 leading-relaxed text-sm">
        {card.body}
      </p>

      {/* Swipe hint */}
      {index === 0 && (
        <div className="mt-6 flex justify-between text-[#f5e8c8]/20 text-xs">
          <span>← Skip</span>
          <span>Swipe to navigate</span>
          <span>Save →</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Trajectory arc visualization ─────────────────────────────────────

function TrajectoryArc({ pacing }: { pacing: 'slow_burn' | 'high_tension' | 'both' }) {
  const isSlowBurn = pacing === 'slow_burn' || pacing === 'both'
  const isHighTension = pacing === 'high_tension' || pacing === 'both'

  return (
    <svg viewBox="0 0 200 80" className="w-full" style={{ height: 80 }}>
      <defs>
        <linearGradient id="slowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b8ea8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6b8ea8" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="tensionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4601a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e8a020" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[1, 2, 3, 4, 5].map((l) => (
        <g key={l}>
          <line
            x1={(l - 1) * 40 + 10}
            y1="5"
            x2={(l - 1) * 40 + 10}
            y2="70"
            stroke="rgba(245,232,200,0.05)"
            strokeWidth="0.5"
          />
          <text
            x={(l - 1) * 40 + 10}
            y="78"
            textAnchor="middle"
            fontSize="5"
            fill="rgba(245,232,200,0.25)"
            fontFamily="Inter"
          >
            L{l}
          </text>
        </g>
      ))}

      {/* Slow burn curve (gradual) */}
      {isSlowBurn && (
        <motion.path
          d="M10,65 C40,60 80,55 100,45 C130,30 160,15 190,8"
          fill="none"
          stroke="url(#slowGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}

      {/* High tension curve (steep) */}
      {isHighTension && (
        <motion.path
          d="M10,65 C30,62 60,55 90,40 C120,20 150,8 190,5"
          fill="none"
          stroke="url(#tensionGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      )}

      {/* Axis labels */}
      <text x="10" y="12" fontSize="4.5" fill="rgba(245,232,200,0.3)" fontFamily="Inter">
        Intensity
      </text>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────

export default function EscalationDecks() {
  const [activeLevel, setActiveLevel] = useState<number>(1)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const levelCards = ALL_CARDS.filter((c) => c.level === activeLevel)
  const activeCards = levelCards.filter((c) => !dismissed.has(c.slug))

  function handleDismiss(dir: 'left' | 'right') {
    if (activeCards.length === 0) return
    const topCard = activeCards[0]
    if (dir === 'right') {
      setSaved((s) => new Set(s).add(topCard.slug))
    }
    setDismissed((d) => new Set(d).add(topCard.slug))
  }

  function resetLevel() {
    setDismissed(new Set())
    setSaved(new Set())
  }

  const levels = [1, 2, 3, 4, 5]
  const levelNames = ['Banter', 'Sensory', 'Emotional', 'Escalation', 'Somatic']

  return (
    <div className="flex flex-col gap-8">
      {/* Level selector */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-2xl font-light text-[#f5e8c8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Escalation Decks
          </h2>
          <span className="text-[#f5e8c8]/30 text-xs">
            {saved.size} saved · {dismissed.size - saved.size} skipped
          </span>
        </div>

        {/* Level pills */}
        <div className="flex gap-2 flex-wrap">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => { setActiveLevel(l); resetLevel() }}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm transition-all"
              style={{
                background:
                  activeLevel === l ? `${LEVEL_COLORS[l]}20` : 'transparent',
                color:
                  activeLevel === l ? LEVEL_COLORS[l] : 'rgba(245,232,200,0.35)',
                border:
                  activeLevel === l
                    ? `1px solid ${LEVEL_COLORS[l]}44`
                    : '1px solid rgba(245,232,200,0.08)',
              }}
            >
              <span className="text-xs">{l}</span>
              {levelNames[l - 1]}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory arc */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-[#f5e8c8]/30">
            Arousal Arc — Level {activeLevel}
          </span>
          <div className="flex gap-3 text-xs text-[#f5e8c8]/30">
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-[#6b8ea8]" /> Slow Burn
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-dashed border-[#d4601a]" /> High Tension
            </span>
          </div>
        </div>
        <TrajectoryArc pacing="both" />
        <div
          className="mt-2 w-1 h-4 rounded ml-auto transition-all"
          style={{
            marginLeft: `${((activeLevel - 1) / 4) * 95 + 2}%`,
            background: LEVEL_COLORS[activeLevel],
            boxShadow: `0 0 8px ${LEVEL_COLORS[activeLevel]}`,
          }}
        />
      </div>

      {/* Card deck */}
      <div>
        <div className="relative" style={{ height: 340 }}>
          <AnimatePresence>
            {activeCards.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 text-center flex flex-col items-center justify-center h-full"
              >
                <div className="text-4xl mb-4 opacity-20">◆</div>
                <p
                  className="text-xl font-light text-[#f5e8c8]/50 mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Deck complete
                </p>
                <p className="text-sm text-[#f5e8c8]/30 mb-6">
                  {saved.size} technique{saved.size !== 1 ? 's' : ''} saved from this level
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={resetLevel}
                    className="px-6 py-2 rounded-2xl text-sm transition-all"
                    style={{
                      background: 'rgba(232,160,32,0.1)',
                      border: '1px solid rgba(232,160,32,0.25)',
                      color: '#e8a020',
                    }}
                  >
                    Replay Deck
                  </button>
                  {activeLevel < 5 && (
                    <button
                      onClick={() => { setActiveLevel((l) => l + 1); resetLevel() }}
                      className="px-6 py-2 rounded-2xl text-sm transition-all"
                      style={{
                        background: `${LEVEL_COLORS[activeLevel + 1]}15`,
                        border: `1px solid ${LEVEL_COLORS[activeLevel + 1]}30`,
                        color: LEVEL_COLORS[activeLevel + 1],
                      }}
                    >
                      Next Level →
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              [...activeCards].reverse().map((card, reverseIndex) => {
                const index = activeCards.length - 1 - reverseIndex
                return (
                  <DeckCard
                    key={card.slug}
                    card={card}
                    index={index}
                    total={activeCards.length}
                    onDismiss={handleDismiss}
                  />
                )
              })
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {activeCards.length > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDismiss('left')}
              className="w-12 h-12 rounded-full flex items-center justify-center text-[#f5e8c8]/30 hover:text-[#f5e8c8]/60 transition-all"
              style={{ border: '1px solid rgba(245,232,200,0.1)', background: 'rgba(245,232,200,0.03)' }}
            >
              ←
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDismiss('right')}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(232,160,32,0.12)',
                border: '1px solid rgba(232,160,32,0.25)',
                color: '#e8a020',
              }}
            >
              ✓
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
