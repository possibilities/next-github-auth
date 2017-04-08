import compose from '../modules/compose'

import ProvideContext from './ProvideContext'
import InjectEnvVars from './InjectEnvVars'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import InjectGithubUser from './InjectGithubUser'
import DemandSignedIn from './DemandSignedIn'
import PageDecoratorInvariant from './PageDecoratorInvariant'

const PrivatePage = compose(
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubAccessToken,
  InjectGithubUser,
  PageDecoratorInvariant('PrivatePage'),
  ProvideContext,
  DemandSignedIn
)

export default PrivatePage
