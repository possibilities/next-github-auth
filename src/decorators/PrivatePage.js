import PublicPage from '../decorators/PublicPage'
import EnsureSignedIn from '../decorators/EnsureSignedIn'
import InjectGithubUser from '../decorators/InjectGithubUser'
import compose from '../modules/compose'

const PrivatePage = compose(PublicPage, InjectGithubUser, EnsureSignedIn)

export default PrivatePage
