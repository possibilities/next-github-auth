import Document, { Head, Main, NextScript } from 'next/document';
import assertEnvVar from '../modules/assertEnvVar'
import getEnvironment from '../modules/getEnvironment'

// A helper component for passing the environment to the client in a
// `Document` `<head`>
const PassEnvToClient = ({ env }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `window.___nextEnv = ${JSON.stringify(env)}`
    }}
  />
)

// A helper for passing the environment to the page in a `Document`'s
// `getInitialProps`
const passEnvToPage = page => ({ ...page, env: getEnvironment() })

class Root extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps({ ...context })
    const page = context.renderPage()
    return passEnvToPage(page)
  }

  render() {
    return (
      <html>
        <Head>
          <title>Github auth example</title>
          <PassEnvToClient env={this.props.env} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Root
