'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { POSITIONS_DATA, PositionItem } from '../lib/positionsData'

// ─── Interactive Vector Silhouette Art ────────────────────────────────
function PositionSilhouette({ variant, glowColor }: { variant: PositionItem['svgVariant']; glowColor: string }) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded-2xl bg-[#0e0c08]/90 border border-[rgba(232,160,32,0.15)] shadow-inner">
      {/* Background ambient lighting glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-25 blur-2xl"
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
            `radial-gradient(circle at 60% 40%, ${glowColor} 0%, transparent 65%)`,
            `radial-gradient(circle at 40% 60%, ${glowColor} 0%, transparent 70%)`,
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 320 220" className="w-full h-full p-4 relative z-10" fill="none" stroke="currentColor">
        <defs>
          <linearGradient id="posGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5e8c8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e8a020" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4601a" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {variant === 'arch-anchor' && (
          <g filter="url(#glowFilter)">
            {/* Prone bottom figure */}
            <path d="M 40 160 C 80 155, 110 145, 140 135 C 160 128, 180 110, 210 115 C 240 120, 270 150, 290 160" stroke="url(#posGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Elevated pelvis arch */}
            <path d="M 120 142 C 145 120, 175 110, 205 118" stroke="#ffb834" strokeWidth="3.2" strokeLinecap="round" />
            {/* Dominant partner over */}
            <path d="M 100 110 C 130 90, 165 75, 200 85 C 220 92, 235 115, 245 130" stroke="url(#posGrad)" strokeWidth="2.2" strokeDasharray="3 2" />
            {/* Contact hotspot pulse */}
            <circle cx="170" cy="115" r="7" fill="#e8a020" className="animate-ping opacity-75" />
            <circle cx="170" cy="115" r="4" fill="#ffffff" />
          </g>
        )}

        {variant === 'counter-press' && (
          <g filter="url(#glowFilter)">
            {/* Counter edge */}
            <line x1="80" y1="130" x2="260" y2="130" stroke="rgba(245,232,200,0.2)" strokeWidth="2" strokeDasharray="4 4" />
            {/* Seated / Wrapped partner */}
            <path d="M 130 130 C 130 100, 140 70, 155 50 C 165 75, 175 110, 185 130" stroke="url(#posGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Wrapped legs around waist */}
            <path d="M 140 115 C 160 125, 190 120, 210 95" stroke="#ffb834" strokeWidth="3" strokeLinecap="round" />
            {/* Standing partner leaning in */}
            <path d="M 185 190 L 175 125 C 170 95, 160 70, 145 55" stroke="url(#posGrad)" strokeWidth="2" strokeLinecap="round" />
            {/* Hotspot */}
            <circle cx="160" cy="118" r="6" fill="#e8a020" className="animate-ping opacity-75" />
            <circle cx="160" cy="118" r="4" fill="#ffffff" />
          </g>
        )}

        {variant === 'velvet-trap' && (
          <g filter="url(#glowFilter)">
            {/* Clitoral friction locked alignment */}
            <path d="M 50 150 C 100 145, 150 130, 200 135 C 230 138, 260 155, 280 160" stroke="url(#posGrad)" strokeWidth="2.5" />
            <path d="M 70 135 C 120 125, 160 122, 210 132" stroke="#ffb834" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 80 115 C 130 105, 170 108, 220 125" stroke="url(#posGrad)" strokeWidth="2" strokeDasharray="2 3" />
            {/* Dual grinding hotspot pulse */}
            <circle cx="165" cy="126" r="8" fill="#d4601a" className="animate-pulse opacity-80" />
            <circle cx="165" cy="126" r="3.5" fill="#fff" />
          </g>
        )}

        {variant === 'high-angle' && (
          <g filter="url(#glowFilter)">
            {/* Bottom partner back on bed */}
            <path d="M 50 170 C 100 170, 150 165, 190 160" stroke="url(#posGrad)" strokeWidth="2" />
            {/* Elevated legs over shoulders */}
            <path d="M 130 160 C 145 120, 160 70, 185 45 C 200 70, 215 110, 225 150" stroke="#ffb834" strokeWidth="3" strokeLinecap="round" />
            {/* Top partner standing/kneeling plunge */}
            <path d="M 175 180 L 195 120 C 200 80, 210 55, 225 50" stroke="url(#posGrad)" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="178" cy="138" r="7" fill="#e8a020" className="animate-ping opacity-75" />
            <circle cx="178" cy="138" r="4" fill="#ffffff" />
          </g>
        )}

        {variant === 'overdrive-cowgirl' && (
          <g filter="url(#glowFilter)">
            {/* Base partner reclined */}
            <path d="M 50 170 L 260 170" stroke="url(#posGrad)" strokeWidth="2" />
            {/* Top partner straddling + arched 45 deg leanback */}
            <path d="M 125 165 C 135 130, 150 100, 185 80 C 200 95, 215 135, 225 165" stroke="#ffb834" strokeWidth="3" strokeLinecap="round" />
            <path d="M 185 80 C 195 60, 210 50, 220 45" stroke="url(#posGrad)" strokeWidth="2.2" />
            <circle cx="160" cy="150" r="7" fill="#e8a020" className="animate-ping opacity-75" />
            <circle cx="160" cy="150" r="4" fill="#fff" />
          </g>
        )}

        {variant === 'obsidian-lock' && (
          <g filter="url(#glowFilter)">
            {/* Parallel side-lying curves */}
            <path d="M 60 140 C 110 130, 160 125, 210 130 C 245 135, 270 145, 285 155" stroke="url(#posGrad)" strokeWidth="2.5" />
            <path d="M 75 120 C 125 110, 175 105, 225 112 C 255 118, 275 130, 290 140" stroke="#ffb834" strokeWidth="3" strokeLinecap="round" />
            {/* Hooked leg line */}
            <path d="M 170 110 C 185 90, 205 85, 220 95" stroke="url(#posGrad)" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="190" cy="120" r="6" fill="#e8a020" className="animate-pulse opacity-75" />
            <circle cx="190" cy="120" r="3.5" fill="#fff" />
          </g>
        )}

        {variant === 'wall-pin' && (
          <g filter="url(#glowFilter)">
            {/* Vertical Wall */}
            <line x1="80" y1="20" x2="80" y2="200" stroke="rgba(245,232,200,0.3)" strokeWidth="3" />
            {/* Pinned partner back to wall */}
            <path d="M 90 40 C 95 70, 95 100, 105 130 C 120 115, 140 100, 150 90" stroke="url(#posGrad)" strokeWidth="2.5" />
            {/* Standing partner lifting */}
            <path d="M 125 190 L 115 130 C 110 95, 105 70, 95 45" stroke="#ffb834" strokeWidth="3" strokeLinecap="round" />
            <circle cx="108" cy="125" r="7" fill="#d4601a" className="animate-ping opacity-80" />
            <circle cx="108" cy="125" r="4" fill="#ffffff" />
          </g>
        )}

        {variant === 'submission-bridge' && (
          <g filter="url(#glowFilter)">
            {/* Arched bridge curve */}
            <path d="M 50 160 C 90 140, 130 90, 175 90 C 220 90, 255 135, 280 160" stroke="#ffb834" strokeWidth="3.2" strokeLinecap="round" />
            {/* Pinned arms overhead */}
            <path d="M 70 145 C 50 120, 45 90, 50 70" stroke="url(#posGrad)" strokeWidth="2" strokeDasharray="3 2" />
            {/* Penetrating downward vector */}
            <path d="M 140 170 L 165 110 C 170 85, 185 60, 200 50" stroke="url(#posGrad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="160" cy="105" r="7" fill="#e8a020" className="animate-ping opacity-75" />
            <circle cx="160" cy="105" r="4" fill="#fff" />
          </g>
        )}
      </svg>
    </div>
  )
}

