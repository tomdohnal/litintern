import Document, { Main, NextDocumentContext, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
