import compose from '../modules/compose'

import ProvideContext from './ProvideContext'
import InjectEnvVars from './InjectEnvVars'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import InjectGithubUser from './InjectGithubUser'
import DemandSignedIn from './DemandSignedIn'
import PageDecoratorInvariant from './PageDecoratorInvariant'

const PrivatePage = compose(
  ProvideContext,
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubAccessToken,
  InjectGithubUser,
  DemandSignedIn,
  PageDecoratorInvariant('PrivatePage')
)

export default PrivatePage
