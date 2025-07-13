import { UserSchema } from "@/shared/lib/zod/schema/user.schema";
import { TokenZodSchema } from "./schema-constants";
import z from "zod";

export const ConfirmEmailResponseSchema = z.object({
  token: TokenZodSchema,
  user: UserSchema,
});

export type ConfirmEmailResponse = z.infer<typeof ConfirmEmailResponseSchema>;
