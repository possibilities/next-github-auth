import { Component } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'

class Home extends Component {
  render() {
    return (
      <div>
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

export default InjectEnv(Home)
