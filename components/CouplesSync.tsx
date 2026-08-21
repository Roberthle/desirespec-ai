'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveCouplesSync, type CouplesSyncData } from '../lib/storage'

// ─── Checklist items ──────────────────────────────────────────────────

interface ChecklistItem {
  id: string
  category: string
  label: string
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Sensory & Touch
  { id: 'cs-feather', category: 'Touch & Sensation', label: 'Feather-light touch and tracing' },
  { id: 'cs-temp', category: 'Touch & Sensation', label: 'Temperature contrast (ice + warmth)' },
  { id: 'cs-massage', category: 'Touch & Sensation', label: 'Extended massage and bodywork' },
  { id: 'cs-restraint', category: 'Touch & Sensation', label: 'Gentle restraint or held positions' },
  { id: 'cs-blindfold', category: 'Touch & Sensation', label: 'Sensory deprivation / blindfold' },
  // Verbal & Vocal
  { id: 'cv-fantasy', category: 'Verbal & Vocal', label: 'Sharing fantasies aloud' },
  { id: 'cv-direction', category: 'Verbal & Vocal', label: 'Verbal direction and guidance during intimacy' },
  { id: 'cv-appreciation', category: 'Verbal & Vocal', label: 'Spoken appreciation and compliments during' },
  { id: 'cv-roleplay', category: 'Verbal & Vocal', label: 'Light roleplay narratives' },
  // Environment & Context
  { id: 'ce-new-location', category: 'Context & Setting', label: 'New environments or locations' },
  { id: 'ce-ambient', category: 'Context & Setting', label: 'Carefully designed ambient atmosphere (lighting, scent, sound)' },
  { id: 'ce-spontaneous', category: 'Context & Setting', label: 'Spontaneous/unplanned initiation' },
  { id: 'ce-planned', category: 'Context & Setting', label: 'Carefully planned and anticipated encounters' },
  // Emotional
  { id: 'em-vulnerability', category: 'Emotional Depth', label: 'Sharing genuine vulnerabilities before intimacy' },
  { id: 'em-eye', category: 'Emotional Depth', label: 'Sustained eye contact and presence' },
  { id: 'em-slowdown', category: 'Emotional Depth', label: 'Extended slow buildup with no rush to destination' },
  // Power Dynamics
  { id: 'pd-lead', category: 'Dynamic & Pacing', label: 'Taking the lead role in initiation' },
  { id: 'pd-follow', category: 'Dynamic & Pacing', label: 'Following and surrendering control' },
  { id: 'pd-alternate', category: 'Dynamic & Pacing', label: 'Alternating lead/follow within a single encounter' },
  { id: 'pd-anticipation', category: 'Dynamic & Pacing', label: 'Deliberate anticipation and tension-hold techniques' },
]

type Response = 'yes' | 'no' | 'maybe' | null

