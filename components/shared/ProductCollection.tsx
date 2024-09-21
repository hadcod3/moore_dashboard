import React from 'react'
import Pagination from './Pagination'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IProduct } from '@/lib/database/models/product.model'
import ProductCard from './ProductCard'

type ProductCollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Products_Organized' | 'All_Products' | 'Sample_Products'
}

const ProductCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: ProductCollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-5">
          <ul className="grid w-full gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-10">
            {data.map((item) => {

              return (
                <li key={item._id} className="flex w-full justify-center">
                    <ProductCard item={item}/>
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && collectionType !== 'Sample_Products' && (
                <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}

          { collectionType === 'Sample_Products' && (
                <Button size="lg" asChild className="button-ic w-full sm:w-fit hover:bg-primary-200 transition-colors duration-200 ease-in-out">
                    <Link href="/products">See More Product</Link>
                </Button>
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">

          <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
          <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>

        </div>
      )} 
    </>
  )
}

export default ProductCollection