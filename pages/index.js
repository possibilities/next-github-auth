import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'

export default ({ isSignedIn }) => {
  return (
    <div>
      <Navigation />
      <SignInOrProfileLink isSignedIn={isSignedIn} />
      <br />
      <div>home page!</div>
    </div>
  )
}
