"use client"
import { createContext, useContext, useState } from "react"
import Resizer from "react-image-file-resizer"
import toast from "react-hot-toast"

const CategoryContext = createContext()

export const useCategoryContext = ()=> {
    return useContext(CategoryContext)
}

const CategoryProvider = ({children}) => {

    const [category, setCategory] = useState(null)

    const [categories, setCategories] = useState([])

    const [updatingCategory, setUpdatingCategory] = useState(null)

    const [uploading, setUploading] = useState(false)

    const createCategory = async()=> {
        try {
            const response = await fetch(`${process.env.API}/admin/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            })
            const data = await response.json()
            if(response.ok){
                toast.success("Category created")
                setCategory(null)
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

    const fetchCategoriesPublic = async()=> {
        try {
            const response = await fetch(`${process.env.API}/categories`)
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
                toast.success(`Category updated successfully.`)
                setCategory(null)
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
            toast.success("Category deleted successfully.")
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

    const uploadImages = (event) => {
        const files = event.target.files
        let images = updatingCategory ? updatingCategory.images : category?.images || []

        if (files) {
            const totalImages = files.length + images.length
            if (totalImages > 1) {
                toast.error("You can't upload more than 1 image")
                return
            }
            setUploading(true)
            const uploadPromises = []

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const promise = new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        1280,
                        720,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                            fetch(`${process.env.API}/admin/upload/image`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ image: uri })
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    images.push(data);
                                    resolve()
                                })
                                .catch((err) => {
                                    toast.error("CLOUDINARY UPLOAD ERROR", err)
                                })
                        },
                        "base64"
                    )
                })
                uploadPromises.push(promise)
            }
            Promise.all(uploadPromises)
                .then(() => {
                    updatingCategory ? setUpdatingCategory({ ...updatingCategory, images }) : setCategory({ ...category, images })
                    setUploading(false)
                })
                .catch((error) => {
                    toast.error("Error uploading images: ", error.message)
                    setUploading(false)
                })
        }
    }

    const deleteImage = (public_id) => {
        setUploading(true)
        fetch(`${process.env.API}/admin/upload/image`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ public_id })
        })
            .then((response) => response.json())
            .then((data) => {
                const filteredImages = updatingCategory ? updatingCategory.images.filter((image) => image.public_id !== public_id) : category.images.filter((image) => image.public_id !== public_id)
                updatingCategory ? setUpdatingCategory({ ...updatingCategory, images: filteredImages }) : setCategory({ ...category, images: filteredImages })
            })
            .catch((error) => toast.error("Error deleting the image ", error))
            .finally(() => setUploading(false))
    }

    return(
        <CategoryContext.Provider value={
            {category, setCategory, categories, setCategories, updatingCategory, setUpdatingCategory, createCategory, fetchCategories, fetchCategoriesPublic, updateCategory, deleteCategory, uploading, uploadImages, deleteImage}
            }>
            {children}
        </CategoryContext.Provider>
    )

}

export default CategoryProvider