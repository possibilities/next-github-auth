import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../decorators/PublicPage'

const Home = ({
  githubUser,
  githubClientId
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <br />

    <div>home page!</div>
  </div>
)

export default PublicPage(Home)
