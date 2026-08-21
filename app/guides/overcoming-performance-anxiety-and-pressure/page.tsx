import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Overcoming Performance Anxiety in Bed: The Sensate Focus Protocol | DesireSpec AI',
  description: 'Evidence-based protocol to stop bedroom performance anxiety, psychological ED, and partner satisfaction pressure through at-home Sensate Focus therapy.',
  keywords: [
    'how to stop performance anxiety in bed',
    'psychological erectile dysfunction help',
    'sensate focus therapy exercises for couples',
    'overcoming anxiety about partner satisfaction',
    'DesireSpec AI',
  ],
  openGraph: {
    title: 'Overcoming Performance Anxiety in Bed | DesireSpec AI',
    description: 'Transform anxiety into calm confidence with structured somatic touch.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/overcoming-performance-anxiety-and-pressure',
  },
}

export default function PerformanceAnxietyGuidePage() {
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
          <span className="text-[#E8A020]">Performance Anxiety</span>
        </div>

        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Clinical Intimacy Protocol
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            Overcoming Performance Anxiety: The Step-by-Step Sensate Protocol
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-4">
            Published by the DesireSpec AI Clinical Research Board · 7 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            Performance anxiety occurs when your brain acts like a spectator watching yourself from the corner of the room, obsessively evaluating: <em>&quot;Am I doing this right? Are they enjoying it? Will I finish too fast or lose arousal?&quot;</em>
          </p>

          <p>
            This mental chatter triggers the sympathetic nervous system (fight-or-flight), flooding the bloodstream with norepinephrine and literally cutting off natural vascular arousal.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.2)] flex flex-col gap-3">
            <h3 className="text-lg font-serif text-[#E8A020]">
              The 3-Stage Sensate Focus Reset (At Home):
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#F5E8C8]/85 font-light">
              <li>
                <strong className="text-[#FDE68A]">Stage 1 (Non-Genital Sensory Touch):</strong> Spend 15 minutes massaging each other&apos;s neck, arms, and back. Penetration and genital touching are strictly banned. This removes 100% of performance pressure.
              </li>
              <li>
                <strong className="text-[#FDE68A]">Stage 2 (Whole Body Mindfulness):</strong> Incorporate slow, non-demanding intimate touch, focusing entirely on temperature, texture, and breathing without seeking a climax.
              </li>
              <li>
                <strong className="text-[#FDE68A]">Stage 3 (Effortless Integration):</strong> Transition into slow-burn connection (like The Lotus Lock or The Sovereign Squat) where the focus is mutual presence rather than an athletic benchmark.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.3)] flex items-center justify-between">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">Build Your Climax Arc</h4>
            <p className="text-xs text-[#F5E8C8]/70">Explore slow-burn pacing and zero-pressure flows.</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors"
          >
            Launch Studio →
          </Link>
        </div>
      </article>
    </main>
  )
}
