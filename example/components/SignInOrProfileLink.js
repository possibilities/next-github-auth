import React, { PropTypes } from 'react'
import { PrivateLink } from 'next-github-auth'
import NextLink from 'next/link'

const Link = PrivateLink(NextLink)

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const signOutLink = <Link href='/sign-out'><a>sign out</a></Link>

const SignInOrProfileLink = (props, { githubUser: { login } = {} }) => (
  <div style={styles}>
    {login
      ? <div>hi {login} ({signOutLink})</div>
      : <Link href='/sign-in'><a>sign in</a></Link>
    }
  </div>
)

SignInOrProfileLink.contextTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string
  })
}

export default SignInOrProfileLink
