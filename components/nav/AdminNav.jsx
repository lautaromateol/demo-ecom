import Link from "next/link";

const AdminNav = () => {
  return (
    <>
      <nav className="flex justify-center mb-3">
        <Link href='/dashboard/admin' className="nav-link">
          Admin
        </Link>
        <Link href='/dashboard/admin/product' className="nav-link">
          Create Product
        </Link>
        <Link href='/dashboard/admin/products' className="nav-link">
          Products
        </Link>
        <Link href='/dashboard/admin/category' className="nav-link">
          Categories
        </Link>
        <Link href='/dashboard/admin/tag' className="nav-link">
          Tags
        </Link>
        <Link href='/dashboard/admin/edition' className="nav-link">
          Editions
        </Link>
      </nav>
    </>
  )
}

export default AdminNav