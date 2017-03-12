import { Component } from 'react'
import getEnvironment from '../modules/getEnvironment'

const InjectEnv = Page => {
  return class InjectEnvWrapper extends Component {
    static async getInitialProps(context) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(context)
        : {}

      return {
        ...pageProps,
        ...getEnvironment()
      }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

export default InjectEnv
