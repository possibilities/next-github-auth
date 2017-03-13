import { PropTypes } from 'react'
import Link from 'next/link'

const ProfileLink = ({ githubUser: { login } }) => (
  <div>
    hi {login} (<Link href='/sign-out'><a>sign out</a></Link>)
  </div>
)

ProfileLink.propTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  })
}

export default ProfileLink
