import React, { Component, PropTypes } from 'react'

const ProvideGithubContext = Page => {
  return class ProvideGithubContextWrapper extends Component {
    static async getInitialProps (pageContext) {
      return Page.getInitialProps
        ? Page.getInitialProps(pageContext)
        : {}
    }

    static childContextTypes = {
      githubClientId: PropTypes.string,
      githubUser: PropTypes.shape({
        login: PropTypes.string
      })
    }

    getChildContext () {
      const {
        githubUser,
        env: { githubClientId } = {}
      } = this.props

      return { githubUser, githubClientId }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default ProvideGithubContext
