import { PropTypes } from 'react'

export default Link => {
  class PrivateLink extends Link {
    // TODO this is likely not a very robust approach since `linkClicked`
    // isn't part of next's public API
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
