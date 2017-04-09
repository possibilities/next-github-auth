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

    static async getInitialProps (pageContext) {
      const {
        env: { githubClientId },
        pathname: nextUrl,
        githubUser
      } = pageContext

      if (!githubUser) {
        if (process.browser) {
          window.location = getGithubAuthorizeUrl(githubClientId, nextUrl)
          return { isRedirecting: true }
        } else {
          return { nextUrl, githubClientId }
        }
      }

      const githubAccessToken = pageContext.githubAccessToken

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({
          ...pageContext,
          githubUser,
          githubAccessToken
        })
        : {}

      return {
        ...pageProps,
        githubClientId,
        githubUser,
        githubAccessToken,
        nextUrl
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
      if (this.props.githubUser) {
        return <Page {...this.props} />
      }

      return null
    }
  }
}

export default DemandSignedIn
