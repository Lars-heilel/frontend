import z from "zod";
import { EmailZodSchema } from "./schema-constants";

export const LoginSchema = z.object({
  email: EmailZodSchema,
  password: z.string().min(1, "Field cannot be empty"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
