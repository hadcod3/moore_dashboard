import ProductCategoryFilter from "@/components/shared/ProductCategoryFilter"
import ProductCollection from "@/components/shared/ProductCollection"
import Search from "@/components/shared/Search"
import { getAllProducts } from "@/lib/actions/product.actions"
import { SearchParamProps } from "@/types"
 
const Products = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const products = await getAllProducts({
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
                    <p className="h2-bold text-secondary-300">Product</p>
                    <h3 className="flex items-center gap-1 text-secondary-400">total :<p className="font-aleo">{products?.data.length} items</p></h3>
                </div>
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <ProductCategoryFilter/>
                </div>
                <ProductCollection
                    data={products?.data}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Products"
                    limit={15}
                    page={page}
                    totalPages={products?.totalPages}
                />
            </section>
        </>
    )
}

export default Products
