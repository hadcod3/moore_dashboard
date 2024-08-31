import { Button } from "@/components/ui/button";
import { getAllPackets } from "@/lib/actions/packet.actions";
import { SearchParamProps } from '@/types';
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAllGears } from "@/lib/actions/gear.actions";

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
            <section className="bg-primary-100 bg-dotted-pattern bg-contain py-5 md:py-10">
                
            </section>
        </>
    );
}
