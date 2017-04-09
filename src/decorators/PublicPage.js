import compose from '../modules/compose'

import InjectEnvVars from './InjectEnvVars'
import InjectGithubContext from './InjectGithubContext'

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
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithubContext
]

const PublicPage = compose(...decorators)

export default PublicPage
