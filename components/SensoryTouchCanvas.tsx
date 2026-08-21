'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

interface Point {
  x: number
  y: number
  pressure: number   // 0-1, grows while held
  velocity: number   // px/frame
  age: number        // frames since drawn
}

interface Zone {
  slug: string
  label: string
  cx: number   // 0-1 normalized
  cy: number   // 0-1 normalized
  radius: number // 0-1 normalized
  active: boolean
  pulseAge: number
}

type ColorScheme = 'amber' | 'ember' | 'cool'

const COLOR_SCHEMES: Record<ColorScheme, { inner: string; outer: string; label: string }> = {
  amber: { inner: 'rgba(240,184,64,', outer: 'rgba(232,160,32,', label: 'Warm Amber' },
  ember: { inner: 'rgba(240,120,40,', outer: 'rgba(212,80,20,', label: 'Deep Ember' },
  cool:  { inner: 'rgba(120,160,220,', outer: 'rgba(80,120,200,', label: 'Cool Indigo' },
}

// Erogenous zone positions (normalized 0-1 within canvas)
const INITIAL_ZONES: Zone[] = [
  { slug: 'nape',         label: 'Nape',         cx: 0.50, cy: 0.18, radius: 0.06, active: false, pulseAge: 0 },
  { slug: 'behind-ear',   label: 'Behind Ear',   cx: 0.68, cy: 0.14, radius: 0.05, active: false, pulseAge: 0 },
  { slug: 'inner-wrist',  label: 'Inner Wrist',  cx: 0.18, cy: 0.54, radius: 0.05, active: false, pulseAge: 0 },
  { slug: 'inner-thigh',  label: 'Inner Thigh',  cx: 0.36, cy: 0.72, radius: 0.07, active: false, pulseAge: 0 },
  { slug: 'lower-abdomen',label: 'Lower Abd.',   cx: 0.50, cy: 0.60, radius: 0.06, active: false, pulseAge: 0 },
  { slug: 'sacral',       label: 'Sacral',       cx: 0.50, cy: 0.68, radius: 0.06, active: false, pulseAge: 0 },
]

// ─── Component ────────────────────────────────────────────────────────

