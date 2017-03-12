import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PrivatePage from '../decorators/PrivatePage'

const Private = ({
  githubClientId,
  githubUser
}) => (
  <div>
    <Navigation
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <br />

    <div>private page! (private data: {githubUser.login})</div>
  </div>
)

export default PrivatePage(Private)
