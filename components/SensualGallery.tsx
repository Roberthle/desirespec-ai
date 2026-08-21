'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────

type Gender = 'female' | 'male'
type ViewMode = 'grid' | 'focused'

interface ArtPiece {
  id: string
  title: string
  subtitle: string
  description: string
  hasGenderVariant: true
}

// ─── SVG Art Pieces ────────────────────────────────────────────────────
// All continuous line art, tasteful minimalist silhouettes

function NecklineCollarbone({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="nc-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0)" />
          <stop offset="30%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="70%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0)" />
        </linearGradient>
      </defs>
      {/* Neck */}
      <path
        d={gender === 'female'
          ? 'M90 20 C88 30 86 40 85 55 C84 65 86 72 100 75 C114 72 116 65 115 55 C114 40 112 30 110 20'
          : 'M88 20 C85 30 83 40 83 55 C83 65 86 72 100 75 C114 72 117 65 117 55 C117 40 115 30 112 20'}
        stroke="url(#nc-line)"
        strokeWidth={gender === 'female' ? '1.2' : '1.6'}
        strokeLinecap="round"
      />
      {/* Collarbone left */}
      <path
        d={gender === 'female'
          ? 'M30 90 C45 82 65 78 85 78 C92 78 97 77 100 75'
          : 'M25 92 C42 84 62 80 83 79 C91 78 97 77 100 75'}
        stroke="url(#nc-line)"
        strokeWidth={gender === 'female' ? '1.2' : '1.6'}
        strokeLinecap="round"
      />
      {/* Collarbone right */}
      <path
        d={gender === 'female'
          ? 'M170 90 C155 82 135 78 115 78 C108 78 103 77 100 75'
          : 'M175 92 C158 84 138 80 117 79 C109 78 103 77 100 75'}
        stroke="url(#nc-line)"
        strokeWidth={gender === 'female' ? '1.2' : '1.6'}
        strokeLinecap="round"
      />
      {/* Shoulder curves */}
      <path
        d={gender === 'female'
          ? 'M10 110 C18 100 30 94 50 91 C65 89 75 88 85 84'
          : 'M5 108 C15 98 28 92 50 89 C68 87 76 86 83 82'}
        stroke="rgba(245,232,200,0.2)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d={gender === 'female'
          ? 'M190 110 C182 100 170 94 150 91 C135 89 125 88 115 84'
          : 'M195 108 C185 98 172 92 150 89 C132 87 124 86 117 82'}
        stroke="rgba(245,232,200,0.2)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Sternum line */}
      <path
        d={gender === 'female'
          ? 'M100 78 C100 85 100 100 100 120'
          : 'M100 78 C100 86 100 102 100 125'}
        stroke="rgba(245,232,200,0.12)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SpineCurvature({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sp-line" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.1)" />
          <stop offset="20%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="80%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.1)" />
        </linearGradient>
      </defs>
      {/* Spine centerline with natural S-curve */}
      <path
        d={gender === 'female'
          ? 'M100 15 C102 35 104 55 101 75 C98 95 95 110 98 130 C101 150 104 165 100 185'
          : 'M100 15 C103 38 106 58 102 80 C98 100 94 115 98 138 C102 158 105 170 100 185'}
        stroke="url(#sp-line)"
        strokeWidth={gender === 'female' ? '1.4' : '1.8'}
        strokeLinecap="round"
      />
      {/* Back contour left */}
      <path
        d={gender === 'female'
          ? 'M55 30 C60 40 62 55 63 75 C64 95 62 110 58 130 C54 150 52 165 55 180'
          : 'M48 30 C55 40 58 58 59 80 C60 100 57 118 52 138 C47 158 45 170 48 180'}
        stroke="rgba(245,232,200,0.18)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Back contour right */}
      <path
        d={gender === 'female'
          ? 'M145 30 C140 40 138 55 137 75 C136 95 138 110 142 130 C146 150 148 165 145 180'
          : 'M152 30 C145 40 142 58 141 80 C140 100 143 118 148 138 C153 158 155 170 152 180'}
        stroke="rgba(245,232,200,0.18)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Vertebra tick marks */}
      {[35, 55, 75, 95, 115, 135, 155].map((yv, i) => {
        const xOffset = gender === 'female'
          ? [0, 1, 0.5, -0.5, -1, 0, 0.5][i]
          : [0, 1, 1, 0, -1, -0.5, 0][i]
        const cx = 100 + xOffset * 2
        return (
          <line
            key={i}
            x1={cx - 4} y1={yv} x2={cx + 4} y2={yv}
            stroke="rgba(245,232,200,0.15)"
            strokeWidth="0.7"
          />
        )
      })}
      {/* Waist pinch suggestion */}
      <path
        d={gender === 'female'
          ? 'M58 120 C65 118 80 116 95 116 M105 116 C120 116 135 118 142 120'
          : 'M52 125 C62 122 78 120 97 120 M103 120 C122 120 138 122 148 125'}
        stroke="rgba(245,232,200,0.1)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ShoulderNapeProximity({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.8)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.2)" />
        </linearGradient>
      </defs>
      {/* Main figure nape + shoulder */}
      <path
        d={gender === 'female'
          ? 'M120 15 C118 28 115 42 113 56 C110 72 115 80 130 83 C150 87 168 82 178 72 C188 62 192 48 185 35 C178 22 165 18 155 20'
          : 'M125 15 C122 28 118 42 116 56 C113 72 118 80 135 83 C158 87 175 82 185 72 C195 60 195 45 188 32 C181 19 167 16 157 18'}
        stroke="url(#sn-grad)"
        strokeWidth={gender === 'female' ? '1.3' : '1.7'}
        strokeLinecap="round"
        fill="none"
      />
      {/* Nape curve detail */}
      <path
        d={gender === 'female'
          ? 'M110 56 C108 62 109 70 113 75'
          : 'M113 56 C110 63 111 72 116 77'}
        stroke="rgba(245,232,200,0.4)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Second figure approaching - head tilt */}
      <path
        d={gender === 'female'
          ? 'M30 45 C35 35 45 28 58 26 C68 25 76 28 82 35 C88 42 90 52 87 62 C84 72 76 78 66 80'
          : 'M25 45 C31 33 42 26 57 24 C68 23 77 26 85 34 C93 42 95 53 91 64 C87 74 78 80 67 82'}
        stroke="rgba(245,232,200,0.35)"
        strokeWidth={gender === 'female' ? '1.0' : '1.4'}
        strokeLinecap="round"
      />
      {/* Proximity tension line between figures */}
      <path
        d="M89 65 C95 68 102 70 108 68"
        stroke="rgba(232,160,32,0.25)"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        strokeLinecap="round"
      />
      {/* Breath indicator arcs */}
      {[0, 1, 2].map(i => (
        <path
          key={i}
          d={`M${96 + i * 5} ${62 - i * 2} C${97 + i * 5} ${58 - i * 2} ${100 + i * 5} ${56 - i * 2} ${103 + i * 5} ${58 - i * 2}`}
          stroke={`rgba(232,160,32,${0.12 - i * 0.03})`}
          strokeWidth="0.5"
          fill="none"
        />
      ))}
    </svg>
  )
}

