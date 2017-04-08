import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'axios'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'

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

const InjectGithubUser = Page => {
  return class InjectGithubUserWrapper extends Component {
    static propTypes = {
      githubUser: PropTypes.shape({
        login: PropTypes.string.isRequired
      })
    }

    static async getInitialProps (nextPageContext) {
      const { githubAccessToken } = nextPageContext
      const githubUser = await getGithubUser(githubAccessToken)
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...nextPageContext, githubUser })
        : {}
      return { ...pageProps, githubUser }
    }

    constructor (props) {
      super(props)

      if (process.browser) {
        NextGlobalClientStore.set('githubUser', props.githubUser)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default InjectGithubUser
