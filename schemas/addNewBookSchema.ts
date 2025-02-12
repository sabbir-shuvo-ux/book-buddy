import { z } from "zod";

export const AddNewBookSchema = z.object({
  title: z.string().min(4, "Title is required"),
  imageLink: z.string().url("Image is required"),
  author: z.string().min(1).optional().default("Unknown"),
  country: z.string().optional(),
  language: z.string().optional(),
  pages: z.coerce
    .number()
    .optional()
    .nullable()
    .transform((value) => (value === 0 ? null : value)),

  year: z.coerce
    .number()
    .optional()
    .nullable()
    .transform((value) => (value === 0 ? null : value)),
});

export type AddNewBookSchemaType = z.infer<typeof AddNewBookSchema>;
