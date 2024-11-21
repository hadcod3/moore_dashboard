

import { SearchParamProps } from '@/types';
import Collection from "@/components/shared/Collection";
import { getAllItems, getItemsByTypeId } from "@/lib/actions/item.actions";
import { getAllCategories, getCategoryByTypeId } from "@/lib/actions/category.actions";
import DashboardCard from '@/components/shared/DashboardCard';
import { getAllClient, getAllUsers, getAllVendors } from '@/lib/actions/user.actions';
import { getAllTypes } from '@/lib/actions/type.action';
import CurrentDateTime from '@/components/shared/CurrentDateTime';

export default async function Home({ searchParams }: SearchParamProps) {

    const packetTypeId = "6717aa0a78fed7ee045a8402" // ID of packet type
    const productTypeId = "6717aa0a78fed7ee045a8403" // ID of product type
    const gearTypeId = "6717aa0a78fed7ee045a8401" // ID of gear type

    const users = await getAllUsers();
    const clients = await getAllClient();
    const vendors = await getAllVendors();
    const allItems = await getAllItems()
    const allCategories = await getAllCategories()
    const allTypes = await getAllTypes()
    const packets = await getItemsByTypeId({
        typeId: packetTypeId,
    })
    const products = await getItemsByTypeId({
        typeId: productTypeId,
    })
    const gears = await getItemsByTypeId({
        typeId: gearTypeId,
    })
    const packetCategories = await getCategoryByTypeId({
        typeId: packetTypeId,
    })
    const productCategories = await getCategoryByTypeId({
        typeId: productTypeId,
    })
    const gearCategories = await getCategoryByTypeId({
        typeId: gearTypeId,
    })

    // console.log("Packet Cateories : " , packetCategories)

    return (
        <>
            <section className="flex flex-col gap-4 bg-contain py-4 md:py-6 px-5">
                <div className='flex w-full justify-between items-center'>
                    <h2 className="h2-bold text-secondary-300 leading-none">Dashboard</h2>
                    <div className='w-64 flex items-center justify-center py-2 px-5 rounded-xl border border-grey-200'><CurrentDateTime/></div>
                </div>
                <div className='grid gap-2 grid-rows-1 grid-cols-6'>
                    <DashboardCard 
                        title="Users" 
                        value={users.length}
                        unit="users"
                    />
                    <DashboardCard 
                        title="Clients" 
                        value={clients.length}
                        unit="users"
                    />
                    <DashboardCard 
                        title="Vendors" 
                        value={vendors.length}
                        unit="users"
                    />
                    <DashboardCard 
                        title="Products" 
                        value={allItems.length}
                        unit="pcs"
                    />
                    <DashboardCard 
                        title="Categories" 
                        value={allCategories.length}
                        unit="type"
                    />
                    <DashboardCard 
                        title="Types" 
                        value={allTypes.length}
                        unit="type"
                    />
                </div>
                <Collection 
                    data={packetCategories}
                    emptyTitle="No Categories of Packets Found"
                    emptyStateSubtext="Check later"
                    collectionType="Packet"
                    isCategory={true}
                />
                <Collection
                    data={packets}
                    emptyTitle="No Packets Found"
                    emptyStateSubtext="Check later"
                    collectionType="Packet"
                    collectionModel="Sample"
                    isCategory={false}
                />
                <Collection 
                    data={productCategories}
                    emptyTitle="No Categories of Products Found"
                    emptyStateSubtext="Check later"
                    collectionType="Product"
                    isCategory={true}
                />
                <Collection
                    data={products}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="Product"
                    collectionModel="Sample"
                    isCategory={false}
                />
                <Collection 
                    data={gearCategories}
                    emptyTitle="No Categories of Gears Found"
                    emptyStateSubtext="Check later"
                    collectionType="Gear"
                    isCategory={true}
                />
                <Collection
                    data={gears}
                    emptyTitle="No Gear Found"
                    emptyStateSubtext="Check later"
                    collectionType="Gear"
                    collectionModel="Sample"
                    isCategory={false}
                />
            </section>
        </>
    );
}
