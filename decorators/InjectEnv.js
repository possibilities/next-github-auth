import { Component } from 'react'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'

const InjectEnv = Page => {
  return class InjectEnvWrapper extends Component {
    static async getInitialProps (context) {
      const env = process.browser
        ? NextGlobalClientStore.get('env')
        : { githubClientId: process.env.GITHUB_CLIENT_ID }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, env })
        : {}

      return { ...pageProps, env }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        NextGlobalClientStore.set('env', props.env)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectEnv
