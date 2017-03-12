import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PrivatePage from '../decorators/PrivatePage'

const Private = ({
  githubClientId,
  githubUser,
  githubToken
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <br />

    <div>private page!</div>

    <br />

    {githubToken && <div>token: {githubToken}</div>}
    {githubUser && <div>user: {githubUser.login}</div>}
  </div>
)

export default PrivatePage(Private)
