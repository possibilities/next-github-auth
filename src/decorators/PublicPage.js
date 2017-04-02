import compose from '../modules/compose'

import InjectEnvVars from './InjectEnvVars'
import InjectGithubUser from './InjectGithubUser'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import ProvideContext from './ProvideContext'
import PageDecoratorInvariant from './PageDecoratorInvariant'

const injectGithubClientId = InjectEnvVars({
  GITHUB_CLIENT_ID: 'githubClientId'
})

const PublicPage = compose(
  ProvideContext,
  injectGithubClientId,
  InjectGithubAccessToken,
  InjectGithubUser,
  PageDecoratorInvariant
)

export default PublicPage
