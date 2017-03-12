import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../decorators/InjectEnv'
import InjectGithubToken from '../decorators/InjectGithubToken'
import InjectGithubUser from '../decorators/InjectGithubUser'

const Public = ({
  githubClientId,
  githubToken,
  githubUser
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />
    <br />

    <div>public page!</div>

    <br />

    {githubToken && <div>token: {githubToken}</div>}
    {githubUser && <div>user: {githubUser.login}</div>}
  </div>
)

export default InjectEnv(InjectGithubToken(InjectGithubUser(Public)))
