import { PropTypes } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PublicPage from '../src/decorators/PublicPage'

const Home = ({
  githubUser,
  env: { githubClientId }
}) => (
  <div>
    <Navigation
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <SignInOrProfileLink
      githubUser={githubUser}
      githubClientId={githubClientId} />

    <br />

    <div>home page!</div>
  </div>
)

Home.propTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  env: PropTypes.shape({
    githubClientId: PropTypes.string.isRequired
  }).isRequired
}

export default PublicPage(Home)
