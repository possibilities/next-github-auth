import { Component } from 'react'

const getGithubAccessToken = req => {
  if (!process.browser) {
    return req.headers.cookie && req.headers.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('githubAccessToken='))
      .split('=')
      .pop()
  }

  return window.___nextGithubAccessToken
}

const InjectGithubAccessToken = Page => {
  return class InjectTokenWrapper extends Component {
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
        window.___nextGithubAccessToken = props.githubAccessToken
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithubAccessToken
