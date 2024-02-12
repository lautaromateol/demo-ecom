"use client";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaShoppingBag, FaDollarSign, FaUser } from "react-icons/fa";
import CardDataStats from "@/components/admin/CartDataStats";
// import TopProductsTable from "@/components/admin/TopProductsTable";


const AdminDashboard = async () => {

  const [cardData, setCardData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCardData = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/chart`)
      const data = await response.json()
      if (response.ok) {
        setCardData(data)
        setLoading(false)
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCardData()
  }, [])

  return (
    <>
      {loading ?
        <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div> :
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats title="Total Users" total={cardData.totalUsers}>
              <FaUser />
            </CardDataStats>
            <CardDataStats title="Total Orders" total={cardData.totalOrders}>
              <FaShoppingCart />
            </CardDataStats>
            <CardDataStats title="Total Products" total={cardData.totalProducts}>
              <FaShoppingBag />
            </CardDataStats>
            <CardDataStats title="Total Profit" total={cardData.profit} money={true}>
              <FaDollarSign />
            </CardDataStats>
          </div>
          {/* <TopProductsTable topProducts={cardData.topProducts} /> */}
        </>
      }
    </>
  )
}

export default AdminDashboard;