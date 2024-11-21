import { connectToDatabase } from "../database";
import ItemType from "../database/models/itemType.model";
import { handleError } from "../utils";

// Get All Category
export async function getAllTypes() {
    try {
      await connectToDatabase();
  
      const users = await ItemType.find({});
  
      if (!users) throw new Error('No category found');
      return JSON.parse(JSON.stringify(users));
    } catch (error) {
      handleError(error);
    }
  }