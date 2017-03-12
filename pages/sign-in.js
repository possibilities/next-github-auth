import { Component } from 'react'
import request from 'axios'
import assertEnvVar from '../modules/assertEnvVar'
import InjectEnv from '../decorators/InjectEnv'

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
      req,
      res,
      query,
      githubClientId
    } = context

    if (!process.browser) {
      const { code } = query
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
    }

    return {}
  }

  constructor () {
    super()
    if (process.browser) {
      // Wait to redirect on the client so the cookie will be available
      // TODO boomerang back to wherever user came from, e.g. click on private
      // page link should redirect you to private page after signin
      window.location = '/'
    }
  }

  render () { return <div>Sign in with GitHub was successful! Redirecting...</div> }
}

export default InjectEnv(SignIn)
