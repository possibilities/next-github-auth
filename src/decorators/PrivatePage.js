import compose from '../modules/compose'

import PublicPage from './PublicPage'
import DemandSignedIn from './DemandSignedIn'
import InjectGithubUser from './InjectGithubUser'

const PrivatePage = compose(PublicPage, InjectGithubUser, DemandSignedIn)

export default PrivatePage
