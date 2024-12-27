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
import { deleteUserById } from '@/lib/actions/user.actions'

type deleteProps = {
    id: string
}

export const DeleteUserConfirmation = ({ id } : deleteProps ) => {

    const handleDeleteItem = async (id: string) => {
        try {
            // Delete from clerk data
            await clerkClient.users.deleteUser(id)
            // Delete from database
            await deleteUserById(id)
            return NextResponse.json({ message: `User deleted ${id}` })
          } catch (error) {
            console.log(error)
            return NextResponse.json({ error: 'Error deleting user' })
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
                <p className='p-regular-12 text-gray-400'>This user will permanently delete</p>
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel className='button'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-danger'
                onClick={() => console.log(id,": id", id,": clerkId")} >
                    click me
            </AlertDialogAction>
            <AlertDialogAction 
                className='button-recolorable bg-red-600 hover:bg-red-700 text-white hover:text-white'
                onClick={() => handleDeleteItem(id)}
            >
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}