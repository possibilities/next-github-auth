import { createElement } from 'react'
import PublicPage from '../decorators/PublicPage'
import SignIn from '../pages/SignIn'

const PublicSignInPage = PublicPage(SignIn)

const configureSignIn = config => {
  const WrappedSignIn = props => {
    return createElement(PublicSignInPage, { ...props, ...config })
  }

  WrappedSignIn.getInitialProps = async pageContext => {
    return PublicSignInPage.getInitialProps
      ? PublicSignInPage.getInitialProps(pageContext)
      : {}
  }

  return WrappedSignIn
}

export default configureSignIn
