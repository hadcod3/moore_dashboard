import { IPacket } from '@/lib/database/models/packet.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
  event: IPacket
}
 
const PacketCard = ({ event }: CardProps) => {

    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link 
            href={`/packets/${event._id}`}
            style={{backgroundImage: `url(${event.imageUrl})`}}
            className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />

        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link href={`/packets/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
            <DeleteConfirmation itemId={event._id} deleteType='Packets'/>
        </div>

        <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"> 
            <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-primary-200 px-4 py-1 text-primary-500">
                    Rp{parseInt(event.price).toLocaleString()}
                </span>
                <p className="p-semibold-14 w-min rounded-full bg-primary-100 px-4 py-1 text-primary-400 line-clamp-1">
                    {event.category?.name}
                </p>
            </div>
            <Link href={`/packets/${event._id}`}>
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-primary-500">{event.title}</p>
            </Link>
            <p className="line-clamp-4 text-primary-500">
                {event.description}
            </p>
        </div>
        </div>
    )
}

export default PacketCard