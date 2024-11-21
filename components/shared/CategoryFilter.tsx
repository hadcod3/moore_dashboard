"use client"
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCategoryByTypeId } from "@/lib/actions/category.actions";
import { IItemCategory } from "@/lib/database/models/itemCategory.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryProps = {
    collectionType: 'Packet' | 'Product' | 'Gear',
}

const CategoryFilter = ({collectionType} : CategoryProps) => {
    
    const typeId = collectionType === "Packet" ? "6717aa0a78fed7ee045a8402" : collectionType === "Product" ? "6717aa0a78fed7ee045a8403" : "6717aa0a78fed7ee045a8401";
    const [categories, setCategories] = useState<IItemCategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getCategoryByTypeId({typeId});
          if (categoryList) setCategories(categoryList as IItemCategory[]);
        };
    
        getCategories();
      }, [typeId]);

    const onSelectCategory = (category: string) => {
        let newUrl = '';

        if(category && category !== 'All') {
            newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'category',
            value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

            {categories.map((category) => (
            <SelectItem value={category._id} key={category._id} className="select-item p-regular-14">
                {category.name}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    )
}

export default CategoryFilter