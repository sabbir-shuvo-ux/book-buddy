import { z } from "zod";

// Login Schema
const AuthFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

type AuthFormSchemaType = z.infer<typeof AuthFormSchema>;

export { AuthFormSchema, type AuthFormSchemaType };
