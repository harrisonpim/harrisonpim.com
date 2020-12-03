import Document, { Html, Head, Main, NextScript } from "next/document";
import { PrismicScript } from "../prismic/configuration";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <html lang="en" />
          <meta charSet="utf-8" />
          <link href="/favicon.svg" rel="icon" />
        </Head>
        <body className="py-5 px-12 font-sans prose">
          <Main />
          <NextScript />
          <PrismicScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
