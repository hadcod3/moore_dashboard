import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Search  from '@/components/shared/Search'
import { getAllOrders } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
import TableOrders from "@/components/shared/TableOrders"

const Orders = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    
    const orders = await getAllOrders({
        query: searchText,
        page,
        limit: 15 
    })

    return (
        <>
            <section className="wrapper mt-8">
                <Search placeholder="Search buyer name..." />
            </section>

            <section className="wrapper mt-8">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Orders ID</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Buyer</TableHead>
                            <TableHead>Types</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Total Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableOrders
                        data={orders?.data}
                        emptyTitle="No Orders Found"
                        emptyStateSubtext="Check later"
                        limit={20}
                        page={page}
                        totalPages={orders?.totalPages}
                        />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

export default Orders
