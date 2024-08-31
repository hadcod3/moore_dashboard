"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetAllOrdersParams, GetOrdersByPacketParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Packet from '../database/models/packet.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price)

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'idr',
            unit_amount: price,
            product_data: {
              name: order.item.name
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        packetId: order.item._id,
        buyerId: order.buyer._id,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      ...order,
      packet: order.item._id,
      buyer: order.buyer._id,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY PACKET
export async function getOrdersByPacket({ searchString, itemId }: GetOrdersByPacketParams) {
  try {
    await connectToDatabase()

    if (!itemId) throw new Error('Packet ID is required')
    const packetObjectId = new ObjectId(itemId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'packets',
          localField: 'packet',
          foreignField: '_id',
          as: 'packet',
        },
      },
      {
        $unwind: '$packet',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          packetTitle: '$packet.title',
          packetId: '$packet._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ packetId: packetObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
    try {
        await connectToDatabase()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { buyer: userId }

        const orders = await Order.distinct('packet._id')
        .find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
        .populate({
            path: 'packets',
            model: Packet,
            populate: {
            path: 'organizer',
            model: User,
            select: '_id firstName lastName',
            },
        })

        const ordersCount = await Order.distinct('packet._id').countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
        } catch (error) {
        handleError(error)
    }
}

// GET ALL ORDERS
export async function getAllOrders({ query, limit = 20, page } : GetAllOrdersParams) {
    try {
        await connectToDatabase()
    
        // const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        // const conditions = {
        //     $and: [titleCondition],
        // }
        const conditions = query ? { title: { $regex: query, $options: 'i' } } : {};
    
        const skipAmount = (Number(page) - 1) * limit
        // const orders = Order.find(conditions)
        //     .sort({ createdAt: 'desc' })
        //     .skip(skipAmount)
        //     .limit(limit)
        // const ordersCount = await Order.countDocuments(conditions)
        const orders = await Order.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);
        const ordersCount = await Order.countDocuments(conditions);
    
        return {
            data: JSON.parse(JSON.stringify(orders)),
            totalPages: Math.ceil(ordersCount / limit),
        }
    } catch (error) {
        handleError(error)
    }
}
