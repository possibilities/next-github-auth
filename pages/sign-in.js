import { Component, PropTypes } from 'react'
import request from 'axios'
import assertEnvVar from '../modules/assertEnvVar'
import getGithubAccessTokenCookie from '../modules/getGithubAccessTokenCookie'
import InjectEnvVars from '../decorators/InjectEnvVars'

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
    githubClientId: PropTypes.string,
    env: PropTypes.shape({
      githubClientId: PropTypes.string.isRequired
    }).isRequired
  }

  static async getInitialProps (context) {
    const {
      req,
      res,
      query: { code, nextUrl },
      env: { githubClientId }
    } = context

    if (!process.browser) {
      const accessToken = await fetchGithubAccessToken(code, githubClientId)
      const githubAccessTokenCookie =
        getGithubAccessTokenCookie(req, accessToken || '')

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
    // All server side, nothing to show
    return null
  }
}

const injectGithubClientId = InjectEnvVars({
  GITHUB_CLIENT_ID: 'githubClientId'
})

export default injectGithubClientId(SignIn)
