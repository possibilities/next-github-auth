import { Component } from 'react'
import request from 'axios'

const getGithubUser = async githubToken => {
  if (!githubToken) {
    return
  }

  if (!process.browser) {
    const url = `https://api.github.com/user`
    const headers = { Authorization: `token ${githubToken}` }
    const options = { headers }
    const result = await request.get(url, options)

    return result.data
  }

  return window.___nextGithubUser
}

const InjectGithubUser = Page => {
  return class InjectTokenWrapper extends Component {
    static async getInitialProps({ githubToken }) {
      const githubUser = await getGithubUser(githubToken)
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, githubUser })
        : {}
      return { ...pageProps, githubUser }
    }

    constructor(props) {
      super(props)
      if (process.browser) {
        window.___nextGithubUser = props.githubUser
      }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithubUser
