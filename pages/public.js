import { PropTypes } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../src/decorators/PublicPage'

const Public = ({
  env: { githubClientId },
  githubUser
}) => (
  <div>
    <Navigation
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />
    <br />

    <div>public page!</div>
  </div>
)

Public.propTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  env: PropTypes.shape({
    githubClientId: PropTypes.string.isRequired
  }).isRequired
}

export default PublicPage(Public)
