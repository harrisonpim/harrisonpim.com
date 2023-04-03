import '../styles/app.css'
import 'highlight.js/styles/atom-one-dark.css'

import { Inter, Roboto_Mono, Space_Grotesk } from 'next/font/google'

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
    </>
  )
}

export { inter, space_grotesk, roboto_mono }
