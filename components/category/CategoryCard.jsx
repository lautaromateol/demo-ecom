import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <div className="h-90 max-w-xs">
            <div className="w-full relative overflow-hidden">
                <Link href={`/category/${category.slug}`}>
                    <img className="w-full rounded-md object-center transition transform ease-in-out hover:cursor-pointer hover:scale-110" src={category.images[0].secure_url} alt="Category image" />
                </Link>
            </div>
            <div className="mt-4">
                <Link href={`/category/${category.slug}`}>
                    <h6 className="text-lg text-center uppercase">{category.name}</h6>
                </Link>
            </div>
        </div>
  )
}

export default CategoryCard;