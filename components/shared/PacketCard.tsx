import { IPacket } from '@/lib/database/models/packet.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { getUserById } from '@/lib/actions/user.actions'

type PacketProps = {
  item: IPacket
}
 
const PacketCard = async ({ item }: PacketProps) => {
    // const organizerProfile = await getUserById(item.organizer._id);

    return (
        <div className="group relative flex min-h-[350px] w-full max-w-[400px] flex-col rounded-[15px] bg-white shadow-md transition-all hover:shadow-lg border-b-4 border-primary-200">
            
            <div className='overflow-visible border-white bg-white border-b-[7px] border-r-[7px] absolute after:absolute after:top-0 after:right-[-20px] after:w-[14px] after:h-[14px] rounded-br-2xl after:bg-transparent after:z-10 after:rounded-tl-full after:shadow-white after:shadow-br-curve before:absolute before:bottom-[-20px] before:left-0 before:w-[14px] before:h-[14px] before:bg-transparent before:rounded-tl-full before:shadow-white before:shadow-br-curve before:z-10'>
                <p className="p-semibold-14 px-4 py-1 text-white line-clamp-1 rounded-[15px] bg-primary-300/80">
                    {item.category?.name}
                </p>
            </div>

            <Link 
                href={`/packets/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center rounded-t-[15px] text-grey-100"
            />

            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
                <Link href={`/packets/${item._id}/update`}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </Link>
                <DeleteConfirmation itemId={item._id} deleteType='Packet'/>
            </div>

            <div className="flex min-h-[150px] flex-col gap-2 p-3">
                <div className="flex gap-2">
                    {/* <span className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1  text-primary-300">
                        {organizerProfile.username}
                    </span> */}
                    {/* <p className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1 text-primary-300 line-clamp-1 absolute">
                        {item.category?.name}
                    </p> */}
                </div>
                <Link href={`/packets/${item._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-secondary-400">{item.title}</p>
                </Link>
                <p className="p-bold-20 md:p-bold-24 text-secondary-400 font-aleo">Rp {parseInt(item.price).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default PacketCard

// return (
//     <div className="group relative flex min-h-[350px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
//         <Link 
//             href={`/packets/${item._id}`}
//             style={{backgroundImage: `url(${item.imageUrl})`}}
//             className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
//         />

//         {/* IS PACKET ORGANIZER */}
//         {isOrganizer && organized === true && (
//             <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
//                 <Link href={`/packets/${item._id}/update`}>
//                     <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
//                 </Link>
//                 <DeleteConfirmation itemId={item._id} deleteType="Packet"/>
//             </div>
//         )}

//         {organized === false && (
//             <LikeButton/>
//         ) }

//         <div className="flex min-h-[150px] flex-col gap-2 p-3">
//             <div className="flex gap-2">
//                 <span className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1  text-primary-300">
//                     {organizerProfile.username}
//                 </span>
//                 <p className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1 text-primary-300 line-clamp-1">
//                     {item.category?.name}
//                 </p>
//             </div>
//             <Link href={`/packets/${item._id}`}>
//                 <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-secondary-400">{item.title}</p>
//             </Link>
//             <p className="p-bold-20 md:p-bold-24 text-secondary-400 font-aleo">Rp {parseInt(item.price).toLocaleString()}</p>
//         </div>
//     </div>
// )

