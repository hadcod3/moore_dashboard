import { z } from "zod"

export const categoryFormSchema = z.object({
    name: z
      .string()
      .min(5, 'Name must be at least 5 character') 
      .regex(/^[A-Za-z\s]+$/, 'Name must only contain letters and spaces')
      .refine((val) => val.trim().split(/\s+/).length >= 1, {
        message: 'Name must contain at least 1 word',
      }),
});

export const deleteItemFormSchema = z.object({
  desc: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters long.')
    .refine((val) => val.split(/\s+/).length >= 10, {
      message: 'Description must contain at least 10 words.',
    }),
});