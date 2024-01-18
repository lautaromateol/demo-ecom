"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useProductContext } from "@/context/ProductContext";
import { FaSearch } from "react-icons/fa";

const TopNav = () => {

  const { data, status } = useSession();
  const { productSearchQuery, setProductSearchQuery, fetchProductSearchResults } = useProductContext()

  return (
    <nav className="flex shadow-md p-2 items-center justify-between mb-3">
      <div>
        <Link className="nav-link" href='/'>
          NEXTECOM
        </Link>
        <Link className="nav-link" href='/shop'>
          Shop
        </Link>
      </div>
      <div>
        <form role="search" onSubmit={fetchProductSearchResults}>
          <input
            className="outline-none border-b-2"
            placeholder="Search"
            type="search"
            value={productSearchQuery}
            onChange={(e) => {
              setProductSearchQuery(e.target.value)
            }}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      {status === "authenticated" ? (
        <div className="flex">
          <Link className="nav-link" href={`/dashboard/${data?.user?.role}`}>
            {data?.user?.name}
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