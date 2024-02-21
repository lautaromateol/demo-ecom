import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export const revalidate = 0; 

export async function GET(req) {
    await dbConnect();

    try {
        const orders = await Order.find({})
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        

        return NextResponse.json(orders, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
