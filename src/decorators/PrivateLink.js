import { PropTypes } from 'react'

export default Link => {
  class PrivateLink extends Link {
    linkClicked (e) {
      if (process.browser && !this.context.githubUser) {
        window.__nextGithubAuthRedirectUrl = this.href
      }

      super.linkClicked(e)
    }
  }

  PrivateLink.contextTypes = {
    githubUser: PropTypes.object
  }

  return PrivateLink
}
