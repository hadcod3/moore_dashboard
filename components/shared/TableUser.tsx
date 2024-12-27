import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { IUser } from '@/lib/database/models/user.model'
import { DeleteUserConfirmation } from './DeleteUserConfirmation'

type OrderProps = {
    data: IUser
}
const TableUser = async ({ data } : OrderProps) => {

    return (
            <TableRow
                className="p-regular-14 lg:p-regular-16 border-b "
                style={{ boxSizing: 'border-box' }}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.city}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>
                    {data.isVendor === true ? (
                        "Yes"
                    ):(
                        "No"
                    )}
                </TableCell>
                <TableCell>
                    <DeleteUserConfirmation userId={data._id} clerkId={data.clerkId}/>
                </TableCell>
            </TableRow>
    )
}

export default TableUser
