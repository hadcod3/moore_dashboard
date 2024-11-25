'use client'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { IItem } from '@/lib/database/models/item.model'

type PacketProps = {
  item: IItem
}
 
const BigCard = async ({ item }: PacketProps) => {
    // const organizerProfile = await getUserById(item.organizer._id);

    return (
        <div className="group relative flex min-h-[350px] w-full max-w-[400px] flex-col overflow-hidden rounded-[15px] bg-white border border-gray-200 shadow-md">
            
            <div className='absolute top-2 left-2 '>
                <p className="p-semibold-14 px-4 py-1 text-white line-clamp-1 rounded-xl bg-black/30">
                    {item.category?.name}
                </p>
            </div>

            <Link 
                href={`/packets/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center rounded-t-[15px] text-grey-100 shadow-inner-bold"
            />

            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
                <DeleteConfirmation itemId={item._id} deleteType='Packet'/>
            </div>

            <div className="flex min-h-[150px] flex-col gap-2 p-3 border-r-[0.05px] border-l-[0.05px]">
                <Link href={`/packets/${item._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-secondary-400">{item.name}</p>
                </Link>
                <h1 className="p-bold-20 md:p-bold-24 text-secondary-400 font-aleo">Rp {item.price.toLocaleString('id-ID')}</h1>
            </div>
        </div>
    )
}

export default BigCard

