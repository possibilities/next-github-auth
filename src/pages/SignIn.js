import { Component, PropTypes } from 'react'
import request from 'axios'
import demandEnvVar from '../modules/demandEnvVar'
import getGithubAccessTokenCookie from '../modules/getGithubAccessTokenCookie'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'
import InjectEnvVars from '../decorators/InjectEnvVars'

const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token'
const githubClientSecret = demandEnvVar('GITHUB_CLIENT_SECRET')

const fetchGithubAccessToken = async (githubAuthCode, githubClientId) => {
  const response = await request.post(
    githubAccessTokenUrl,
    {
      code: githubAuthCode,
      client_id: githubClientId,
      client_secret: githubClientSecret
    },
    {
      headers: {
        Accept: 'application/json'
      }
    }
  )

  if (response.status === 200) {
    return response.data.access_token
  }
}

class SignIn extends Component {
  static propTypes = {
    githubClientId: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
    isAuthorized: PropTypes.bool.isRequired
  }

  static async getInitialProps ({
    req,
    res,
    env: {
      githubClientId
    },
    query: {
      nextUrl = '/',
      code: githubAuthCode
    }
  }) {
    let isAuthorized = false

    if (githubAuthCode) {
      const accessToken =
        await fetchGithubAccessToken(githubAuthCode, githubClientId)
      const githubAccessTokenCookie =
        getGithubAccessTokenCookie(req, accessToken)

      res.setHeader('Set-Cookie', githubAccessTokenCookie)

      isAuthorized = !!accessToken
    }

    return { githubClientId, nextUrl, isAuthorized }
  }

  constructor (props) {
    super(props)

    const { nextUrl, isAuthorized, githubClientId } = props

    if (process.browser && nextUrl) {
      if (isAuthorized) {
        // Wait to redirect on the client so the cookie will be available
        window.location = nextUrl
      } else {
        window.location = getGithubAuthorizeUrl(githubClientId, nextUrl)
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