// ─── Dynamic Cadence & Wave Vector Canvas ─────────────────────────────
function CadenceWaveVisualizer({
  thrustVector,
  bpm,
  hapticsActive
}: {
  thrustVector: PositionItem['thrustVector']
  bpm: number
  hapticsActive: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let phase = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const midY = h / 2

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(232, 160, 32, 0.85)'
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#e8a020'
      ctx.shadowBlur = 10

      const freq = (bpm / 60) * 0.05
      phase += freq

      for (let x = 0; x < w; x++) {
        let y = midY
        const normX = x / w

        if (thrustVector === 'Deep Angled Plunge') {
          // Sharp asymmetrical plunge wave
          y += Math.pow(Math.sin(normX * 8 + phase), 3) * (h * 0.35)
        } else if (thrustVector === 'Rotational Grind') {
          // Smooth compound harmonic orbit
          y += (Math.sin(normX * 6 + phase) * 0.7 + Math.cos(normX * 12 + phase * 1.5) * 0.3) * (h * 0.3)
        } else if (thrustVector === 'Shallow High-Speed Flutter') {
          // Rapid vibration oscillation
          y += Math.sin(normX * 18 + phase * 2.5) * (h * 0.18)
        } else {
          // Linear piston standard
          y += Math.sin(normX * 6 + phase) * (h * 0.3)
        }

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [thrustVector, bpm])

  // Mobile vibration haptics loop
  useEffect(() => {
    if (!hapticsActive || typeof window === 'undefined' || !('vibrate' in navigator)) return
    const intervalMs = Math.max(200, (60 / bpm) * 1000)
    const timer = setInterval(() => {
      navigator.vibrate(thrustVector === 'Deep Angled Plunge' ? [40, 20, 60] : [25, 20])
    }, intervalMs)
    return () => clearInterval(timer)
  }, [hapticsActive, bpm, thrustVector])

  return (
    <div className="relative w-full h-24 bg-[#0a0906] rounded-xl overflow-hidden border border-[rgba(232,160,32,0.12)] p-2">
      <canvas ref={canvasRef} width={400} height={80} className="w-full h-full" />
      <div className="absolute top-2 left-3 text-[10px] tracking-widest text-[#e8a020] uppercase font-light">
        Thrust Vector: <span className="text-[#f5e8c8] font-normal">{thrustVector}</span>
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] tracking-wider text-[#f5e8c8]/40">
        Cadence: {bpm} BPM
      </div>
    </div>
  )
}

// ─── Main PositionLab Component ───────────────────────────────────────
export default function PositionLab() {
  const [selectedPosition, setSelectedPosition] = useState<PositionItem>(POSITIONS_DATA[0])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [cadenceBpm, setCadenceBpm] = useState<number>(55)
  const [hapticsActive, setHapticsActive] = useState<boolean>(false)
  const [escapeFlow, setEscapeFlow] = useState<PositionItem[] | null>(null)

  const categories = ['All', 'Deep Intensity & Power', 'Sensory Dominance', 'Acrobatic Friction', 'Intimate Meltdown']

  const filteredPositions = selectedCategory === 'All'
    ? POSITIONS_DATA
    : POSITIONS_DATA.filter(p => p.category === selectedCategory)

  // Generate 3-Stage Escaped Flow: Tease -> Peak -> Climax
  const generateFlow = () => {
    const tease = POSITIONS_DATA.find(p => p.category === 'Intimate Meltdown' || p.intensityLevel <= 3) || POSITIONS_DATA[5]
    const peak = POSITIONS_DATA.find(p => p.category === 'Deep Intensity & Power' || p.intensityLevel === 5) || POSITIONS_DATA[0]
    const climax = POSITIONS_DATA.find(p => p.category === 'Sensory Dominance' || p.clitoralFrictionRating >= 8) || POSITIONS_DATA[2]
    setEscapeFlow([tease, peak, climax])
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-l-[#e8a020]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.25em] font-light mb-1">
              Physiological Geometry & Anatomy Lab
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Sensual Position Laboratory
            </h2>
            <p className="text-[#f5e8c8]/40 text-sm mt-1 max-w-xl">
              High-leverage physical physics, anatomical hotspots, and interactive cadence telemetry.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={generateFlow}
            className="px-5 py-3 rounded-xl text-xs uppercase tracking-widest font-medium transition-all shadow-lg flex items-center gap-2 self-start md:self-auto"
            style={{
              background: 'linear-gradient(135deg, #e8a020 0%, #d4601a 100%)',
              color: '#0a0906',
              boxShadow: '0 4px 20px rgba(232,160,32,0.35)'
            }}
          >
            <span>⚡</span>
            Generate Tonight&apos;s 3-Stage Arc
          </motion.button>
        </div>
      </div>

      {/* 3-Stage Escaped Flow Modal / Banner if Active */}
      <AnimatePresence>
        {escapeFlow && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel p-6 border border-[#e8a020]/40 bg-[#16120a]/90 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="text-lg font-light text-[#f5e8c8]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Tonight&apos;s Curated 3-Stage Escalation Flow
                </h3>
              </div>
              <button
                onClick={() => setEscapeFlow(null)}
                className="text-xs text-[#f5e8c8]/40 hover:text-[#f5e8c8] transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {escapeFlow.map((pos, idx) => (
                <div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  className="p-4 rounded-xl border border-[rgba(232,160,32,0.2)] bg-[#0a0906]/60 cursor-pointer hover:border-[#e8a020] transition-all"
                >
                  <div className="text-[10px] tracking-widest uppercase text-[#e8a020] font-semibold mb-1">
                    Stage {idx + 1}: {idx === 0 ? 'Tease & Prime' : idx === 1 ? 'Peak Intensity' : 'Shared Climax'}
                  </div>
                  <h4 className="text-base text-[#f5e8c8] font-medium">{pos.name}</h4>
                  <p className="text-xs text-[#f5e8c8]/40 mt-1 line-clamp-2">{pos.tagline}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2 rounded-full text-xs tracking-wider transition-all whitespace-nowrap"
            style={{
              background: selectedCategory === cat ? 'rgba(232,160,32,0.18)' : 'rgba(245,232,200,0.03)',
              color: selectedCategory === cat ? '#e8a020' : 'rgba(245,232,200,0.5)',
              border: selectedCategory === cat ? '1px solid rgba(232,160,32,0.4)' : '1px solid rgba(245,232,200,0.08)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Studio View: Positions Grid + Active Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Positions Catalog (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs text-[#f5e8c8]/40 uppercase tracking-widest">
            Select Configuration ({filteredPositions.length})
          </p>

          <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredPositions.map((pos) => {
              const isSelected = selectedPosition.id === pos.id
              return (
                <motion.div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-xl cursor-pointer transition-all border text-left"
                  style={{
                    background: isSelected ? 'rgba(232,160,32,0.1)' : 'rgba(245,232,200,0.02)',
                    borderColor: isSelected ? 'rgba(232,160,32,0.5)' : 'rgba(245,232,200,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#e8a020] font-light tracking-wide">{pos.category}</span>
                    <span className="text-xs text-[#d4601a]">
                      {'🔥'.repeat(pos.intensityLevel)}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-light text-[#f5e8c8] mt-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {pos.name}
                  </h3>
                  <p className="text-xs text-[#f5e8c8]/40 mt-0.5 line-clamp-1">{pos.tagline}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Interactive Blueprint & Telemetry Inspector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Visualizer Silhouette Box */}
          <PositionSilhouette
            variant={selectedPosition.svgVariant}
            glowColor={selectedPosition.intensityLevel >= 4 ? '#d4601a' : '#e8a020'}
          />

          {/* Metrics & Physics Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Depth Rating</span>
              <span className="text-xl font-light text-[#e8a020]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.depthRating} / 10
              </span>
            </div>
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Clitoral Friction</span>
              <span className="text-xl font-light text-[#d4601a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.clitoralFrictionRating} / 10
              </span>
            </div>
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Pelvic Tilt</span>
              <span className="text-xl font-light text-[#f5e8c8]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.pelvicTiltDeg}°
              </span>
            </div>
          </div>

          {/* Cadence Telemetry & Wave Visualizer */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#f5e8c8]/40">Cadence Simulation</span>
              <button
                onClick={() => setHapticsActive(!hapticsActive)}
                className="text-xs px-3 py-1 rounded-full transition-all flex items-center gap-1.5"
                style={{
                  background: hapticsActive ? 'rgba(232,160,32,0.2)' : 'rgba(245,232,200,0.05)',
                  border: hapticsActive ? '1px solid #e8a020' : '1px solid rgba(245,232,200,0.1)',
                  color: hapticsActive ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                <span>📳</span>
                {hapticsActive ? 'Haptics Active' : 'Enable Mobile Haptics'}
              </button>
            </div>

            <CadenceWaveVisualizer
              thrustVector={selectedPosition.thrustVector}
              bpm={cadenceBpm}
              hapticsActive={hapticsActive}
            />

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#f5e8c8]/30 shrink-0">Pace:</span>
              <input
                type="range"
                min="30"
                max="110"
                value={cadenceBpm}
                onChange={(e) => setCadenceBpm(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, rgba(232,160,32,0.2), #e8a020)'
                }}
              />
              <span className="text-xs text-[#e8a020] shrink-0 font-medium">{cadenceBpm} BPM</span>
            </div>
          </div>

          {/* Erotic Mechanics & Dirty Talk Cue */}
          <div className="glass-panel p-5 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e8a020] mb-1 font-medium">
                Biomechanical Execution
              </p>
              <p className="text-sm text-[#f5e8c8]/70 leading-relaxed">
                {selectedPosition.eroticMechanics}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[rgba(232,160,32,0.2)] bg-[#120f09]">
              <p className="text-[10px] uppercase tracking-widest text-[#d4601a] mb-1">
                Dirty Talk / Vocal Cue
              </p>
              <p className="text-sm italic text-[#f5e8c8]/85" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                &ldquo;{selectedPosition.dirtyTalkCue}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
