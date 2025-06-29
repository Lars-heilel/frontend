import { EmailZodSchema } from "@/feature/auth/model/schemas/schema-constants";
import { z } from "zod";
export const forgotPasswordSchema = z.object({
  email: EmailZodSchema,
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
