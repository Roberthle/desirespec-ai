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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0906] text-[#f5e8c8] antialiased">
        {children}
      </body>
    </html>
  )
}
