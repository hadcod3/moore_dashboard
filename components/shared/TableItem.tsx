import React from 'react'
import { IOrder } from '@/lib/database/models/order.model'
import { TableCell, TableRow } from '../ui/table'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'

type OrderProps = {
    order: IOrder
}
const TableItem = async ({ order } : OrderProps) => {

    const buyerData = await getUserById(order.buyer)

    return (
            <TableRow
                className="p-regular-14 lg:p-regular-16 border-b "
                style={{ boxSizing: 'border-box' }}>
                <TableCell className="text-primary-500">{order._id}</TableCell>
                <TableCell>
                    {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{buyerData.firstName} {buyerData.lastName}</TableCell>
                <TableCell>{buyerData.city}</TableCell>
                <TableCell>
                    {formatPrice(order.totalAmount)}
                </TableCell>
            </TableRow>
    )
}

export default TableItem
