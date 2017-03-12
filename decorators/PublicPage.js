import compose from '../modules/compose'

import InjectEnv from '../decorators/InjectEnv'
import InjectGithubToken from '../decorators/InjectGithubToken'
import InjectGithubUser from '../decorators/InjectGithubUser'

const PublicPage = compose(InjectEnv, InjectGithubToken, InjectGithubUser)

export default PublicPage
