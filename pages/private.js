import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'

const Private = ({ isSignedIn, githubClientId }) => {
  return (
    <div>
      <Navigation />
      <SignInOrProfileLink
        isSignedIn={isSignedIn}
        githubClientId={githubClientId} />
      <br />
      <div>private page!</div>
    </div>
  )
}

export default InjectEnv(Private)
