import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0a0906',
          900: '#111009',
          800: '#1c1a12',
          700: '#28251a',
          600: '#352f20',
        },
        amber: {
          warm: '#e8a020',
          gold: '#c8860a',
          ember: '#d4601a',
          glow: '#f0b840',
          ivory: '#f5e8c8',
          blush: '#e8c89a',
        },
        rose: {
          dusk: '#c06858',
          blush: '#d4847a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-amber': 'radial-gradient(ellipse at center, rgba(232,160,32,0.15) 0%, transparent 70%)',
        'radial-ember': 'radial-gradient(ellipse at center, rgba(212,96,26,0.12) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowBreathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
