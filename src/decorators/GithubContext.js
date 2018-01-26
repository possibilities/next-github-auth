import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'axios'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'
const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com'

const getGithubAccessToken = req => {
  if (process.browser) {
    return NextGlobalClientStore.get('githubAccessToken')
  } else {
    const accessTokenCookie = req.headers.cookie && req.headers.cookie
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('githubAccessToken='))

    if (accessTokenCookie) {
      return accessTokenCookie.split('=').pop()
    }
  }
}

const getGithubUser = async githubAccessToken => {
  if (!githubAccessToken) {
    return
  }

  if (process.browser) {
    return NextGlobalClientStore.get('githubUser')
  }

  const url = `${GITHUB_API_URL}/user`
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

const GithubContext = Page => {
  return class GithubContextWrapper extends Component {
    static propTypes = {
      github: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string.isRequired
        }),
        accessToken: PropTypes.string
      })
    }

    static async getInitialProps (pageContext) {
      const { req } = pageContext
      const accessToken = getGithubAccessToken(req)
      const user = await getGithubUser(accessToken)
      const github = { accessToken, user }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...pageContext, github })
        : {}

      return { ...pageProps, github }
    }

    static childContextTypes = {
      github: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string
        }),
        accessToken: PropTypes.string,
        clientId: PropTypes.string
      })
    }

    getChildContext () {
      const { github, env: { githubClientId } = {} } = this.props

      return {
        github: {
          ...github,
          clientId: githubClientId
        }
      }
    }

    constructor (props) {
      super(props)

      if (process.browser) {
        NextGlobalClientStore.set('githubUser', props.github.user)
        NextGlobalClientStore.set('githubAccessToken', props.github.accessToken)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default GithubContext
