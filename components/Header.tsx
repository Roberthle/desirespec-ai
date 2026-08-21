'use client'

import { motion } from 'framer-motion'

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

interface HeaderProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  tabs: { id: Tab; label: string; icon: string }[]
}

export default function Header({ activeTab, onTabChange, tabs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(232,160,32,0.1)] bg-[rgba(10,9,6,0.92)] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <circle cx="16" cy="16" r="14" stroke="rgba(232,160,32,0.4)" strokeWidth="0.5" />
                <circle cx="16" cy="16" r="8"  stroke="rgba(232,160,32,0.7)" strokeWidth="0.8" />
                <circle cx="16" cy="16" r="3"  fill="#e8a020" opacity="0.9" />
                <path
                  d="M16 2 C16 2 22 9 22 16 C22 23 16 30 16 30 C16 30 10 23 10 16 C10 9 16 2 16 2Z"
                  stroke="rgba(232,160,32,0.3)" strokeWidth="0.5" fill="none"
                />
              </svg>
            </div>
            <span
              className="text-xl font-light text-[#f5e8c8] tracking-wide hidden sm:block"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              DesireSpec <span className="text-[#e8a020] italic">AI</span>
            </span>
          </div>

          {/* Desktop nav — scrollable, shrinks logo area */}
          <nav className="hidden md:flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative px-3 py-2 text-xs font-light tracking-wide transition-colors duration-200 shrink-0 whitespace-nowrap"
              >
                <span
                  className={
                    activeTab === tab.id
                      ? 'text-[#e8a020]'
                      : 'text-[#f5e8c8]/45 hover:text-[#f5e8c8]/75'
                  }
                >
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-[#e8a020]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Privacy badge */}
          <div className="hidden lg:flex items-center gap-2 text-[#f5e8c8]/25 text-xs tracking-widest uppercase shrink-0 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            Private
          </div>
        </div>

        {/* Mobile horizontal scroll pill tabs */}
        <div className="flex md:hidden overflow-x-auto gap-1.5 pb-2.5 -mx-4 px-4 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-light transition-all duration-200 whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? 'rgba(232,160,32,0.15)' : 'transparent',
                color:      activeTab === tab.id ? '#e8a020' : 'rgba(245,232,200,0.45)',
                border:     activeTab === tab.id ? '1px solid rgba(232,160,32,0.3)' : '1px solid transparent',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
