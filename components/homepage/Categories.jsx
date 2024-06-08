import Collection from "./Collection"

async function getCategories() {
  const response = await fetch(`${process.env.API}/categories`, {
    next: { revalidate: 3600 }
  })
  const data = await response.json()
  const promises = data.map(async({ slug }) => {
    const response = await fetch(`${process.env.API}/category/${slug}`)
    const data = await response.json()
    return data
  })
  const categories = await Promise.all(promises)
  return categories
}

export default async function Categories() {

  const categories = await getCategories()
  
  return (
    <>
      {categories.map((category) => {
        return (
          <Collection key={category.category._id} category={category} />
        )
      })}
    </>
  )
}