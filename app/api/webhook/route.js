import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    await dbConnect()

    const _raw = await req.text()
    const sig = req.headers.get("stripe-signature")

    try {
        const event = stripe.webhooks.constructEvent(
            _raw,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

        switch (event.type) {
            case "charge.succeeded":
                const chargeSucceeded = event.data.object;
                const { id, ...rest } = chargeSucceeded; 
                const cartItems = JSON.parse(chargeSucceeded.metadata.cartItems);
                const productIds = cartItems.map((cartItem) => cartItem.id);
                const products = await Product.find({ _id: { $in: productIds } });
                // Create an object to quickly map product details by ID 
                const productMap = {};
                products.forEach((product) => {
                    productMap[product._id.toString()] = {
                        _id: product._id,
                        title: product.title,
                        slug: product.slug,
                        price: product.price,
                        image: product.main_images[0]
                        // edition: cartItems[cartItems.findIndex(item => item.title == product.title)].selectedEdition.console,
                        // price: cartItems[cartItems.findIndex(item => item.title == product.title)].selectedEdition.price,
                        // image: cartItems[cartItems.findIndex(item => item.title == product.title)].selectedEdition.image.secure_url

                    };
                });
                const cartItemsWithProductDetails = cartItems.map((cartItem) => ({
                    ...productMap[cartItem.id],
                    quantity: cartItem.quantity,
                }));
                const orderData = {
                    ...rest,
                    chargeId: id,
                    userId: chargeSucceeded.metadata.userId,
                    cartItems: cartItemsWithProductDetails,
                };
                await Order.create(orderData);
                for (const cartItem of cartItems) {
                    const product = await Product.findById(cartItem.id);
                    // const selectedEdition = cartItem.selectedEdition
                    // selectedEdition.stock -= cartItem.quantity
                    // const newEditions = product.editions.map((ed) => ed.console === selectedEdition.console ? selectedEdition : ed) 
                    // if (product) {
                    //     product.editions = newEditions
                    //     await product.save();
                    // }
                    if(product) {
                        product.stock -= cartItem.quantity
                        await product.save()
                    }
                }
                return NextResponse.json({ ok: true });
        }
        return NextResponse.json({
            error: "Webhook Error"
        }, {
            status: 404
        })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json(`Webhook Error: ${err.message}`, {
            status:
                400
        });
    }
}
