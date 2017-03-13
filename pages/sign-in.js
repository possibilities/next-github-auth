import { Component, PropTypes } from 'react'
import request from 'axios'
import assertEnvVar from '../modules/assertEnvVar'
import getGithubAccessTokenCookie from '../modules/getGithubAccessTokenCookie'
import InjectEnv from '../decorators/InjectEnv'
import Navigation from '../components/Navigation'
const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token'
const githubClientSecret = assertEnvVar('GITHUB_CLIENT_SECRET')

const fetchGithubAccessToken = async (code, githubClientId) => {
  const response = await request.post(githubAccessTokenUrl, {
    code,
    client_id: githubClientId,
    client_secret: githubClientSecret
  }, { headers: { Accept: 'application/json' } })

  if (response.status === 200) {
    const accessToken = response.data.access_token
    return accessToken
  }
}

class SignIn extends Component {
  static propTypes = {
    githubUser: PropTypes.shape({
      login: PropTypes.string.isRequired
    }),
    githubClientId: PropTypes.string
  }

  static async getInitialProps (context) {
    const {
      req,
      res,
      query,
      githubClientId
    } = context

    if (!process.browser) {
      const { code, nextUrl } = query
      const accessToken =
        await fetchGithubAccessToken(code, githubClientId)

      let githubAccessTokenCookie
      if (accessToken) {
        githubAccessTokenCookie =
          githubAccessTokenCookie = getGithubAccessTokenCookie(req, accessToken)
      } else {
        githubAccessTokenCookie = getGithubAccessTokenCookie(req, '')
      }

      res.setHeader('Set-Cookie', githubAccessTokenCookie)

      return { nextUrl }
    }

    return {}
  }

  constructor (props) {
    super(props)
    if (process.browser) {
      // Wait to redirect on the client so the cookie will be available
      window.location = props.nextUrl || '/'
    }
  }

  render () {
    return (
      <div>
        <Navigation
          githubUser={this.props.githubUser}
          githubClientId={this.props.githubClientId} />

        <br />

        <div>Sign in with GitHub was successful! Redirecting...</div>
      </div>
    )
  }
}

export default InjectEnv(SignIn)
