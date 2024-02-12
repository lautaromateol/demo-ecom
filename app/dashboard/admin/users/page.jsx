"use client";
import { useState, useEffect } from "react"
import UsersList from "@/components/admin/UsersList";
import toast from "react-hot-toast";


const AdminUsersList =  () => {

  const [users, setUsers] = useState([])

  async function getUsers() {
    try {
      const response = await fetch(`${process.env.API}/admin/users`)
      const data = await response.json()
      if (response.ok) {
        setUsers(data)
      } else {
        toast.error(data.error)
        console.log(data.error)
      }
    } catch (error) {
      toast.error("Server error fetching the products. Try again later.")
      console.log(error)
    }
  
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <div className="mx-auto max-w-4xl p-4">
        <p className="text-2xl font-bold my-10">USERS LIST</p>
        <UsersList users={users}/>
      </div>
    </div>
  )
}

export default AdminUsersList;