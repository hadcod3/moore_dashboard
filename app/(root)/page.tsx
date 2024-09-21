import { Button } from "@/components/ui/button";
import { getAllPackets } from "@/lib/actions/packet.actions";
import { SearchParamProps } from '@/types';
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAllGears } from "@/lib/actions/gear.actions";
import PacketCategoryFilter from "@/components/shared/PacketCategoryFilter";
import CategoryCollection from "@/components/shared/CategoryCollection";
import PacketCollection from "@/components/shared/PacketCollection";
import ProductCollection from "@/components/shared/ProductCollection";
import GearCollection from "@/components/shared/GearCollection";

export default async function Home({ searchParams }: SearchParamProps) {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';

    const packets = await getAllPackets({
        query: searchText,
        category,
        page,
        limit: 3
    })
    const products = await getAllProducts({
        query: searchText,
        category,
        page,
        limit: 5
    })
    const gears = await getAllGears({
        query: searchText,
        category,
        page,
        limit: 5
    })

    return (
        <>
            <section className="flex flex-col gap-4 bg-contain py-4 md:py-6 px-5">
                <h2 className="h2-bold text-secondary-300 mb-7">Dashboard</h2>
                <CategoryCollection collectionTypes="Packet_Categories"/>
                <PacketCollection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="Sample_Packets"
                limit={15}
                page={page}
                totalPages={packets?.totalPages}
                />
                <CategoryCollection collectionTypes="Product_Categories"/>
                <ProductCollection
                    data={products?.data}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="Sample_Products"
                    limit={30}
                    page={page}
                    totalPages={products?.totalPages}
                />
                <CategoryCollection collectionTypes="Gear_Categories"/>
                <GearCollection
                    data={gears?.data}
                    emptyTitle="No Gear Found"
                    emptyStateSubtext="Check later"
                    collectionType="Sample_Gears"
                    limit={30}
                    page={page}
                    totalPages={gears?.totalPages}
                />
                <CategoryCollection collectionTypes="Vendor_Categories"/>
            </section>
        </>
    );
}
