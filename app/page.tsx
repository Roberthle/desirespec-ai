'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import AnatomyHeatMap from '../components/AnatomyHeatMap'
import DesireDiagnostics from '../components/DesireDiagnostics'
import EscalationDecks from '../components/EscalationDecks'
import CouplesSync from '../components/CouplesSync'
import MoodStudio from '../components/MoodStudio'
import SensoryTouchCanvas from '../components/SensoryTouchCanvas'
import TensionCurveStudio from '../components/TensionCurveStudio'
import SensualGallery from '../components/SensualGallery'
import FantasySandbox from '../components/FantasySandbox'
import BreathPacer from '../components/BreathPacer'
import LiveCouplesGame from '../components/LiveCouplesGame'

type Tab =
  | 'heatmap'
  | 'diagnostics'
  | 'escalation'
  | 'couples'
  | 'mood'
  | 'canvas'
  | 'tension'
  | 'gallery'
  | 'sandbox'
  | 'pacer'
  | 'livesync'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'heatmap',     label: 'Touch Map',     icon: '◉' },
  { id: 'diagnostics', label: 'Desire Profile', icon: '◈' },
  { id: 'escalation',  label: 'Escalation',    icon: '◆' },
  { id: 'couples',     label: 'Couples Sync',  icon: '◎' },
  { id: 'mood',        label: 'Mood Studio',   icon: '◐' },
  { id: 'canvas',      label: 'Touch Canvas',  icon: '✦' },
  { id: 'tension',     label: 'Tension Curve', icon: '〜' },
  { id: 'gallery',     label: 'Art Gallery',   icon: '◻' },
  { id: 'sandbox',     label: 'Sandbox',       icon: '◇' },
  { id: 'pacer',       label: 'Pacer',         icon: '○' },
  { id: 'livesync',    label: '🔥 Live Sync',  icon: '🔥' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('heatmap')

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      {/* Hero strip */}
      <div className="relative overflow-hidden border-b border-[rgba(232,160,32,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,160,32,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-[#e8a020] text-xs tracking-[0.3em] uppercase font-light mb-2">
              Somatic Intelligence · Zero-Guilt Architecture
            </p>
            <h1
              className="text-4xl md:text-5xl font-light text-[#f5e8c8] leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Understand desire.{' '}
              <span className="italic text-[#e8a020]">Deepen connection.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeTab === 'heatmap'     && <AnatomyHeatMap />}
            {activeTab === 'diagnostics' && <DesireDiagnostics />}
            {activeTab === 'escalation'  && <EscalationDecks />}
            {activeTab === 'couples'     && <CouplesSync />}
            {activeTab === 'mood'        && <MoodStudio />}
            {activeTab === 'canvas'      && <SensoryTouchCanvas />}
            {activeTab === 'tension'     && <TensionCurveStudio />}
            {activeTab === 'gallery'     && <SensualGallery />}
            {activeTab === 'sandbox'     && <FantasySandbox />}
            {activeTab === 'pacer'       && <BreathPacer />}
            {activeTab === 'livesync'    && <LiveCouplesGame />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(232,160,32,0.08)] py-6 px-6 text-center">
        <p className="text-[#f5e8c8]/30 text-xs tracking-widest uppercase">
          DesireSpec AI · Private by Design · Educational Purpose Only
        </p>
      </footer>
    </div>
  )
}
