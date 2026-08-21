import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reclaiming Intimacy After PTSD & CPTSD: A Trauma-Informed Somatic Guide | DesireSpec AI',
  description: 'A clinical and compassionate roadmap for survivors of trauma, CPTSD, and chronic hypervigilance. Learn how to stay grounded in your Window of Tolerance, renegotiate touch boundaries, and safely reclaim pleasure.',
  keywords: [
    'intimacy with CPTSD',
    'how to enjoy intimacy after sexual trauma',
    'partner has PTSD how to be intimate',
    'why does touch make me panic',
    'intimacy reclamation after trauma',
    'trauma informed intimacy exercises',
    'DesireSpec AI',
  ],
  openGraph: {
    title: 'Reclaiming Intimacy After PTSD & CPTSD | DesireSpec AI',
    description: 'A compassionate, trauma-informed roadmap to moving from survival to safe intimacy.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/reclaiming-intimacy-after-ptsd-and-cptsd',
  },
}

export default function PtsdIntimacyGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Reclaiming Intimacy After PTSD & CPTSD: Somatic Reclamation Protocols',
    description: 'Trauma-informed clinical practices for individuals and couples navigating PTSD, CPTSD, and intimacy hypervigilance.',
    author: {
      '@type': 'Organization',
      name: 'DesireSpec AI Somatic & Trauma Research Board',
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
          <span className="text-[#E8A020]">PTSD &amp; CPTSD Reclamation</span>
        </div>

        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Trauma-Informed Somatic Restoration
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            Reclaiming Intimacy After PTSD &amp; CPTSD: When Your Body Has Stopped Trying
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-4">
            Published by the DesireSpec AI Trauma Research Board · 10 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            When you have survived severe trauma, betrayal, or chronic relational stress (CPTSD), your nervous system develops an extraordinary defense system. It treats physical proximity, darkness, closed bedroom doors, and touch not as expressions of love, but as <strong>high-level survival threats</strong>.
          </p>

          <p>
            You might experience a racing heart, a sudden urge to flee, an involuntary flinch, or complete emotional detachment (leaving your body). If you or your partner have stopped trying altogether out of exhaustion or fear of triggering pain, <strong>your body is doing exactly what it was wired to do: protecting you</strong>.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.25)] flex flex-col gap-4">
            <h3 className="text-xl font-serif text-[#E8A020]">
              The 4 Pillars of Trauma-Informed Intimacy Reclamation:
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  1. Expanding the &quot;Window of Tolerance&quot; (Micro-Dosing Touch)
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Do not attempt full intercourse right away. Start with 60 seconds of gentle, clothed hand-holding while describing 3 physical objects in the room out loud. Grounding your senses in the present environment signals to your amygdala that the danger is in the past.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  2. 100% Unilateral Boundary Autonomy
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  The survivor must have unconditional, instantaneous veto power over every movement. Even a slight pause or sigh is met with immediate stillness and loving reassurance: <em>&quot;I am right here with you. We have all the time in the world.&quot;</em>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  3. Sensory Anchors in the Room
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Never practice intimacy in pitch darkness if it triggers hypervigilance. Use warm, dim amber lighting, soothing background audio, or a glass of ice water nearby to help the survivor anchor back into their body if dissociation occurs.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  4. Uncoupling Touch from Sex
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Rebuild physical trust by creating daily non-sexual touch rituals (gentle scalp massages, back-to-back seated breathing, or holding hands during a walk) with zero expectation of escalation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-[#FDE68A] mt-4">
            Positions with Zero Pinned Weight &amp; Maximum Control
          </h2>
          <p>
            Avoid positions where the survivor feels physically trapped or pinned under body weight. Focus on <strong>The Sovereign Squat</strong> (where the survivor straddles and has total control over pace and disengagement) or <strong>The Lazy Sunday (Side-by-Side)</strong> where both partners can freely move away at any moment.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">
              Explore the Trauma Reclamation Solution Hub
            </h4>
            <p className="text-xs text-[#F5E8C8]/70">
              Gentle, partner-tested connection steps and somatic safety postures.
            </p>
          </div>
          <Link
            href="/solutions/intimacy-reclamation-for-trauma-and-cptsd"
            className="px-6 py-3 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors shrink-0"
          >
            View Reclamation Hub →
          </Link>
        </div>
      </article>
    </main>
  )
}