function InterlacedHands({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ih-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.6)" />
          <stop offset="50%" stopColor="rgba(245,232,200,0.9)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.5)" />
        </linearGradient>
      </defs>
      {/* Left hand (approaching from left) */}
      <path
        d={gender === 'female'
          ? 'M10 100 C20 95 35 92 55 90 C65 89 72 88 78 85 C82 83 84 78 82 73 L80 60 C80 55 83 52 87 54 L88 75'
          : 'M8 102 C20 97 38 93 58 91 C68 90 75 89 81 85 C85 83 87 77 85 72 L83 57 C83 51 86 48 91 50 L92 72'}
        stroke="url(#ih-grad)"
        strokeWidth={gender === 'female' ? '1.3' : '1.8'}
        strokeLinecap="round"
        fill="none"
      />
      {/* Fingers left */}
      {[0, 1, 2].map(i => (
        <path
          key={i}
          d={`M${88 + i * 10} ${75 - i * 3} L${90 + i * 10} ${45 - i * 4}`}
          stroke="rgba(245,232,200,0.45)"
          strokeWidth={gender === 'female' ? '1.0' : '1.4'}
          strokeLinecap="round"
        />
      ))}
      {/* Right hand (from right) */}
      <path
        d={gender === 'female'
          ? 'M190 100 C180 95 165 92 145 90 C135 89 128 88 122 85 C118 83 116 78 118 73 L120 60 C120 55 117 52 113 54 L112 75'
          : 'M192 102 C180 97 162 93 142 91 C132 90 125 89 119 85 C115 83 113 77 115 72 L117 57 C117 51 114 48 109 50 L108 72'}
        stroke="url(#ih-grad)"
        strokeWidth={gender === 'female' ? '1.3' : '1.8'}
        strokeLinecap="round"
        fill="none"
      />
      {/* Fingers right */}
      {[0, 1, 2].map(i => (
        <path
          key={i}
          d={`M${112 - i * 10} ${75 - i * 3} L${110 - i * 10} ${45 - i * 4}`}
          stroke="rgba(245,232,200,0.45)"
          strokeWidth={gender === 'female' ? '1.0' : '1.4'}
          strokeLinecap="round"
        />
      ))}
      {/* Interlace touch point glow */}
      <circle cx="100" cy="82" r="8" fill="rgba(232,160,32,0.06)" />
      <circle cx="100" cy="82" r="4" fill="rgba(232,160,32,0.1)" />
      {/* Wrist lines suggestion */}
      <path d="M55 110 Q100 115 145 110" stroke="rgba(245,232,200,0.08)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}

function HipWaistSilhouette({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="hw-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.0)" />
          <stop offset="15%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="85%" stopColor="rgba(245,232,200,0.7)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.0)" />
        </linearGradient>
      </defs>
      {/* Left body contour - waist to hip to thigh */}
      <path
        d={gender === 'female'
          ? 'M68 20 C65 40 62 60 60 80 C58 100 55 115 52 130 C48 148 45 162 50 178 C55 190 65 196 75 195'
          : 'M62 20 C58 40 55 60 53 82 C51 102 50 118 50 135 C50 152 52 168 58 180 C64 192 74 196 84 195'}
        stroke="url(#hw-grad)"
        strokeWidth={gender === 'female' ? '1.4' : '1.9'}
        strokeLinecap="round"
      />
      {/* Right body contour */}
      <path
        d={gender === 'female'
          ? 'M132 20 C135 40 138 60 140 80 C142 100 145 115 148 130 C152 148 155 162 150 178 C145 190 135 196 125 195'
          : 'M138 20 C142 40 145 60 147 82 C149 102 150 118 150 135 C150 152 148 168 142 180 C136 192 126 196 116 195'}
        stroke="url(#hw-grad)"
        strokeWidth={gender === 'female' ? '1.4' : '1.9'}
        strokeLinecap="round"
      />
      {/* Hip width guide */}
      <path
        d={gender === 'female'
          ? 'M48 130 Q100 136 152 130'
          : 'M48 135 Q100 140 152 135'}
        stroke="rgba(245,232,200,0.08)"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Waist guide */}
      <path
        d={gender === 'female'
          ? 'M60 80 Q100 76 140 80'
          : 'M53 82 Q100 78 147 82'}
        stroke="rgba(245,232,200,0.08)"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Seated suggestion - slight curve at bottom */}
      <path
        d={gender === 'female'
          ? 'M60 190 Q100 198 140 190'
          : 'M70 190 Q100 198 130 190'}
        stroke="rgba(245,232,200,0.12)"
        strokeWidth="0.7"
        fill="none"
      />
    </svg>
  )
}

