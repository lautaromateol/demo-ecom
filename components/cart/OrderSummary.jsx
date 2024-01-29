import { useCartContext } from "@/context/CartContext";

const OrderSummary = () => {

    const { cartItems } = useCartContext()

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.selectedEdition.price * item.quantity, 0
        )
    }

    const totalItems = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity, 0
        )
    }

    const itemOrItems = totalItems() > 1 ? "items" : "item"

    return (
        <div>
            <p className="bg-indigo-100 text-blue-600 w-full px-4 py-2">
                Order summary
            </p>
            <ul className="shadow-lg">
                {cartItems.map((product) => (
                    <div className="p-4 flex space-x-2">
                        <div className="w-1/4 h-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={product.selectedEdition.image.secure_url} alt={product.title} />
                        </div>
                        <p className="flex flex-wrap uppercase">{product.title} - {product.selectedEdition.console} edition</p>
                        <div>
                        <p>${product.selectedEdition.price.toFixed(2)}</p>
                        <p className="underline">Qty: {product.quantity}</p>
                        </div>
                    </div>
                ))}
            </ul>
            <div className="flex justify-between p-4 mt-2">
                <p>Total {totalItems()} {itemOrItems}: </p>
                <p className="text-2xl">${calculateTotal().toFixed(2)}</p>
            </div>
        </div>
    )
}

export default OrderSummary