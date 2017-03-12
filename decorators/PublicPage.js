import compose from '../modules/compose'

import InjectEnv from '../decorators/InjectEnv'
import InjectGithubAccessToken from '../decorators/InjectGithubAccessToken'
import InjectGithubUser from '../decorators/InjectGithubUser'

const PublicPage = compose(InjectEnv, InjectGithubAccessToken, InjectGithubUser)

export default PublicPage
