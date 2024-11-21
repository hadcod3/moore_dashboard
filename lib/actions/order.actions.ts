"use server"

import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';

 
// GET ALL ORDERS
export async function getAllOrders() {
    try {
        await connectToDatabase()
        const orders = await Order.find().lean()
    
        return {
            data: JSON.parse(JSON.stringify(orders))
        }
    } catch (error) {
        handleError(error)
    }
}
