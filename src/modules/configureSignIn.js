import { createElement } from 'react'
import PropTypes from 'prop-types'
import PublicPage from '../decorators/PublicPage'
import SignIn from '../pages/SignIn'

const PublicSignInPage = PublicPage(SignIn)

const configureSignIn = config => {
  const WrappedSignIn = props => {
    return createElement(PublicSignInPage, { ...props, ...config })
  }

  WrappedSignIn.propTypes = {
    scope: PropTypes.string
  }

  WrappedSignIn.getInitialProps = async pageContext => {
    return PublicSignInPage.getInitialProps
      ? PublicSignInPage.getInitialProps(pageContext)
      : {}
  }

  return WrappedSignIn
}

export default configureSignIn
