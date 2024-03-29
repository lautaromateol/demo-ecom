import Link from "next/link";
import { IoMdCreate } from "react-icons/io";
import { FaList, FaTags, FaUser, FaShoppingCart, FaStar } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const AdminNav = ({ showMobileMenu }) => {

  return (
    <>
      <nav className="hidden md:flex lg:glex w-1/6 flex-col items-center justify-center bg-gray-800 h-screen text-white sticky top-0 left-0">
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin'>Dashboard <MdOutlineSpaceDashboard className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/product'>Create Product <IoMdCreate className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/products'>Products List <FaList className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/categories'>Categories <BiSolidCategory className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/tags'>Tags <FaTags className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/users'>Users <FaUser className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/orders'>Orders <FaShoppingCart className="ml-3 text-white" /></Link>
        <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/product/reviews'>Reviews <FaStar className="ml-3 text-white" /></Link>
      </nav>
      {showMobileMenu ?
        <nav className={`flex md:hidden w-2/3 flex-col items-center justify-center bg-gray-800 h-screen text-white sticky top-0 left-0 z-10`}>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin'>Dashboard <MdOutlineSpaceDashboard className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/product'>Create Product <IoMdCreate className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/products'>Products List <FaList className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/categories'>Categories <BiSolidCategory className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/tags'>Tags <FaTags className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/users'>Users <FaUser className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/orders'>Orders <FaShoppingCart className="ml-3 text-white" /></Link>
          <Link className="flex items-center justify-center px-4 py-4 hover:underline" href='/dashboard/admin/product/reviews'>Reviews <FaStar className="ml-3 text-white" /></Link>
        </nav>
        :
        null
      }
    </>
  );
};

export default AdminNav;
