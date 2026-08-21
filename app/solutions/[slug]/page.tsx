import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SOLUTIONS_DATA } from '../../../lib/solutionsData'
import { POSITIONS_DATA } from '../../../lib/positionsData'

export async function generateStaticParams() {
  return SOLUTIONS_DATA.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const solution = SOLUTIONS_DATA.find((s) => s.slug === params.slug)
  if (!solution) return { title: 'Solution Guide Not Found | DesireSpec AI' }

  return {
    title: `${solution.title} | DesireSpec AI`,
    description: solution.metaDescription,
    keywords: solution.primaryKeywords,
    openGraph: {
      title: `${solution.title} | DesireSpec AI`,
      description: solution.metaDescription,
      type: 'article',
      url: `https://desirespec-ai.onrender.com/solutions/${solution.slug}`,
    },
  }
}

export default function SolutionDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const solution = SOLUTIONS_DATA.find((s) => s.slug === params.slug)
  if (!solution) notFound()

  // Match recommended positions from dataset
  const recommendedPositions = POSITIONS_DATA.filter((p) =>
    solution.recommendedPositionIds.includes(p.id)
  )

  // JSON-LD Structured Data Schema for Google Rich Snippets & Perplexity/ChatGPT GEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: solution.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[#070604] text-[#F5E8C8] p-6 md:p-12 selection:bg-[#E8A020] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#F5E8C8]/60 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#E8A020] transition-colors">
            DesireSpec AI
          </Link>
          <span>/</span>
          <span className="text-[#E8A020]">Solutions</span>
          <span>/</span>
          <span className="text-[#FDE68A]">{solution.shortTitle}</span>
        </div>

        {/* Hero Header */}
        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90 relative overflow-hidden">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Intimacy Solution Hub · Search Engine Verified
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            {solution.title}
          </h1>
          <p className="text-lg text-[#F5E8C8]/80 mt-4 font-light leading-relaxed">
            {solution.tagline}
          </p>
        </div>

        {/* Common Friction Points & Pitfalls to Avoid */}
        <div className="p-6 rounded-2xl bg-[#120F0A] border border-[rgba(244,63,94,0.25)] flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#F43F5E] font-semibold flex items-center gap-2">
            <span>⚠️</span> The Common Pitfalls That Cause Discomfort
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[#F5E8C8]/85 font-light">
            {solution.painPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        {/* Anatomical Hacks & Angle Calibrations */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-serif text-[#FDE68A] flex items-center gap-2">
            <span>🛠️</span> Proven Hacks & Elevation Adjustments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {solution.hacksAndAdjustments.map((hack, i) => (
              <div
                key={i}
                className="glass-panel p-6 border border-[rgba(232,160,32,0.2)] bg-[#0A0906]/85 flex flex-col gap-2"
              >
                <h4 className="text-sm font-semibold text-[#E8A020] font-serif">
                  {hack.title}
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 leading-relaxed font-light">
                  {hack.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recommended 3D Studio Positions for this Solution */}
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-2xl font-serif text-[#FDE68A] flex items-center gap-2">
            <span>⚡</span> Recommended Positions in 3D Motion Studio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedPositions.map((pos) => (
              <div
                key={pos.id}
                className="glass-panel p-5 border border-[rgba(245,232,200,0.15)] bg-[#0C0B08]/90 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#E8A020]">
                      {pos.pelvicTiltDeg}° Pelvic Tilt
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#F43F5E] bg-[#220B13] px-2 py-0.5 rounded">
                      {pos.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif text-[#FDE68A] mt-1">{pos.name}</h4>
                  <p className="text-xs text-[#F5E8C8]/75 mt-1">{pos.tagline}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[rgba(245,232,200,0.1)] pt-3">
                  <Link
                    href={`/positions/${pos.id}`}
                    className="text-xs text-[#E8A020] hover:underline"
                  >
                    View Biomechanics Guide →
                  </Link>
                  <Link
                    href={`/?position=${pos.id}#positions`}
                    className="px-3 py-1.5 rounded-lg bg-[#E8A020] text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-[#F59E0B] transition-colors"
                  >
                    Open in 3D Studio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Engine & AI Structured Q&A (FAQ) Section */}
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-2xl font-serif text-[#FDE68A] flex items-center gap-2">
            <span>❓</span> Frequently Asked Questions (GEO & Search Q&A)
          </h2>
          <div className="flex flex-col gap-3">
            {solution.faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-panel p-6 border border-[rgba(245,232,200,0.1)] bg-[#0A0906]/75 flex flex-col gap-2"
              >
                <h4 className="text-base font-semibold text-[#FDE68A]">{faq.question}</h4>
                <p className="text-sm text-[#F5E8C8]/85 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1A1208] via-[#2A150D] to-[#1A0A10] border border-[rgba(232,160,32,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mt-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-serif text-[#FDE68A]">
              Explore All 29 Positions in Real-Time 3D
            </h4>
            <p className="text-xs text-[#F5E8C8]/70">
              Interactive 360° rotation, camera angles, and BPM cadence control.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-all transform hover:scale-105 shadow-lg shrink-0"
          >
            Launch Full Studio →
          </Link>
        </div>
      </div>
    </main>
  )
}
