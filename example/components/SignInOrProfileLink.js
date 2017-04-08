import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const signOutLink = <Link href='/sign-out'><a>sign out</a></Link>

const SignInOrProfileLink = (props, { github }) => {
  return (
    <div style={styles}>
      {github.user
        ? <div>hi {github.user.login} ({signOutLink})</div>
        : <Link href='/sign-in'><a>sign in</a></Link>
      }
    </div>
  )
}

SignInOrProfileLink.contextTypes = {
  github: PropTypes.shape({
    user: PropTypes.shape({
      login: PropTypes.string
    })
  })
}

export default SignInOrProfileLink
