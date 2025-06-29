import { z } from "zod";
import {
  EmailZodSchema,
  NameZodSchema,
  PasswordZodSchema,
} from "./schema-constants";

export const registerSchema = z
  .object({
    email: EmailZodSchema,
    userName: NameZodSchema,
    password: PasswordZodSchema,
    confirmPassword: PasswordZodSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });
export type RegisterFormData = z.infer<typeof registerSchema>;
