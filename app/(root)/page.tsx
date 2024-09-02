import { Button } from "@/components/ui/button";
import { getAllPackets } from "@/lib/actions/packet.actions";
import { SearchParamProps } from '@/types';
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAllGears } from "@/lib/actions/gear.actions";
import PacketCategoryFilter from "@/components/shared/PacketCategoryFilter";
import CategoryCollection from "@/components/shared/CategoryCollection";
import { Suspense } from "react";
import Spinner from "@/components/shared/Spinner";

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
                <CategoryCollection collectionTypes="Product_Categories"/>
                <CategoryCollection collectionTypes="Gear_Categories"/>
                <CategoryCollection collectionTypes="Vendor_Categories"/>
            </section>
        </>
    );
}
