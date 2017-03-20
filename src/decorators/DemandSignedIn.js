import React, { Component, PropTypes } from 'react'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'
import Router from 'next/router'

const DemandSignedIn = Page => {
  return class DemandSignedInWrapper extends Component {
    static propTypes = {
      githubUser: PropTypes.shape({
        login: PropTypes.string.isRequired
      }),
      env: PropTypes.shape({
        githubClientId: PropTypes.string.isRequired
      }).isRequired
    }

    static async getInitialProps (pageContext) {
      const { env, url } = pageContext

      if (!pageContext.githubUser) {
        if (process.browser) {
          return { nextUrl: '/private' }
        } else {
          return { nextUrl: url }
        }
      }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(pageContext)
        : {}

      return { ...pageProps, env }
    }

    constructor (props) {
      super(props)
      if (process.browser && !props.githubUser) {
        window.location = getGithubAuthorizeUrl(
          props.env.githubClientId,
          props.nextUrl
        )
      }
    }

    componentWillReceiveProps (nextProps) {
      if (process.browser && !nextProps.githubUser) {
        Router.push('/')
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
