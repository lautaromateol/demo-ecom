import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useProductContext } from "@/context/ProductContext";
import { useCartContext } from "@/context/CartContext";
import { logo } from "@/utils/helpers";

const TopNav = () => {
  const { data, status } = useSession();
  const { productSearchQuery, setProductSearchQuery, fetchProductSearchResults } = useProductContext();
  const { cartItems } = useCartContext();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
<nav className="flex justify-between bg-white px-10 py-5 items-center relative w-full">
      <div className="flex items-center">
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <h1 className="text-xl text-gray-800 font-bold ml-4">
          <Link href="/">{logo()}</Link>
        </h1>
      </div>
      <form
        role="search"
        onSubmit={fetchProductSearchResults}
        className="hidden md:block"
      >
        <input
          value={productSearchQuery}
          onChange={(e) => setProductSearchQuery(e.target.value)}
          type="text"
          className="w-full p-2 border border-gray-300 outline-none rounded"
          placeholder="Search..."
        />
      </form>
      <ul className="flex items-center space-x-6">
        <li className="font-semibold text-gray-700 hidden md:block">
          <Link href="/shop">SHOP</Link>
        </li>
      </ul>
      <ul className="flex items-center space-x-6">
        <li>
          <Link className="flex" href={'/cart'}>
            <BsFillCartCheckFill size={25} />
            <span>{cartItems?.length}</span>
          </Link>
        </li>
        {status === "authenticated" && (
          <li className="relative group">
            <div onClick={toggleUserMenu} className="cursor-pointer flex items-center group">
              <FaUser size={25} className="mr-2" />
              <span className="hidden md:inline-block">{(data.user.name).split(' ')[0]}</span>
            </div>
            {isUserMenuOpen && (
              <div className="user-menu absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4">
                <span className="text-gray-500 text-sm">
                  {data?.user?.email}
                </span>
                <hr />
                <ul className="py-2">
                  <li className="p-2">
                    <Link href='/dashboard/user' className="cursor-pointer font-semibold text-gray-700">PROFILE</Link>
                  </li>
                  {
                    data.user.role === "admin" &&
                    <li className="p-2">
                      <Link href='/dashboard/admin' className="cursor-pointer font-semibold text-gray-700">DASHBOARD</Link>
                    </li>
                  }
                  <li className="p-2">
                    <a className="cursor-pointer font-semibold text-red-500" onClick={() => signOut({ callbackUrl: "/" })}>
                      LOGOUT
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </li>
        )}
        {status !== "authenticated" && (
          <>
            <li className="font-semibold text-gray-700 hidden md:block">
              <Link href="/login">LOGIN</Link>
            </li>
            <li className="font-semibold text-gray-700 hidden md:block">
              <Link href="/register">REGISTER</Link>
            </li>
          </>
        )}
      </ul>

      {/* Menú desplegable para dispositivos móviles */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeMobileMenu}></div>
      )}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-2/3 h-full bg-white z-50 transform translate-x-0 transition-transform ease-in-out">
          <div className="p-6">
            <button
              className="absolute top-2 right-2 text-gray-800 text-2xl focus:outline-none"
              onClick={toggleMobileMenu}
            >
              &times;
            </button>
            <form role="search" onSubmit={fetchProductSearchResults}>
              <input
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 outline-none rounded"
              />
            </form>
            <Link href="/shop" className="block mt-2 text-gray-800">
              SHOP
            </Link>
            {status === "authenticated" && (
              <a className="block mt-2 text-red-500 cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                LOGOUT
              </a>
            )}
            {status !== "authenticated" && (
              <Link href="/login" className="block mt-2 text-gray-800">
                LOGIN
              </Link>
            )}
            {status !== "authenticated" && (
              <Link href="/register" className="block mt-2 text-gray-800">
                REGISTER
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
