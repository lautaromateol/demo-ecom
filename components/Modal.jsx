import { useProductContext } from "@/context/ProductContext"

const Modal = ({ children }) => {

    const { closeModal } = useProductContext()

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-4">
                <div className="overflow-auto" style={{maxHeight: "90vh"}}>
                    {children}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        onClick={() => closeModal()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal