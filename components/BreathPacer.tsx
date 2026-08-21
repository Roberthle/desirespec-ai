'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out'

interface BreathRatio {
  id: string
  label: string
  description: string
  inhale: number
  holdIn: number
  exhale: number
  holdOut: number
}

const BREATH_RATIOS: BreathRatio[] = [
  { id: '4-7-8',   label: '4-7-8',     description: 'Deep relaxation · anxiety reduction',          inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
  { id: 'box',     label: 'Box',        description: 'Nervous system balance · equal ratio',          inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
  { id: 'arousal', label: 'Arousal',    description: 'Heightened sensitivity · parasympathetic arc', inhale: 3, holdIn: 0, exhale: 6, holdOut: 0 },
  { id: 'custom',  label: 'Custom',     description: 'Define your own ratio',                         inhale: 5, holdIn: 2, exhale: 7, holdOut: 1 },
]

const PHASE_COLORS: Record<BreathPhase, string> = {
  'inhale':   '#6090c8',   // cool blue
  'hold-in':  '#e8a020',   // warm amber
  'exhale':   '#d4601a',   // ember
  'hold-out': '#805010',   // deep amber-brown
}

const PHASE_LABELS: Record<BreathPhase, string> = {
  'inhale':   'Inhale',
  'hold-in':  'Hold',
  'exhale':   'Exhale',
  'hold-out': 'Rest',
}

// ─── Web Audio singleton ──────────────────────────────────────────────

interface AudioNodes {
  ctx: AudioContext
  osc1: OscillatorNode
  osc2: OscillatorNode
  gain: GainNode
  filter: BiquadFilterNode
  lfo: OscillatorNode
  panner: StereoPannerNode
  masterGain: GainNode
}

// ─── Component ────────────────────────────────────────────────────────

export default function BreathPacer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)
  const audioRef = useRef<AudioNodes | null>(null)

  const [bpm, setBpm] = useState(60)
  const [activeRatioId, setActiveRatioId] = useState('box')
  const [customRatio, setCustomRatio] = useState({ inhale: 5, holdIn: 2, exhale: 7, holdOut: 1 })
  const [audioOn, setAudioOn] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [warmth, setWarmth] = useState(0.5)     // filter freq 80–400Hz
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [phase, setPhase] = useState<BreathPhase>('inhale')
  const [phaseProgress, setPhaseProgress] = useState(0)  // 0–1
  const [cycleCount, setCycleCount] = useState(0)

  const ratio = activeRatioId === 'custom'
    ? customRatio
    : BREATH_RATIOS.find(r => r.id === activeRatioId)!

  const totalCycleSec =
    ratio.inhale + ratio.holdIn + ratio.exhale + ratio.holdOut

  // ─── Phase computation ───────────────────────────────────────────

  function computePhase(elapsedSec: number): {
    phase: BreathPhase
    progress: number
    cycles: number
  } {
    const cycle = totalCycleSec
    const cyclePos = elapsedSec % cycle
    const cyclesDone = Math.floor(elapsedSec / cycle)

    if (cyclePos < ratio.inhale) {
      return { phase: 'inhale', progress: cyclePos / ratio.inhale, cycles: cyclesDone }
    }
    const afterInhale = ratio.inhale + ratio.holdIn
    if (cyclePos < afterInhale) {
      return { phase: 'hold-in', progress: (cyclePos - ratio.inhale) / Math.max(ratio.holdIn, 0.01), cycles: cyclesDone }
    }
    const afterHold = afterInhale + ratio.exhale
    if (cyclePos < afterHold) {
      return { phase: 'exhale', progress: (cyclePos - afterInhale) / ratio.exhale, cycles: cyclesDone }
    }
    const holdOutDur = Math.max(ratio.holdOut, 0.01)
    return { phase: 'hold-out', progress: (cyclePos - afterHold) / holdOutDur, cycles: cyclesDone }
  }

  // ─── Canvas draw loop ────────────────────────────────────────────

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (startTimeRef.current === null) startTimeRef.current = timestamp
    const elapsed = (timestamp - startTimeRef.current) / 1000

    const { phase: currentPhase, progress, cycles } = computePhase(elapsed)

    setPhase(currentPhase)
    setPhaseProgress(progress)
    setCycleCount(cycles)

    // Orb radius: expands during inhale, holds, contracts during exhale
    const minR = 60
    const maxR = 130
    let orbR: number
    if (currentPhase === 'inhale') {
      orbR = minR + (maxR - minR) * progress
    } else if (currentPhase === 'hold-in') {
      orbR = maxR
    } else if (currentPhase === 'exhale') {
      orbR = maxR - (maxR - minR) * progress
    } else {
      orbR = minR
    }

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2

    const phaseColor = PHASE_COLORS[currentPhase]

    ctx.clearRect(0, 0, W, H)

    // ── Outer pulse rings (3 concentric, offset in time) ──
    for (let i = 0; i < 3; i++) {
      const ringProgress = (progress + i * 0.33) % 1
      const ringR = orbR + ringProgress * 80
      const ringAlpha = (1 - ringProgress) * 0.12
      ctx.beginPath()
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2)
      ctx.strokeStyle = `${phaseColor}${Math.round(ringAlpha * 255).toString(16).padStart(2, '0')}`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // ── Ambient outer glow ──
    const outerGrad = ctx.createRadialGradient(cx, cy, orbR * 0.8, cx, cy, orbR * 2.2)
    outerGrad.addColorStop(0, `${phaseColor}22`)
    outerGrad.addColorStop(1, `${phaseColor}00`)
    ctx.beginPath()
    ctx.arc(cx, cy, orbR * 2.2, 0, Math.PI * 2)
    ctx.fillStyle = outerGrad
    ctx.fill()

    // ── Core orb ──
    const coreGrad = ctx.createRadialGradient(cx - orbR * 0.2, cy - orbR * 0.2, 0, cx, cy, orbR)
    coreGrad.addColorStop(0, `${phaseColor}ff`)
    coreGrad.addColorStop(0.5, `${phaseColor}bb`)
    coreGrad.addColorStop(1, `${phaseColor}44`)

    ctx.beginPath()
    ctx.arc(cx, cy, orbR, 0, Math.PI * 2)
    ctx.fillStyle = coreGrad
    ctx.shadowColor = phaseColor
    ctx.shadowBlur = 40
    ctx.fill()
    ctx.shadowBlur = 0

    // ── Inner highlight ──
    const hiGrad = ctx.createRadialGradient(cx - orbR * 0.3, cy - orbR * 0.3, 0, cx - orbR * 0.3, cy - orbR * 0.3, orbR * 0.5)
    hiGrad.addColorStop(0, 'rgba(245,232,200,0.25)')
    hiGrad.addColorStop(1, 'rgba(245,232,200,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, orbR, 0, Math.PI * 2)
    ctx.fillStyle = hiGrad
    ctx.fill()

    rafRef.current = requestAnimationFrame(draw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio, totalCycleSec])

  useEffect(() => {
    startTimeRef.current = null
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

  // ─── Web Audio ───────────────────────────────────────────────────

  async function startAudio() {
    if (audioRef.current) return  // already running
    const ctx = new AudioContext()

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(volume, ctx.currentTime)
    masterGain.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 80 + warmth * 320
    filter.Q.value = 0.8
    filter.connect(masterGain)

    const panner = ctx.createStereoPanner()
    panner.connect(filter)

    const gain = ctx.createGain()
    gain.gain.value = 0.6
    gain.connect(panner)

    // LFO for slow stereo movement
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.05
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.7
    lfo.connect(lfoGain)
    lfoGain.connect(panner.pan)
    lfo.start()

    // Sub-bass oscillator 40Hz
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 40
    osc1.connect(gain)
    osc1.start()

    // Bass fundamental 80Hz (slightly detuned for warmth)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 80.3
    osc2.connect(gain)
    osc2.start()

    audioRef.current = { ctx, osc1, osc2, gain, filter, lfo, panner, masterGain }
    setAudioOn(true)
  }

  function stopAudio() {
    if (!audioRef.current) return
    const { ctx, osc1, osc2, lfo } = audioRef.current
    osc1.stop()
    osc2.stop()
    lfo.stop()
    ctx.close()
    audioRef.current = null
    setAudioOn(false)
  }

  // Update audio params live
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.masterGain.gain.setTargetAtTime(volume, audioRef.current.ctx.currentTime, 0.1)
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.filter.frequency.setTargetAtTime(80 + warmth * 320, audioRef.current.ctx.currentTime, 0.2)
  }, [warmth])

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (audioRef.current) stopAudio() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Fullscreen ──────────────────────────────────────────────────

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const phaseColor = PHASE_COLORS[phase]

  // ─── Render ─────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="flex flex-col gap-5" style={isFullscreen ? { background: '#0a0906', height: '100vh', padding: '2rem' } : {}}>

      {/* Header (hidden in fullscreen) */}
      {!isFullscreen && (
        <div className="glass-panel p-5">
          <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">Somatic</p>
          <h2
            className="text-2xl font-light text-[#f5e8c8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Rhythmic Breath & Tension Pacer
          </h2>
          <p className="text-[#f5e8c8]/35 text-sm mt-1">
            Bio-orb synchrony · Web Audio drone · Immersive mode
          </p>
        </div>
      )}

      <div className={`grid gap-5 ${isFullscreen ? 'grid-cols-1 place-items-center' : 'grid-cols-1 lg:grid-cols-2'}`}>

        {/* Canvas orb */}
        <div
          className={`glass-panel overflow-hidden relative ${isFullscreen ? 'w-full' : ''}`}
          style={{ height: isFullscreen ? 'calc(100vh - 12rem)' : 380 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Phase overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs uppercase tracking-[0.4em] mb-1"
              style={{ color: phaseColor }}
            >
              {PHASE_LABELS[phase]}
            </motion.p>
            <p className="text-[#f5e8c8]/20 text-xs">
              Cycle {cycleCount + 1}
            </p>
          </div>

          {/* Phase progress ring */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="rgba(245,232,200,0.04)"
              strokeWidth="0.5"
            />
            <motion.circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke={phaseColor}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray={`${phaseProgress * 289} 289`}
              strokeDashoffset="72"
              style={{ transition: 'stroke 0.4s ease' }}
            />
          </svg>

          {/* Fullscreen exit button */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-[#f5e8c8]/25 hover:text-[#f5e8c8]/55 text-xs transition-colors"
            >
              ✕ Exit
            </button>
          )}
        </div>

        {/* Controls (hidden in fullscreen) */}
        {!isFullscreen && (
          <div className="flex flex-col gap-4">

            {/* BPM */}
            <div className="glass-panel p-5">
              <div className="flex justify-between mb-1">
                <span className="text-xs uppercase tracking-wider text-[#f5e8c8]/35">Cycle Speed (BPM)</span>
                <span className="text-xs text-[#e8a020]">{bpm} BPM</span>
              </div>
              <input
                type="range" min={40} max={90} step={1}
                value={bpm}
                onChange={e => setBpm(Number(e.target.value))}
                className="w-full h-1.5 rounded appearance-none cursor-pointer mb-2"
                style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.2), rgba(232,160,32,0.9))' }}
              />
              <div className="flex justify-between text-xs text-[#f5e8c8]/20">
                <span>40 BPM — Deep</span>
                <span className="text-center">Total: {totalCycleSec}s cycle</span>
                <span>90 BPM — Active</span>
              </div>
            </div>

            {/* Breath ratio presets */}
            <div className="glass-panel p-5">
              <span className="text-xs uppercase tracking-wider text-[#f5e8c8]/35 block mb-3">
                Breath Ratio
              </span>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {BREATH_RATIOS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRatioId(r.id)}
                    className="p-3 rounded-xl text-left transition-all"
                    style={{
                      background: activeRatioId === r.id ? 'rgba(232,160,32,0.1)' : 'rgba(245,232,200,0.02)',
                      border: activeRatioId === r.id ? '1px solid rgba(232,160,32,0.3)' : '1px solid rgba(245,232,200,0.06)',
                    }}
                  >
                    <p className="text-sm font-medium mb-0.5" style={{ color: activeRatioId === r.id ? '#e8a020' : 'rgba(245,232,200,0.6)' }}>
                      {r.label}
                    </p>
                    <p className="text-xs text-[#f5e8c8]/25">{r.description}</p>
                  </button>
                ))}
              </div>

              {/* Custom ratio sliders */}
              <AnimatePresence>
                {activeRatioId === 'custom' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {([
                        { key: 'inhale' as const, label: 'Inhale', color: PHASE_COLORS['inhale'] },
                        { key: 'holdIn' as const, label: 'Hold In', color: PHASE_COLORS['hold-in'] },
                        { key: 'exhale' as const, label: 'Exhale', color: PHASE_COLORS['exhale'] },
                        { key: 'holdOut' as const, label: 'Hold Out', color: PHASE_COLORS['hold-out'] },
                      ]).map(({ key, label, color }) => (
                        <div key={key}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-[#f5e8c8]/35">{label}</span>
                            <span className="text-xs" style={{ color }}>{customRatio[key]}s</span>
                          </div>
                          <input
                            type="range" min={0} max={12} step={1}
                            value={customRatio[key]}
                            onChange={e => setCustomRatio(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                            className="w-full h-1 rounded appearance-none cursor-pointer"
                            style={{ background: `linear-gradient(to right, ${color}33, ${color})` }}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current ratio display */}
              <div className="flex gap-2 mt-3">
                {[
                  { label: `↑ ${ratio.inhale}s`, color: PHASE_COLORS['inhale'] },
                  ...(ratio.holdIn > 0 ? [{ label: `⏸ ${ratio.holdIn}s`, color: PHASE_COLORS['hold-in'] }] : []),
                  { label: `↓ ${ratio.exhale}s`, color: PHASE_COLORS['exhale'] },
                  ...(ratio.holdOut > 0 ? [{ label: `○ ${ratio.holdOut}s`, color: PHASE_COLORS['hold-out'] }] : []),
                ].map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      color: item.color,
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Audio controls */}
            <div className="glass-panel p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#f5e8c8]/35">
                  Ambient Drone · Web Audio
                </span>
                <button
                  onClick={audioOn ? stopAudio : startAudio}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    background: audioOn ? 'rgba(232,160,32,0.15)' : 'rgba(245,232,200,0.04)',
                    border: audioOn ? '1px solid rgba(232,160,32,0.35)' : '1px solid rgba(245,232,200,0.1)',
                    color: audioOn ? '#e8a020' : 'rgba(245,232,200,0.4)',
                  }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${audioOn ? 'bg-[#e8a020]' : 'bg-white/20'}`} />
                  {audioOn ? 'Drone On' : 'Start Drone'}
                </button>
              </div>

              {!audioOn && (
                <p className="text-xs text-[#f5e8c8]/20 mb-3">
                  Click to synthesize 40Hz + 80Hz sub-bass drone. Browser requires user gesture.
                </p>
              )}

              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-[#f5e8c8]/30">Volume</span>
                    <span className="text-xs text-[#e8a020]">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range" min={0} max={0.8} step={0.02}
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="w-full h-1.5 rounded appearance-none cursor-pointer"
                    style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.1), rgba(232,160,32,0.8))' }}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-[#f5e8c8]/30">Tone Warmth</span>
                    <span className="text-xs text-[#e8a020]">{Math.round(80 + warmth * 320)}Hz cutoff</span>
                  </div>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={warmth}
                    onChange={e => setWarmth(Number(e.target.value))}
                    className="w-full h-1.5 rounded appearance-none cursor-pointer"
                    style={{ background: 'linear-gradient(to right, rgba(80,120,200,0.5), rgba(232,160,32,0.8))' }}
                  />
                </div>
              </div>
            </div>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="glass-panel py-3 text-sm text-center transition-all hover:border-[rgba(232,160,32,0.25)]"
              style={{ borderColor: 'rgba(245,232,200,0.08)', color: 'rgba(245,232,200,0.45)' }}
            >
              ⛶ Enter Immersive Intimacy Mode
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
