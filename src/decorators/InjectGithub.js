import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'axios'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'

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

  const url = `https://api.github.com/user`
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

const InjectGithub = Page => {
  return class InjectGithubWrapper extends Component {
    static propTypes = {
      githubUser: PropTypes.shape({
        login: PropTypes.string.isRequired
      })
    }

    static async getInitialProps (pageContext) {
      const { req } = pageContext
      const githubAccessToken = getGithubAccessToken(req)
      const githubUser = await getGithubUser(githubAccessToken)

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({
          ...pageContext,
          githubUser,
          githubAccessToken
        })
        : {}

      return { ...pageProps, githubUser, githubAccessToken }
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
      const {
        githubUser,
        githubAccessToken,
        env: { githubClientId } = {}
      } = this.props

      return {
        github: {
          user: githubUser,
          accessToken: githubAccessToken,
          clientId: githubClientId
        }
      }
    }

    constructor (props) {
      super(props)

      if (process.browser) {
        NextGlobalClientStore.set('githubUser', props.githubUser)
        NextGlobalClientStore.set('githubAccessToken', props.githubAccessToken)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithub
