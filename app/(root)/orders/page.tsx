import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllOrders } from '@/lib/actions/order.actions'
import TableOrders from "@/components/shared/TableOrders"

const Orders = async () => {
    
    let orders = await getAllOrders()
 
    return (
        <>
            <div className="wrapper flex items-center">
                <h2 className="h2-bold font-playfair">Order</h2>
            </div>
            <section className="wrapper mt-8">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Orders ID</TableHead>
                            <TableHead>Ordered</TableHead>
                            <TableHead>Buyer</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Total Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableOrders
                        data={orders?.data}
                        emptyTitle="No Orders Found"
                        emptyStateSubtext="Check later"
                        />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

export default Orders
