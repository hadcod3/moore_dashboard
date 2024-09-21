import React from 'react'
import Pagination from './Pagination'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IGear } from '@/lib/database/models/gear.model'
import GearCard from './GearCard'

type GearCollectionProps = {
  data: IGear[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Gears_Organized' | 'All_Gears' | 'Sample_Gears'
}

const GearCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: GearCollectionProps) => {
    
  return (
    <>
      {collectionType === "Sample_Gears" ? (
        <div className='p-4 border-[0.1px] border-grey-200 rounded-xl'>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-grey-200">
              <div className="flex-col gap-2">
                  <h4 className="text-lg font-playfair text-secondary-300">collection of</h4>
                  <h1 className="text-3xl text-secondary-400 font-bold">
                  Gears
                  </h1>
                  <h3 className="flex items-center gap-1">total :<p className="font-aleo">{data.length} items</p></h3>
              </div>
              <Button size="lg" asChild className="button-ic w-full sm:w-fit hover:bg-primary-200 transition-colors duration-200 ease-in-out">
                  <Link href="/products">See More Gears</Link>
              </Button>
          </div>
          {data.length > 0 ? (
            <div className="flex flex-col items-center gap-5">
              <ul className="grid w-full gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-10">
                {data.map((item) => {

                  return (
                    <li key={item._id} className="flex w-full justify-center">
                        <GearCard item={item}/>
                    </li>
                  )
                })}
              </ul>

              {totalPages > 1 && (
                    <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
              )}
            </div>
          ) : (
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">

              <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
              <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>

            </div>
          )} 
        </div>
      ):(
        <div>
          {data.length > 0 ? (
            <div className="flex flex-col items-center gap-5">
              <ul className="grid w-full gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-10">
                {data.map((item) => {

                  return (
                    <li key={item._id} className="flex w-full justify-center">
                        <GearCard item={item}/>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">

              <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
              <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>

            </div>
          )} 
        </div>
      )}
    </>
  )
}

export default GearCollection