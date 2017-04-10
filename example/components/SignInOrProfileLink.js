import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const signOutLink = (
  <Link href='/sign-out'>
    <a className='sign-out'>sign out</a>
  </Link>
)

const SignInOrProfileLink = (props, { github }) => {
  return (
    <div style={styles}>
      {github.user
        ? <div>hi {github.user.login} ({signOutLink})</div>
        : <Link href='/sign-in'><a className='sign-in'>sign in</a></Link>
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
