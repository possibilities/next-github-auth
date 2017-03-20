import PublicPage from '../decorators/PublicPage'
import DemandSignedIn from '../decorators/DemandSignedIn'
import InjectGithubUser from '../decorators/InjectGithubUser'
import compose from '../modules/compose'

const PrivatePage = compose(PublicPage, InjectGithubUser, DemandSignedIn)

export default PrivatePage
