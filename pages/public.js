import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../pageWrappers/InjectGithubToken'
import InjectGithubUser from '../pageWrappers/InjectGithubUser'

const Public = ({
  isSignedIn,
  githubClientId,
  githubToken,
  githubUser
}) => (
  <div>
    <Navigation />

    <SignInOrProfileLink
      isSignedIn={isSignedIn}
      githubClientId={githubClientId} />
    <br />

    <div>public page!</div>

    <br />

    <div>token: {githubToken}</div>
    <div>user: {githubUser ? githubUser.login : 'n/a'}</div>
  </div>
)

export default InjectEnv(InjectGithubToken(InjectGithubUser(Public)))
