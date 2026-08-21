import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Healing Intimacy Blocks & Body Freezing: A Somatic Guide for Couples | DesireSpec AI',
  description: 'Learn why your body shuts down or freezes during intimacy, and discover trauma-informed somatic exercises, nervous system safety checks, and zero-pressure connection protocols.',
  keywords: [
    'why do I freeze up during intimacy',
    'emotional intimacy blocks in marriage',
    'somatic healing for bedroom anxiety',
    'why does intimacy feel awkward or unsafe',
    'polyvagal theory intimacy healing',
    'DesireSpec AI',
  ],
  openGraph: {
    title: 'Healing Intimacy Blocks & Body Freezing | DesireSpec AI',
    description: 'A compassionate, trauma-informed roadmap to moving from defense to safe connection.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/healing-intimacy-blocks-and-body-freezing',
  },
}

export default function HealingIntimacyBlocksGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Healing Intimacy Blocks & Body Freezing: Somatic Safety Protocols',
    description: 'Clinical and somatic practices to overcome nervous system shutdown and emotional blocks during intimacy.',
    author: {
      '@type': 'Organization',
      name: 'DesireSpec AI Somatic & Biomechanics Research Board',
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
          <span className="text-[#E8A020]">Healing Intimacy Blocks</span>
        </div>

        <div className="glass-panel p-8 md:p-10 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Trauma-Informed & Somatic Healing
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight leading-tight">
            Why Your Body Freezes During Intimacy (And How to Gently Heal the Block)
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-4">
            Published by the DesireSpec AI Somatic Research Board · 9 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            If intimacy does not feel natural to you—if your mind goes blank, your breathing gets shallow, your throat tightens, or your body goes completely numb when your partner touches you—<strong>you are not broken, and nothing is wrong with you</strong>.
          </p>

          <p>
            This reaction is known in somatic neuroscience as a <strong>Dorsal Vagal Freeze Response</strong>. When the nervous system perceives pressure, past emotional wounds, or performance demands, it activates an automatic defense mechanism: shutting down physical sensation to protect you from vulnerability.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.25)] flex flex-col gap-4">
            <h3 className="text-xl font-serif text-[#E8A020]">
              The 3-Step Somatic Safety Protocol:
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  1. The &quot;Traffic Light&quot; Verbal Safety Check
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Establish a zero-shame verbal system: Saying <em>&quot;Green&quot;</em> means feeling good, <em>&quot;Yellow&quot;</em> means slow down and pause motion, and <em>&quot;Red&quot;</em> means stop immediately with a warm hug. Knowing you have absolute control stops the brain from triggering panic alarms.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  2. Somatic Exhalation Grounding (4-in, 8-out)
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  When numbness begins, place a warm hand on your chest and take a 4-second inhale through the nose, followed by a slow 8-second exhale with an audible sigh. Longer exhalations stimulate the vagus nerve and down-regulate adrenaline instantly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#FDE68A] text-sm">
                  3. Non-Demanding Sensate Touch
                </h4>
                <p className="text-xs text-[#F5E8C8]/80 mt-1 leading-relaxed">
                  Spend 10 minutes taking turns gently stroking each other&apos;s hands, forearms, or shoulders with zero intention of leading to intercourse. Removing all physical expectations trains the nervous system that touch is safe.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-[#FDE68A] mt-4">
            Choosing Positions with Maximum Emotional Safety
          </h2>
          <p>
            Positions like <strong>The Lazy Sunday (Side-by-Side Spooning)</strong> or <strong>The Lotus Lock</strong> keep partners grounded, allowing continuous eye contact and deep breathing without athletic physical demands.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">
              Explore Gentle, Low-Pressure Positions
            </h4>
            <p className="text-xs text-[#F5E8C8]/70">
              Discover comfortable, zero-strain connection postures in 3D.
            </p>
          </div>
          <Link
            href="/solutions/zero-pressure-intimacy-for-anxious-couples"
            className="px-6 py-3 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors shrink-0"
          >
            View Gentle Solutions →
          </Link>
        </div>
      </article>
    </main>
  )
}
