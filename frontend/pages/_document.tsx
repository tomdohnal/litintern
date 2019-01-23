import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      ...page,
      styleTags,
    }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <style>{`body { margin: 0; background: #F8F8F8 } a { text-decoration: none}`}</style>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>Lit Intern</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
