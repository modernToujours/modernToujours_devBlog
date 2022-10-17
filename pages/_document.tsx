import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="author" content="Young Won Choi" />
          <meta
            name="description"
            content="modernToujours의 기술 블로그입니다."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="utf-8"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
