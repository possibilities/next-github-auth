import { PropTypes } from 'react'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const handleSignIn = githubClientId => event => {
  window.location = getGithubAuthorizeUrl(githubClientId)
  event.preventDefault()
}

const SignInLink = ({ githubClientId }) => (
  <a href='#' onClick={handleSignIn(githubClientId)}>sign in</a>
)

SignInLink.propTypes = {
  githubClientId: PropTypes.string.isRequired
}

export default SignInLink
