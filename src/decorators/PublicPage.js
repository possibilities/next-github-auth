import compose from '../modules/compose'

import InjectEnvVars from '../decorators/InjectEnvVars'
import InjectGithubUser from '../decorators/InjectGithubUser'
import InjectGithubAccessToken
  from '../decorators/InjectGithubAccessToken'

const injectGithubClientId = InjectEnvVars({
  GITHUB_CLIENT_ID: 'githubClientId'
})

const PublicPage = compose(
  injectGithubClientId,
  InjectGithubAccessToken,
  InjectGithubUser
)

export default PublicPage
