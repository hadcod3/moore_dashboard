"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { 
    CreatePacketCategoryParams, 
    CreateProductCategoryParams, 
    CreateGearCategoryParams, 
    CreateVendorCategoryParams 
} from "@/types"
import { 
    PacketCategory, 
    ProductCategory, 
    GearCategory, 
    VendorCategory 
} from "../database/models/category.model"
import ItemCategory from "../database/models/itemCategory.model"

export const createPacketCategory = async ({ packetCategoryName }: CreatePacketCategoryParams) => {
  try {
    await connectToDatabase();

    const newPacketCategory = await PacketCategory.create({ name: packetCategoryName });

    return JSON.parse(JSON.stringify(newPacketCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllPacketCategories = async () => {
  try {
    await connectToDatabase();

    const packetCategories = await PacketCategory.find();

    return JSON.parse(JSON.stringify(packetCategories));
  } catch (error) {
    handleError(error)
  }
}

export const createProductCategory = async ({ productCategoryName }: CreateProductCategoryParams) => {
  try {
    await connectToDatabase();

    const newProductCategory = await ProductCategory.create({ name: productCategoryName });

    return JSON.parse(JSON.stringify(newProductCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllProductCategories = async () => {
  try {
    await connectToDatabase();

    const productCategories = await ProductCategory.find();

    return JSON.parse(JSON.stringify(productCategories));
  } catch (error) {
    handleError(error)
  }
}

export const createGearCategory = async ({ gearCategoryName }: CreateGearCategoryParams) => {
  try {
    await connectToDatabase();

    const newGearCategory = await GearCategory.create({ name: gearCategoryName });

    return JSON.parse(JSON.stringify(newGearCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllGearCategories = async () => {
  try {
    await connectToDatabase();

    const gearCategories = await GearCategory.find();

    return JSON.parse(JSON.stringify(gearCategories));
  } catch (error) {
    handleError(error)
  }
}

export const createVendorCategory = async ({ vendorCategoryName }: CreateVendorCategoryParams) => {
  try {
    await connectToDatabase();

    const newVendorCategory = await VendorCategory.create({ name: vendorCategoryName });

    return JSON.parse(JSON.stringify(newVendorCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllVendorCategories = async () => {
  try {
    await connectToDatabase();

    const vendorCategories = await VendorCategory.find();

    return JSON.parse(JSON.stringify(vendorCategories));
  } catch (error) {
    handleError(error)
  }
}

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

