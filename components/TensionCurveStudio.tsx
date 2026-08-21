'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

interface WaveParams {
  amplitude: number    // 0–1
  frequency: number    // 0.1–2 Hz
  harmonics: number    // 0–1 (overtone richness)
  spikiness: number    // 0–1 (sharp peaks vs smooth)
  plateauLen: number   // 0–1 (flat hold duration ratio)
}

interface Preset {
  id: string
  label: string
  icon: string
  description: string
  color: string
  glowColor: string
  params: WaveParams
  prescription: string
}

interface ControlNode {
  x: number   // 0–1 normalized time
  y: number   // 0–1 normalized intensity
  dragging: boolean
}

const PRESETS: Preset[] = [
  {
    id: 'slow-burn',
    label: 'Slow Burn / Edging',
    icon: '〜',
    description: 'Low amplitude, extended plateau phases, glacial frequency',
    color: '#c8860a',
    glowColor: 'rgba(200,134,10,0.3)',
    params: { amplitude: 0.35, frequency: 0.18, harmonics: 0.15, spikiness: 0.05, plateauLen: 0.7 },
    prescription: 'Low amplitude (0.35) · 0.18Hz · 70% plateau · Optimal for: Slow Burn Devotee & Emotional Attacher archetypes · Estimated arc: 8–12 min',
  },
  {
    id: 'sensory-overhaul',
    label: 'Sensory Overhaul',
    icon: '◈',
    description: 'Medium amplitude, layered harmonics, warm gold shimmer',
    color: '#e8a020',
    glowColor: 'rgba(232,160,32,0.35)',
    params: { amplitude: 0.65, frequency: 0.45, harmonics: 0.75, spikiness: 0.3, plateauLen: 0.3 },
    prescription: 'Medium amplitude (0.65) · 0.45Hz · Rich harmonics · Optimal for: Sensory Explorer & Novelty Seeker archetypes · Estimated arc: 5–8 min',
  },
  {
    id: 'high-voltage',
    label: 'High-Voltage Spikes',
    icon: '↑',
    description: 'Sharp high peaks, steep drops, electric rhythm',
    color: '#f0b840',
    glowColor: 'rgba(240,184,64,0.4)',
    params: { amplitude: 0.92, frequency: 0.85, harmonics: 0.4, spikiness: 0.9, plateauLen: 0.08 },
    prescription: 'High amplitude (0.92) · 0.85Hz · Sharp spikes · Optimal for: Power Dynamic Navigator & Cerebral Fantasist archetypes · Estimated arc: 2–4 min',
  },
]

const PHASE_LABELS = ['Initiation', 'Buildup', 'Peak', 'Resolution']

// ─── Wave math ────────────────────────────────────────────────────────

function computeWaveY(
  t: number,            // 0–1 (position across width)
  time: number,         // animation time in seconds
  params: WaveParams,
): number {
  const { amplitude, frequency, harmonics, spikiness, plateauLen } = params

  // Base sine
  const phase = t * Math.PI * 2 * frequency * 4 + time * frequency * Math.PI * 2
  let y = Math.sin(phase)

  // Harmonics (2nd + 3rd overtone)
  if (harmonics > 0) {
    y += harmonics * 0.4 * Math.sin(phase * 2 + 0.5)
    y += harmonics * 0.2 * Math.sin(phase * 3 + 1.0)
  }

  // Spikiness: raise to power to sharpen peaks
  const sign = y >= 0 ? 1 : -1
  if (spikiness > 0) {
    y = sign * Math.pow(Math.abs(y), 1 - spikiness * 0.7)
  }

  // Plateau: clamp near top and bottom
  if (plateauLen > 0) {
    const clamp = 1 - plateauLen * 0.4
    y = Math.max(-clamp, Math.min(clamp, y)) / clamp
  }

  // Normalize and apply amplitude
  return y * amplitude
}

// ─── Component ────────────────────────────────────────────────────────

