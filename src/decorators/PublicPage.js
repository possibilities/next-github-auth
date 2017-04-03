import compose from '../modules/compose'

import ProvideContext from './ProvideContext'
import InjectEnvVars from './InjectEnvVars'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import InjectGithubUser from './InjectGithubUser'
import PageDecoratorInvariant from './PageDecoratorInvariant'

const PublicPage = compose(
  ProvideContext,
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubAccessToken,
  InjectGithubUser,
  PageDecoratorInvariant('PublicPage')
)

export default PublicPage
