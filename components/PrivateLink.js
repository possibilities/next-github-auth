import { PropTypes } from 'react'
import Link from 'next/link'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const handleClick = (githubClientId, href) => event => {
  event.preventDefault()

  window.location = getGithubAuthorizeUrl(githubClientId, href)
}

const PrivateLink = ({
  href,
  children,
  githubUser,
  githubClientId
}) => (
  githubUser
    ? (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
    : (
      <a href='#' onClick={handleClick(githubClientId, href)}>
        {children}
      </a>
    )
)

PrivateLink.propTypes = {
  href: PropTypes.string.isRequired,
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  githubClientId: PropTypes.string.isRequired
}

export default PrivateLink
