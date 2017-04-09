import Link from 'next/link'

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
      <ul className='nav' style={listStyle}>
        <li style={itemStyle}>
          <Link href='/'>
            <a className='home'>home</a>
          </Link>
          &nbsp; | &nbsp;
        </li>
        <li style={itemStyle}>
          <Link href='/public'>
            <a className='public'>public page</a>
          </Link>
          &nbsp; | &nbsp;
        </li>
        <li style={itemStyle}>
          <Link href='/private'>
            <a className='private'>private page</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
