import compose from '../modules/compose'

import PublicPage from '../decorators/PublicPage'
import DemandSignedIn from '../decorators/DemandSignedIn'
import InjectGithubUser from '../decorators/InjectGithubUser'

const PrivatePage = compose(PublicPage, InjectGithubUser, DemandSignedIn)

export default PrivatePage
