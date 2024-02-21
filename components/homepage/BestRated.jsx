import ProductCard from "../product/ProductCard";

async function fetchProducts(){
  const response = await fetch(`${process.env.API}/product/best-rated`, {
    next: { revalidate: 0 }
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else return []
}

export default async function BestRated(){

  const bestRated = await fetchProducts()

  return (
    <div className="grid place-content-center p-4 mt-[4rem]">
      <div className="flex flex-col items-end">
        <h3 className="text-2xl text-right text-gray-700 uppercase mb-1 text-center">Best Rated</h3>
        <hr className="w-full mb-4 border-t-1" />
      </div>
      <div className="flex justify-start">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestRated.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
