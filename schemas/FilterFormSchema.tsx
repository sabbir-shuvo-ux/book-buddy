import { z } from "zod";

export const FilterFormSchema = z.object({
  countries: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
});

export type FilterFormSchemaType = z.infer<typeof FilterFormSchema>;
