import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../pageWrappers/InjectGithubToken'

const Public = ({ isSignedIn, githubClientId, githubToken }) => {
  return (
    <div>
      hi: {githubToken}
      <Navigation />
      <SignInOrProfileLink
        isSignedIn={isSignedIn}
        githubClientId={githubClientId} />
      <br />
      <div>public page!</div>
    </div>
  )
}

export default InjectEnv(InjectGithubToken(Public))
