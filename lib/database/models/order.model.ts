import { Schema, model, models } from 'mongoose'
   
export interface IOrder extends Document { 
    _id: string;
    stripeId: string;
    buyer: string;
    itemsOrder: Array<{_id: string}>;
    totalAmount: number;
    shippingAddress: string;
    createdAt: Date;
}

const OrderSchema = new Schema({
    stripeId: { type: String, unique: true, sparse: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    itemsOrder: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Item' },
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})
   
const Order = models.Order || model('Order', OrderSchema)
  
export default Order
  