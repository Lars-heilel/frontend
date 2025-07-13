import z from "zod";
import { TokenZodSchema } from "./schema-constants";

export const RefreshSchema = z.object({
  token: TokenZodSchema,
});
export type RefreshType = z.infer<typeof RefreshSchema>;
