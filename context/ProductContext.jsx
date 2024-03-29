import { useContext, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer"

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
    const [showImagePreviewModal, setShowImagePreviewModal] = useState(false)
    const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("")
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [currentRating, setCurrentRating] = useState(0)
    const [comment, setComment] = useState("")
    const [updateComment, setUpdateComment] = useState(false)
    const [brands, setBrands] = useState([])
    const [productSearchQuery, setProductSearchQuery] = useState("")
    const [productSearchResults, setProductSearchResults] = useState([])

    const router = useRouter()

    const openModal = (url) => {
        setCurrentImagePreviewUrl(url)
        setShowImagePreviewModal(true)
    }

    const closeModal = () => {
        setShowImagePreviewModal(false)
        setShowRatingModal(false)
        setCurrentImagePreviewUrl("")
    }

    const showImage = (src, title) => {
        return (
            <img
                src={src}
                className="w-full h-full object-contain"
                alt={title}
            />
        )
    }

    const uploadImages = (event) => {
        const files = event.target.files
        let mainImages = updatingProduct ? updatingProduct.main_images : product?.main_images || []

        if (files) {
            const totalImages = files.length + mainImages.length
            if (totalImages > 4) {
                toast.error("You can't upload more than 4 images")
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
                                    mainImages.push(data);
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
                    updatingProduct ? setUpdatingProduct({ ...updatingProduct, main_images: mainImages }) : setProduct({ ...product, main_images: mainImages })
                    setUploading(false)
                })
                .catch((error) => {
                    toast.error("Error uploading images: ", error)
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
                const filteredImages = updatingProduct ? updatingProduct.main_images.filter((image) => image.public_id !== public_id) : product.main_images.filter((image) => image !== public_id)
                updatingProduct ? setUpdatingProduct({ ...updatingProduct, main_images: filteredImages }) : setProduct({ ...product, main_images: filteredImages })
            })
            .catch((error) => toast.error("Error deleting the image ", error))
            .finally(() => setUploading(false))
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
                setProduct(null)
                toast.success(`Product "${data.title}" created`)
                window.location.reload()
            } else if(response.status === 400) {
                toast.error(data.error)
            } else {
                toast.error(`An error has ocurred creating the product: ${data.error}`)
            }
        } catch (error) {
            toast.error("Server error creating the product. Try again later.")
        }
    }


    const fetchProducts = async (page = 1) => {
        try {
            const response = await fetch(`${process.env.API}/product?page=${page}`)
            const data = await response.json()
            if (response.ok) {
                setProduct(null)
                setUpdatingProduct(null)
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
            console.log(updatingProduct)
            const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatingProduct)
            })
            const data = await response.json()
            if (response.ok) {
                setUpdatingProduct(null)
                toast.success(`Product "${data?.title}" updated`)
                router.back()
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/product/${updatingProduct?._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUpdatingProduct(null)
                toast.success(`Product "${data?.title}" deleted`)
                router.back()
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const fetchBrands = async () => {
        try {
            const response = await fetch(`${process.env.API}/product/brands`)
            const data = await response.json()
            if (response.ok) {
                setBrands(data)
            } else {
                throw new Error("Failed to fetch developers")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const fetchProductSearchResults = async(e)=> {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.API}/product/search?title=${productSearchQuery}`)
            const data = await response.json()
            if (response.ok) {
                setProductSearchResults(data)
                router.push(`/search/product/?productSearchQuery=${productSearchQuery}`)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
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
                brands,
                fetchBrands,
                showImagePreviewModal,
                setShowImagePreviewModal,
                currentImagePreviewUrl,
                setCurrentImagePreviewUrl,
                openModal,
                closeModal,
                showImage,
                showRatingModal,
                setShowRatingModal,
                currentRating,
                setCurrentRating,
                comment,
                setComment,
                updateComment,
                setUpdateComment,
                productSearchQuery,
                setProductSearchQuery,
                productSearchResults,
                setProductSearchResults,
                fetchProductSearchResults
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;


