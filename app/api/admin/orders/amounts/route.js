import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Order from '@/models/order';

export const revalidate = 0; 

export async function GET(req) {
  await dbConnect();

  try {
    const ordersForShipping = await Order.find({
      'delivery_status': { $nin: ['processing', 'Dispatched', 'Cancelled', 'Delivered'] },
    });

    const ordersForTaxes = await Order.find({
        'delivery_status': { $nin: ['Cancelled'] },
      });

    let totalShippingCost = 0;
    let totalTaxAmount = 0;

    ordersForTaxes.forEach(order => {
      const capturedAmount = order.amount_captured / 100;
      const remainingAmount = capturedAmount - 5; 
      const taxAmount = remainingAmount * 0.1; 
      totalTaxAmount += taxAmount;
    });

    ordersForShipping.forEach( order => {
        totalShippingCost += 5
    })

    return NextResponse.json({
        shipping_cost: totalShippingCost,
        taxes_amount: totalTaxAmount
    })
  } catch (error) {
    return NextResponse.json({
        error: error.message
    }, {
        status: 500
    })
  }
}
