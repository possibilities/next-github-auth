import { Component } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import PrivatePage from '../decorators/PrivatePage'
import request from 'axios'

const getGithubRepos = async githubAccessToken => {
  const url = `https://api.github.com/user/repos`
  const headers = { Authorization: `token ${githubAccessToken}` }
  const options = { headers }

  const result = await request.get(url, options)
  return result.data.slice(0, 3)
}

class Private extends Component {
  static async getInitialProps (context) {
    const { githubAccessToken } = context
    return { repos: await getGithubRepos(githubAccessToken) }
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

        <ul>
          {repos.map(({ full_name: fullName }) => (
            <li key={fullName}>{fullName}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PrivatePage(Private)
