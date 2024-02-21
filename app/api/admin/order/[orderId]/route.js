import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export async function PUT(req, {params}){
    await dbConnect()
    const { delivery_status } = await req.json()
    const { orderId } = params

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { delivery_status },
            { new: true }
        )
        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}