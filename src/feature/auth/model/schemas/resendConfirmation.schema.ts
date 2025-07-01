import { z } from "zod";

export const resendConfirmationSchema = z.object({
  email: z.string().email("Введите корректный email").min(1),
});

export type ResendConfirmationFormData = z.infer<
  typeof resendConfirmationSchema
>;
