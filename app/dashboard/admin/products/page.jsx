"use client";
import { useState, useEffect } from "react";
import ProductsList from "@/components/product/ProductsList";
import toast from "react-hot-toast";

const AdminProductsList = () => {

  const [products, setProducts] = useState([])

  async function getProducts() {
    try {
      const response = await fetch(`${process.env.API}/admin/product`)
      const data = await response.json()
      if(response.ok) {
        setProducts(data)
      } else {
        console.log(data.error)
        toast.error(data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error("Server error fetching the products. Try again later.")
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="container">
      <div className="mx-auto max-w-4xl p-4">
        <p className="text-2xl font-bold my-10">PRODUCTS LIST</p>
        <ProductsList products={products}/>
      </div>
    </div>
  )
}

export default AdminProductsList;