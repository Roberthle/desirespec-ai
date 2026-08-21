'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { saveMoodPreset, getMoodPresets, deleteMoodPreset, type MoodPreset } from '../lib/storage'

// ─── Soundscape options ───────────────────────────────────────────────

const SOUNDSCAPES = [
  { id: 'none', label: 'Silence', icon: '○', description: 'No ambient sound' },
  { id: 'binaural-40', label: 'Binaural 40Hz', icon: '◎', description: 'Gamma entrainment — heightened awareness' },
  { id: 'binaural-10', label: 'Binaural 10Hz', icon: '◉', description: 'Alpha state — relaxed attentiveness' },
  { id: 'rain', label: 'Rain', icon: '∿', description: 'Soft rainfall — grounding white noise' },
  { id: 'fire', label: 'Fireplace', icon: '◈', description: 'Crackling warmth — comfort and safety' },
  { id: 'ocean', label: 'Ocean Slow', icon: '〜', description: 'Wave rhythm — parasympathetic entrainment' },
]

// ─── Kelvin to color helper ───────────────────────────────────────────

function kelvinToHsl(k: number): string {
  // Approximate: 1800K=deep amber, 2700K=warm white, 4000K=neutral, 6500K=cool blue
  if (k <= 2200) return `hsl(${30 + (k - 1800) * 0.04}, 90%, 52%)`
  if (k <= 3000) return `hsl(${38 + (k - 2200) * 0.025}, 80%, 58%)`
  if (k <= 4500) return `hsl(${45 + (k - 3000) * 0.02}, 60%, 68%)`
  return `hsl(${210 + (k - 4500) * 0.015}, 50%, 80%)`
}

function kelvinToName(k: number): string {
  if (k <= 2000) return 'Deep Ember'
  if (k <= 2400) return 'Candlelight'
  if (k <= 2800) return 'Warm Amber'
  if (k <= 3200) return 'Sunrise Gold'
  if (k <= 4000) return 'Neutral White'
  if (k <= 5000) return 'Daylight'
  return 'Cool Blue'
}

// ─── Tactile timeline phases ──────────────────────────────────────────

const TACTILE_PHASES = [
  { id: 0, label: 'Environment', description: 'Set atmosphere — lighting, scent, temperature' },
  { id: 1, label: 'Arrival', description: 'Non-touch presence — breath sync, eye contact, proximity' },
  { id: 2, label: 'Peripheral', description: 'Distal touch — hands, forearms, shoulders' },
  { id: 3, label: 'Proximal', description: 'Neck, inner arm, behind ear — nerve-rich zones' },
  { id: 4, label: 'Core', description: 'Full somatic engagement — sacral, abdomen, inner thigh' },
  { id: 5, label: 'Merging', description: 'Nervous system synchrony — breath, heartrate, movement' },
]

// ─── Component ────────────────────────────────────────────────────────

export default function MoodStudio() {
  const [lightingTemp, setLightingTemp] = useState(2200)
  const [intensity, setIntensity] = useState(15)
  const [soundscape, setSoundscape] = useState('binaural-40')
  const [tactilePhase, setTactilePhase] = useState(0)
  const [presetName, setPresetName] = useState('')
  const [savedPresets, setSavedPresets] = useState<MoodPreset[]>([])
  const [saving, setSaving] = useState(false)

  const lightColor = kelvinToHsl(lightingTemp)
  const lightName = kelvinToName(lightingTemp)
  const currentSoundscape = SOUNDSCAPES.find((s) => s.id === soundscape)

  useEffect(() => {
    getMoodPresets().then(setSavedPresets).catch(() => {})
  }, [])

  async function handleSavePreset() {
    if (!presetName.trim()) return
    setSaving(true)
    const preset: MoodPreset = {
      id: `preset-${Date.now()}`,
      name: presetName.trim(),
      lighting_temp: lightingTemp,
      lighting_intensity: intensity,
      soundscape,
      tactile_phase: tactilePhase,
      saved_at: new Date().toISOString(),
    }
    await saveMoodPreset(preset)
    const updated = await getMoodPresets()
    setSavedPresets(updated)
    setPresetName('')
    setSaving(false)
  }

  async function handleDeletePreset(id: string) {
    await deleteMoodPreset(id)
    const updated = await getMoodPresets()
    setSavedPresets(updated)
  }

  function loadPreset(p: MoodPreset) {
    setLightingTemp(p.lighting_temp)
    setIntensity(p.lighting_intensity)
    setSoundscape(p.soundscape)
    setTactilePhase(p.tactile_phase)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Live preview orb */}
      <div className="glass-panel p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${lightColor}${Math.round(intensity * 2.55).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          }}
        />

        {/* Orb */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${lightColor}, ${lightColor}66 60%, transparent)`,
            boxShadow: `0 0 60px ${lightColor}44, 0 0 120px ${lightColor}22`,
          }}
        >
          <div className="text-center">
            <div className="text-3xl font-light" style={{ color: 'rgba(10,9,6,0.7)', fontFamily: 'Cormorant Garamond, serif' }}>
              {lightingTemp}K
            </div>
            <div className="text-xs" style={{ color: 'rgba(10,9,6,0.5)' }}>
              {intensity}% intensity
            </div>
          </div>
        </motion.div>

        {/* Labels */}
        <div className="relative z-10 mt-6 text-center">
          <p
            className="text-lg font-light text-[#f5e8c8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {lightName}
          </p>
          <p className="text-xs text-[#f5e8c8]/40 mt-1">
            {currentSoundscape?.icon} {currentSoundscape?.label}
          </p>
          <p className="text-xs text-[#f5e8c8]/25 mt-1">
            Phase {tactilePhase}: {TACTILE_PHASES[tactilePhase].label}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-5">
        {/* Lighting temperature */}
        <div className="glass-panel p-5">
          <h3 className="text-xs uppercase tracking-wider text-[#f5e8c8]/40 mb-4">
            Lighting Temperature
          </h3>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#f5e8c8]/60">{lightName}</span>
            <span className="text-sm" style={{ color: lightColor }}>
              {lightingTemp}K
            </span>
          </div>
          <input
            type="range"
            min={1800}
            max={6500}
            step={100}
            value={lightingTemp}
            onChange={(e) => setLightingTemp(Number(e.target.value))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #e8601a, #e8a020 30%, #f5e8c8 55%, #a8c8e8 80%, #6090c8)`,
            }}
          />
          <div className="flex justify-between text-xs text-[#f5e8c8]/20 mt-1">
            <span>1800K ember</span>
            <span>6500K cool</span>
          </div>
        </div>

        {/* Intensity */}
        <div className="glass-panel p-5">
          <h3 className="text-xs uppercase tracking-wider text-[#f5e8c8]/40 mb-4">
            Intensity
          </h3>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#f5e8c8]/60">Brightness</span>
            <span className="text-sm text-[#e8a020]">{intensity}%</span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-1.5 rounded appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(232,160,32,0.2), rgba(232,160,32,1))`,
            }}
          />
        </div>

        {/* Soundscape */}
        <div className="glass-panel p-5">
          <h3 className="text-xs uppercase tracking-wider text-[#f5e8c8]/40 mb-4">
            Soundscape
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {SOUNDSCAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSoundscape(s.id)}
                className="text-left p-3 rounded-xl transition-all"
                style={{
                  background: soundscape === s.id ? 'rgba(232,160,32,0.1)' : 'rgba(245,232,200,0.02)',
                  border: soundscape === s.id ? '1px solid rgba(232,160,32,0.25)' : '1px solid rgba(245,232,200,0.06)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: soundscape === s.id ? '#e8a020' : 'rgba(245,232,200,0.3)' }}>
                    {s.icon}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: soundscape === s.id ? '#e8a020' : 'rgba(245,232,200,0.55)' }}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="text-xs text-[#f5e8c8]/25 ml-4">{s.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tactile phase */}
        <div className="glass-panel p-5">
          <h3 className="text-xs uppercase tracking-wider text-[#f5e8c8]/40 mb-4">
            Tactile Progression Phase
          </h3>
          <div className="flex flex-col gap-2">
            {TACTILE_PHASES.map((phase) => (
              <motion.button
                key={phase.id}
                whileHover={{ x: 3 }}
                onClick={() => setTactilePhase(phase.id)}
                className="flex items-start gap-3 p-3 rounded-xl text-left transition-all"
                style={{
                  background:
                    tactilePhase === phase.id ? 'rgba(232,160,32,0.08)' : 'transparent',
                  border:
                    tactilePhase === phase.id
                      ? '1px solid rgba(232,160,32,0.2)'
                      : '1px solid rgba(245,232,200,0.04)',
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                  style={{
                    background:
                      tactilePhase >= phase.id ? 'rgba(232,160,32,0.2)' : 'rgba(245,232,200,0.04)',
                    color: tactilePhase >= phase.id ? '#e8a020' : 'rgba(245,232,200,0.2)',
                    border:
                      tactilePhase === phase.id
                        ? '1px solid rgba(232,160,32,0.4)'
                        : '1px solid rgba(245,232,200,0.08)',
                  }}
                >
                  {phase.id}
                </span>
                <div>
                  <div
                    className="text-xs font-medium"
                    style={{
                      color: tactilePhase === phase.id ? '#e8a020' : 'rgba(245,232,200,0.55)',
                    }}
                  >
                    {phase.label}
                  </div>
                  <div className="text-xs text-[#f5e8c8]/25">{phase.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Save preset */}
        <div className="glass-panel p-5">
          <h3 className="text-xs uppercase tracking-wider text-[#f5e8c8]/40 mb-3">
            Save Preset
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Preset name…"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
              className="flex-1 px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-[#f5e8c8]/70 placeholder-[#f5e8c8]/20 outline-none focus:border-[rgba(232,160,32,0.3)]"
            />
            <button
              onClick={handleSavePreset}
              disabled={saving || !presetName.trim()}
              className="px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                background: 'rgba(232,160,32,0.15)',
                border: '1px solid rgba(232,160,32,0.3)',
                color: '#e8a020',
                opacity: !presetName.trim() ? 0.4 : 1,
              }}
            >
              {saving ? '…' : 'Save'}
            </button>
          </div>

          {/* Saved presets list */}
          {savedPresets.length > 0 && (
            <div className="mt-3 flex flex-col gap-1.5">
              {savedPresets.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ border: '1px solid rgba(245,232,200,0.06)' }}
                >
                  <button
                    onClick={() => loadPreset(p)}
                    className="flex-1 text-left text-xs text-[#f5e8c8]/55 hover:text-[#f5e8c8]/80 transition-colors"
                  >
                    {p.name}{' '}
                    <span className="text-[#f5e8c8]/25">
                      {p.lighting_temp}K · {p.lighting_intensity}%
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeletePreset(p.id)}
                    className="text-[#f5e8c8]/15 hover:text-red-400/50 text-xs transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
