import React from 'react'
import { IOrder } from '@/lib/database/models/order.model'
import { TableCell, TableRow } from '../ui/table'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'

type OrderProps = {
    data: IOrder
}
const TableItem = async ({ data } : OrderProps) => {
    const buyerData = await getUserById(data.buyer)

    return (
            <TableRow
                className="p-regular-14 lg:p-regular-16 border-b "
                style={{ boxSizing: 'border-box' }}>
                <TableCell>{data._id}</TableCell>
                <TableCell>
                    {formatDateTime(data.createdAt).dateTime}
                </TableCell>
                <TableCell>{buyerData.firstName} {buyerData.lastName}</TableCell>
                <TableCell>{buyerData.city}</TableCell>
                <TableCell>
                    {formatPrice(data.totalAmount)}
                </TableCell>
            </TableRow>
    )
}

export default TableItem
