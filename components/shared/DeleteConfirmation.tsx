'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'

type deleteProps = {
    itemId: string
    deleteType: "Packet" | "Product" | "Gear"
}

export const DeleteConfirmation = ({ itemId, deleteType } : deleteProps ) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <AlertDialog>
        <AlertDialogTrigger>
            <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
            <AlertDialogTitle className='text-secondary-300'>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription className="">
                <Input
                    id='deleteReason'
                    placeholder="the reason why this content was removed?"
                    className='py-2 textarea'
                />
                <p className='p-regular-12 text-primary-300'>This will permanently delete this event</p>
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-danger text-white'
                // onClick={() =>
                // startTransition(async () => {
                //     {deleteType === "Packet" ? (
                //         await deletePacket({ packetId : itemId, path: pathname })
                //     ) : deleteType === "Product" ? (
                //         await deleteProduct({ productId : itemId, path: pathname })
                //     ) : (
                //         await deleteGear({ gearId : itemId, path: pathname })
                //     )}
                // })
                // }
                >
                {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
