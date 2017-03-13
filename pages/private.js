import { Component, PropTypes } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PrivatePage from '../decorators/PrivatePage'
import request from 'axios'

const getGithubRepos = async githubAccessToken => {
  const url = `https://api.github.com/user/repos`
  const headers = { Authorization: `token ${githubAccessToken}` }
  const params = { type: 'owner', sort: 'updated' }
  const options = { headers, params }

  const result = await request.get(url, options)
  return result.data.slice(0, 3)
}

const repoView = ({ full_name }) => ({ fullName: full_name })

class Private extends Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      fullName: PropTypes.string.isRequired
    })).isRequired,
    githubUser: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired,
    githubClientId: PropTypes.string.isRequired
  }

  static async getInitialProps (context) {
    const { githubAccessToken } = context
    const repos = (await getGithubRepos(githubAccessToken)).map(repoView)
    return { repos }
  }

  render () {
    const { githubClientId, githubUser, repos } = this.props

    return (
      <div>
        <Navigation
          githubUser={githubUser}
          githubClientId={githubClientId} />

        <SignInOrProfileLink
          githubUser={githubUser}
          githubClientId={githubClientId} />

        <br />

        <div>private page!</div>

        <br />

        {!repos.length && (
          <div>cool, you have 0 repos!</div>
        )}

        {!!repos.length && (
          <ul style={{ margin: 0 }}>
            {repos.map(({ fullName }) => (
              <li key={fullName}>{fullName}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default PrivatePage(Private)
