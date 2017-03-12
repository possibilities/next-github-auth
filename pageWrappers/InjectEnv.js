import { Component } from 'react'
import getEnv from '../modules/getEnv'
import assertEnvVar from '../modules/assertEnvVar'

const InjectEnv = Page => {
  return class InjectEnvWrapper extends Component {
    static async getInitialProps(context) {
      const env = getEnv()

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, ...env })
        : {}

      return { ...pageProps, ...env }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

export default InjectEnv
