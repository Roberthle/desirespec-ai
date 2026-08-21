'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

interface NerveZoneData {
  slug: string
  name: string
  pathway: string
  body_region: string
  sensitivity: number
  cx: number  // 0-100 coordinate space
  cy: number
  description: string
  pressure_tips: string[]
  color: string
}

type Silhouette = 'neutral' | 'anterior' | 'posterior'

// ─── Static zone data (matches seed.sql coordinates) ─────────────────

const NERVE_ZONES: NerveZoneData[] = [
  {
    slug: 'scalp-temples', name: 'Temples & Scalp', pathway: 'Trigeminal',
    body_region: 'face', sensitivity: 8,
    cx: 50, cy: 11, color: '#e8a020',
    description: 'Trigeminal nerve branches across the scalp create whole-head sensation cascades from localized pressure.',
    pressure_tips: ['Fingertip circular scalp massage', 'Gentle hair-root tugging', 'Warm palm cupped over temple'],
  },
  {
    slug: 'behind-ear', name: 'Behind Ear (Mastoid)', pathway: 'Vagus',
    body_region: 'face', sensitivity: 8,
    cx: 71, cy: 17, color: '#d4601a',
    description: 'Auricular branch of the vagus nerve creates immediate parasympathetic activation with minimal stimulation.',
    pressure_tips: ['Lips grazed lightly behind ear', 'Warm breath exhaled slowly', 'Light fingernail trace from ear to collarbone'],
  },
  {
    slug: 'nape', name: 'Nape of Neck', pathway: 'Vagus',
    body_region: 'neck', sensitivity: 9,
    cx: 50, cy: 22, color: '#c8860a',
    description: 'Dense concentration of vagus nerve branches. Gentle touch here triggers parasympathetic calm and heightened arousal simultaneously.',
    pressure_tips: ['Light fingertip tracing from hairline downward', 'Warm breath held 2 inches from skin', 'Slow circular pressure with pad of thumb'],
  },
  {
    slug: 'inner-wrist', name: 'Inner Wrist', pathway: 'Ulnar',
    body_region: 'hands', sensitivity: 7,
    cx: 19, cy: 57, color: '#e8a020',
    description: 'Rich network of ulnar nerve endings sensitive to temperature contrast and light tracing pressure.',
    pressure_tips: ['Ice cube trace followed by warm breath', 'Feather-light fingertip drawing slow spirals', 'Light nail-drag along tendon line'],
  },
  {
    slug: 'inner-elbow', name: 'Inner Elbow', pathway: 'Ulnar',
    body_region: 'hands', sensitivity: 6,
    cx: 20, cy: 48, color: '#c06858',
    description: 'Medial cutaneous nerve branches make this crease highly responsive to light stimulation.',
    pressure_tips: ['Slow fingertip trace along the crease', 'Gentle lip contact', 'Temperature contrast: cool then warm'],
  },
  {
    slug: 'lower-abdomen', name: 'Lower Abdomen', pathway: 'Sacral',
    body_region: 'abdomen', sensitivity: 7,
    cx: 50, cy: 60, color: '#d4601a',
    description: 'Hypogastric nerve network creates deep pressure sensitivity. Responds strongly to rhythm and temperature.',
    pressure_tips: ['Slow circular palm pressure', 'Warm compress held 20 seconds', 'Fingertip tracing in figure-8 patterns'],
  },
  {
    slug: 'inner-thigh', name: 'Inner Thigh', pathway: 'Pudendal',
    body_region: 'inner_thigh', sensitivity: 9,
    cx: 36, cy: 73, color: '#c8860a',
    description: 'Pudendal nerve proximity makes the inner thigh one of the most erotically charged non-genital zones.',
    pressure_tips: ['Slow upward fingertip trace stopping before apex', 'Alternating warm breath and cool air', 'Firm gripping pressure moving inward'],
  },
  {
    slug: 'sacral', name: 'Sacral Plexus', pathway: 'Sacral',
    body_region: 'lower_back', sensitivity: 8,
    cx: 50, cy: 68, color: '#e8a020',
    description: 'The sacral plexus governs pelvic floor sensation. Deep warmth application here amplifies full-body arousal pathways.',
    pressure_tips: ['Firm palm pressure held 10 seconds', 'Slow circular massage with moderate pressure', 'Warm compress then breath'],
  },
]

