'use client'
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
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { deleteUserById, getUserById } from '@/lib/actions/user.actions'

type deleteProps = {
    userId: string;
    clerkId: string;
}

export const DeleteUserConfirmation = ({ userId, clerkId } : deleteProps ) => {

    const handleDeleteItem = async (userId: string, clerkId: string) => {
        try {
            // Delete from clerk data
            await clerkClient.users.deleteUser(clerkId)
            // Delete from database
            await deleteUserById(userId)
            return NextResponse.json({ message: `User deleted ${userId} : userId | ${clerkId} : clerkId` })
          } catch (error) {
            console.log(error)
            return NextResponse.json({ error: 'Error deleting user' })
          }
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger className='button p-3'>
            <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
            <AlertDialogTitle className='text-secondary-300'>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription className="">
                <p className='p-regular-12 text-gray-400'>This user will permanently delete</p>
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel className='button'>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                className='button-recolorable bg-red-600 hover:bg-red-700 text-white hover:text-white'
                onClick={() => handleDeleteItem(userId, clerkId)}
            >
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
