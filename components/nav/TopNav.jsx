import Link from "next/link"
import { useCartContext } from "@/context/CartContext";

export default function TopNav() {
  
  const { cartItems } = useCartContext();
  
  return (
    <header className="w-full top-0 left-0 flex items-center justify-between py-0 px-8 h-24 mb-8">
      <Link href="/">
        <img src="./img/logo.png" alt="logo" className="w-28" />
      </Link>
      <nav>
        <ul className="flex items-center justify-center gap-6 uppercase text-main font-light">
          {/* <li>
            <Link href="/shop">
              Shop
            </Link>
          </li> */}
          <li>
            <Link href="/login">
              Sign in
            </Link>
          </li>
          <li>
            <Link href="/register">
              Register
            </Link>
          </li>
          <li>
            <Link href="/cart">
              Cart ({cartItems?.length})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
