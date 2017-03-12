import Navigation from '../components/Navigation'
import ProfileLink from '../components/ProfileLink'
import SignInLink from '../components/SignInLink'

export default ({ isSignedIn }) => {
  const signInOrProfile = isSignedIn ? <ProfileLink /> : <SignInLink />

  return (
    <div>
      <Navigation />
      {signInOrProfile}
      <br />
      <div>home page!</div>
    </div>
  )
}
