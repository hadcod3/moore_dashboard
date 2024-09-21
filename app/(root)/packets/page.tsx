import PacketCategoryFilter from "@/components/shared/PacketCategoryFilter"
import PacketCollection from "@/components/shared/PacketCollection"
import Search from "@/components/shared/Search"
import { getAllPackets } from "@/lib/actions/packet.actions"
import { SearchParamProps } from "@/types"
 
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
            <section className="wrapper my-8 flex flex-col md:gap-5">
                <div>
                    <p className="text-xl font-playfair text-primary-300">collection of</p>
                    <p className="h2-bold text-secondary-300">Packet</p>
                    <h3 className="flex items-center gap-1 text-secondary-400">total :<p className="font-aleo">{packets?.data.length} items</p></h3>
                </div>
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <PacketCategoryFilter/>
                </div>
                <PacketCollection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="All_Packets"
                limit={15}
                page={page}
                totalPages={packets?.totalPages}
                />
            </section>
        </>
    )
}

export default Packets
