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
      githubClientId: PropTypes.string,
      githubAccessToken: PropTypes.string,
      githubUser: PropTypes.shape({
        login: PropTypes.string
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

      return { githubUser, githubAccessToken, githubClientId }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default ProvideGithubContext
