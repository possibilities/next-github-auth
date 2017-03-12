import { Component } from 'react'
import request from 'axios'

const getGithubUser = async githubAccessToken => {
  if (!githubAccessToken) {
    return
  }

  if (!process.browser) {
    const url = `https://api.github.com/user`
    const headers = { Authorization: `token ${githubAccessToken}` }
    const options = { headers }
    const result = await request.get(url, options)

    return result.data
  }

  return window.___nextGithubUser
}

const InjectGithubUser = Page => {
  return class InjectGithubUserWrapper extends Component {
    static async getInitialProps (context) {
      const { githubAccessToken } = context
      const githubUser = await getGithubUser(githubAccessToken)
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, githubUser })
        : {}
      return { ...pageProps, githubUser }
    }

    constructor (props) {
      super(props)

      this.state = {
        githubUser: props.githubUser
      }

      if (process.browser) {
        window.___nextGithubUser = props.githubUser
      }
    }

    componentWillMount() {
      if (process.browser) {
        const { githubUser } = this.props
        const serializedUser = githubUser ? JSON.stringify(githubUser) : null
        window.localStorage.setItem('githubUser', serializedUser)
        window.onstorage = ({ key, newValue = null }) => {
          if (key === 'githubUser') {
            this.setState({
              githubUser: newValue ? JSON.parse(newValue) : null
            })
          }
        }
      }
    }

    componentWillUnmount() {
    }

    render () {
      return <Page {...this.props} githubUser={this.state.githubUser} />
    }
  }
}

export default InjectGithubUser
