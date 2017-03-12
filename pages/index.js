import { Component } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../pageWrappers/InjectGithubToken'

class Home extends Component {
  render() {
    return (
      <div>
        hi: {this.props.githubToken}
        <Navigation />
        <SignInOrProfileLink
          isSignedIn={this.props.isSignedIn}
          githubClientId={this.props.githubClientId} />
        <br />
        <div>home page!</div>
      </div>
    )
  }
}

export default InjectEnv(InjectGithubToken(Home))
