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
          <Html lang="en" />
          <meta charSet="utf-8" />
        </Head>
        <body className="p-4 lg:px-12 font-sans">
          <Main />
          <NextScript />
          <PrismicScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
