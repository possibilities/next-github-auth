import Link from 'next/link'
import Router from 'next/router'
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
    ? <Link href={href}><a>{children}</a></Link>
    : (
      <a
        href='#'
        onClick={handleClick(githubClientId, href)}>

        {children}
      </a>
    )
)

export default PrivateLink
