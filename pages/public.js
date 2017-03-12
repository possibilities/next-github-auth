import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../decorators/PublicPage'

const Public = ({
  githubClientId,
  githubUser
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />
    <br />

    <div>public page!</div>
  </div>
)

export default PublicPage(Public)
