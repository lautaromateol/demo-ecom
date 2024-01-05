"use client"
import { createContext, useContext, useState } from "react"
import toast from "react-hot-toast"

const CategoryContext = createContext()

export const useCategoryContext = ()=> {
    return useContext(CategoryContext)
}

const CategoryProvider = ({children}) => {

    const [name, setName] = useState("")

    const [categories, setCategories] = useState([])

    const [updatingCategory, setUpdatingCategory] = useState(null)

    const createCategory = async()=> {
        try {
            const response = await fetch(`${process.env.API}/admin/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            })
            const data = await response.json()
            if(response.ok){
                toast.success("Category created")
                setName("")
                setCategories([data, ...categories])
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.error(error)
            toast.error("An error has ocurred. Try again")
        }
    } 

    const fetchCategories = async()=> {
        try {
            const response = await fetch(`${process.env.API}/admin/category`)
            const data = await response.json()
            if(response.ok){
                setCategories(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const updateCategory = async()=> {
        try {
            const response = await fetch(`${process.env.API}/admin/category/${updatingCategory?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatingCategory)
            })
            const data = await response.json()
            if(response.ok){
                toast.success(`Category updating`)
                setName("")
                setCategories(
                    categories.map(category => (
                        category._id === data._id ? data : category
                    ))
                )
            setUpdatingCategory(null)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const deleteCategory = async()=> {
        try {
            const response = await fetch(`${process.env.API}/admin/category/${updatingCategory?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await response.json()
        if(response.ok){
            toast.success("Category deleted")
            setCategories(
                categories.filter(category => (
                    category._id !== data._id
                ))
            )
            setUpdatingCategory(null)
        } else {
            toast.error(data.error)
        }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    return(
        <CategoryContext.Provider value={
            {name, setName, categories, setCategories, updatingCategory, setUpdatingCategory, createCategory, fetchCategories, updateCategory, deleteCategory}
            }>
            {children}
        </CategoryContext.Provider>
    )

}

export default CategoryProvider