"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { gearFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"
import { IGear } from "@/lib/database/models/gear.model"
import { createGear, updateGear } from "@/lib/actions/gear.actions"
import { gearDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"


type GearFormProps = {
    type: "Create" | "Update"
    gear?: IGear
    gearId?: string
}

const GearForm = ({ type, gearId, gear }: GearFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = gear && type === 'Update' 
      ? { 
        ...gear, 
      }
      : gearDefaultValues;
    const router = useRouter();
 
    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof gearFormSchema>>({
        resolver: zodResolver(gearFormSchema),
        defaultValues: initialValues
    })
    
    async function onSubmit(values: z.infer<typeof gearFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if(files.length > 0) {
        const uploadedImages = await startUpload(files)

        if(!uploadedImages) {
            return
        }

        uploadedImageUrl = uploadedImages[0].url
        }

        if(type === 'Create') {
        try {
            const newGear = await createGear({
            gear: { ...values, imageUrl: uploadedImageUrl },
            path: '/gears'
            })

            if(newGear) {
            form.reset();
            router.push(`/gears/${newGear._id}`)
            }
        } catch (error) {
            console.log(error);
        }
        }

        if(type === 'Update') {
        if(!gearId) {
            router.back()
            return;
        }

        try {
            const updatedGear = await updateGear({
            gear: { ...values, imageUrl: uploadedImageUrl, _id: gearId },
            path: `/gears/${gearId}`
            })

            if(updatedGear) {
            form.reset();
            router.push(`/gears/${updatedGear._id}`)
            }
        } catch (error) {
            console.log(error);
        }
        }
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl>
                    <Input placeholder="Gear Name" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl>
                    <Dropdown onChangeHandler={field.onChange} value={field.value} collectionTypes="Gear_Categories" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl className="h-72">
                        <Textarea placeholder="Description" {...field} className="textarea rounded-2xl resize-none" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl className="h-72">
                        <FileUploader 
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-100 px-4 py-2">
                        <Image
                            src="/assets/icons/dollar.svg"
                            alt="dollar"
                            width={24}
                            height={24}
                            className="filter-grey"
                        />
                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-100 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>

                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-100 px-4 py-2">
                        <Image
                            src="/assets/icons/link.svg"
                            alt="stock"
                            width={24}
                            height={24}
                            className="filter-grey"
                        />
                        <Input type="number" placeholder="Stock" {...field} className="p-regular-16 border-0 bg-grey-100 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>

                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <Button 
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
            >
            {form.formState.isSubmitting ? (
                'Submitting...'
            ): `${type} Gear `}</Button>
            
        </form>
        </Form>
    )
}

export default GearForm