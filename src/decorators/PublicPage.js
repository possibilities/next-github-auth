import compose from '../modules/compose'

import PageDecoratorInvariant from 'next-page-decorator-invariant'
import PageEnvironment from 'next-page-environment'
import GithubContext from './GithubContext'

const PublicPage = compose(
  PageDecoratorInvariant('PublicPage'),
  PageEnvironment({ githubClientId: process.env.GITHUB_CLIENT_ID }),
  GithubContext
)

export default PublicPage
