import { PasswordZodSchema } from "@/feature/auth/model/schemas/schema-constants";
import { z } from "zod";
export const resetPasswordSchema = z
  .object({
    password: PasswordZodSchema,
    confirmPassword: PasswordZodSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
