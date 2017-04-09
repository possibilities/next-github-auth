import compose from '../modules/compose'

import EnvironmentVariables from './EnvironmentVariables'
import GithubContext from './GithubContext'
import DemandSignedIn from './DemandSignedIn'

let decorators = []

if (process.env.NODE_ENV === 'development') {
  const PageDecoratorInvariant = require('./PageDecoratorInvariant').default
  decorators = [
    ...decorators,
    PageDecoratorInvariant('PrivatePage')
  ]
}

decorators = [
  ...decorators,
  EnvironmentVariables({ GITHUB_CLIENT_ID: 'githubClientId' }),
  GithubContext,
  DemandSignedIn
]

const PrivatePage = compose(...decorators)

export default PrivatePage
