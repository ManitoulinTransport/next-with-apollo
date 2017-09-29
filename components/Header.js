import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default ({ url, currentUser }) => (
  <header>
    <Link prefetch href='/'>
      <a className={url.pathname === '/' && 'is-active'}>Home</a>
    </Link>

    <Link prefetch href='/about'>
      <a className={url.pathname === '/about' && 'is-active'}>About</a>
    </Link>

    <span className='float-right'>
      {currentUser ? (
        <LogoutButton />
      ) : (
        <Link prefetch href='/login'>
          <a className={url.pathname === '/login' && 'is-active'}>Login</a>
        </Link>
      )}
    </span>

    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
      .float-right {
        float: right;
      }
    `}</style>
  </header>
)