function TwoSilhouetteProximity({ gender }: { gender: Gender }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ts-left" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.6)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.15)" />
        </linearGradient>
        <linearGradient id="ts-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,232,200,0.6)" />
          <stop offset="100%" stopColor="rgba(245,232,200,0.15)" />
        </linearGradient>
        <radialGradient id="ts-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,160,32,0.08)" />
          <stop offset="100%" stopColor="rgba(232,160,32,0)" />
        </radialGradient>
      </defs>
      {/* Proximity tension glow */}
      <ellipse cx="100" cy="100" rx="18" ry="70" fill="url(#ts-glow)" />

      {/* Left figure */}
      <path
        d={gender === 'female'
          ? 'M72 18 C70 28 68 40 68 55 C68 68 70 76 78 80 C84 83 90 83 90 85 L90 120 C90 135 88 150 85 165 C82 178 78 188 75 195'
          : 'M68 18 C65 28 62 42 62 58 C62 72 65 80 74 84 C80 87 87 87 87 89 L87 125 C87 140 84 155 81 170 C78 183 74 192 70 196'}
        stroke="url(#ts-left)"
        strokeWidth={gender === 'female' ? '1.3' : '1.8'}
        strokeLinecap="round"
      />

      {/* Right figure (mirrored, slightly different posture) */}
      <path
        d={gender === 'female'
          ? 'M128 18 C130 28 132 40 132 55 C132 68 130 76 122 80 C116 83 110 83 110 85 L110 120 C110 135 112 150 115 165 C118 178 122 188 125 195'
          : 'M132 18 C135 28 138 42 138 58 C138 72 135 80 126 84 C120 87 113 87 113 89 L113 125 C113 140 116 155 119 170 C122 183 126 192 130 196'}
        stroke="url(#ts-right)"
        strokeWidth={gender === 'female' ? '1.3' : '1.8'}
        strokeLinecap="round"
      />

      {/* Near-touch connection lines */}
      {[60, 80, 100, 120].map((y, i) => (
        <path
          key={i}
          d={`M${gender === 'female' ? 91 : 88} ${y} C95 ${y} 105 ${y} ${gender === 'female' ? 109 : 112} ${y}`}
          stroke={`rgba(232,160,32,${0.06 + (i === 1 || i === 2 ? 0.06 : 0)})`}
          strokeWidth="0.4"
          strokeDasharray="1 2"
        />
      ))}
    </svg>
  )
}

