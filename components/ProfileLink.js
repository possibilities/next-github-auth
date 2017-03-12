import Link from 'next/link'

export default ({ githubUser: { login } }) => (
  <div>hi {login} (<Link href='/sign-out'><a>sign out</a></Link>)</div>
)
