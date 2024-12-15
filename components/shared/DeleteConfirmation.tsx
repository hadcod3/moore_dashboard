'use client'

import { useState, useTransition } from 'react'
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
import { deleteItemById } from '@/lib/actions/item.actions'
import { createNotification } from '@/lib/actions/notification.actions'
import { deleteItemFormSchema } from '@/lib/validator'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

type deleteProps = {
    itemId: string
    vendorId: string
}

export const DeleteConfirmation = ({ itemId, vendorId } : deleteProps ) => {
    let [isPending, startTransition] = useTransition()
    const [deleteReason, setDeleteReason] = useState('')

    const handleDeleteItem = async (itemId: string, vendorId: string) => {
        try {
            // deleteItemFormSchema.parse({ desc: deleteReason }) 
            await createNotification({
                to: vendorId,
                from: '6759c1c4e87d6ca7d0b61f81', // Admin ID
                message: `Sorry, your item was deleted by the system. Reason: ${deleteReason || 'No reason provided.'}`,
            });
            await deleteItemById(itemId)
            toast.success('Delete successfully!', {
                position: "bottom-right",
            });
            setDeleteReason('')
        } catch (error) {
            console.error('Error Deleting item:', error); 
        }
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger>
            <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
            <AlertDialogTitle className='text-secondary-300'>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription className="">
                <p className='p-regular-12 text-gray-400'>This item will permanently delete</p>
                <Input
                    id='deleteReason'
                    placeholder="the reason why this content was removed?"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    className='py-2 textarea'
                />
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel className='button'>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                disabled={!deleteReason}
                className='button-recolorable bg-red-600 hover:bg-red-700 text-white hover:text-white'
                onClick={() => handleDeleteItem(itemId, vendorId)}
            >
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
