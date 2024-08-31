import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
    createdAt: Date
    stripeId: string
    totalAmount: string
    itemId: string
    itemTitle: string
    buyerId: string
    amount: string
}
 
export type IOrderItem = {  
    _id: string
    totalPrice: string
    createdAt: Date
    item: string
    // itemTitle: string
    buyer: string
    totalAmount: string
}

const OrderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    totalAmount: {
        type: String, 
    },
    item:{
        type: Schema.Types.ObjectId,
        ref: 'Packet',
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order
