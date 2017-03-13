import { Component } from 'react'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'

const getGithubAccessToken = req => {
  if (process.browser) {
    return NextGlobalClientStore.get('githubAccessToken')
  } else {
    return req.headers.cookie && req.headers.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('githubAccessToken='))
      .split('=')
      .pop()
  }
}

const InjectGithubAccessToken = Page => {
  return class InjectGithubAccessTokenWrapper extends Component {
    static async getInitialProps (context) {
      const { req } = context
      const githubAccessToken = getGithubAccessToken(req)
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, githubAccessToken })
        : {}
      return { ...pageProps, githubAccessToken }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        NextGlobalClientStore.set('githubAccessToken', props.githubAccessToken)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithubAccessToken
