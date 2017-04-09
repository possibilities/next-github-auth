import compose from '../modules/compose'

import InjectEnvVars from './InjectEnvVars'
import InjectGithub from './InjectGithub'
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
  InjectEnvVars({ GITHUB_CLIENT_ID: 'githubClientId' }),
  InjectGithub,
  DemandSignedIn
]

const PrivatePage = compose(...decorators)

export default PrivatePage
