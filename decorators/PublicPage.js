import compose from '../modules/compose'

import InjectEnvVars from '../decorators/InjectEnvVars'
import InjectGithubAccessToken from '../decorators/InjectGithubAccessToken'
import InjectGithubUser from '../decorators/InjectGithubUser'

const injectGithubClientId = InjectEnvVars({
  GITHUB_CLIENT_ID: 'githubClientId'
})

const PublicPage = compose(
  injectGithubClientId,
  InjectGithubAccessToken,
  InjectGithubUser
)

export default PublicPage
