import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../decorators/InjectGithubToken'
import InjectGithubUser from '../decorators/InjectGithubUser'
import EnsureSignedIn from '../decorators/EnsureSignedIn'

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

export default InjectEnv(InjectGithubToken(InjectGithubUser(EnsureSignedIn(Private))))
