import { IOrderItem } from '@/lib/database/models/order.model'
import React from 'react'
import Pagination from './Pagination'
import { TableCell, TableRow } from '../ui/table'
import TableItem from './TableItem'

type CollectionProps = {
    data: IOrderItem[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
}

const TableOrders = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    urlParamName,
  }: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <>
                    {data.map((item) => {
                        return (
                            <TableItem order={item}/>
                        )
                    })}
        
                    {totalPages > 1 && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}
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
