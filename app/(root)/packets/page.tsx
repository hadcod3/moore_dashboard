import PacketCategoryFilter from "@/components/shared/PacketCategoryFilter"
import PacketCollection from "@/components/shared/PacketCollection"
import Search from "@/components/shared/Search"
import { Button } from "@/components/ui/button"
import { getAllPackets } from "@/lib/actions/packet.actions"
import { SearchParamProps } from "@/types"
import Link from "next/link"
 
const Packets = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const packets = await getAllPackets({
        query: searchText,
        category,
        page,
        limit: 15 
    })

    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="flex wrapper justify-between flex-row">
                    <h2 className="h2-bold text-primary-500">Packets</h2>
                    <Link href="packets/create" >
                        <Button className="rounded-full bg-primary-500 text-primary-100">
                            + Create
                        </Button>
                    </Link>
                </div>
                <div className="flex wrapper flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search Packets"/>
                    <PacketCategoryFilter/>
                </div>
            </section>

            <div className="wrapper my-8">
                <PacketCollection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="All_Packets"
                limit={15}
                page={page}
                totalPages={packets?.totalPages}
                />
            </div>
        </>
    )
}

export default Packets
