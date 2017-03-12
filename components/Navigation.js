import Link from 'next/link'

const Navigation = () => {
  const listStyle = { listStyle: 'none', margin: 0, paddingLeft: 0, display: 'inline-block' }
  const itemStyle = { display: 'inline-block' }

  const navigation = (
    <ul style={listStyle}>
      <li style={itemStyle}><Link href='/'>home</Link></li> | &nbsp;
      <li style={itemStyle}><Link href='/public-page'>public page</Link></li> | &nbsp;
      <li style={itemStyle}><Link href='/private-page'>private page</Link></li>
    </ul>
  )

  return (
    <div>
      Navigation: {navigation}
    </div>
  )
}

export default Navigation
