import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const handleSignIn = githubClientId => event => {
  window.location = getGithubAuthorizeUrl(githubClientId)
  event.preventDefault()
}

export default ({ githubClientId }) => (
  <a href='#' onClick={handleSignIn(githubClientId)}>sign in</a>
)
