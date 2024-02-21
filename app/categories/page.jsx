import CategoryCard from "@/components/category/CategoryCard";

async function getCategories() {
  const response = await fetch(`${process.env.API}/categories`, {
    next: { revalidate: 0 }
  })
  const data = await response.json()
  if (response.ok) {
    return {
      categories: data
    }
  }
  return {
    categories: null
  }
}

export default async function Categories() {

  const { categories } = await getCategories()

  return (
    <main>
      <h1 className="text-4xl font-bold text-center">CATEGORIES</h1>
      <div className="mt-4 flex items-start justify-center min-h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories?.map((c) => (
            <CategoryCard key={c._id} category={c} />
          ))
          }
        </div>
      </div>
    </main>
  )
}

