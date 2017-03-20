import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../src/decorators/PublicPage'

const Public = () => (
  <div>
    <Navigation />
    <SignInOrProfileLink />

    <br />

    <div>public page!</div>
  </div>
)

export default PublicPage(Public)
