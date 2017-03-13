import { PropTypes } from 'react'
import PrivateLink from './PrivateLink'
import Link from 'next/link'

const Navigation = ({
  githubUser,
  githubClientId
}) => {
  const listStyle = {
    listStyle: 'none',
    margin: 0,
    paddingLeft: 0,
    display: 'inline-block'
  }

  const itemStyle = {
    display: 'inline-block'
  }

  return (
    <div>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <Link href='/'>
            <a>home</a>
          </Link>
          &nbsp; | &nbsp;
        </li>
        <li style={itemStyle}>
          <Link href='/public'>
            <a>public page</a>
          </Link>
          &nbsp; | &nbsp;
        </li>
        <li style={itemStyle}>
          <PrivateLink
            href='/private'
            githubUser={githubUser}
            githubClientId={githubClientId}>

            private page
          </PrivateLink>
        </li>
      </ul>
    </div>
  )
}

Navigation.propTypes = {
  githubUser: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  githubClientId: PropTypes.string.isRequired
}

export default Navigation
