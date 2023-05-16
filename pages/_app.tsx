import '../styles/app.css'
import '../styles/highlight.css'

import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google'

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

const space_mono = Space_Mono({
  variable: '--font-space-mono',
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
    </>
  )
}

export { inter, space_grotesk, space_mono }
