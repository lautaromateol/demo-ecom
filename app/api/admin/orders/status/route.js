import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Order from '@/models/order';

export const revalidate = 0;

export async function GET(req) {

  await dbConnect()

  try {
    const statusCounts = await Order.aggregate([
      { $group: { _id: '$delivery_status', count: { $sum: 1 } } }
    ]);

    const result = {
      'Not Processed': 0,
      'processing': 0,
      'Dispatched': 0,
      'Cancelled': 0,
      'Delivered': 0
    };

    statusCounts.forEach(status => {
      result[status._id] = status.count;
    });

    return NextResponse.json({
      "Not Processed": result["Not Processed"],
      "processing": result["processing"],
      "Dispatched": result["Dispatched"],
      "Cancelled": result["Cancelled"],
      "Delivered": result["Delivered"]
    })

  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 500
    })
  }
}
