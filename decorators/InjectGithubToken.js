import { Component } from 'react'

const getGithubToken = req => {
  if (!process.browser) {
    return req.headers.cookie && req.headers.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('githubAccessToken='))
      .split('=')
      .pop()
  }

  return window.___nextGithubToken
}

const InjectGithubToken = Page => {
  return class InjectTokenWrapper extends Component {
    static async getInitialProps (context) {
      const { req } = context
      const githubToken = getGithubToken(req)
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, githubToken })
        : {}
      return { ...pageProps, githubToken }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        window.___nextGithubToken = props.githubToken
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithubToken
