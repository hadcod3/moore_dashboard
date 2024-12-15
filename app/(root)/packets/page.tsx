
import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import Search from "@/components/shared/Search"
import { getCategoryById, getCategoryByName } from "@/lib/actions/category.actions"
import { getItemsByTypeId } from "@/lib/actions/item.actions"
import { SearchParamProps } from "@/types"
 
const Packets = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const packetTypeId = "6717aa0a78fed7ee045a8402" // ID of packet type

    const packets = await getItemsByTypeId({
        typeId: packetTypeId,
        query: searchText,
        category,
        page,
        limit: 9
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-5">
                <div>
                    <p className="text-xl font-playfair text-primary-300">collection of</p>
                    <p className="h2-bold text-secondary-300">Packet</p>
                    <h3 className="flex items-center gap-1 text-secondary-400">total :<p className="font-aleo">{packets.data.length} items</p></h3>
                </div>
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <CategoryFilter typeId={packetTypeId}/>
                </div>
                <Collection
                    data={packets.data}
                    emptyTitle="No Packets Found"
                    emptyStateSubtext="Check later"
                    collectionType="Packet"
                    collectionModel="Full_Content"
                    isCategory={false}
                    limit={9}
                    page={page}
                    totalPages={packets?.totalPages}
                />
            </section>
        </>
    )
}

export default Packets
