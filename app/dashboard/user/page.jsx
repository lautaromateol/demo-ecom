"use client";
import { useEffect, useState } from "react"
import UserChart from "@/components/user/UserChart";

const UserDashboard = () => {

  const [chartData, setChartData] = useState([])

  const [loading, setLoading] = useState(true)

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/chart`)
      const data = await response.json()

      if (response.ok) {
        setChartData(data)
        setLoading(false)
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error("Server error fetching chart data. Try again later.")
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
            <h1 className="text-medium">
              User Dashboard
            </h1>
            <hr className="w-full" />
            <UserChart chartData={chartData}/>
          </div>
        </div>
      }
    </>

  )
}

export default UserDashboard