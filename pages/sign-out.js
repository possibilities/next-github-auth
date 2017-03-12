import { Component } from 'react'
import setGithubAccessTokenCookie from '../modules/setGithubAccessTokenCookie'

export default class SignOut extends Component {
  static getInitialProps ({ res }) {
    if (!process.browser) {
      setGithubAccessTokenCookie(res, '')
      res.writeHead(302, { Location: '/' })
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
