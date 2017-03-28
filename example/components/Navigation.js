import { PrivateLink } from 'next-github-auth'
import NextLink from 'next/link'

const Link = PrivateLink(NextLink)

const Navigation = () => {
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
          <Link href='/private'>
            <a>private page</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