// ─── Art pieces registry ──────────────────────────────────────────────

const ART_PIECES: ArtPiece[] = [
  { id: 'neckline', title: 'Neckline & Collarbone', subtitle: 'Trigeminal · Vagus proximity', description: 'The collarbone sweep — one of the most photographed lines in classical figure study. Dense vagus nerve distribution makes this contour uniquely expressive.', hasGenderVariant: true },
  { id: 'spine', title: 'Spine Curvature', subtitle: 'Sacral plexus arc', description: 'The posterior spine traces the sacral plexus from cervical to lumbar. The natural S-curve maps directly onto physiological arousal pathways.', hasGenderVariant: true },
  { id: 'shoulder-nape', title: 'Shoulder to Nape', subtitle: 'Vagus nerve proximity', description: 'Two silhouettes in near-proximity — the approach tension before contact. The breath arc between them represents the parasympathetic activation threshold.', hasGenderVariant: true },
  { id: 'hands', title: 'Interlaced Hands', subtitle: 'Ulnar nerve contact', description: 'Hand interlacing activates the ulnar nerve network bilaterally. The point of contact glows — signifying the thermal exchange that precedes arousal cascade.', hasGenderVariant: true },
  { id: 'hip-waist', title: 'Hip to Waist', subtitle: 'Pudendal · Sacral suggestion', description: 'The seated waist-to-hip silhouette — a study in negative space. The inward curve of the waist marks the boundary of sacral plexus territory.', hasGenderVariant: true },
  { id: 'two-silhouettes', title: 'Near-Contact Tension', subtitle: 'Proximity field visualization', description: 'Two figures separated by the minimum distance before touch. The amber glow between them visualizes the electromagnetic tension field — measurable via galvanic skin response.', hasGenderVariant: true },
]

const ART_RENDERERS: Record<string, React.FC<{ gender: Gender }>> = {
  'neckline': NecklineCollarbone,
  'spine': SpineCurvature,
  'shoulder-nape': ShoulderNapeProximity,
  'hands': InterlacedHands,
  'hip-waist': HipWaistSilhouette,
  'two-silhouettes': TwoSilhouetteProximity,
}

// ─── Rim lighting helper ──────────────────────────────────────────────

function getLightingStyle(angleDeg: number, intensity: number): React.CSSProperties {
  const rad = (angleDeg * Math.PI) / 180
  const x = Math.sin(rad)
  const y = -Math.cos(rad)
  const dist = 12 + intensity * 20

  // Color shifts with angle: warm amber (front) → cool blue rim (back)
  const warmFactor = (Math.cos(rad) + 1) / 2  // 1=front, 0=back
  const r = Math.round(180 + warmFactor * 60)
  const g = Math.round(120 + warmFactor * 80)
  const b = Math.round(60 + (1 - warmFactor) * 180)
  const color = `rgb(${r},${g},${b})`

  return {
    filter: `drop-shadow(${x * dist}px ${y * dist}px ${8 + intensity * 15}px ${color})`,
    transition: 'filter 0.1s ease',
  }
}

// ─── Lighting control dial ────────────────────────────────────────────

