"use client";
import { FaShoppingCart, FaShoppingBag, FaDollarSign, FaUser } from "react-icons/fa";
import CardDataStats from "@/components/admin/CartDataStats";

export default async function AdminDashboardPage(){

  async function fetchCardData() {
    const apiUrl = `${process.env.API}/admin/chart`;
    
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return {
        totalUsers: data.totalUsers,
        totalOrders: data.totalOrders,
        totalProducts: data.totalProducts,
        profit: data.profit
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        profit: 0
      };
    }
  }

  const { totalUsers, totalOrders, totalProducts, profit } = await fetchCardData()

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total={totalUsers}>
          <FaUser />
        </CardDataStats>
        <CardDataStats title="Total Orders" total={totalOrders}>
          <FaShoppingCart />
        </CardDataStats>
        <CardDataStats title="Total Products" total={totalProducts}>
          <FaShoppingBag />
        </CardDataStats>
        <CardDataStats title="Revenue" total={profit} money={true}>
          <FaDollarSign />
        </CardDataStats>
      </div>
      {/* <TopProductsTable topProducts={cardData.topProducts} /> */}
    </>
  )
}
