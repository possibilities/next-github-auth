import { Component, PropTypes } from 'react'
import getGithubAuthorizeUrl from '../../modules/getGithubAuthorizeUrl'
import getGithubAccessTokenCookie
  from '../../modules/getGithubAccessTokenCookie'
import Router from 'next/router'

const EnsureSignedIn = Page => {
  return class EnsureSignedInWrapper extends Component {
    static propTypes = {
      githubUser: PropTypes.shape({
        login: PropTypes.string.isRequired
      }).isRequired,
      env: PropTypes.shape({
        githubClientId: PropTypes.string.isRequired
      }).isRequired
    }

    static async getInitialProps (context) {
      const { req, res, env } = context

      if (!process.browser && !context.githubUser) {
        const { githubClientId } = env

        const githubAccessTokenCookie =
          getGithubAccessTokenCookie(req, '')

        res.writeHead(302, {
          'Set-Cookie': githubAccessTokenCookie,
          Location: getGithubAuthorizeUrl(githubClientId)
        })
        return res.end()
      }

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(context)
        : {}

      return { ...pageProps, env }
    }

    constructor (props) {
      super(props)
      if (process.browser && !props.githubUser) {
        window.location = getGithubAuthorizeUrl(props.env.githubClientId)
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
      } else {
        return null
      }
    }
  }
}

export default EnsureSignedIn
