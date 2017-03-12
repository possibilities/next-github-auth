import ProfileLink from './ProfileLink'
import SignInLink from './SignInLink'

const styles = {
  position: 'absolute',
  right: 10,
  top: 10,
}

export default ({ githubUser, githubClientId }) => (
  <div style={styles}>
    {githubUser
      ? <ProfileLink githubUser={githubUser} />
      : <SignInLink githubClientId={githubClientId} />
    }
  </div>
)
