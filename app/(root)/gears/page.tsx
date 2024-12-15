import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import Search from "@/components/shared/Search"
import { getItemsByTypeId } from "@/lib/actions/item.actions"
import { SearchParamProps } from "@/types"
 
const Gears = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const gearTypeId = "6717aa0a78fed7ee045a8401"

    const gears = await getItemsByTypeId({
        typeId: gearTypeId,
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
                    <p className="h2-bold text-secondary-300">Gear</p>
                    <h3 className="flex items-center gap-1 text-secondary-400">total :<p className="font-aleo">{gears.data.length} items</p></h3>
                </div>
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <CategoryFilter typeId={gearTypeId}/>
                </div>
                <Collection
                    data={gears?.data}
                    emptyTitle="No Gears Found"
                    emptyStateSubtext="Check later"
                    collectionType="Gear"
                    collectionModel="Full_Content"
                    isCategory={false}
                    limit={15}
                    page={page}
                    totalPages={gears?.totalPages}
                />
            </section>
            </>
    )
}

export default Gears
