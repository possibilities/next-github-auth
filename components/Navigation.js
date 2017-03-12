import Link from 'next/link'

const Navigation = () => {
  const listStyle = {
    listStyle: 'none',
    margin: 0, paddingLeft: 0,
    display: 'inline-block'
  }

  const itemStyle = {
    display: 'inline-block'
  }

  const navigation = (
    <ul style={listStyle}>
      <li style={itemStyle}>
        <Link href='/'><a>home</a></Link>
        &nbsp; | &nbsp;
      </li>
      <li style={itemStyle}>
        <Link href='/public-page'><a>public page</a></Link>
        &nbsp; | &nbsp;
      </li>
      <li style={itemStyle}>
        <Link href='/private-page'><a>private page</a></Link>
      </li>
    </ul>
  )

  return (
    <div>
      Navigation: {navigation}
    </div>
  )
}

export default Navigation
