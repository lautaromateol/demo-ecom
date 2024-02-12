"use client";
import Modal from "../Modal"
import { useProductContext } from "@/context/ProductContext"

const ProductImage = ({ product }) => {

  const {showImagePreviewModal, showImage, openModal, currentImagePreviewUrl} = useProductContext()

  return (
    <>
      {showImagePreviewModal && (
        <Modal>
          {showImage(currentImagePreviewUrl, product?.title)}
        </Modal>
      )}
      <div className="flex mt-2">
        {product?.main_images?.map((image) => (
          <div key={image.public_id}
            className="cursor-pointer overflow-hidden h-20"
            onClick={() => openModal(image?.secure_url)}
          >
            {showImage(image?.secure_url, product?.title)}
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductImage;