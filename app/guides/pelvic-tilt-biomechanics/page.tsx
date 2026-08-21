import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pelvic Tilt Biomechanics & Internal Angle Science | DesireSpec AI',
  description: 'Evidence-based biomechanics guide explaining how 15° to 45° pelvic elevation angles alter the penetrative vector to target the G-Spot and Deep Cervical Fornix.',
  openGraph: {
    title: 'Pelvic Tilt Biomechanics Guide | DesireSpec AI',
    description: 'Learn the sports-science kinematics behind pelvic inclination and nerve activation.',
    type: 'article',
    url: 'https://desirespec-ai.onrender.com/guides/pelvic-tilt-biomechanics',
  },
}

export default function PelvicTiltGuidePage() {
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
          <span className="text-[#E8A020]">Pelvic Tilt Biomechanics</span>
        </div>

        <div className="glass-panel p-8 border border-[rgba(232,160,32,0.3)] bg-[#0A0906]/90">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono block mb-3">
            Biomechanics & Kinematics Whitepaper
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-[#FDE68A] tracking-tight">
            The Physics of Pelvic Tilt: Optimizing Internal Nerve Vectors
          </h1>
          <p className="text-sm text-[#F5E8C8]/70 mt-3">
            By DesireSpec AI Research Team · 6 min read
          </p>
        </div>

        <div className="flex flex-col gap-6 text-[#F5E8C8]/90 text-base leading-relaxed font-light">
          <p>
            In human intimate biomechanics, penetration depth and sensation are governed not by physical force, but by the <strong>angle of pelvic inclination</strong>. Standard horizontal positioning often allows the thrust vector to glide along the posterior vaginal wall, bypassing key sensory clusters.
          </p>

          <div className="p-6 rounded-xl bg-[#120F0A] border border-[rgba(232,160,32,0.2)] flex flex-col gap-3">
            <h3 className="text-lg font-serif text-[#E8A020]">
              The 3 Primary Anatomical Angle Thresholds:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#F5E8C8]/80">
              <li>
                <strong className="text-[#FDE68A]">15°–25° Low Elevation:</strong> Aligns the shaft along the anterior vaginal wall, producing direct friction against the Halban fascia (G-Spot zone).
              </li>
              <li>
                <strong className="text-[#FDE68A]">30°–45° Steep Wedge Tilt:</strong> Shortens the effective vaginal canal length, enabling deep contact with the anterior cervical fornix (A-Spot).
              </li>
              <li>
                <strong className="text-[#FDE68A]">0° Flat Anterior Compression:</strong> Maximizes external pubic-bone contact and clitoral crus friction via micro-grinding.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-serif text-[#FDE68A] mt-4">
            Kinematic Vectors: Linear Plunge vs. Rotational Grinding
          </h2>
          <p>
            When coupled with pelvic elevation, the style of movement dictates nerve adaptation. Continuous linear plunge motions risk sensory habituation. Alternating with rotational hip grinds engages lateral nerve branches along the pelvic floor without requiring withdrawal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#1A1208] border border-[rgba(232,160,32,0.3)] flex items-center justify-between">
          <div>
            <h4 className="font-serif text-[#FDE68A] text-lg">Test These Angles in 3D</h4>
            <p className="text-xs text-[#F5E8C8]/70">Explore all 26 biomechanical positions in the WebGL Studio.</p>
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
