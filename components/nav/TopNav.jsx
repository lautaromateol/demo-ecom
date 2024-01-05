import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const TopNav = () => {

  const { data, status } = useSession();

  return (
    <nav className="flex shadow-md p-2 justify-between mb-3">
      <Link className="nav-link" href='/'>
        NEXTECOM
      </Link>
      {status === "authenticated" ? (
        <div className="flex">
          <Link className="nav-link" href={`/dashboard/${data?.user?.role}`}>
            {data?.user?.name} ({data?.user?.role})
          </Link>
          <a className="nav-link cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </a>
        </div>
      ) : (
        <div className="flex">
          <Link className="nav-link" href='/login'>Login</Link>
          <Link className="nav-link" href='/register'>Register</Link>
        </div>
      )}
    </nav>
  )
}

export default TopNav