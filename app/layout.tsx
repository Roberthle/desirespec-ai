import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DesireSpec AI — Intimacy Intelligence',
  description:
    'A sensual, visual-first desire engine combining somatic psychology with physiological precision. Educational, private, and empowering.',
  keywords: ['intimacy', 'desire', 'wellness', 'sexology', 'couples', 'education'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const rootSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DesireSpec AI 3D Motion Studio',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    url: 'https://desirespec-ai.onrender.com',
    description: 'An interactive 3D WebGL anatomical motion studio and communication tool for couples exploring pelvic tilt angles, rhythm pacing, and intimacy education.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive 3D WebGL Mannequin Studio with 360-degree rotation',
      'Real-Time Pelvic Tilt Angle Biomechanics Simulator',
      'BPM Cadence Rhythm Oscillator',
      'Intimacy Escalation Communication Card Prompts',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0906] text-[#f5e8c8] antialiased">
        {children}
      </body>
    </html>
  )
}
