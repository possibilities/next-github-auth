import { PropTypes } from 'react'
import ProfileLink from './ProfileLink'
import SignInLink from './SignInLink'

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const SignInOrProfileLink = ({ githubUser, githubClientId }) => (
  <div style={styles}>
    {githubUser
      ? <ProfileLink githubUser={githubUser} />
      : <SignInLink githubClientId={githubClientId} />
    }
  </div>
)

SignInOrProfileLink.propTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  githubClientId: PropTypes.string.isRequired
}

export default SignInOrProfileLink