function LightingDial({
  angle,
  onChange,
}: {
  angle: number
  onChange: (a: number) => void
}) {
  const dialRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  function getAngle(e: React.PointerEvent | PointerEvent): number {
    const rect = dialRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    let a = Math.atan2(dx, -dy) * (180 / Math.PI)
    if (a < 0) a += 360
    return a
  }

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true
    dialRef.current?.setPointerCapture(e.pointerId)
    onChange(getAngle(e))
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return
    onChange(getAngle(e))
  }

  function onPointerUp() { dragging.current = false }

  const rad = (angle * Math.PI) / 180
  const handleX = 28 + Math.sin(rad) * 22
  const handleY = 28 - Math.cos(rad) * 22

  return (
    <svg
      ref={dialRef}
      viewBox="0 0 56 56"
      className="w-14 h-14 cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'none' }}
    >
      {/* Outer ring */}
      <circle cx="28" cy="28" r="26" stroke="rgba(245,232,200,0.12)" strokeWidth="1" fill="rgba(245,232,200,0.03)" />
      {/* Color arc */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = i * 10
        const r1 = (a * Math.PI) / 180
        const warmF = (Math.cos(r1) + 1) / 2
        const cr = Math.round(140 + warmF * 80)
        const cg = Math.round(90 + warmF * 70)
        const cb = Math.round(40 + (1 - warmF) * 160)
        const x1 = 28 + Math.sin(r1) * 20
        const y1 = 28 - Math.cos(r1) * 20
        const r2 = ((a + 10) * Math.PI) / 180
        const x2 = 28 + Math.sin(r2) * 20
        const y2 = 28 - Math.cos(r2) * 20
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`rgb(${cr},${cg},${cb})`}
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />
        )
      })}
      {/* Center */}
      <circle cx="28" cy="28" r="5" fill="rgba(245,232,200,0.08)" stroke="rgba(245,232,200,0.2)" strokeWidth="0.5" />
      {/* Direction line */}
      <line x1="28" y1="28" x2={handleX} y2={handleY} stroke="rgba(232,160,32,0.5)" strokeWidth="0.8" />
      {/* Handle */}
      <circle cx={handleX} cy={handleY} r="4" fill="#e8a020" opacity="0.9" />
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────

