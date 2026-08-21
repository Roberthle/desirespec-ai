'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveDiagnosticsResult, type DiagnosticsResult } from '../lib/storage'

// ─── Dual Control Model quiz ──────────────────────────────────────────

interface Question {
  id: string
  text: string
  dimension: keyof DiagnosticsResult['scores']
  type: 'accelerator' | 'brake'
}

const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Discovering a new setting or environment with a partner makes me feel more connected and aroused.', dimension: 'novelty', type: 'accelerator' },
  { id: 'q2', text: 'When my routine becomes predictable, I notice my desire gradually diminishing.', dimension: 'novelty', type: 'brake' },
  { id: 'q3', text: 'Rich sensory details—scent, texture, sound, temperature—significantly intensify my experience.', dimension: 'sensory', type: 'accelerator' },
  { id: 'q4', text: 'Feeling emotionally safe and genuinely understood is a prerequisite for my full physical opening.', dimension: 'emotional_safety', type: 'accelerator' },
  { id: 'q5', text: 'Unresolved tension or emotional distance makes it nearly impossible for me to access desire.', dimension: 'emotional_safety', type: 'brake' },
  { id: 'q6', text: 'I find rushed or goal-oriented encounters frustrating rather than satisfying.', dimension: 'pacing', type: 'brake' },
  { id: 'q7', text: 'Extended slow buildup and anticipation arcs are essential to my deepest pleasure.', dimension: 'pacing', type: 'accelerator' },
  { id: 'q8', text: 'The physical environment (lighting, scent, music, temperature) powerfully affects my level of arousal.', dimension: 'environmental', type: 'accelerator' },
  { id: 'q9', text: 'Stress, fatigue, or mental preoccupation reliably diminish my desire regardless of circumstances.', dimension: 'emotional_safety', type: 'brake' },
  { id: 'q10', text: 'I am aroused by imagined or verbally described scenarios as much as by direct physical touch.', dimension: 'novelty', type: 'accelerator' },
]

const RESPONSE_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
]

const DIMENSION_LABELS: Record<keyof DiagnosticsResult['scores'], string> = {
  novelty: 'Novelty',
  sensory: 'Sensory',
  emotional_safety: 'Emotional Safety',
  pacing: 'Pacing',
  environmental: 'Environment',
}

// ─── Radar chart (pure SVG) ───────────────────────────────────────────

function RadarChart({ scores }: { scores: DiagnosticsResult['scores'] }) {
  const dimensions = Object.keys(scores) as (keyof typeof scores)[]
  const n = dimensions.length
  const cx = 100
  const cy = 100
  const maxR = 75

  const angleStep = (Math.PI * 2) / n

  function polarToCart(angle: number, radius: number) {
    return {
      x: cx + radius * Math.sin(angle),
      y: cy - radius * Math.cos(angle),
    }
  }

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0]

  // Axis endpoints
  const axes = dimensions.map((_, i) => polarToCart(i * angleStep, maxR))

  // Score polygon
  const scorePoints = dimensions.map((dim, i) => {
    const val = scores[dim] / 10
    return polarToCart(i * angleStep, val * maxR)
  })
  const polygonPoints = scorePoints.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto">
      {/* Grid rings */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={dimensions
            .map((_, i) => {
              const p = polarToCart(i * angleStep, r * maxR)
              return `${p.x},${p.y}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(245,232,200,0.06)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {axes.map((pt, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={pt.x}
          y2={pt.y}
          stroke="rgba(245,232,200,0.08)"
          strokeWidth="0.5"
        />
      ))}

      {/* Score polygon */}
      <polygon
        points={polygonPoints}
        fill="rgba(232,160,32,0.12)"
        stroke="#e8a020"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#e8a020" />
      ))}

      {/* Labels */}
      {axes.map((pt, i) => {
        const dim = dimensions[i]
        const labelPt = polarToCart(i * angleStep, maxR + 14)
        return (
          <text
            key={i}
            x={labelPt.x}
            y={labelPt.y + 1.5}
            textAnchor="middle"
            fontSize="7"
            fill="rgba(245,232,200,0.55)"
            fontFamily="Inter, sans-serif"
          >
            {DIMENSION_LABELS[dim]}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────

export default function DesireDiagnostics() {
  const [step, setStep] = useState(0) // 0 = intro, 1-10 = questions, 11 = results
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const totalSteps = QUESTIONS.length

  function handleResponse(questionId: string, value: number) {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
    setTimeout(() => setStep((s) => s + 1), 350)
  }

  function computeScores(): DiagnosticsResult['scores'] {
    const scores: DiagnosticsResult['scores'] = {
      novelty: 5,
      sensory: 5,
      emotional_safety: 5,
      pacing: 5,
      environmental: 5,
    }

    const counts: Record<keyof typeof scores, number> = {
      novelty: 0,
      sensory: 0,
      emotional_safety: 0,
      pacing: 0,
      environmental: 0,
    }

    QUESTIONS.forEach((q) => {
      const raw = responses[q.id] ?? 2 // default neutral
      // For brakes: invert the score (high brake agreement = low score)
      const adjusted = q.type === 'brake' ? 4 - raw : raw
      scores[q.dimension] = (scores[q.dimension] * counts[q.dimension] + adjusted * 2.5) / (counts[q.dimension] + 1)
      counts[q.dimension]++
    })

    // Normalize to 0-10
    Object.keys(scores).forEach((k) => {
      const key = k as keyof typeof scores
      scores[key] = Math.max(1, Math.min(10, Math.round(scores[key] * 10) / 10))
    })

    return scores
  }

  function computeResult(): DiagnosticsResult {
    const scores = computeScores()
    const sorted = (Object.keys(scores) as (keyof typeof scores)[]).sort(
      (a, b) => scores[b] - scores[a]
    )
    const archetypeMap: Record<string, string> = {
      novelty: 'novelty-seeker',
      sensory: 'sensory-explorer',
      emotional_safety: 'emotional-attacher',
      pacing: 'slow-burn-devotee',
      environmental: 'sensory-explorer',
    }

    return {
      id: `diag-${Date.now()}`,
      date: new Date().toISOString(),
      archetype: archetypeMap[sorted[0]],
      scores,
      accelerators: sorted.slice(0, 2).map(
        (d) => `High ${DIMENSION_LABELS[d]} responsiveness`
      ),
      brakes: sorted
        .slice(-2)
        .map((d) => `Low ${DIMENSION_LABELS[d]} score — potential brake zone`),
    }
  }

  async function handleSave() {
    setSaving(true)
    const result = computeResult()
    await saveDiagnosticsResult(result)
    setSaving(false)
    setSaved(true)
  }

  function restart() {
    setStep(0)
    setResponses({})
    setSaved(false)
  }

  const currentQuestion = step >= 1 && step <= totalSteps ? QUESTIONS[step - 1] : null
  const result = step > totalSteps ? computeResult() : null

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* ─── Intro ─── */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel amber-glow p-8 text-center"
          >
            <div className="text-4xl mb-4 opacity-60">◈</div>
            <h2
              className="text-3xl font-light text-[#f5e8c8] mb-3"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Desire Profile
            </h2>
            <p className="text-[#f5e8c8]/60 mb-2 leading-relaxed">
              A 10-question diagnostic based on the{' '}
              <span className="text-[#e8a020]">Dual Control Model</span> of human sexuality (Janssen & Bancroft).
            </p>
            <p className="text-[#f5e8c8]/40 text-sm mb-8">
              Results are stored privately on this device only — zero data leaves your browser.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {Object.entries(DIMENSION_LABELS).map(([key, label]) => (
                <div
                  key={key}
                  className="p-3 rounded-xl text-left"
                  style={{
                    background: 'rgba(232,160,32,0.05)',
                    border: '1px solid rgba(232,160,32,0.1)',
                  }}
                >
                  <div className="text-[#e8a020] text-xs uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  <div className="text-[#f5e8c8]/40 text-xs">Dimension mapped</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="px-8 py-3 rounded-2xl text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(232,160,32,0.2), rgba(212,96,26,0.15))',
                border: '1px solid rgba(232,160,32,0.3)',
                color: '#e8a020',
              }}
            >
              Begin Assessment →
            </button>
          </motion.div>
        )}

        {/* ─── Questions ─── */}
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-[#f5e8c8]/30 text-xs">
                {step} / {totalSteps}
              </span>
              <div className="flex-1 mx-4 h-px bg-[rgba(245,232,200,0.08)] relative overflow-hidden rounded">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#e8a020] rounded"
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-[#e8a020] text-xs uppercase tracking-wider">
                {DIMENSION_LABELS[currentQuestion.dimension]}
              </span>
            </div>

            <p
              className="text-xl font-light text-[#f5e8c8] leading-relaxed mb-10"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              &ldquo;{currentQuestion.text}&rdquo;
            </p>

            {/* Response buttons */}
            <div className="flex flex-col gap-2">
              {RESPONSE_LABELS.map((label, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleResponse(currentQuestion.id, i)}
                  className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                  style={{
                    background:
                      responses[currentQuestion.id] === i
                        ? 'rgba(232,160,32,0.12)'
                        : 'rgba(245,232,200,0.03)',
                    border:
                      responses[currentQuestion.id] === i
                        ? '1px solid rgba(232,160,32,0.3)'
                        : '1px solid rgba(245,232,200,0.06)',
                    color:
                      responses[currentQuestion.id] === i
                        ? '#e8a020'
                        : 'rgba(245,232,200,0.6)',
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                    style={{
                      borderColor:
                        responses[currentQuestion.id] === i
                          ? '#e8a020'
                          : 'rgba(245,232,200,0.15)',
                      background:
                        responses[currentQuestion.id] === i
                          ? 'rgba(232,160,32,0.2)'
                          : 'transparent',
                    }}
                  >
                    {i + 1}
                  </span>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Results ─── */}
        {result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-panel amber-glow p-8">
              <p className="text-[#e8a020] text-xs uppercase tracking-[0.3em] mb-2">
                Your Profile
              </p>
              <h2
                className="text-3xl font-light text-[#f5e8c8] mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Desire Radar
              </h2>

              <RadarChart scores={result.scores} />

              {/* Score table */}
              <div className="mt-6 flex flex-col gap-2">
                {(Object.keys(result.scores) as (keyof typeof result.scores)[]).map((dim) => (
                  <div key={dim} className="flex items-center gap-3">
                    <span className="text-xs text-[#f5e8c8]/40 w-32 shrink-0">
                      {DIMENSION_LABELS[dim]}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded overflow-hidden">
                      <motion.div
                        className="h-full rounded"
                        style={{ background: '#e8a020' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.scores[dim] * 10}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                    <span className="text-xs text-[#e8a020] w-8 text-right">
                      {result.scores[dim].toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accelerators & Brakes */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="glass-panel p-5"
                style={{ borderColor: 'rgba(232,160,32,0.2)' }}
              >
                <h4 className="text-xs uppercase tracking-wider text-[#e8a020] mb-3">
                  ↑ Accelerators
                </h4>
                {result.accelerators.map((a, i) => (
                  <p key={i} className="text-sm text-[#f5e8c8]/65 mb-2">
                    {a}
                  </p>
                ))}
              </div>
              <div
                className="glass-panel p-5"
                style={{ borderColor: 'rgba(192,104,88,0.2)' }}
              >
                <h4 className="text-xs uppercase tracking-wider text-[#c06858] mb-3">
                  ↓ Brakes
                </h4>
                {result.brakes.map((b, i) => (
                  <p key={i} className="text-sm text-[#f5e8c8]/65 mb-2">
                    {b}
                  </p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="flex-1 py-3 rounded-2xl text-sm transition-all"
                style={{
                  background: saved ? 'rgba(34,197,94,0.1)' : 'rgba(232,160,32,0.15)',
                  border: saved
                    ? '1px solid rgba(34,197,94,0.3)'
                    : '1px solid rgba(232,160,32,0.3)',
                  color: saved ? 'rgb(134,239,172)' : '#e8a020',
                }}
              >
                {saved ? '✓ Saved Privately' : saving ? 'Saving…' : 'Save to Device'}
              </button>
              <button
                onClick={restart}
                className="px-6 py-3 rounded-2xl text-sm text-[#f5e8c8]/40 hover:text-[#f5e8c8]/60 transition-colors"
                style={{ border: '1px solid rgba(245,232,200,0.08)' }}
              >
                Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
