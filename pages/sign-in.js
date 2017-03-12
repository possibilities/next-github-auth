import { Component } from 'react'
import request from 'axios'
import assertEnvVar from '../modules/assertEnvVar'
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
  static async getInitialProps (context) {
    const {
      res,
      query,
      githubClientId
    } = context

    if (!process.browser) {
      const { code, nextUrl } = query
      const accessToken =
        await fetchGithubAccessToken(code, githubClientId)

      if (accessToken) {
        res.setHeader(
          'Set-Cookie',
          `githubAccessToken=${accessToken}; SameSite=Strict; HttpOnly`
        )
      } else {
        // TODO figure out UX for failed sign in
        res.setHeader(
          'Set-Cookie', `githubAccessToken=; SameSite=Strict; HttpOnly`
        )
      }

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
