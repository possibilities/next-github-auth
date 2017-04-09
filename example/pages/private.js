import { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import { PrivatePage } from 'next-github-auth'
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
    })).isRequired
  }

  static async getInitialProps ({ github: { accessToken } }) {
    const githubRepos = await getGithubRepos(accessToken)
    const repos = githubRepos.map(repoView)
    return { repos }
  }

  render () {
    const { repos } = this.props

    return (
      <div>
        <Navigation />
        <SignInOrProfileLink />

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
