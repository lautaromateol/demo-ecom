import ProductCard from "../product/ProductCard"

async function getCollection(slug) {
  const response = await fetch(`${process.env.API}/category/${slug}`, {
    next: { revalidate: 0 }
  })
  const data = await response.json()
  if(response.ok) {
    return data
  } else return { category: null, products: null }
}

export default async function Collection({slug}) {

  const { category, products } = await getCollection(slug)

  return (
    <section className="py-24 px-0">
      <div className="mx-auto max-w-7xl">
      <p className="text-lg text-main font-medium uppercase tracking-wider mb-8">{category?.name} collection</p>
        <div className="grid grid-cols-4">
          {products?.map((product) => {
            return(
              <ProductCard product={product}/>
            )
          })}
        </div>
      
      </div>
    </section>
  )
}
