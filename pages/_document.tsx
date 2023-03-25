import Document, { Head, Html, Main, NextScript } from 'next/document'
import { inter, space_grotesk, space_mono } from './_app'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        lang="en"
        className={`${inter.variable} ${space_grotesk.variable} ${space_mono.variable}`}
      >
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="p-4 font-sans lg:px-12">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
