import compose from '../modules/compose'

import EnvironmentVariables from './EnvironmentVariables'
import GithubContext from './GithubContext'

let decorators = []

if (process.env.NODE_ENV === 'development') {
  const PageDecoratorInvariant = require('./PageDecoratorInvariant').default
  decorators = [
    ...decorators,
    PageDecoratorInvariant('PublicPage')
  ]
}

decorators = [
  ...decorators,
  EnvironmentVariables({ GITHUB_CLIENT_ID: 'githubClientId' }),
  GithubContext
]

const PublicPage = compose(...decorators)

export default PublicPage
