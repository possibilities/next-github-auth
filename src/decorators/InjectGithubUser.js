import { Component, PropTypes } from 'react'
import request from 'axios'
import NextGlobalClientStore from '../../modules/NextGlobalClientStore'

const getGithubUser = async githubAccessToken => {
  if (!githubAccessToken) {
    return
  }

  if (process.browser) {
    return NextGlobalClientStore.get('githubUser')
  }

  const url = `https://api.github.com/user`
  const headers = { Authorization: `token ${githubAccessToken}` }
  const options = { headers }

  let result
  try {
    result = await request.get(url, options)
  } catch (error) {
    // If there's an invalid token here ignore and allow the user to
    // go through normal auth flow
    if (error.response.status !== 401) {
      throw error
    }
  }

  if (result) {
    return result.data
  }
}

const InjectGithubUser = Page => {
  return class InjectGithubUserWrapper extends Component {
    static propTypes = {
      githubUser: PropTypes.shape({
        login: PropTypes.string.isRequired
      })
    }

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
        NextGlobalClientStore.set('githubUser', props.githubUser)
      }
    }

    componentWillMount () {
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

    componentWillUnmount () {
    }

    render () {
      return <Page {...this.props} githubUser={this.state.githubUser} />
    }
  }
}

export default InjectGithubUser