const RESPONSE_CONFIG = {
  yes:   { label: 'Yes', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
  maybe: { label: 'Maybe', color: '#e8a020', bg: 'rgba(232,160,32,0.12)', border: 'rgba(232,160,32,0.3)' },
  no:    { label: 'No', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
}

const CATEGORIES = Array.from(new Set(CHECKLIST_ITEMS.map((i) => i.category)))

// ─── Component ────────────────────────────────────────────────────────

export default function CouplesSync() {
  const [responses, setResponses] = useState<Record<string, Response>>({})
  const [partnerResponses, setPartnerResponses] = useState<Record<string, Response> | null>(null)
  const [mode, setMode] = useState<'fill' | 'partner-sim' | 'results'>('fill')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const setResponse = useCallback((id: string, r: Response) => {
    setResponses((prev) => ({ ...prev, [id]: r }))
  }, [])

  const completedCount = Object.keys(responses).length
  const totalItems = CHECKLIST_ITEMS.length

  // Compute matched "yes" items
  const matchedItems = partnerResponses
    ? CHECKLIST_ITEMS.filter(
        (item) => responses[item.id] === 'yes' && partnerResponses[item.id] === 'yes'
      )
    : []

  // Simulate partner (for demo) — randomly generate responses
  function simulatePartner() {
    const opts: Response[] = ['yes', 'yes', 'maybe', 'no']
    const sim: Record<string, Response> = {}
    CHECKLIST_ITEMS.forEach((item) => {
      sim[item.id] = opts[Math.floor(Math.random() * opts.length)]
    })
    setPartnerResponses(sim)
    setMode('results')
  }

  async function handleSave() {
    setSaving(true)
    const data: CouplesSyncData = {
      id: `sync-${Date.now()}`,
      items: CHECKLIST_ITEMS.map((item) => ({
        id: item.id,
        category: item.category,
        label: item.label,
        response: responses[item.id] ?? null,
      })),
      created_at: new Date().toISOString(),
    }
    await saveCouplesSync(data)
    setSaving(false)
    setSaved(true)
  }

  function reset() {
    setResponses({})
    setPartnerResponses(null)
    setMode('fill')
    setSaved(false)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel amber-glow p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-1">Zero-Awkwardness</p>
            <h2
              className="text-2xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Couples Alignment Matrix
            </h2>
            <p className="text-[#f5e8c8]/45 text-sm mt-2 max-w-lg">
              You and your partner each complete this independently. Only overlapping &ldquo;Yes&rdquo; responses are revealed — eliminating fear of judgment or rejection.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-[#e8a020]">
              {completedCount}/{totalItems}
            </div>
            <div className="text-xs text-[#f5e8c8]/30">answered</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded overflow-hidden">
          <motion.div
            className="h-full bg-[#e8a020] rounded"
            animate={{ width: `${(completedCount / totalItems) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mt-4">
          {(['fill', 'results'] as const).map((m) => (
            <button
              key={m}
              onClick={() => m === 'fill' ? setMode('fill') : simulatePartner()}
              className="px-4 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: mode === m ? 'rgba(232,160,32,0.15)' : 'transparent',
                color: mode === m ? '#e8a020' : 'rgba(245,232,200,0.35)',
                border: mode === m ? '1px solid rgba(232,160,32,0.3)' : '1px solid rgba(245,232,200,0.08)',
              }}
            >
              {m === 'fill' ? 'My Responses' : 'View Match (Demo)'}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ─── Fill mode ─── */}
        {mode === 'fill' && (
          <motion.div
            key="fill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {CATEGORIES.map((cat) => (
              <div key={cat} className="glass-panel p-5">
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#f5e8c8]/35 mb-4">
                  {cat}
                </h3>
                <div className="flex flex-col gap-2">
                  {CHECKLIST_ITEMS.filter((i) => i.category === cat).map((item) => {
                    const current = responses[item.id]
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all"
                        style={{
                          background: current
                            ? RESPONSE_CONFIG[current].bg
                            : 'rgba(245,232,200,0.02)',
                          border: current
                            ? `1px solid ${RESPONSE_CONFIG[current].border}`
                            : '1px solid rgba(245,232,200,0.05)',
                        }}
                      >
                        <span className="flex-1 text-sm text-[#f5e8c8]/70">
                          {item.label}
                        </span>
                        <div className="flex gap-1.5 shrink-0">
                          {(['yes', 'maybe', 'no'] as Response[]).map((r) => r && (
                            <motion.button
                              key={r}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => setResponse(item.id, current === r ? null : r)}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                              style={{
                                background:
                                  current === r ? RESPONSE_CONFIG[r].bg : 'transparent',
                                color:
                                  current === r ? RESPONSE_CONFIG[r].color : 'rgba(245,232,200,0.25)',
                                border:
                                  current === r
                                    ? `1px solid ${RESPONSE_CONFIG[r].border}`
                                    : '1px solid rgba(245,232,200,0.07)',
                              }}
                            >
                              {RESPONSE_CONFIG[r].label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Save */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving || saved || completedCount === 0}
                className="flex-1 py-3 rounded-2xl text-sm font-medium transition-all"
                style={{
                  background: saved ? 'rgba(74,222,128,0.1)' : 'rgba(232,160,32,0.15)',
                  border: saved ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(232,160,32,0.3)',
                  color: saved ? '#4ade80' : '#e8a020',
                  opacity: completedCount === 0 ? 0.4 : 1,
                }}
              >
                {saved ? '✓ Saved Privately' : saving ? 'Saving…' : 'Save My Responses'}
              </button>
              <button
                onClick={reset}
                className="px-5 py-3 rounded-2xl text-sm text-[#f5e8c8]/30 hover:text-[#f5e8c8]/50 transition-colors"
                style={{ border: '1px solid rgba(245,232,200,0.08)' }}
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── Results mode ─── */}
        {mode === 'results' && partnerResponses && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Match summary */}
            <div
              className="glass-panel p-6 text-center"
              style={{ borderColor: 'rgba(74,222,128,0.2)' }}
            >
              <div className="text-5xl font-light text-green-400 mb-2">
                {matchedItems.length}
              </div>
              <p className="text-[#f5e8c8]/60 text-sm">
                mutual &ldquo;Yes&rdquo; matches revealed
              </p>
              <p className="text-[#f5e8c8]/30 text-xs mt-1">
                No-responses and Maybe-responses are never shown to your partner
              </p>
            </div>

            {/* Matched items by category */}
            {CATEGORIES.map((cat) => {
              const catMatches = matchedItems.filter((i) => i.category === cat)
              if (catMatches.length === 0) return null
              return (
                <div key={cat} className="glass-panel p-5">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-green-400/60 mb-3">
                    {cat}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {catMatches.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          background: 'rgba(74,222,128,0.05)',
                          border: '1px solid rgba(74,222,128,0.15)',
                        }}
                      >
                        <span className="text-green-400 text-sm">✓</span>
                        <span className="text-[#f5e8c8]/75 text-sm">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}

            {matchedItems.length === 0 && (
              <div className="glass-panel p-8 text-center">
                <p className="text-[#f5e8c8]/40 text-sm">
                  No mutual Yes matches yet — explore the Maybe responses to open conversation.
                </p>
              </div>
            )}

            <button
              onClick={reset}
              className="py-3 rounded-2xl text-sm text-[#f5e8c8]/40 hover:text-[#f5e8c8]/60 transition-colors"
              style={{ border: '1px solid rgba(245,232,200,0.08)' }}
            >
              Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
