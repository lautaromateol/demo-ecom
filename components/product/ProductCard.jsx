import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {

    return (
        <div className="shadow-md rounded-lg bg-white overflow-hidden justify-self-center transition 0.5s hover:-translate-y-3">
        <div className="w-full h-30">
          <img
            src={product.main_images[0].secure_url}
            className="w-full h-full"
          />
          <div className="p-5">
            <Link href={`/product/${product.slug}`}>
            <h4 className="text-2xl text-center mb-4 cursor-pointer">{product.title}</h4>
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-6">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
            <div className="flex items-center justify-between">
              <span>${product.price.toFixed(2)}</span>
              <AddToCart product={product} display="home"/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProductCard;