import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useProductContext } from "@/context/ProductContext";
import { useCartContext } from "@/context/CartContext";

const TopNav = () => {
  const { data, status } = useSession();
  const { productSearchQuery, setProductSearchQuery, fetchProductSearchResults } = useProductContext();
  const { cartItems } = useCartContext();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="flex justify-between px-20 py-10 items-center bg-white relative z-10">
    <h1 className="text-xl text-gray-800 font-bold">
      <Link href="/">
      NextEcom
      </Link>
    </h1>
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <form role="search" onSubmit={fetchProductSearchResults}>
        <input className="ml-2 outline-none" value={productSearchQuery} onChange={(e) => setProductSearchQuery(e.target.value)} type="text" placeholder="Search..." />
      </form>
      <ul className="flex items-center space-x-6">
        <li className="font-semibold text-gray-700">
          <Link href="/shop">SHOP</Link>
        </li>
      </ul>
    </div>
    <ul className="flex items-center space-x-6">
      <li>
        <Link className="flex" href={'/cart'}>
          <BsFillCartCheckFill size={25} />
          <span>{cartItems?.length}</span>
        </Link>
      </li>
      { status === "authenticated" &&
      <li className="relative group">
        <div onClick={toggleUserMenu} className="cursor-pointer flex items-center group">
          <FaUser size={25} className="mr-2" />
          <span className="hidden md:inline-block">{(data?.user?.name).split(' ')[0]}</span>
        </div>
        {isUserMenuOpen && (
          <div className="user-menu absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4">
            <span className="text-gray-500 text-sm">
              {data?.user?.email}
            </span>
            <hr />
            <ul className="py-2">
              <li className="p-2">
                <Link href={`/dashboard/${data?.user?.role}`} className="cursor-pointer font-semibold text-gray-700">DASHBOARD</Link>
              </li>
              <li className="p-2">
                  <a className="cursor-pointer font-semibold text-red-500" onClick={() => signOut({ callbackUrl: "/" })}>
                    LOGOUT
                  </a>
              </li>
            </ul>
          </div>
        )}
      </li>
}
      {status !== "authenticated" && (
        <>
          <li className="font-semibold text-gray-700">
            <Link href="/login">LOGIN</Link>
          </li>
          <li className="font-semibold text-gray-700">
            <Link href="/register">REGISTER</Link>
          </li>
        </>
      )}
    </ul>
  </nav>

  );
};

export default TopNav;
