import { PropTypes } from 'react'
import PrivateLink from '../src/components/PrivateLink'
import Link from 'next/link'

const styles = {
  position: 'absolute',
  right: 20,
  top: 20
}

const SignInOrProfileLink = (props, { githubUser }) => (
  <div style={styles}>
    {githubUser
      ? <div>
          hi {githubUser.login} (<Link href='/sign-out'><a>sign out</a></Link>)
        </div>
      : <PrivateLink href='/'><a>sign in</a></PrivateLink>
    }
  </div>
)

SignInOrProfileLink.contextTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string
  })
}

export default SignInOrProfileLink
