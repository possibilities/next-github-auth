import { Component } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import getEnvironment from '../modules/getEnvironment'

export default class Home extends Component {
  static async getInitialProps() {
    const { githubClientId } = getEnvironment()
    return { githubClientId }
  }

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
