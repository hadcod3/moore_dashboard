import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { IUser } from '@/lib/database/models/user.model'
import TableUser from './TableUser'

type CollectionProps = {
    data: IUser[],
    emptyTitle: string,
    emptyStateSubtext: string,
}

const TableUsers = ({
    data,
    emptyTitle,
    emptyStateSubtext,
  }: CollectionProps) => {
    return (
        <>
            {data.length  > 0 ? (
                <>
                    {data.map((item) => {
                        return (
                            <TableUser key={item._id} data={item}/>
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

export default TableUsers
