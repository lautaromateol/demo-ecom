import { useContext, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProductContext = createContext()

export const useProductContext = () => {
    return useContext(ProductContext)
}

const ProductProvider = ({ children }) => {

    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [updatingProduct, setUpdatingProduct] = useState(null)
    const [uploading, setUploading] = useState(false)

    const router = useRouter()

    const uploadImages = (event) => {
        console.log(event.target.files)
    }

    const deleteImage = (public_id) => {

    }

    const createProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(`Product "${data.title}" created`)
                router.push("/dashboard/admin/products")
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }


    const fetchProducts = async (page = 1) => {
        try {
            const response = await fetch(`${process.env.API}/product?page=${page}`)
            const data = await response.json()
            if (response.ok) {
                setProducts(data?.products)
                setTotalPages(data?.totalPages)
                setCurrentPage(data?.currentPage)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const updateProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/api/admin/product/${updatingProduct?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatingProduct)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(`Product "${data?.title}" updated`)
                router.back()
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/api/admin/product/${updatingProduct?._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(`Product "${data?.title}" deleted`)
                router.back()
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    return (
        <ProductContext.Provider
            value={{
                product,
                setProduct,
                products,
                setProducts,
                currentPage,
                setCurrentPage,
                totalPages,
                setTotalPages,
                updatingProduct,
                setUpdatingProduct,
                uploading,
                setUploading,
                uploadImages,
                deleteImage,
                createProduct,
                fetchProducts,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;


