'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { POSITIONS_DATA, PositionItem } from '../lib/positionsData'

// Dynamically import Three.js WebGL Viewport with SSR disabled to prevent hydration mismatch
const ThreePositionViewport = dynamic(() => import('./ThreePositionViewport'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#080705] border border-[rgba(232,160,32,0.2)] text-[#e8a020] text-xs uppercase tracking-widest animate-pulse">
      Initialising WebGL 3D Anatomy Engine...
    </div>
  )
})

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
          y += Math.pow(Math.sin(normX * 8 + phase), 3) * (h * 0.35)
        } else if (thrustVector === 'Rotational Grind') {
          y += (Math.sin(normX * 6 + phase) * 0.7 + Math.cos(normX * 12 + phase * 1.5) * 0.3) * (h * 0.3)
        } else if (thrustVector === 'Shallow High-Speed Flutter') {
          y += Math.sin(normX * 18 + phase * 2.5) * (h * 0.18)
        } else {
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

// ─── Main PositionLab Component (3D POV Studio) ───────────────────────
export default function PositionLab() {
  const [selectedPosition, setSelectedPosition] = useState<PositionItem>(POSITIONS_DATA[0])
  const [selectedCategory, setSelectedCategory] = useState<string>('All (26)')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'default' | 'depth' | 'friction' | 'intensity' | 'tilt'>('default')
  const [povPreset, setPovPreset] = useState<'orbit' | 'povA' | 'povB' | 'pelvicZoom'>('orbit')
  const [cadenceBpm, setCadenceBpm] = useState<number>(55)
  const [hapticsActive, setHapticsActive] = useState<boolean>(false)
  const [escapeFlow, setEscapeFlow] = useState<PositionItem[] | null>(null)
  const [flowIntensity, setFlowIntensity] = useState<'sensual' | 'balanced' | 'intense'>('balanced')

  const categories = [
    'All (26)',
    '👑 Her in Control',
    'Deep Power & Pelvic Tilt',
    'Clitoral Friction & Alignment',
    'Visual Dominance & Control',
    'Slow-Burn Intimacy & Endurance',
    'Acrobatic, Kink & Friction'
  ]

  // Filter & Sort Logic
  const processedPositions = useMemo(() => {
    let list = POSITIONS_DATA

    if (selectedCategory !== 'All (26)') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.eroticMechanics.toLowerCase().includes(q) ||
          p.thrustVector.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'depth') list = [...list].sort((a, b) => b.depthRating - a.depthRating)
    if (sortBy === 'friction') list = [...list].sort((a, b) => b.clitoralFrictionRating - a.clitoralFrictionRating)
    if (sortBy === 'intensity') list = [...list].sort((a, b) => b.intensityLevel - a.intensityLevel)
    if (sortBy === 'tilt') list = [...list].sort((a, b) => b.pelvicTiltDeg - a.pelvicTiltDeg)

    return list
  }, [selectedCategory, searchQuery, sortBy])

  // Generate 3-Stage Escaped Flow from 26 positions based on intensity
  const generateFlow = (intensity: 'sensual' | 'balanced' | 'intense') => {
    setFlowIntensity(intensity)
    if (intensity === 'sensual') {
      const tease = POSITIONS_DATA.find((p) => p.id === 'lazy-sunday') || POSITIONS_DATA[17]
      const peak = POSITIONS_DATA.find((p) => p.id === 'lotus-lock') || POSITIONS_DATA[9]
      const climax = POSITIONS_DATA.find((p) => p.id === 'obsidian-spoon') || POSITIONS_DATA[15]
      setEscapeFlow([tease, peak, climax])
    } else if (intensity === 'intense') {
      const tease = POSITIONS_DATA.find((p) => p.id === 'counter-press') || POSITIONS_DATA[8]
      const peak = POSITIONS_DATA.find((p) => p.id === 'wall-pin') || POSITIONS_DATA[2]
      const climax = POSITIONS_DATA.find((p) => p.id === 'piledriver') || POSITIONS_DATA[4]
      setEscapeFlow([tease, peak, climax])
    } else {
      const tease = POSITIONS_DATA.find((p) => p.id === 'velvet-trap') || POSITIONS_DATA[6]
      const peak = POSITIONS_DATA.find((p) => p.id === 'arch-anchor') || POSITIONS_DATA[0]
      const climax = POSITIONS_DATA.find((p) => p.id === 'overdrive-cowgirl') || POSITIONS_DATA[11]
      setEscapeFlow([tease, peak, climax])
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-l-[#e8a020]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.25em] font-light mb-1">
              Interactive WebGL Three.js & POV Camera Studio
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Sensual Position Laboratory
            </h2>
            <p className="text-[#f5e8c8]/40 text-sm mt-1 max-w-xl">
              Real-time 3D camera angles, First-Person POV views, volumetric anatomy shaders, and cadence physics.
            </p>
          </div>

          {/* Night's Climax Arc Flow Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => generateFlow('sensual')}
              className="px-3.5 py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-medium transition-all shadow-md bg-[#18140C] border border-[rgba(232,160,32,0.3)] text-[#f5e8c8]"
            >
              🌸 Slow-Burn Arc
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => generateFlow('balanced')}
              className="px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-medium transition-all shadow-lg text-[#0a0906]"
              style={{
                background: 'linear-gradient(135deg, #e8a020 0%, #d4601a 100%)',
                boxShadow: '0 4px 15px rgba(232,160,32,0.3)'
              }}
            >
              ⚡ Balanced Arc
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => generateFlow('intense')}
              className="px-3.5 py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-medium transition-all shadow-md bg-[#240c14] border border-[#EC4899]/40 text-[#F472B6]"
            >
              🔥 High-Voltage Arc
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3-Stage Escaped Flow Banner */}
      <AnimatePresence>
        {escapeFlow && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel p-6 border border-[#e8a020]/40 bg-[#16120a]/95 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="text-lg font-light text-[#f5e8c8]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Tonight&apos;s Curated 3-Stage Escalation Flow ({flowIntensity.toUpperCase()})
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

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search 26 positions, cues, mechanics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12100A] border border-[rgba(232,160,32,0.2)] rounded-xl px-4 py-2 text-xs text-[#f5e8c8] placeholder-[#f5e8c8]/30 focus:outline-none focus:border-[#e8a020]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-[#f5e8c8]/40 hover:text-[#f5e8c8]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-[#f5e8c8]/40">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#12100A] border border-[rgba(232,160,32,0.2)] rounded-xl px-3 py-1.5 text-xs text-[#f5e8c8] focus:outline-none focus:border-[#e8a020]"
            >
              <option value="default">Default Order</option>
              <option value="depth">Max Depth (High to Low)</option>
              <option value="friction">Max Clitoral Friction</option>
              <option value="intensity">Intensity (5 to 1)</option>
              <option value="tilt">Pelvic Tilt Angle</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
      </div>

      {/* Main Studio View: Positions Catalog + Active 3D POV Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Positions Catalog (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs text-[#f5e8c8]/40 uppercase tracking-widest">
            Configuration Library ({processedPositions.length} of 26)
          </p>

          <div className="flex flex-col gap-2.5 max-h-[660px] overflow-y-auto pr-1">
            {processedPositions.map((pos) => {
              const isSelected = selectedPosition.id === pos.id
              return (
                <motion.div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  whileHover={{ x: 4 }}
                  className="p-3.5 rounded-xl cursor-pointer transition-all border text-left"
                  style={{
                    background: isSelected ? 'rgba(232,160,32,0.12)' : 'rgba(245,232,200,0.02)',
                    borderColor: isSelected ? 'rgba(232,160,32,0.5)' : 'rgba(245,232,200,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#e8a020] font-light tracking-wide truncate max-w-[200px]">
                      {pos.category}
                    </span>
                    <span className="text-xs text-[#d4601a]">
                      {'🔥'.repeat(pos.intensityLevel)}
                    </span>
                  </div>
                  <h3
                    className="text-base font-light text-[#f5e8c8] mt-1"
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

        {/* Right Column: Real-Time WebGL 3D POV Studio & Inspector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* 3D POV Camera Angle Presets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-widest text-[#f5e8c8]/40 font-medium">
              3D POV Camera System
            </span>
            <div className="flex items-center gap-1 bg-[#12100a] p-1 rounded-lg border border-[rgba(232,160,32,0.15)] overflow-x-auto">
              <button
                onClick={() => setPovPreset('orbit')}
                className="px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap"
                style={{
                  background: povPreset === 'orbit' ? 'rgba(232,160,32,0.25)' : 'transparent',
                  color: povPreset === 'orbit' ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                📐 360° Studio
              </button>
              <button
                onClick={() => setPovPreset('povA')}
                className="px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap"
                style={{
                  background: povPreset === 'povA' ? 'rgba(245,158,11,0.25)' : 'transparent',
                  color: povPreset === 'povA' ? '#F59E0B' : 'rgba(245,232,200,0.4)',
                }}
              >
                👁️ Partner A POV
              </button>
              <button
                onClick={() => setPovPreset('povB')}
                className="px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap"
                style={{
                  background: povPreset === 'povB' ? 'rgba(236,72,153,0.25)' : 'transparent',
                  color: povPreset === 'povB' ? '#EC4899' : 'rgba(245,232,200,0.4)',
                }}
              >
                👁️ Partner B POV
              </button>
              <button
                onClick={() => setPovPreset('pelvicZoom')}
                className="px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap"
                style={{
                  background: povPreset === 'pelvicZoom' ? 'rgba(232,160,32,0.25)' : 'transparent',
                  color: povPreset === 'pelvicZoom' ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                🔍 Pelvic Alignment
              </button>
            </div>
          </div>

          {/* Real-Time WebGL 3D Viewport with Selection Propagation */}
          <ThreePositionViewport
            positionData={selectedPosition}
            bpm={cadenceBpm}
            povPreset={povPreset}
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
              <span className="text-xl font-light text-[#EC4899]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
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
              <p className="text-[10px] uppercase tracking-widest text-[#EC4899] mb-1">
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
