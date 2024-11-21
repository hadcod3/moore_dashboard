'use server'

import { connectToDatabase } from '@/lib/database'
import Item from '../database/models/item.model';
import ItemCategory from '../database/models/itemCategory.model';
import ItemType from '../database/models/itemType.model';
import User from '../database/models/user.model';
import { GetItemsByTypeIdParams } from '@/types';
import { getCategoryById, getCategoryByName } from './category.actions';

const populateItem = (query: any) => {
  return query
  .populate({ path: 'type', model: ItemType, select: '_id name' })
  .populate({ path: 'category', model: ItemCategory, select: '_id name typeFor' })
  .populate({ path: 'organizer', model: User, select: '_id email username firstName lastName photo city' })
}

// GET ALL ITEMS
export async function getAllItems() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Query to get all items
    const items = await populateItem(Item.find());

    // If no items are found, log and throw an error
    if (!items || items.length === 0) {
      console.log('No items found');
      throw new Error('No items available');
    }

    // Return the items
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching all items:', error);
    if (error instanceof Error) {
      console.error(error.stack); // Log detailed error stack for further insights
    }
    throw new Error('Failed to fetch all items');
  }
}

// GET ALL ITEMS BY TYPE ID
export async function getItemsByTypeId({ typeId }: { typeId: string}) {
    try {
      // Connect to the database
      await connectToDatabase();

      const conditions = {
          $and: [
              { type: typeId },
              // { category: categoryId },
          ]
      };

      const itemsQuery = Item.find(conditions)
          .sort({ createdAt: 'desc' })
          
      const items = await populateItem(itemsQuery);
      
      // If no items are found, throw an error
      if (!items || items.length === 0) {
          console.log('No items found for typeId:', typeId);
          throw new Error('No items found for the specified type');
      }

      return JSON.parse(JSON.stringify(items));

    } catch (error) {
      console.error('Error fetching items by type:', error);
      if (error instanceof Error) {
        console.error(error.stack);
      }
      throw new Error('Failed to fetch items by type');
    }
}