export default function TensionCurveStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const playheadRef = useRef(0)   // 0–1

  const [activePreset, setActivePreset] = useState<string>('slow-burn')
  const [params, setParams] = useState<WaveParams>(PRESETS[0].params)
  const [isPlaying, setIsPlaying] = useState(true)
  const [playSpeed, setPlaySpeed] = useState(0.5)    // 0.1–2x
  const [nodes, setNodes] = useState<ControlNode[]>([
    { x: 0.05, y: 0.1, dragging: false },
    { x: 0.25, y: 0.45, dragging: false },
    { x: 0.50, y: 0.75, dragging: false },
    { x: 0.75, y: 0.60, dragging: false },
    { x: 0.95, y: 0.20, dragging: false },
  ])
  const [draggingNodeIdx, setDraggingNodeIdx] = useState<number | null>(null)
  const [showCustom, setShowCustom] = useState(false)

  const activePresetData = PRESETS.find(p => p.id === activePreset) ?? PRESETS[0]

  // ─── Draw loop ────────────────────────────────────────────────────

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height

    if (startTimeRef.current === null) startTimeRef.current = timestamp
    const elapsed = (timestamp - startTimeRef.current) / 1000

    if (isPlaying) {
      timeRef.current = elapsed * playSpeed
      playheadRef.current = (timeRef.current * 0.08) % 1
    }

    const color = activePresetData.color
    const glowColor = activePresetData.glowColor

    // Background clear
    ctx.clearRect(0, 0, W, H)

    const midY = H * 0.5
    const maxAmp = H * 0.38

    // Phase zone backgrounds
    PHASE_LABELS.forEach((label, i) => {
      const x0 = (i / 4) * W
      const x1 = ((i + 1) / 4) * W
      ctx.fillStyle = `rgba(245,232,200,${i % 2 === 0 ? 0.012 : 0.006})`
      ctx.fillRect(x0, 0, x1 - x0, H)

      // Phase label
      ctx.fillStyle = 'rgba(245,232,200,0.18)'
      ctx.font = '10px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(label, (x0 + x1) / 2, H - 8)

      // Phase divider
      if (i > 0) {
        ctx.beginPath()
        ctx.moveTo(x0, 0)
        ctx.lineTo(x0, H - 16)
        ctx.strokeStyle = 'rgba(245,232,200,0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    })

    // Midline
    ctx.beginPath()
    ctx.moveTo(0, midY)
    ctx.lineTo(W, midY)
    ctx.strokeStyle = 'rgba(245,232,200,0.06)'
    ctx.lineWidth = 0.5
    ctx.stroke()

    // ── Glow fill under curve ──
    const gradFill = ctx.createLinearGradient(0, midY - maxAmp, 0, midY + maxAmp)
    gradFill.addColorStop(0, `${glowColor.replace(')', ', 0.18)')}`)
    gradFill.addColorStop(0.5, `${glowColor.replace(')', ', 0.06)')}`)
    gradFill.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.beginPath()
    const STEPS = W
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS
      const y = computeWaveY(t, timeRef.current, params)
      const px = t * W
      const py = midY - y * maxAmp
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.lineTo(W, midY)
    ctx.lineTo(0, midY)
    ctx.closePath()
    ctx.fillStyle = gradFill
    ctx.fill()

    // ── Main wave stroke ──
    ctx.beginPath()
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS
      const y = computeWaveY(t, timeRef.current, params)
      const px = t * W
      const py = midY - y * maxAmp
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }

    const strokeGrad = ctx.createLinearGradient(0, 0, W, 0)
    strokeGrad.addColorStop(0, `${color}44`)
    strokeGrad.addColorStop(0.5, color)
    strokeGrad.addColorStop(1, `${color}44`)
    ctx.strokeStyle = strokeGrad
    ctx.lineWidth = 2
    ctx.shadowColor = color
    ctx.shadowBlur = 12
    ctx.stroke()
    ctx.shadowBlur = 0

    // ── Control nodes ──
    nodes.forEach((node, idx) => {
      const nx = node.x * W
      const ny = node.y * H
      ctx.beginPath()
      ctx.arc(nx, ny, 6, 0, Math.PI * 2)
      ctx.fillStyle = draggingNodeIdx === idx ? color : `${color}88`
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Connect with dashed guide line to waveform
      const waveY = midY - computeWaveY(node.x, timeRef.current, params) * maxAmp
      ctx.beginPath()
      ctx.setLineDash([2, 3])
      ctx.moveTo(nx, ny)
      ctx.lineTo(nx, waveY)
      ctx.strokeStyle = `${color}33`
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.setLineDash([])
    })

    // ── Playhead ──
    const phX = playheadRef.current * W
    ctx.beginPath()
    ctx.moveTo(phX, 0)
    ctx.lineTo(phX, H - 16)
    ctx.strokeStyle = `rgba(245,232,200,0.4)`
    ctx.lineWidth = 1
    ctx.stroke()

    // Playhead dot
    const phY = midY - computeWaveY(playheadRef.current, timeRef.current, params) * maxAmp
    ctx.beginPath()
    ctx.arc(phX, phY, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(245,232,200,0.9)'
    ctx.fill()

    rafRef.current = requestAnimationFrame(draw)
  }, [params, isPlaying, playSpeed, activePresetData, nodes, draggingNodeIdx])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  // Resize
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ─── Node drag ────────────────────────────────────────────────────

  function handleCanvasPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width
    const my = (e.clientY - rect.top) / rect.height

    // Find closest node within 20px
    const W = canvas.width
    const H = canvas.height
    let closest = -1
    let closestDist = 25 / Math.min(W, H)
    nodes.forEach((node, i) => {
      const dist = Math.hypot(mx - node.x, my - node.y)
      if (dist < closestDist) { closestDist = dist; closest = i }
    })
    if (closest >= 0) {
      setDraggingNodeIdx(closest)
      canvas.setPointerCapture(e.pointerId)
    }
  }

  function handleCanvasPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (draggingNodeIdx === null) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const my = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setNodes(prev => prev.map((n, i) => i === draggingNodeIdx ? { ...n, x: mx, y: my } : n))
  }

  function handleCanvasPointerUp() {
    setDraggingNodeIdx(null)
  }

  function loadPreset(preset: Preset) {
    setActivePreset(preset.id)
    setParams(preset.params)
    setShowCustom(false)
    startTimeRef.current = null
  }

  function updateParam(key: keyof WaveParams, value: number) {
    setActivePreset('custom')
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">Interactive</p>
            <h2
              className="text-2xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Tension Curve Studio
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(v => !v)}
              className="px-4 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: isPlaying ? 'rgba(232,160,32,0.15)' : 'rgba(245,232,200,0.05)',
                border: isPlaying ? '1px solid rgba(232,160,32,0.3)' : '1px solid rgba(245,232,200,0.1)',
                color: isPlaying ? '#e8a020' : 'rgba(245,232,200,0.4)',
              }}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        </div>

        {/* Preset cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {PRESETS.map(preset => (
            <motion.button
              key={preset.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadPreset(preset)}
              className="p-4 rounded-xl text-left transition-all"
              style={{
                background: activePreset === preset.id ? `${preset.glowColor}` : 'rgba(245,232,200,0.02)',
                border: activePreset === preset.id
                  ? `1px solid ${preset.color}44`
                  : '1px solid rgba(245,232,200,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: preset.color }} className="text-lg">{preset.icon}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: activePreset === preset.id ? preset.color : 'rgba(245,232,200,0.65)' }}
                >
                  {preset.label}
                </span>
              </div>
              <p className="text-xs text-[#f5e8c8]/30 ml-6">{preset.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Playback speed */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#f5e8c8]/35 uppercase tracking-wider shrink-0">Arc Speed</span>
          <input
            type="range" min={0.1} max={2} step={0.1}
            value={playSpeed}
            onChange={e => setPlaySpeed(Number(e.target.value))}
            className="flex-1 h-1.5 rounded appearance-none cursor-pointer"
            style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.2), rgba(232,160,32,0.8))' }}
          />
          <span className="text-xs text-[#e8a020] w-10 text-right">{playSpeed.toFixed(1)}×</span>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="glass-panel overflow-hidden"
        style={{ height: 320, position: 'relative' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ cursor: draggingNodeIdx !== null ? 'grabbing' : 'crosshair', touchAction: 'none' }}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onPointerLeave={handleCanvasPointerUp}
        />
        <div className="absolute top-3 right-3 text-[#f5e8c8]/20 text-xs">
          Drag nodes to sculpt curve
        </div>
      </div>

      {/* Custom sliders toggle */}
      <div className="glass-panel p-5">
        <button
          onClick={() => setShowCustom(v => !v)}
          className="flex items-center gap-2 text-xs text-[#f5e8c8]/40 hover:text-[#f5e8c8]/60 transition-colors mb-0"
        >
          <span>{showCustom ? '▾' : '▸'}</span>
          Fine-tune wave parameters
        </button>

        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {([
                  { key: 'amplitude' as const, label: 'Amplitude', min: 0.05, max: 1, step: 0.05 },
                  { key: 'frequency' as const, label: 'Frequency (Hz)', min: 0.1, max: 2, step: 0.05 },
                  { key: 'harmonics' as const, label: 'Harmonic Richness', min: 0, max: 1, step: 0.05 },
                  { key: 'spikiness' as const, label: 'Peak Sharpness', min: 0, max: 1, step: 0.05 },
                  { key: 'plateauLen' as const, label: 'Plateau Length', min: 0, max: 0.9, step: 0.05 },
                ] as const).map(({ key, label, min, max, step }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-[#f5e8c8]/40">{label}</span>
                      <span className="text-xs text-[#e8a020]">{params[key].toFixed(2)}</span>
                    </div>
                    <input
                      type="range" min={min} max={max} step={step}
                      value={params[key]}
                      onChange={e => updateParam(key, Number(e.target.value))}
                      className="w-full h-1.5 rounded appearance-none cursor-pointer"
                      style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.2), rgba(232,160,32,0.8))' }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prescription readout */}
      {activePreset !== 'custom' && (
        <motion.div
          key={activePreset}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4"
          style={{ borderColor: `${activePresetData.color}22` }}
        >
          <span className="text-xs uppercase tracking-wider mr-2" style={{ color: activePresetData.color }}>
            {activePresetData.icon} Prescription
          </span>
          <span className="text-xs text-[#f5e8c8]/45">{activePresetData.prescription}</span>
        </motion.div>
      )}
    </div>
  )
}
