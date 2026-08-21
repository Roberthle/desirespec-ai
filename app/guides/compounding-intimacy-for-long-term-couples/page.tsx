import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compounding Intimacy: How Long-Term Couples Keep Passion Alive | DesireSpec AI',
  description: 'Evidence-based relationship blueprint for married and long-term couples. How daily micro-touches, intentional pacing, and shared vulnerability compound into lifelong passion.',
  keywords: [
    'how to keep intimacy alive after marriage',
    'compounding intimacy in long term relationships',
    'reigniting connection with spouse',
    'preventing bedroom boredom marriage',
    'mindful touch exercises for couples',
    'DesireSpec AI',
  ],
  openGraph: {
    title: 'Compounding Intimacy for Long-Term Couples | DesireSpec AI',
    description: 'Transform routine into deep, compounding erotic connection.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/compounding-intimacy-for-long-term-couples',
  },
}

export default function CompoundingIntimacyGuidePage() {
  return (
    <main className="min-h-screen bg-[#070604] text-[#F5E8C8] p-6 md:p-12 selection:bg-[#E8A020] selection:text-black">
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
          <span className="text-[#E8A020]">Compounding Intimacy</span>
        </div>

        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Long-Term Relationship Mastery
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            Compounding Intimacy: Turning Routine into Lifelong Passion
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-4">
            Published by the DesireSpec AI Research Board · 7 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            In economics, compound interest turns modest regular contributions into immense wealth over time. In relationships, <strong>Compounding Intimacy</strong> works the exact same way.
          </p>

          <p>
            Couples who experience extraordinary passion after 10, 20, or 30 years do not rely on spontaneous fireworks—they invest in <strong>intentional micro-connections, communicative clarity, and progressive somatic vulnerability</strong>.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.2)] flex flex-col gap-3">
            <h3 className="text-lg font-serif text-[#E8A020]">
              The 3 Rules of Compounding Bedroom Connection:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#F5E8C8]/85 font-light">
              <li>
                <strong className="text-[#FDE68A]">Foreplay Starts 12 Hours Before:</strong> Physical connection begins with morning touch, sincere texts, and verbal appreciation throughout the day—not when the bedroom door closes.
              </li>
              <li>
                <strong className="text-[#FDE68A]">The 6-Second Hug & Gaze:</strong> Daily non-demanding touch resets cortisol levels and releases oxytocin, signaling to your partner&apos;s nervous system that they are safe and desired.
              </li>
              <li>
                <strong className="text-[#FDE68A]">Co-Creating Structured Arcs:</strong> Using tools like DesireSpec AI’s Climax Arc Flow to intentionally sequence warm-up, slow-burn connection, and energetic peaks together.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.3)] flex items-center justify-between">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">Build Your Climax Arc</h4>
            <p className="text-xs text-[#F5E8C8]/70">Explore structured intimacy flows for date night.</p>
          </div>
          <Link
            href="/#positions"
            className="px-5 py-2.5 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors"
          >
            Launch Generator →
          </Link>
        </div>
      </article>
    </main>
  )
}
