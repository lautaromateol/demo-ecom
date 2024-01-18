import ProductsList from "@/components/product/ProductsList"

const AdminProductsList = () => {
    return (
      <div className="container">
      <div className="mx-auto max-w-4xl p-4">
          <h1 className="text-medium">
              Products List
          </h1>
      <hr className="w-full" />
      <ProductsList/>
      </div>
  </div>
    )
  }
  
export default AdminProductsList;