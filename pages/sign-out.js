import { Component } from 'react'
import getGithubAccessTokenCookie from '../modules/getGithubAccessTokenCookie'

export default class SignOut extends Component {
  static getInitialProps ({ req, res }) {
    if (!process.browser) {
      const githubAccessTokenCookie = getGithubAccessTokenCookie(req, '')
      res.writeHead(302, {
        'Set-Cookie': githubAccessTokenCookie,
        Location: '/'
      })
      res.end()
    }

    return {}
  }

  constructor () {
    super()
    window.location = '/sign-out'
  }

  render () { return null }
}
