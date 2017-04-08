import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ProvideGithubContext = Page => {
  return class ProvideGithubContextWrapper extends Component {
    static async getInitialProps (nextPageContext) {
      return Page.getInitialProps
        ? Page.getInitialProps(nextPageContext)
        : {}
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

    static propTypes = {
      env: PropTypes.shape({
        githubClientId: PropTypes.string
      }),
      githubAccessToken: PropTypes.string,
      githubUser: PropTypes.shape({
        login: PropTypes.string
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

    render () {
      return <Page {...this.props} />
    }
  }
}

export default ProvideGithubContext
