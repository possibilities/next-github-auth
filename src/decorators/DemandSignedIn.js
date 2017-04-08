import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const DemandSignedIn = Page => {
  return class DemandSignedInWrapper extends Component {
    static propTypes = {
      env: PropTypes.shape({
        githubClientId: PropTypes.string.isRequired
      }).isRequired
    }

    static contextTypes = {
      github: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string.isRequired
        })
      })
    }

    static async getInitialProps (nextPageContext) {
      const { env: { githubClientId }, pathname, githubUser } = nextPageContext

      if (!githubUser) {
        if (process.browser) {
          window.location = getGithubAuthorizeUrl(githubClientId, pathname)
          return { isRedirecting: true }
        } else {
          return { nextUrl: pathname, githubClientId }
        }
      }

      const githubAccessToken = nextPageContext.githubAccessToken

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({
          ...nextPageContext,
          githubUser,
          githubAccessToken
        })
        : {}

      return {
        ...pageProps,
        githubClientId,
        githubUser,
        githubAccessToken,
        nextUrl: pathname
      }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        if (!props.githubUser && !props.isRedirecting) {
          window.location = getGithubAuthorizeUrl(
            props.githubClientId,
            props.nextUrl
          )
        }
      }
    }

    render () {
      if (this.context.github.user) {
        return <Page {...this.props} {...this.context} />
      }

      return null
    }
  }
}

export default DemandSignedIn
