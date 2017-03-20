import { PropTypes, Children, cloneElement } from 'react'
import Link from 'next/link'
import getGithubAuthorizeUrl from '../modules/getGithubAuthorizeUrl'

const handleClick = (githubClientId, href) => event => {
  event.preventDefault()
  window.location = getGithubAuthorizeUrl(githubClientId, href)
}

const PrivateLink = (props, context) => {
  const {
    href,
    children,
    ...additionalProps
  } = props

  const { githubClientId, githubUser } = context

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
  children: PropTypes.object.isRequired
}

PrivateLink.contextTypes = {
  githubClientId: PropTypes.string,
  githubUser: PropTypes.shape({
    login: PropTypes.string
  })
}

export default PrivateLink
