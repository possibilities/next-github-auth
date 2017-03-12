import { Component } from 'react'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const EnsureSignedIn = Page => {
  return class EnsureSignedInWrapper extends Component {
    constructor (props) {
      super(props)
      if (process.browser && !props.githubUser) {
        window.location = getGithubAuthorizeUrl(props.githubClientId)
      }
    }

    componentWillReceiveProps(nextProps) {
      if (process.browser && !nextProps.githubUser) {
        window.location = '/'
      }
    }

    render () {
      if (this.props.githubUser) {
        return <Page {...this.props} />
      } else {
        return null
      }
    }
  }
}

export default EnsureSignedIn
