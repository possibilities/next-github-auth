import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'

const Public = ({ isSignedIn, githubClientId }) => {
  return (
    <div>
      <Navigation />
      <SignInOrProfileLink
        isSignedIn={isSignedIn}
        githubClientId={githubClientId} />
      <br />
      <div>public page!</div>
    </div>
  )
}

export default InjectEnv(Public)
