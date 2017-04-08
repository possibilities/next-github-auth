import compose from '../modules/compose'

import ProvideContext from './ProvideContext'
import InjectEnvVars from './InjectEnvVars'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import InjectGithubUser from './InjectGithubUser'
import PageDecoratorInvariant from './PageDecoratorInvariant'

const PublicPage = compose(
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubAccessToken,
  InjectGithubUser,
  PageDecoratorInvariant('PublicPage'),
  ProvideContext
)

export default PublicPage
