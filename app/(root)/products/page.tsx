import ProductCategoryFilter from "@/components/shared/ProductCategoryFilter"
import ProductCollection from "@/components/shared/ProductCollection"
import Search from "@/components/shared/Search"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/lib/actions/product.actions"
import { SearchParamProps } from "@/types"
import Link from "next/link"
 
const Products = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const product = await getAllProducts({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="flex wrapper justify-between flex-row">
                    <h2 className="h2-bold text-primary-500">Products</h2>
                    <Link href="products/create" >
                        <Button className="rounded-full bg-primary-500 text-primary-100">
                            + Create
                        </Button>
                    </Link>
                </div>
                <div className="flex wrapper flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search Products"/>
                    <ProductCategoryFilter/>
                </div>
            </section>
            <div className="wrapper my-8">
                <ProductCollection
                    data={product?.data}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Products"
                    limit={15}
                    page={page}
                    totalPages={product?.totalPages}
                />
            </div>
        </>
    )
}

export default Products
