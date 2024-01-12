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

    const router = useRouter()

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

           for(let i = 0; i < files.length; i++){
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
                                    mainImages.unshift(data);
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

    const uploadEditionImages = async (event, edition) => {
        const file = event.target.files[0]

        const productEdition = edition

        if(file){
            setUploading(true)
            try {
                await new Promise((resolve, reject)=> {
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
                                    productEdition.image = data;
                                    resolve()
                                })
                                .catch((err) => {
                                    toast.error("CLOUDINARY UPLOAD ERROR", err)
                                })
                        },
                        "base64"
                    )
                })
                const editions = product?.editions.map((edition)=> (
                    edition.console === productEdition.console ? productEdition : edition
                ))

                setProduct({...product, editions})

                setUploading(false)

            } catch (error) {
                toast.error("Error uploading the image ", error.message)
                setUploading(false)
            }
        }
      };
      

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
            const filteredImages = updatingProduct ? updatingProduct.images.filter((image)=> image.public_id !== public_id) : product.images.filter((image) => image !== public_id)
            updatingProduct ? setUpdatingProduct({...updatingProduct, images: filteredImages}) : setProduct({...product, images: filteredImages})
        })
        .catch((error) => toast.error("Error deleting the image ", error))
        .finally(()=> setUploading(false))
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
                uploadEditionImages,
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


