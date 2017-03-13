import { Component } from 'react'

const InjectEnv = Page => {
  return class InjectEnvWrapper extends Component {
    static async getInitialProps (context) {
      let env
      if (process.browser) {
        window.___nextJsData || (window.___nextJsData = {})
        env = window.___nextJsData.env
      } else {
        env = { githubClientId: process.env.GITHUB_CLIENT_ID }
      }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, env })
        : {}

      return { ...pageProps, env }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        window.___nextJsData || (window.___nextJsData = {})
        window.___nextJsData.env = props.env
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectEnv
