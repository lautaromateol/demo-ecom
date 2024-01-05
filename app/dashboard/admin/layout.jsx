import Link from "next/link";
import AdminNav from "@/components/nav/AdminNav";

const AdminLayout = ({children}) => {
  return (
    <>
        <AdminNav/>
        {children}
    </>
  )
}

export default AdminLayout