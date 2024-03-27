import Link from "next/link"
import ProductCard from "../product/ProductCard"

async function fetchProducts(){
  const response = await fetch(`${process.env.API}/product/best-rated`, {
    next: { revalidate: 20 }
  })
  const data = await response.json()
  if (response.ok) {
    return data
  } else return []
}

export default async function FeaturedProducts() {

  const bestRated = await fetchProducts()

  return (
    <section className="py-24 px-6 md:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg text-main font-medium uppercase tracking-wider mb-4">Featured products</h3>
          <p className="text-secondary leading-relaxed mb-6">Each piece is meticulously crafted with simplicity and functionality in mind. Our designs blend seamlessly into contemporary spaces, offering both elegance and practicality.</p>
        <Link className="text-main text-sm font-medium uppercase transition-all hover:border-b border-tint hover:text-tint" href="#">
          View all
        </Link>
        </div>
        {bestRated.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  )
}
