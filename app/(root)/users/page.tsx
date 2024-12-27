import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllUsers } from "@/lib/actions/user.actions"
import TableUsers from "@/components/shared/TableUsers"

const Users = async () => {
    let users = await getAllUsers()
 
    return (
        <>
            <div className="wrapper flex items-center">
                <h2 className="h2-bold font-playfair">Users</h2>
            </div>
            <section className="wrapper mt-8">
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>isVendor</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableUsers
                        data={users}
                        emptyTitle="No Users Found"
                        emptyStateSubtext="Check later"
                        />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

export default Users