export default function SensoryTouchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const trailRef = useRef<Point[]>([])
  const zonesRef = useRef<Zone[]>(INITIAL_ZONES.map(z => ({ ...z })))
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const pressureRef = useRef(0)
  const isDownRef = useRef(false)
  const frameRef = useRef(0)

  const [liteMode, setLiteMode] = useState(false)
  const [sensitivity, setSensitivity] = useState(50)     // 0–100
  const [colorScheme, setColorScheme] = useState<ColorScheme>('amber')
  const [fadeSpeed, setFadeSpeed] = useState(0.96)        // alpha multiplier per frame
  const [activatedZones, setActivatedZones] = useState<string[]>([])
  const [trailCount, setTrailCount] = useState(0)

  const sensitivityRadius = (sensitivity / 100) * 0.12 + 0.04  // 0.04–0.16 normalized

  // ─── Canvas draw loop ──────────────────────────────────────────────

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

    const ctx = canvas.getContext('2d')
    const octx = overlay.getContext('2d')
    if (!ctx || !octx) return

    const W = canvas.width
    const H = canvas.height

    if (liteMode) {
      // Lite mode: just clear overlay and redraw trails at reduced opacity
      ctx.clearRect(0, 0, W, H)
    } else {
      // Full mode: fade existing content
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${1 - fadeSpeed})`
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'
    }

    // Draw trail points
    const scheme = COLOR_SCHEMES[colorScheme]
    const trails = trailRef.current

    trails.forEach((pt, i) => {
      pt.age++
      const lifeAlpha = liteMode ? Math.max(0, 1 - pt.age / 60) : 1
      if (lifeAlpha <= 0) return

      // Base radius from pressure + velocity
      const baseR = 8 + pt.pressure * 28 + pt.velocity * 0.8
      const alpha = Math.min(0.9, 0.3 + pt.pressure * 0.6)

      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, baseR * 2.5)
      grad.addColorStop(0, `${scheme.inner}${(alpha * lifeAlpha).toFixed(2)})`)
      grad.addColorStop(0.5, `${scheme.outer}${(alpha * 0.4 * lifeAlpha).toFixed(2)})`)
      grad.addColorStop(1, `${scheme.outer}0)`)

      ctx.beginPath()
      ctx.arc(pt.x, pt.y, baseR * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    })

    // Prune old trail points in lite mode
    if (liteMode) {
      trailRef.current = trails.filter(p => p.age < 60)
    }

    // ── Zone overlay ──
    octx.clearRect(0, 0, W, H)

    zonesRef.current.forEach(zone => {
      const zx = zone.cx * W
      const zy = zone.cy * H
      const zr = zone.radius * Math.min(W, H)

      // Base ring
      octx.beginPath()
      octx.arc(zx, zy, zr, 0, Math.PI * 2)
      octx.strokeStyle = zone.active
        ? 'rgba(232,160,32,0.6)'
        : 'rgba(245,232,200,0.12)'
      octx.lineWidth = zone.active ? 1.5 : 0.8
      octx.stroke()

      // Pulse ring animation
      if (zone.active && zone.pulseAge < 40) {
        zone.pulseAge++
        const progress = zone.pulseAge / 40
        const pulseR = zr + progress * zr * 1.8
        const pulseAlpha = (1 - progress) * 0.7
        octx.beginPath()
        octx.arc(zx, zy, pulseR, 0, Math.PI * 2)
        octx.strokeStyle = `rgba(232,160,32,${pulseAlpha})`
        octx.lineWidth = 1
        octx.stroke()
      }

      if (zone.pulseAge >= 40) {
        zone.active = false
        zone.pulseAge = 0
      }

      // Label
      octx.fillStyle = zone.active ? 'rgba(232,160,32,0.8)' : 'rgba(245,232,200,0.18)'
      octx.font = '10px Inter, sans-serif'
      octx.textAlign = 'center'
      octx.fillText(zone.label, zx, zy - zr - 4)
    })

    // Grow pressure while held
    if (isDownRef.current && pressureRef.current < 1) {
      pressureRef.current = Math.min(1, pressureRef.current + 0.02)
    }

    frameRef.current++
    if (frameRef.current % 30 === 0) {
      setTrailCount(trailRef.current.length)
    }

    rafRef.current = requestAnimationFrame(drawFrame)
  }, [liteMode, colorScheme, fadeSpeed])

  // Start/restart RAF loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(drawFrame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [drawFrame])

  // Resize handler
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current
      const overlay = overlayRef.current
      if (!canvas || !overlay) return
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      overlay.width = rect.width
      overlay.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ─── Pointer handlers ──────────────────────────────────────────────

  function getCanvasPos(e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } {
    const rect = overlayRef.current!.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function checkZoneHits(x: number, y: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.width
    const H = canvas.height
    const threshold = sensitivityRadius * Math.min(W, H)

    const triggered: string[] = []

    zonesRef.current.forEach(zone => {
      const zx = zone.cx * W
      const zy = zone.cy * H
      const dist = Math.hypot(x - zx, y - zy)
      if (dist < threshold && !zone.active) {
        zone.active = true
        zone.pulseAge = 0
        triggered.push(zone.slug)
        // Haptic
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([30, 20, 50])
        }
      }
    })

    if (triggered.length > 0) {
      setActivatedZones(prev => Array.from(new Set([...prev, ...triggered])))
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    isDownRef.current = true
    pressureRef.current = 0.2
    const pos = getCanvasPos(e)
    lastPosRef.current = pos
    overlayRef.current?.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const pos = getCanvasPos(e)
    const last = lastPosRef.current

    const velocity = last
      ? Math.hypot(pos.x - last.x, pos.y - last.y)
      : 0

    // Only draw trail when pointer is down OR hovering (no down required for hover glow)
    const pressure = isDownRef.current ? pressureRef.current : 0.15

    trailRef.current.push({
      x: pos.x,
      y: pos.y,
      pressure,
      velocity: Math.min(velocity, 40),
      age: 0,
    })

    // Keep trail bounded
    if (trailRef.current.length > 300) {
      trailRef.current.splice(0, 50)
    }

    if (isDownRef.current) {
      checkZoneHits(pos.x, pos.y)
    }

    lastPosRef.current = pos
  }

  function handlePointerUp() {
    isDownRef.current = false
    pressureRef.current = 0
    lastPosRef.current = null
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    trailRef.current = []
    zonesRef.current = INITIAL_ZONES.map(z => ({ ...z }))
    setActivatedZones([])
  }

  // ─── Render ────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5">
      {/* Controls bar */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">
              Interactive
            </p>
            <h2
              className="text-2xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Sensory Touch Canvas
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Lite mode toggle */}
            <button
              onClick={() => setLiteMode(v => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: liteMode ? 'rgba(74,222,128,0.1)' : 'rgba(245,232,200,0.04)',
                border: liteMode ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(245,232,200,0.1)',
                color: liteMode ? '#4ade80' : 'rgba(245,232,200,0.35)',
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${liteMode ? 'bg-green-400' : 'bg-white/20'}`} />
              Lite Mode
            </button>
            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 rounded-full text-xs transition-all text-[#f5e8c8]/35 hover:text-[#f5e8c8]/60"
              style={{ border: '1px solid rgba(245,232,200,0.08)' }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sensitivity */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-[#f5e8c8]/40 uppercase tracking-wider">Zone Sensitivity</span>
              <span className="text-xs text-[#e8a020]">{sensitivity}%</span>
            </div>
            <input
              type="range" min={10} max={100} step={5}
              value={sensitivity}
              onChange={e => setSensitivity(Number(e.target.value))}
              className="w-full h-1.5 rounded appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, rgba(232,160,32,0.3), rgba(232,160,32,1))` }}
            />
          </div>

          {/* Fade speed */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-[#f5e8c8]/40 uppercase tracking-wider">Trail Persistence</span>
              <span className="text-xs text-[#e8a020]">{Math.round((fadeSpeed - 0.9) / 0.09 * 100)}%</span>
            </div>
            <input
              type="range" min={0.90} max={0.99} step={0.005}
              value={fadeSpeed}
              onChange={e => setFadeSpeed(Number(e.target.value))}
              className="w-full h-1.5 rounded appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, rgba(232,160,32,0.2), rgba(232,160,32,0.9))` }}
            />
          </div>

          {/* Color scheme */}
          <div>
            <span className="text-xs text-[#f5e8c8]/40 uppercase tracking-wider block mb-1">
              Color Temperature
            </span>
            <div className="flex gap-2">
              {(Object.keys(COLOR_SCHEMES) as ColorScheme[]).map(scheme => (
                <button
                  key={scheme}
                  onClick={() => setColorScheme(scheme)}
                  className="flex-1 py-1 rounded-lg text-xs transition-all"
                  style={{
                    background: colorScheme === scheme
                      ? scheme === 'cool' ? 'rgba(80,120,200,0.2)' : 'rgba(232,160,32,0.15)'
                      : 'transparent',
                    border: colorScheme === scheme
                      ? scheme === 'cool' ? '1px solid rgba(80,120,200,0.4)' : '1px solid rgba(232,160,32,0.3)'
                      : '1px solid rgba(245,232,200,0.07)',
                    color: colorScheme === scheme
                      ? scheme === 'cool' ? '#7090d0' : '#e8a020'
                      : 'rgba(245,232,200,0.3)',
                  }}
                >
                  {COLOR_SCHEMES[scheme].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div
        className="glass-panel overflow-hidden"
        style={{ height: 480, position: 'relative', cursor: 'crosshair' }}
      >
        {/* Instruction overlay (fades after first touch) */}
        {trailCount === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center">
              <p
                className="text-3xl font-light text-[#f5e8c8]/20 mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Touch or drag to explore
              </p>
              <p className="text-xs text-[#f5e8c8]/12 tracking-wider">
                Hold to build pressure · Hover glowing zones to activate
              </p>
            </div>
          </motion.div>
        )}

        {/* Main trail canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Zone overlay canvas — receives pointer events */}
        <canvas
          ref={overlayRef}
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      {/* Activated zones readout */}
      {activatedZones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4"
        >
          <span className="text-xs uppercase tracking-wider text-[#f5e8c8]/30 mr-3">
            Zones activated:
          </span>
          {activatedZones.map(slug => (
            <span
              key={slug}
              className="inline-block mr-2 mb-1 px-2 py-0.5 rounded-full text-xs"
              style={{
                background: 'rgba(232,160,32,0.1)',
                border: '1px solid rgba(232,160,32,0.25)',
                color: '#e8a020',
              }}
            >
              {INITIAL_ZONES.find(z => z.slug === slug)?.label ?? slug}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}
