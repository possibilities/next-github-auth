import ProfileLink from './ProfileLink'
import SignInLink from './SignInLink'

const styles = {
  position: 'absolute',
  right: 10,
  top: 10,
}

export default ({ isSignedIn, ...linkProps }) => (
  <div style={styles}>
    {isSignedIn
      ? <ProfileLink {...linkProps} />
      : <SignInLink {...linkProps} />
    }
  </div>
)
