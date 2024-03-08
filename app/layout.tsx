import '../styles/app.css'
import '../styles/highlight.css'

import { Inter, Roboto_Mono, Space_Grotesk } from 'next/font/google'

import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
})

const space_grotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  display: 'swap',
  subsets: ['latin'],
  weight: ['600'],
})

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = { title: 'Harrison Pim' }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space_grotesk.variable} ${roboto_mono.variable}`}
    >
      <body className="p-4 font-sans lg:px-12">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
