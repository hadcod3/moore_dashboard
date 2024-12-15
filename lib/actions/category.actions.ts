"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import ItemCategory from "../database/models/itemCategory.model"

// Get All Category
export async function getAllCategories() {
  try {
    await connectToDatabase();

    const users = await ItemCategory.find({});

    if (!users) throw new Error('No category found');
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

export const getCategoryByTypeId = async ({ typeId }: { typeId: string }) => {
  try {
    await connectToDatabase();

    const categories = await ItemCategory.find({ typeFor: typeId });
    
    // If no categories are found, throw an error
    if (!categories || categories.length === 0) {
      console.log('No categories found for typeId:', typeId); // Log if no categories are found
      throw new Error('No categories found for the specified type');
    }

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}

export const createItemCategory = async ({ name, typeFor }: {name: string, typeFor: string}) => {
  try {
    await connectToDatabase();

    const newItemCategory = await ItemCategory.create({ name: name, typeFor: typeFor });

    return JSON.parse(JSON.stringify(newItemCategory));
  } catch (error) {
    handleError(error)
  }
} 

// Function to fetch category by name
export async function getCategoryByName(name: string) {
  try {
      await connectToDatabase();
      const category = await ItemCategory.findOne({ name });
      if (!category) throw new Error('Category not found');
      return JSON.parse(JSON.stringify(category));
  } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
  }
}

// Function to fetch category by id
export async function getCategoryById(_id: string) {
  try {
      await connectToDatabase();
      
      // Search for the category by its name
      const category = await ItemCategory.findOne({ _id });

      if (!category) throw new Error('Category not found');
      return JSON.parse(JSON.stringify(category));
  } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
  }
}


// Function to delete category by id
export async function deleteCategoryById(_id: string) {
  try {
      await connectToDatabase();
      const deleteCategory = await ItemCategory.findOneAndDelete({ _id });
  } catch (error) {
      console.error('Error fetching category:', error);
  }
}

