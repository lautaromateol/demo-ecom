import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

async function getProducts(searchParams) {

  const { page } = searchParams || 1

  const response = await fetch(`${process.env.API}/product?page=${page}`,
    {
      method: "GET",
      next: { revalidate: 1 }
    })
  const data = await response.json()

  return data
}

export default async function Home({ searchParams }) {

  const { products, totalPages, currentPage } = await getProducts(searchParams)

  return (
    <main className="p-4">
      <h1 className="text-3xl uppercase font-bold text-center">
        Last Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-10">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
} 