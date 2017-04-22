import compose from '../modules/compose'

import PageDecoratorInvariant from 'next-page-decorator-invariant'
import PageEnvironment from 'next-page-environment'
import GithubContext from './GithubContext'
import DemandSignedIn from './DemandSignedIn'

const PrivatePage = compose(
  PageDecoratorInvariant('PrivatePage'),
  PageEnvironment({ githubClientId: process.env.GITHUB_CLIENT_ID }),
  GithubContext,
  DemandSignedIn
)

export default PrivatePage
