import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../pageWrappers/InjectGithubToken'
import InjectGithubUser from '../pageWrappers/InjectGithubUser'

const Private = ({
  githubClientId,
  githubUser,
  githubToken
}) => {
  return (
    <div>
      <Navigation />

      <SignInOrProfileLink
        githubUser={githubUser}
        githubClientId={githubClientId} />

      <br />

      <div>private page!</div>

      <br />

      <div>token: {githubToken}</div>
      <div>user: {githubUser ? githubUser.login : 'n/a'}</div>
    </div>
  )
}

export default InjectEnv(InjectGithubToken(InjectGithubUser(Private)))
