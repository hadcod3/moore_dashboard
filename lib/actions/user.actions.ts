'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'

// Get All Users
export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({});

    if (!users) throw new Error('No users found');
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// Get All Clients
export async function getAllClient() {
  try {
    await connectToDatabase();

    const users = await User.find({isVendor : false});

    if (!users) throw new Error('No users found');
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// Get All Vendors
export async function getAllVendors() {
  try {
    await connectToDatabase();

    const users = await User.find({isVendor : true});

    if (!users) throw new Error('No users found');
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// Get user by id
export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}
