import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../decorators/PublicPage'

const Home = ({
  githubUser,
  githubToken,
  githubClientId
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <br />

    <div>home page!</div>

    <br />

    {githubToken && <div>token: {githubToken}</div>}
    {githubUser && <div>user: {githubUser.login}</div>}
  </div>
)

export default PublicPage(Home)
