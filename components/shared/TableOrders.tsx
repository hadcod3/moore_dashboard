import { IOrder } from '@/lib/database/models/order.model'
import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import TableItem from './TableItem'

type CollectionProps = {
    data: IOrder[],
    emptyTitle: string,
    emptyStateSubtext: string,
}

const TableOrders = ({
    data,
    emptyTitle,
    emptyStateSubtext,
  }: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <>
                    {data.map((item) => {
                        return (
                            <TableItem key={item._id} order={item}/>
                        )
                    })}
                </>
            ) : (
            <TableRow>
                <TableCell>
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </TableCell>
            </TableRow>
            )} 
        </>
    )
  }

export default TableOrders
