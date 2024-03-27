import ProductCard from "@/components/product/ProductCard";

export default function RelatedProducts({ products }) {
  if(products?.length > 0){
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-lg text-main font-medium uppercase tracking-wider mb-4">You may also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {products.map((product) => {
              return (
                <ProductCard product={product} />
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}