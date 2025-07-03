import { z } from "zod";
import { EmailZodSchema } from "./schema-constants";

export const resendConfirmationSchema = z.object({
  email: EmailZodSchema,
});

export type ResendConfirmationFormData = z.infer<typeof resendConfirmationSchema>;
