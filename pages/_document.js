import Document, { Head, Main, NextScript } from 'next/document'
import getEnv from '../modules/getEnv'

const resetCssUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'

class Root extends Document {
  static async getInitialProps (context) {
    const props = await super.getInitialProps(context)
    const page = context.renderPage()
    return { ...props, ...page, env: getEnv() }
  }

  render () {
    return (
      <html>
        <Head>
          <title>Next Github auth example</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.___nextData.env = ${JSON.stringify(this.props.env)}`
            }}
          />
          <link rel='stylesheet' href={resetCssUrl} />
        </Head>

        <body style={{ margin: 10 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Root
