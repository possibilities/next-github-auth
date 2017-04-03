import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const signOutLink = <Link href='/sign-out'><a>sign out</a></Link>

const SignInOrProfileLink = (props, { githubUser }) => {
  return (
    <div style={styles}>
      {githubUser
        ? <div>hi {githubUser.login} ({signOutLink})</div>
        : <Link href='/sign-in'><a>sign in</a></Link>
      }
    </div>
  )
}

SignInOrProfileLink.contextTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string
  })
}

export default SignInOrProfileLink
