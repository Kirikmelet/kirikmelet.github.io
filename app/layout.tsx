import './globals.css'
import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import TestHeader from './components/header'

const inter = Comfortaa({ subsets: ['latin'] })

export const metadata: Metadata = { 

  title: 'Troy\'s Portfolio',
  description: 'こんにちは世界',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
