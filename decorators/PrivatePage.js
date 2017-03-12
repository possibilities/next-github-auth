import PublicPage from '../decorators/PublicPage'
import EnsureSignedIn from '../decorators/EnsureSignedIn'
import compose from '../modules/compose'

const PrivatePage = compose(PublicPage, EnsureSignedIn)

export default PrivatePage
