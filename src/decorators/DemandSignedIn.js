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
        pathname: afterSignInUrl,
        github
      } = pageContext

      if (!github.user) {
        if (process.browser) {
          window.location = getGithubAuthorizeUrl(githubClientId, afterSignInUrl)
          return { isRedirecting: true }
        } else {
          return { afterSignInUrl, githubClientId }
        }
      }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...pageContext, github })
        : {}

      return {
        ...pageProps,
        github,
        githubClientId,
        afterSignInUrl
      }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        if (!props.github.user && !props.isRedirecting) {
          window.location = getGithubAuthorizeUrl(
            props.githubClientId,
            props.afterSignInUrl
          )
        }
      }
    }

    render () {
      if (this.props.github.user) {
        return <Page {...this.props} />
      }

      return null
    }
  }
}

export default DemandSignedIn
