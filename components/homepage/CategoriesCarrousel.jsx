import CategoryCard from "../category/CategoryCard";

async function fetchCategories() {
        const response = await fetch(`${process.env.API}/categories`, {
            next: { revalidate: 0 }
        })
        const data = await response.json()
        if(response.ok){
            return data
        } else {
            return []
        }
}

export default async function CategoriesCarrousel (){

    const categories = await fetchCategories()

    return (
        <div className="grid place-content-center p-4 mt-[4rem]">
            <div className="flex flex-col items-start">
                <h3 className="text-2xl text-left text-gray-700 uppercase mb-1 text-center">Shop by category</h3>
                <hr className="w-full mb-4 border-t-1" />
            </div>
            <div className="flex justify-start">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </div>






    )
}
