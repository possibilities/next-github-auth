import { PropTypes, Children, cloneElement } from 'react'
import Link from 'next/link'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const handleClick = (githubClientId, href) => event => {
  event.preventDefault()
  window.location = getGithubAuthorizeUrl(githubClientId, href)
}

const PrivateLink = props => {
  const {
    href,
    children,
    githubUser,
    githubClientId,
    ...additionalProps
  } = props

  if (githubUser) {
    return <Link href={href} {...additionalProps}>{children}</Link>
  }

  // We're making the assumption (unwisely?) that the child is an `<a>`
  // without an href
  let linkProps = {
    ...additionalProps,
    onClick: handleClick(githubClientId, href)
  }

  const child = Children.only(children)

  if (child.type === 'a' && !('href' in child.props)) {
    linkProps = { ...linkProps, href: '#' }
  }

  return cloneElement(child, linkProps)
}

PrivateLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  githubClientId: PropTypes.string.isRequired
}

export default PrivateLink