const PATHWAY_COLORS: Record<string, string> = {
  Vagus: '#e8a020',
  Pudendal: '#c8860a',
  Sacral: '#d4601a',
  Trigeminal: '#f0b840',
  Ulnar: '#c06858',
}

// ─── SVG Silhouette paths (simplified human contour) ─────────────────
// viewBox="0 0 100 120"

function HumanSilhouette({ view }: { view: Silhouette }) {
  if (view === 'posterior') {
    return (
      <g stroke="rgba(245,232,200,0.12)" strokeWidth="0.4" fill="none">
        {/* Head */}
        <ellipse cx="50" cy="10" rx="8" ry="9" />
        {/* Neck */}
        <line x1="45" y1="19" x2="43" y2="23" />
        <line x1="55" y1="19" x2="57" y2="23" />
        {/* Shoulders */}
        <path d="M43 23 Q28 24 22 30 L20 45 Q20 50 24 50 L26 70 Q26 80 28 90 L32 118" />
        <path d="M57 23 Q72 24 78 30 L80 45 Q80 50 76 50 L74 70 Q74 80 72 90 L68 118" />
        {/* Torso back */}
        <path d="M43 23 L40 60 L42 75 L50 78 L58 75 L60 60 L57 23" />
        {/* Arms */}
        <path d="M22 30 Q16 45 14 60 Q13 70 16 75" />
        <path d="M78 30 Q84 45 86 60 Q87 70 84 75" />
        {/* Legs */}
        <path d="M42 75 L38 95 L36 118" />
        <path d="M58 75 L62 95 L64 118" />
        <path d="M44 80 L50 82 L56 80" />
      </g>
    )
  }
  // Anterior (front) view — default
  return (
    <g stroke="rgba(245,232,200,0.15)" strokeWidth="0.4" fill="none">
      {/* Head */}
      <ellipse cx="50" cy="10" rx="8" ry="9" />
      {/* Chin detail */}
      <path d="M44 18 Q50 21 56 18" />
      {/* Neck */}
      <line x1="46" y1="19" x2="44" y2="23" />
      <line x1="54" y1="19" x2="56" y2="23" />
      {/* Collarbone */}
      <path d="M44 23 Q38 25 30 23" />
      <path d="M56 23 Q62 25 70 23" />
      {/* Shoulders */}
      <path d="M44 23 Q28 24 22 30 L20 45" />
      <path d="M56 23 Q72 24 78 30 L80 45" />
      {/* Chest */}
      <path d="M44 23 L42 38 L40 55 L42 70 L50 73 L58 70 L60 55 L58 38 L56 23" />
      {/* Arms */}
      <path d="M22 30 Q18 42 16 58 Q15 68 17 76" />
      <path d="M78 30 Q82 42 84 58 Q85 68 83 76" />
      {/* Hands */}
      <ellipse cx="17" cy="78" rx="3" ry="4" />
      <ellipse cx="83" cy="78" rx="3" ry="4" />
      {/* Pelvis */}
      <path d="M42 70 Q38 73 36 78 Q34 84 36 88" />
      <path d="M58 70 Q62 73 64 78 Q66 84 64 88" />
      {/* Legs */}
      <path d="M42 70 L40 90 L38 110 L36 118" />
      <path d="M58 70 L60 90 L62 110 L64 118" />
      {/* Knee detail */}
      <path d="M38 100 Q40 102 42 100" />
      <path d="M62 100 Q60 102 58 100" />
    </g>
  )
}

// ─── Component ────────────────────────────────────────────────────────

