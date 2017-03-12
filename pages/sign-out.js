import { Component } from 'react'

export default class SignOut extends Component {
  static getInitialProps ({ res }) {
    if (!process.browser) {
      res.writeHead(302, {
        Location: '/',
        'Set-Cookie': `githubAccessToken=; HttpOnly; SameSite=Strict`
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
