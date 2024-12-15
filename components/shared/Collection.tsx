'use client'
import React, { startTransition, useState } from 'react';
import { IItem } from '@/lib/database/models/item.model';
import BigCard from './BigCard';
import SmallCard from './SmallCard';
import Link from 'next/link';
import { Button } from '../ui/button';
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
import { Input } from '../ui/input';
import { IItemCategory } from '@/lib/database/models/itemCategory.model';
import { createItemCategory, deleteCategoryById } from '@/lib/actions/category.actions';
import { categoryFormSchema } from '@/lib/validator';
import { HiOutlineXMark } from "react-icons/hi2";

type CollectionProps = {
  data: IItem[] | IItemCategory[],
  emptyTitle: string,
  emptyStateSubtext: string,
  collectionType?: 'Packet' | 'Product' | 'Gear',
  collectionModel?: "Sample" | "Full_Content",
  isCategory: boolean,
  limit?: number,
  page?: number | string,
  totalPages?: number,
};

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    collectionType,
    collectionModel,
    isCategory,
    page,
    totalPages = 0,
}: CollectionProps) => {
    
    const type = collectionType === "Packet" ? "Packets" : collectionType === "Product" ? "Products" : "Gears";
    const typeId = collectionType === "Packet" ? "6717aa0a78fed7ee045a8402" : collectionType === "Product" ? "6717aa0a78fed7ee045a8403" : "6717aa0a78fed7ee045a8401";
    const linkHref = type === 'Packets' ? '/packets' : type === "Products" ? '/products' : '/gears';
    const gridCols = collectionType === "Packet" 
      ? "grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" 
      : "gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState(false);
    const [categories, setCategories] = useState<IItemCategory[]>(data as IItemCategory[]);

    const handleAddCategory = async () => {
        try {
            // Validate the new category input
            categoryFormSchema.parse({ name: newCategory });
        
            // Proceed with the category creation
            const category: IItemCategory = await createItemCategory({
              name: newCategory.trim().toLowerCase(),
              typeFor: typeId,
            });
        
            // Update the category list in state
            setCategories((prevState) => [...prevState, category]);
            setNewCategory(''); // Clear input field
        } catch (error) {
          console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategoryById(id);
            setCategories((prevState) => prevState.filter((category) => category._id !== id));
        } catch (error) {
          console.error('Error delete category:', error);
        }
    }

    return (
        <>
            {isCategory ? (
                <section className="p-4 border-[0.1px] border-grey-200 rounded-xl">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-grey-200">
                        <div className="flex-col gap-2">
                            <h4 className="text-lg font-playfair text-secondary-300">collection of</h4>
                            <h1 className="text-3xl text-secondary-400 font-bold">
                            Category of {type}
                            </h1>
                            <h3 className="flex items-center gap-1">total :<p className="font-aleo">{categories.length} categories</p></h3>
                        </div>
                        <div className='flex gap-x-2'>
                            <Button className='button-ic' size="lg"  onClick={() => setEditCategory((prev) => !prev)}>
                                {editCategory ? "Done" : "Edit"}
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger className="button-ic">+ Add New Category</AlertDialogTrigger>
                                <AlertDialogContent className="bg-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>New {type} Category</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='button'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction disabled={!newCategory.trim()} className="button-recolorable bg-secondary-200 hover:bg-secondary-300 text-white hover:text-white" onClick={() => startTransition(() => { handleAddCategory(); })}>Add</AlertDialogAction>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    {categories.length > 0 ? (
                      <div className="flex gap-4 flex-wrap items-start">
                        {categories.map((category) => {
                            return (
                              <div key={category._id} className="badge">
                                <h1 className='line-clamp-1'>{category.name}</h1>
                                {editCategory && (
                                    <AlertDialog>
                                    <AlertDialogTrigger><HiOutlineXMark /></AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <AlertDialogContent>Are you sure to delete this category</AlertDialogContent>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className='button'>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="button-recolorable bg-red-600 hover:bg-red-700 text-white hover:text-white" onClick={() => handleDeleteCategory(category._id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                )}
                            </div>
                            )
                          })}
                      </div>
                    ) : (
                      <div className="flex-center wrapper min-h-[100px] w-full flex-col gap-3 text-center">
                        <h3 className="p-bold-20 md:h5-bold text-secondary-300">No Categories of {type} Found</h3>
                        <p className="p-regular-14 text-primary-300">Check Later</p>
                      </div>
                    )}
                </section>
            ) : (
                <div className={`p-4 ${collectionModel === "Sample" ? 'border-[0.1px] border-grey-200 rounded-xl' : ''}`}>
                    {collectionModel === "Sample" && (
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-grey-200">
                            <div className="flex-col gap-2">
                                <h4 className="text-lg font-playfair text-secondary-300">collection of</h4>
                                <h1 className="text-3xl text-secondary-400 font-bold">{type}</h1>
                                <h3 className="flex items-center gap-1">
                                    total: <p className="font-aleo">{data.length} items</p>
                                </h3>
                            </div>
                            <Button size="lg" asChild className="button-ic">
                                <Link href={linkHref}>See More {type}</Link>
                            </Button>
                        </div>
                    )}
                    
                    {data.length > 0 ? (
                        <div className="flex flex-col items-center gap-10">
                            <ul className={`grid w-full ${gridCols} xl:gap-10`}>
                                {data.map((item) => (
                                    <li key={item._id} className="flex justify-center">
                                        {collectionType === "Packet" ? (
                                            <BigCard item={(item as IItem)} />
                                        ) : (
                                            <SmallCard item={(item as IItem)} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                            <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
                            <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Collection;
