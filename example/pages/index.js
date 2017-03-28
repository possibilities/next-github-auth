import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import { PublicPage } from 'next-github-auth'

const Home = () => (
  <div>
    <Navigation />
    <SignInOrProfileLink />

    <br />

    <div>home page!</div>
  </div>
)

export default PublicPage(Home)
