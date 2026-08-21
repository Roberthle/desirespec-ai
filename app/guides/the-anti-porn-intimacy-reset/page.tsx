import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Anti-Porn Intimacy Reset: Rebuilding Real Connection & Sensation | DesireSpec AI',
  description: 'A clinical and emotional guide to overcoming the numbing effects of adult media. Learn how dopamine resets, 40 BPM pacing, eye contact, and somatic mindfulness restore deep marital passion.',
  keywords: [
    'how to reconnect with partner after porn',
    'how porn ruins intimacy in marriage',
    'slow sex vs fast dopamine',
    'rebuilding emotional intimacy',
    'somatic intimacy exercises for couples',
    'DesireSpec AI',
  ],
  openGraph: {
    title: 'The Anti-Porn Intimacy Reset | DesireSpec AI',
    description: 'Transform fast, detached physical habits into deep, compounding emotional intimacy.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/the-anti-porn-intimacy-reset',
  },
}

export default function AntiPornResetGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Anti-Porn Intimacy Reset: Rebuilding Real Connection & Sensation',
    description: 'A clinical and emotional guide to overcoming the numbing effects of adult media.',
    author: {
      '@type': 'Organization',
      name: 'DesireSpec AI Intimacy & Biomechanics Research Board',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DesireSpec AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://desirespec-ai.onrender.com/logo.png',
      },
    },
  }

  return (
    <main className="min-h-screen bg-[#070604] text-[#F5E8C8] p-6 md:p-12 selection:bg-[#E8A020] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs text-[#F5E8C8]/60 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#E8A020] transition-colors">
            DesireSpec AI
          </Link>
          <span>/</span>
          <Link href="/#guides" className="hover:text-[#E8A020] transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-[#E8A020]">The Intimacy Reset</span>
        </div>

        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Mindful Intimacy & Relationship Restoration
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            The Anti-Porn Intimacy Reset: From Fast Dopamine to Compounding Connection
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-4">
            Published by the DesireSpec AI Research Board · 8 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            Mainstream adult media has conditioned modern culture to view intimacy through a lens of <strong>isolated performance, extreme visual novelty, and mechanical speed</strong>. In reality, this model degrades neurological sensitivity, fuels performance anxiety, and leaves both partners feeling profoundly lonely in the same bed.
          </p>

          <p>
            True intimacy is not an athletic performance—it is a <strong>compounding emotional and somatic exchange</strong> where mutual trust, safety, and communicative presence amplify pleasure exponentially.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.25)] flex flex-col gap-4">
            <h3 className="text-xl font-serif text-[#E8A020]">
              The 4 Pillars of the Mindful Intimacy Reset
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  1. Pacing Down to the Heart Resonance Zone (30–45 BPM)
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Fast, aggressive thrusting overstimulates superficial pain receptors and bypasses the parasympathetic nervous system. Dropping the cadence to 30–45 BPM allows oxytocin release and full-body sensory flooding.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  2. Somatic Eye Contact & Breath Synchronization
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Instead of closing your eyes or dissociating into fantasy, keep soft eye contact for the first 3 minutes of close chest-to-chest contact (like The Lotus Lock or The Royal Arch). Match your inhalations and exhalations together.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  3. Replacing Silence with Vocal Affirmation
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Real intimacy thrives on verbal safety. Replace degrading tropes with vocal praise: acknowledging how warm your partner feels, expressing gratitude, and affirming their beauty in the moment.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  4. Shifting from &quot;Climax-Centric&quot; to &quot;Presence-Centric&quot;
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  When the pressure to finish is removed, the nervous system completely relaxes. Paradoxically, this safety is what creates the most powerful, involuntary orgasms.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-[#FDE68A] mt-4">
            How Compounding Intimacy Transforms Long-Term Love
          </h2>
          <p>
            When two people learn the art of slow-burn alignment, every shared encounter builds on the last. Sensation deepens, emotional security expands, and the bedroom becomes a sanctuary of rejuvenation rather than an anxious checklist.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">
              Explore Slow-Burn & Connected Poses in 3D
            </h4>
            <p className="text-xs text-[#F5E8C8]/70">
              Practice chest-to-chest alignment and controlled BPM oscillators.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors shrink-0"
          >
            Launch 3D Studio →
          </Link>
        </div>
      </article>
    </main>
  )
}
