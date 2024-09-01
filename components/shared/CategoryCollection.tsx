'use client'
import { startTransition, useEffect, useState } from "react"
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
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { 
  IPacketCategory, 
  IProductCategory, 
  IGearCategory, 
  IVendorCategory
} from "@/lib/database/models/category.model"
import { 
  createGearCategory, 
  createPacketCategory, 
  createProductCategory, 
  createVendorCategory, 
  getAllGearCategories, 
  getAllPacketCategories, 
  getAllProductCategories, 
  getAllVendorCategories 
} from "@/lib/actions/category.actions"
 
type CategoryCollectionProps = {
    // value?: string
    // onChangeHandler?: () => void
    collectionTypes?: 'Packet_Categories' | 'Product_Categories' | 'Gear_Categories' | 'Vendor_Categories'
}

const CategoryCollection = ({ collectionTypes }: CategoryCollectionProps) => {
    const [categories, setCategories] = useState<(IPacketCategory | IProductCategory | IGearCategory | IVendorCategory)[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = async () => {
        try {
          let category: IPacketCategory | IProductCategory | IGearCategory | IVendorCategory;
          switch (collectionTypes) {
            case 'Packet_Categories':
              category = await createPacketCategory({ packetCategoryName: newCategory.trim() });
              break;
            case 'Product_Categories':
              category = await createProductCategory({ productCategoryName: newCategory.trim() });
              break;
            case 'Gear_Categories':
              category = await createGearCategory({ gearCategoryName: newCategory.trim() });
              break;
            case 'Vendor_Categories':
              category = await createVendorCategory({ vendorCategoryName: newCategory.trim() });
              break;
            default:
              throw new Error('Invalid collection type');
          }
          setCategories(prevState => [...prevState, category]);
        } catch (error) {
          console.error('Error adding category:', error);
        }
    };
    
    useEffect(() => {
        if (collectionTypes) {
          const fetchCategories = async () => {
            try {
              let categoryList;
              switch (collectionTypes) {
                case 'Packet_Categories':
                  categoryList = await getAllPacketCategories();
                  break;
                case 'Product_Categories':
                  categoryList = await getAllProductCategories();
                  break;
                case 'Gear_Categories':
                  categoryList = await getAllGearCategories();
                  break;
                case 'Vendor_Categories':
                  categoryList = await getAllVendorCategories();
                  break;
                default:
                  throw new Error('Invalid collection type');
              }
              setCategories(categoryList);
            } catch (error) {
              console.error('Error fetching categories:', error);
            }
          };
          fetchCategories();
        }
      }, [collectionTypes]);
    
    const getCategoryName = (): string | null => {
      switch (collectionTypes) {
        case "Packet_Categories":
          return "Packet Categories";
        case "Product_Categories":
          return "Product Categories";
        case "Gear_Categories":
          return "Gear Categories";
        case "Vendor_Categories":
          return "Vendor Categories";
        default:
          return null;
    }}

    return (
      <section className="p-4 border-[0.1px] border-grey-200 rounded-xl">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-grey-200">
          <div className="flex-col gap-2">
            <h4 className="text-lg font-playfair text-secondary-300">collection of</h4>
            <h1 className="text-3xl text-secondary-400 font-bold">
              {getCategoryName()}
            </h1>
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-fit h-fit rounded-sm p-3 button-ic">+ Add New Category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-primary-300/70 hover:bg-primary-300 text-white" onClick={() => startTransition(() => { handleAddCategory(); })}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {categories.length > 0 ? (
          <div className="flex gap-4">
            {categories.map((category) => {
                return (
                  <h1 key={category._id} className="chip">{category.name}</h1>
                )
              })}
          </div>
        ) : (
          <div className="flex-center wrapper min-h-[100px] w-full flex-col gap-3 text-center">
            <h3 className="p-bold-20 md:h5-bold text-secondary-300">No {getCategoryName()} Found</h3>
            <p className="p-regular-14 text-primary-300">Check Later</p>
          </div>
        )}
      </section>
    )
}
  
export default CategoryCollection