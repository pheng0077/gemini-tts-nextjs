import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gemini 2.5 TTS Studio',
  description: 'Professional Text-to-Speech Engine with Style Control',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen selection:bg-indigo-500/30 antialiased`}>
        {children}
      </body>
    </html>
  )
}