export default function AnatomyHeatMap() {
  const [activeZone, setActiveZone] = useState<NerveZoneData | null>(null)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [silhouette, setSilhouette] = useState<Silhouette>('anterior')
  const [filterPathway, setFilterPathway] = useState<string | null>(null)

  const visibleZones = NERVE_ZONES.filter(
    (z) => !filterPathway || z.pathway === filterPathway
  )

  const pathways = Array.from(new Set(NERVE_ZONES.map((z) => z.pathway)))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* SVG panel */}
      <div className="glass-panel amber-glow p-6 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-6">
          <h2
            className="text-2xl font-light text-[#f5e8c8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Touch Map
          </h2>
          <div className="flex gap-2">
            {(['anterior', 'posterior'] as Silhouette[]).map((v) => (
              <button
                key={v}
                onClick={() => setSilhouette(v)}
                className="px-3 py-1 text-xs rounded-full transition-all capitalize"
                style={{
                  background:
                    silhouette === v ? 'rgba(232,160,32,0.2)' : 'transparent',
                  color: silhouette === v ? '#e8a020' : 'rgba(245,232,200,0.4)',
                  border:
                    silhouette === v
                      ? '1px solid rgba(232,160,32,0.4)'
                      : '1px solid rgba(245,232,200,0.1)',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Pathway filter pills */}
        <div className="flex flex-wrap gap-2 mb-6 w-full">
          <button
            onClick={() => setFilterPathway(null)}
            className="px-2 py-1 text-xs rounded-full transition-all"
            style={{
              background: !filterPathway ? 'rgba(232,160,32,0.15)' : 'transparent',
              color: !filterPathway ? '#e8a020' : 'rgba(245,232,200,0.35)',
              border: !filterPathway ? '1px solid rgba(232,160,32,0.3)' : '1px solid rgba(245,232,200,0.08)',
            }}
          >
            All
          </button>
          {pathways.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPathway(p === filterPathway ? null : p)}
              className="px-2 py-1 text-xs rounded-full transition-all"
              style={{
                background:
                  filterPathway === p
                    ? `${PATHWAY_COLORS[p]}22`
                    : 'transparent',
                color:
                  filterPathway === p
                    ? PATHWAY_COLORS[p]
                    : 'rgba(245,232,200,0.35)',
                border:
                  filterPathway === p
                    ? `1px solid ${PATHWAY_COLORS[p]}55`
                    : '1px solid rgba(245,232,200,0.08)',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* SVG heat map */}
        <div className="relative w-full max-w-[280px]">
          <svg
            viewBox="0 0 100 128"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 20px rgba(232,160,32,0.05))' }}
          >
            <defs>
              {NERVE_ZONES.map((z) => (
                <radialGradient key={z.slug} id={`glow-${z.slug}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={z.color} stopOpacity="0.9" />
                  <stop offset="60%" stopColor={z.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={z.color} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>

            {/* Body silhouette */}
            <HumanSilhouette view={silhouette} />

            {/* Nerve zone overlays */}
            {visibleZones.map((zone) => {
              const isHovered = hoveredZone === zone.slug
              const isActive = activeZone?.slug === zone.slug
              const radius = 3 + zone.sensitivity * 0.4

              return (
                <g key={zone.slug}>
                  {/* Glow halo */}
                  {(isHovered || isActive) && (
                    <motion.circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={radius * 2.5}
                      fill={`url(#glow-${zone.slug})`}
                      initial={{ opacity: 0, r: radius }}
                      animate={{ opacity: 1, r: radius * 2.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Ambient haze */}
                  <circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r={radius * 1.8}
                    fill={`url(#glow-${zone.slug})`}
                    opacity={0.15}
                  />

                  {/* Core dot */}
                  <motion.circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r={isHovered || isActive ? radius * 0.8 : radius * 0.5}
                    fill={zone.color}
                    opacity={isHovered || isActive ? 1 : 0.6}
                    style={{ cursor: 'pointer' }}
                    onHoverStart={() => setHoveredZone(zone.slug)}
                    onHoverEnd={() => setHoveredZone(null)}
                    onClick={() =>
                      setActiveZone(activeZone?.slug === zone.slug ? null : zone)
                    }
                    animate={{
                      r: isHovered || isActive ? radius * 0.8 : radius * 0.5,
                      opacity: isHovered || isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Pulse ring */}
                  {(isHovered || isActive) && (
                    <motion.circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={radius * 0.8}
                      fill="none"
                      stroke={zone.color}
                      strokeWidth="0.5"
                      initial={{ r: radius * 0.8, opacity: 0.8 }}
                      animate={{ r: radius * 3, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {/* Label */}
                  {(isHovered || isActive) && (
                    <text
                      x={zone.cx > 50 ? zone.cx - 1 : zone.cx + 1}
                      y={zone.cy - radius - 1.5}
                      fontSize="2.8"
                      fill={zone.color}
                      textAnchor={zone.cx > 55 ? 'end' : zone.cx < 45 ? 'start' : 'middle'}
                      style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}
                    >
                      {zone.name}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Sensitivity legend */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-[#f5e8c8]/30 text-xs">Sensitivity</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `rgba(232,160,32,${0.15 + i * 0.15})`,
                  }}
                />
              ))}
            </div>
            <span className="text-[#f5e8c8]/30 text-xs">High</span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {activeZone ? (
            <motion.div
              key={activeZone.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div
                    className="text-xs uppercase tracking-[0.2em] mb-1"
                    style={{ color: activeZone.color }}
                  >
                    {activeZone.pathway} Pathway
                  </div>
                  <h3
                    className="text-2xl font-light text-[#f5e8c8]"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {activeZone.name}
                  </h3>
                </div>
                {/* Sensitivity bar */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[#f5e8c8]/40 text-xs">Sensitivity</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-4 rounded-sm"
                        style={{
                          background:
                            i < activeZone.sensitivity
                              ? activeZone.color
                              : 'rgba(245,232,200,0.08)',
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: activeZone.color }} className="text-xs font-medium">
                    {activeZone.sensitivity}/10
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#f5e8c8]/70 text-sm leading-relaxed mb-6">
                {activeZone.description}
              </p>

              {/* Pressure tips */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#f5e8c8]/40 mb-3">
                  Pressure & Technique Vectors
                </h4>
                <div className="flex flex-col gap-2">
                  {activeZone.pressure_tips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{
                        background: `${activeZone.color}0a`,
                        border: `1px solid ${activeZone.color}18`,
                      }}
                    >
                      <span
                        className="text-xs mt-0.5 shrink-0 font-medium"
                        style={{ color: activeZone.color }}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[#f5e8c8]/75 text-sm">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setActiveZone(null)}
                className="mt-4 text-xs text-[#f5e8c8]/25 hover:text-[#f5e8c8]/50 transition-colors"
              >
                ← Back to map
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-8 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[300px]"
            >
              <div className="text-5xl opacity-20">◉</div>
              <div>
                <p
                  className="text-xl font-light text-[#f5e8c8]/60 mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Select a zone
                </p>
                <p className="text-sm text-[#f5e8c8]/30 max-w-xs">
                  Tap or hover any glowing point on the silhouette to explore nerve pathway details and technique vectors.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All zones list */}
        {!activeZone && (
          <div className="glass-panel p-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f5e8c8]/40 mb-3">
              All Zones
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NERVE_ZONES.map((zone) => (
                <button
                  key={zone.slug}
                  onClick={() => setActiveZone(zone)}
                  className="text-left p-2 rounded-lg transition-all hover:bg-white/5"
                  style={{ border: `1px solid ${zone.color}15` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: zone.color }}
                    />
                    <span className="text-[#f5e8c8]/70 text-xs truncate">{zone.name}</span>
                  </div>
                  <div className="text-[#f5e8c8]/30 text-xs ml-4 mt-0.5">{zone.pathway}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
