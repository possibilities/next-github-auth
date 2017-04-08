import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import { PublicPage } from 'next-github-auth'

const Public = () => (
  <div>
    <Navigation />
    <SignInOrProfileLink />

    <br />

    <div>public page!</div>
  </div>
)

export default PublicPage(Public)
