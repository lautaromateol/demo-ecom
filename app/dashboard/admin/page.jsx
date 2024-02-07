"use client";
import { useEffect, useState } from "react";
import AdminChart from "@/components/admin/AdminChart";
import toast from "react-hot-toast";

const AdminDashboard = () => {

  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/chart`)
      const data = await response.json()
      if (response.ok) {
        setChartData(data)
        setLoading(false)
      } else {
        setLoading(false)
        toast.error("Error fetching chart data")
        console.log(data.error)
      }
    } catch (error) {
      toast.error("Error fetching chart data")
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChartData()
  }, [])

  return (
    <>
      {loading ?
        <div className="flex items-center justify-center min-h-screen text-red-900">
          LOADING
        </div>
        :
        <div className="container">
          <div className="mx-auto max-w-4xl p-4">
            <p className="text-medium">
              Admin Dashboard
            </p>
            <hr className="w-full" />
            <AdminChart chartData={chartData} />
          </div>
        </div>
      }

    </>
  )
}

export default AdminDashboard