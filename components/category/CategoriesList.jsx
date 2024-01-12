"use client"
import { useEffect } from "react"
import { useCategoryContext } from "@/context/CategoryContext"

const CategoriesList = () => {

    const {fetchCategories, categories, setUpdatingCategory} = useCategoryContext()

    useEffect(()=> {
        fetchCategories()
    }, [])

    return (
        <div className="my-5">
        {categories?.map((c) => (
            <button className="px-3 py-2 border border-2 m-2 hover:bg-gray-200" onClick={()=> setUpdatingCategory(c)}>{c.name}</button>
        ))}
    </div>
  )
}

export default CategoriesList