import Document, { Head, Main, NextScript } from 'next/document';
import assertEnvVar from '../modules/assertEnvVar'
import getEnvironment from '../modules/getEnvironment'

class Root extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps({ ...context })
    const page = context.renderPage()
    return {
      ...page,
      nextEnvString: JSON.stringify(getEnvironment()),
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Github auth example</title>
        </Head>

        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.___nextEnv = ${this.props.nextEnvString}`
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Root
