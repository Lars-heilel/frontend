import z from "zod";
import { UserSchema } from "@/shared/lib/zod/schema/user.schema";
import { EmailZodSchema, TokenZodSchema } from "./schema-constants";

export const LoginSchema = z.object({
  email: EmailZodSchema,
  password: z.string().min(1, "Field cannot be empty"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  token: TokenZodSchema,
  user: UserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
