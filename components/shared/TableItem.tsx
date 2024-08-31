import React from 'react'
import { IOrderItem } from '@/lib/database/models/order.model'
import { TableCell, TableRow } from '../ui/table'
import { formatDateTime, formatPrice } from '@/lib/utils'

type OrderProps = {
    order: IOrderItem
}
function TableItem({ order } : OrderProps) {
    return (
            <TableRow
                className="p-regular-14 lg:p-regular-16 border-b "
                style={{ boxSizing: 'border-box' }}>
                <TableCell className="text-primary-500">{order._id}</TableCell>
                <TableCell>
                    {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{order.buyer}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>
                    {formatPrice(order.totalAmount)}
                </TableCell>
            </TableRow>
    )
}

export default TableItem
