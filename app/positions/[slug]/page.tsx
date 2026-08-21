import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSITIONS_DATA, PositionItem } from '../../../lib/positionsData'
import { POSITION_ALIASES } from '../../../lib/positionAliases'

export async function generateStaticParams() {
  const canonicalParams = POSITIONS_DATA.map((p) => ({ slug: p.id }))
  const aliasParams = Object.keys(POSITION_ALIASES).map((alias) => ({ slug: alias }))
  return [...canonicalParams, ...aliasParams]
}

function resolvePosition(slug: string): PositionItem | undefined {
  const direct = POSITIONS_DATA.find((p) => p.id === slug)
  if (direct) return direct

  const mappedId = POSITION_ALIASES[slug]
  if (mappedId) {
    return POSITIONS_DATA.find((p) => p.id === mappedId)
  }
  return undefined
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const position = resolvePosition(params.slug)
  if (!position) return { title: 'Position Not Found | DesireSpec AI' }

  // Format title for high-volume searches
  const displayTitle = params.slug.includes('-')
    ? params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : position.name

  return {
    title: `${displayTitle} - Biomechanics, Angles & Intimacy Guide | DesireSpec AI`,
    description: `${position.tagline} Anatomical analysis, ${position.pelvicTiltDeg}° pelvic tilt angle, ${position.depthRating}/10 depth, and ${position.thrustVector} cadence guide.`,
    keywords: [
      displayTitle,
      position.name,
      position.category,
      'mindful intimacy',
      'healthy alternative to porn',
      'pelvic tilt',
      'sexual biomechanics',
      'intimacy positions',
      'DesireSpec AI',
    ],
    openGraph: {
      title: `${displayTitle} | DesireSpec AI Mindful Biomechanics`,
      description: position.tagline,
      type: 'article',
      url: `https://desirespec-ai.onrender.com/positions/${params.slug}`,
    },
  }
}

export default function PositionDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const position = resolvePosition(params.slug)
  if (!position) notFound()

  // JSON-LD Structured Data Schema for Search Engines (pSEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: position.name,
    description: position.tagline,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Pelvic Alignment',
        text: `Elevate pelvis to approximately ${position.pelvicTiltDeg} degrees to achieve optimal internal stimulation.`,
      },
      {
        '@type': 'HowToStep',
        name: 'Kinematic Stroke Vector',
        text: `Maintain a ${position.thrustVector} motion cadence for consistent stimulation.`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#070604] text-[#F5E8C8] p-6 md:p-12 selection:bg-[#E8A020] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#F5E8C8]/60 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#E8A020] transition-colors">
            DesireSpec AI
          </Link>
          <span>/</span>
          <Link href="/#positions" className="hover:text-[#E8A020] transition-colors">
            Positions
          </Link>
          <span>/</span>
          <span className="text-[#E8A020]">{position.name}</span>
        </div>

        {/* Position Header Banner */}
        <div className="glass-panel p-8 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-xs uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full bg-[#1A150D] text-[#E8A020] border border-[rgba(232,160,32,0.3)]">
              {position.category}
            </span>
            <span className="text-xs font-mono text-[#F43F5E] bg-[#220B13] px-3 py-1.5 rounded-full border border-[rgba(244,63,94,0.3)]">
              Intensity: {'🔥'.repeat(position.intensityLevel)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight">
            {position.name}
          </h1>
          <p className="text-lg md:text-xl text-[#F5E8C8]/80 mt-3 font-light leading-relaxed">
            {position.tagline}
          </p>
        </div>

        {/* Biomechanical Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 text-center bg-[#120F0A] border border-[rgba(232,160,32,0.2)]">
            <span className="text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest block">
              Pelvic Tilt Angle
            </span>
            <span className="text-3xl font-mono text-[#E8A020] font-bold mt-1 block">
              {position.pelvicTiltDeg}°
            </span>
            <span className="text-[11px] text-[#F5E8C8]/70 mt-1 block">Elevation Vector</span>
          </div>

          <div className="glass-panel p-5 text-center bg-[#120F0A] border border-[rgba(232,160,32,0.2)]">
            <span className="text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest block">
              Depth Rating
            </span>
            <span className="text-3xl font-mono text-[#F43F5E] font-bold mt-1 block">
              {position.depthRating}/10
            </span>
            <span className="text-[11px] text-[#F5E8C8]/70 mt-1 block">Penetrative Reach</span>
          </div>

          <div className="glass-panel p-5 text-center bg-[#120F0A] border border-[rgba(232,160,32,0.2)]">
            <span className="text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest block">
              Clitoral Friction
            </span>
            <span className="text-3xl font-mono text-[#FDE047] font-bold mt-1 block">
              {position.clitoralFrictionRating}/10
            </span>
            <span className="text-[11px] text-[#F5E8C8]/70 mt-1 block">External Contact</span>
          </div>

          <div className="glass-panel p-5 text-center bg-[#120F0A] border border-[rgba(232,160,32,0.2)]">
            <span className="text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest block">
              Kinematic Vector
            </span>
            <span className="text-sm font-semibold text-[#EC4899] mt-2 block truncate">
              {position.thrustVector}
            </span>
            <span className="text-[11px] text-[#F5E8C8]/70 mt-1 block">Cadence Profile</span>
          </div>
        </div>

        {/* In-Depth Biomechanics & Erotic Execution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 border border-[rgba(245,232,200,0.12)] bg-[#0A0906]/80 flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#E8A020] font-semibold flex items-center gap-2">
              <span>🧬</span> Anatomical Biomechanics
            </h3>
            <p className="text-sm text-[#F5E8C8]/90 leading-relaxed font-light">
              {position.eroticMechanics}
            </p>
          </div>

          <div className="glass-panel p-6 border border-[rgba(244,63,94,0.2)] bg-[#0A0906]/80 flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F43F5E] font-semibold flex items-center gap-2">
              <span>💬</span> Dirty Talk Prompt & Vocal Cadence
            </h3>
            <blockquote className="text-sm italic text-[#FDE68A] border-l-2 border-[#F43F5E] pl-3 py-1 font-serif">
              &quot;{position.dirtyTalkCue}&quot;
            </blockquote>
          </div>
        </div>

        {/* CTA to Interactive 3D Viewport */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1A1208] via-[#2A150D] to-[#1A0A10] border border-[rgba(232,160,32,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-serif text-[#FDE68A]">
              Launch 3D WebGL Motion Studio
            </h4>
            <p className="text-xs text-[#F5E8C8]/70">
              Simulate 360° rotation, POV camera angles, and real-time BPM cadence oscillators.
            </p>
          </div>
          <Link
            href={`/?position=${position.id}#positions`}
            className="px-6 py-3 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-all transform hover:scale-105 shadow-lg shrink-0"
          >
            Open in 3D Studio →
          </Link>
        </div>
      </div>
    </main>
  )
}
