import compose from '../modules/compose'

import ProvideContext from './ProvideContext'
import InjectEnvVars from './InjectEnvVars'
import InjectGithubAccessToken from './InjectGithubAccessToken'
import InjectGithubUser from './InjectGithubUser'

let decorators = [
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubAccessToken,
  InjectGithubUser
]

if (process.env.NODE_ENV === 'development') {
  const PageDecoratorInvariant = require('./PageDecoratorInvariant').default
  decorators = [
    ...decorators,
    PageDecoratorInvariant('PublicPage')
  ]
}

decorators = [
  ...decorators,
  ProvideContext
]

const PublicPage = compose(...decorators)

export default PublicPage
