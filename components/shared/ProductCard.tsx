import { IProduct } from '@/lib/database/models/product.model'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'
import { DeleteConfirmation } from './DeleteConfirmation'
import Image from 'next/image'

type ProductProps = {
    item: IProduct,
}

const ProductCard = ({ item }: ProductProps) => {
    
    return (
        <div className="relative flex min-h-[270px] w-[180px] flex-col overflow-hidden rounded-[15px] bg-white border-b-4 border-primary-200">
            <Link 
                href={`/products/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-no-repeat bg-center text-grey-500 w-full max-h-[180px]"
            />

            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl  bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
              <DeleteConfirmation itemId={item._id} deleteType="Product"/>
            </div>

            <div className="flex max-h-[130px] flex-col gap-1 p-2 md:gap-1"> 
                <Link href={`/products/${item._id}`}>
                    <p className="p-medium-16 line-clamp-1 flex-1 text-secondary-300 capitalize">{item.title}</p>
                </Link>
                <span className="font-semibold text-base text-secondary-400 font-aleo">
                    Rp {parseInt(item.price).toLocaleString()}
                </span>
                <div className="flex-between w-full">
                <p className="p-medium-14 text-primary-200">
                    Stock: {item.stock}
                </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard