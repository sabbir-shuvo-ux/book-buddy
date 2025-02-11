import { z } from "zod";

export const AddNewBookSchema = z.object({
  title: z.string().min(4, "Title is required"),
  imageLink: z.string().url("Image is required"),
  author: z.string().min(1).optional().default("Unknown"),
  country: z.string().optional(),
  language: z.string().optional(),
  pages: z.string().optional(),
  year: z.string().optional(),
});

export type AddNewBookSchemaType = z.infer<typeof AddNewBookSchema>;
