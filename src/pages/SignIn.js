import { Component, PropTypes } from 'react'
import request from 'axios'
import demandEnvVar from '../modules/demandEnvVar'
import getGithubAccessTokenCookie from '../modules/getGithubAccessTokenCookie'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'
import InjectEnvVars from '../decorators/InjectEnvVars'

const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token'
const githubClientSecret = demandEnvVar('GITHUB_CLIENT_SECRET')

const fetchGithubAccessToken = async (githubAuthCode, githubClientId) => {
  const response = await request.post(githubAccessTokenUrl, {
    code: githubAuthCode,
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
    env: PropTypes.shape({
      githubClientId: PropTypes.string.isRequired
    }).isRequired
  }

  static async getInitialProps (pageContext) {
    const {
      req,
      res,
      query: { code: githubAuthCode, nextUrl = '/' },
      env: { githubClientId }
    } = pageContext

    let isAuthorized = false

    if (githubAuthCode) {
      const accessToken =
        await fetchGithubAccessToken(githubAuthCode, githubClientId)
      const githubAccessTokenCookie =
        getGithubAccessTokenCookie(req, accessToken || '')

      res.setHeader('Set-Cookie', githubAccessTokenCookie)
      isAuthorized = true
    }

    return { githubClientId, githubAuthCode, nextUrl, isAuthorized }
  }

  constructor (props) {
    super(props)
    if (process.browser) {
      // Wait to redirect on the client so the cookie will be available
      if (props.nextUrl) {
        if (props.isAuthorized) {
          window.location = props.nextUrl
        } else {
          window.location = getGithubAuthorizeUrl(props.githubClientId, props.nextUrl)
        }
      } else {
        window.location = getGithubAuthorizeUrl(props.githubClientId)
      }
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
