import '../styles/app.css'
import '../styles/highlight.css'

import { Inter, Roboto_Mono, Space_Grotesk } from 'next/font/google'

import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'

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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export { inter, space_grotesk, roboto_mono }
