import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import Product from "@/models/product"
import queryString from "query-string";

export async function GET(req){
    await dbConnect()
    const {user} = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    try {
        const orders = await Order.find({userId: user._id}).sort({ createdAt: -1 })
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json( { error: error.message }, { status: 500 })
    }
}

export async function POST(req, res){
    await dbConnect()

    try {
        const {user} = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
        const { orderId } = queryString.parseUrl(req.url).query
        const order = await Order.findById(orderId)

        if(!order || order.userId.toString() !== user._id.toString()){
            return NextResponse.json(
                { error: "Order not found or unauthorized" },
                { status: 404 }
            )
        }

        if(order.delivery_status !== "Not Processed"){
            return NextResponse.json(
                { error: "Order cannot be refunded" },
                { status: 400 }
            )
        }

        const refund = await stripe.refunds.create({
            payment_intent: order.payment_intent,
            reason: "requested_by_customer"
        })

        for (const cartItem of order.cartItems) {
            const product = await Product.findById(cartItem._id)
            if(product) {
                product.stock += cartItem.quantity
                await product.save()
            }
        }

        order.status = "Refunded"
        order.refunded = true
        order.delivery_status = "Cancelled"
        order.refundId = refund.id
        await order.save()

        return NextResponse.json(
            { message: "Order refunded successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            {
                error: error.message
            }, 
            { status: 500 }
        )
    }
}