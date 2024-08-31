import GearCategoryFilter from "@/components/shared/GearCategoryFilter"
import GearCollection from "@/components/shared/GearCollection"
import Search from "@/components/shared/Search"
import { Button } from "@/components/ui/button"
import { getAllGears } from "@/lib/actions/gear.actions"
import { SearchParamProps } from "@/types"
import Link from "next/link"
 
const Gears = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const gears = await getAllGears({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="flex wrapper justify-between flex-row">
                    <h2 className="h2-bold text-primary-500">Gears</h2>
                    <Link href="gears/create" >
                        <Button className="rounded-full bg-primary-500 text-primary-100">
                            + Create
                        </Button>
                    </Link>
                </div>
                <div className="flex wrapper flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search Gears"/>
                    <GearCategoryFilter/>
                </div>
            </section>
            <div className="wrapper my-8">
                <GearCollection
                    data={gears?.data}
                    emptyTitle="No Gears Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Products"
                    limit={15}
                    page={page}
                    totalPages={gears?.totalPages}
                />
            </div>
            </>
    )
}

export default Gears