export default function SensualGallery() {
  const [gender, setGender] = useState<Gender>('female')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [lightAngle, setLightAngle] = useState(45)
  const [lightIntensity, setLightIntensity] = useState(0.6)

  const focusedPiece = focusedId ? ART_PIECES.find(p => p.id === focusedId) : null

  function openPiece(id: string) {
    setFocusedId(id)
    setViewMode('focused')
  }

  function closeFocused() {
    setViewMode('grid')
    setTimeout(() => setFocusedId(null), 350)
  }

  const lightingStyle = getLightingStyle(lightAngle, lightIntensity)

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="glass-panel p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">Curated</p>
            <h2
              className="text-2xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Silhouette Art Library
            </h2>
            <p className="text-[#f5e8c8]/35 text-sm mt-1">
              Continuous line art · Rim lighting controller · Gallery-grade minimalism
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Gender toggle */}
            <div
              className="flex rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(245,232,200,0.1)' }}
            >
              {(['female', 'male'] as Gender[]).map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className="px-4 py-1.5 text-xs capitalize transition-all"
                  style={{
                    background: gender === g ? 'rgba(232,160,32,0.15)' : 'transparent',
                    color: gender === g ? '#e8a020' : 'rgba(245,232,200,0.35)',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex gap-1.5">
              {(['grid', 'focused'] as ViewMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => m === 'grid' ? closeFocused() : (focusedId ? setViewMode('focused') : openPiece(ART_PIECES[0].id))}
                  className="px-3 py-1 text-xs rounded-full capitalize transition-all"
                  style={{
                    background: viewMode === m ? 'rgba(232,160,32,0.12)' : 'transparent',
                    border: viewMode === m ? '1px solid rgba(232,160,32,0.25)' : '1px solid rgba(245,232,200,0.07)',
                    color: viewMode === m ? '#e8a020' : 'rgba(245,232,200,0.3)',
                  }}
                >
                  {m === 'grid' ? '⊞ Grid' : '⊡ Focus'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Grid view ── */}
        {viewMode === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {ART_PIECES.map(piece => {
              const Renderer = ART_RENDERERS[piece.id]
              return (
                <motion.button
                  key={piece.id}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openPiece(piece.id)}
                  className="glass-panel p-4 text-left flex flex-col items-center gap-3 transition-all group"
                  style={{ aspectRatio: '3/4' }}
                >
                  <div
                    className="w-full flex-1 flex items-center justify-center"
                    style={getLightingStyle(lightAngle, lightIntensity * 0.6)}
                  >
                    <Renderer gender={gender} />
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-medium text-[#f5e8c8]/70 group-hover:text-[#e8a020] transition-colors">
                      {piece.title}
                    </p>
                    <p className="text-xs text-[#f5e8c8]/25 mt-0.5">{piece.subtitle}</p>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}

        {/* ── Focused view ── */}
        {viewMode === 'focused' && focusedPiece && (
          <motion.div
            key="focused"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Art display */}
            <div className="glass-panel p-8 flex items-center justify-center" style={{ minHeight: 420 }}>
              <div
                className="w-full max-w-xs"
                style={{ ...lightingStyle, aspectRatio: '3/4' }}
              >
                {(() => {
                  const Renderer = ART_RENDERERS[focusedPiece.id]
                  return <Renderer gender={gender} />
                })()}
              </div>
            </div>

            {/* Controls + info */}
            <div className="flex flex-col gap-4">
              {/* Info card */}
              <div className="glass-panel p-6">
                <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-1">
                  {focusedPiece.subtitle}
                </p>
                <h3
                  className="text-2xl font-light text-[#f5e8c8] mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {focusedPiece.title}
                </h3>
                <p className="text-[#f5e8c8]/55 text-sm leading-relaxed">
                  {focusedPiece.description}
                </p>
              </div>

              {/* Lighting controller */}
              <div className="glass-panel p-5">
                <h4 className="text-xs uppercase tracking-wider text-[#f5e8c8]/35 mb-4">
                  Rim Lighting
                </h4>
                <div className="flex items-center gap-5">
                  <LightingDial angle={lightAngle} onChange={setLightAngle} />
                  <div className="flex-1 flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-[#f5e8c8]/35">Angle</span>
                        <span className="text-xs text-[#e8a020]">{Math.round(lightAngle)}°</span>
                      </div>
                      <input
                        type="range" min={0} max={360} step={1}
                        value={lightAngle}
                        onChange={e => setLightAngle(Number(e.target.value))}
                        className="w-full h-1.5 rounded appearance-none cursor-pointer"
                        style={{
                          background: 'linear-gradient(to right, rgba(80,120,200,0.6), rgba(232,160,32,0.8), rgba(212,80,20,0.8), rgba(80,120,200,0.6))',
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-[#f5e8c8]/35">Intensity</span>
                        <span className="text-xs text-[#e8a020]">{Math.round(lightIntensity * 100)}%</span>
                      </div>
                      <input
                        type="range" min={0} max={1} step={0.05}
                        value={lightIntensity}
                        onChange={e => setLightIntensity(Number(e.target.value))}
                        className="w-full h-1.5 rounded appearance-none cursor-pointer"
                        style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.1), rgba(232,160,32,1))' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Piece navigator */}
              <div className="glass-panel p-4">
                <h4 className="text-xs uppercase tracking-wider text-[#f5e8c8]/30 mb-3">Collection</h4>
                <div className="grid grid-cols-3 gap-2">
                  {ART_PIECES.map(piece => (
                    <button
                      key={piece.id}
                      onClick={() => setFocusedId(piece.id)}
                      className="p-2 rounded-xl text-left transition-all"
                      style={{
                        background: focusedId === piece.id ? 'rgba(232,160,32,0.1)' : 'rgba(245,232,200,0.02)',
                        border: focusedId === piece.id ? '1px solid rgba(232,160,32,0.25)' : '1px solid rgba(245,232,200,0.05)',
                      }}
                    >
                      <p
                        className="text-xs truncate"
                        style={{ color: focusedId === piece.id ? '#e8a020' : 'rgba(245,232,200,0.4)' }}
                      >
                        {piece.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={closeFocused}
                className="text-xs text-[#f5e8c8]/25 hover:text-[#f5e8c8]/50 transition-colors"
              >
                ← Back to gallery
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global lighting note */}
      {viewMode === 'grid' && (
        <div className="glass-panel p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-[#f5e8c8]/30">
              Global rim lighting — drag to adjust in focused view
            </span>
            <div className="flex items-center gap-3">
              <LightingDial angle={lightAngle} onChange={setLightAngle} />
              <div className="flex flex-col gap-1.5">
                <input
                  type="range" min={0} max={360} step={1}
                  value={lightAngle}
                  onChange={e => setLightAngle(Number(e.target.value))}
                  className="w-28 h-1 rounded appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, rgba(80,120,200,0.5), rgba(232,160,32,0.8), rgba(212,80,20,0.8), rgba(80,120,200,0.5))' }}
                />
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={lightIntensity}
                  onChange={e => setLightIntensity(Number(e.target.value))}
                  className="w-28 h-1 rounded appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, rgba(232,160,32,0.1), rgba(232,160,32,0.9))' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
