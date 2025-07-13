import z from "zod";
import { PasswordRegex } from "../const/passwordRegex";
const EmailZodSchema = z.string().email("Invalid email");
const PasswordZodSchema = z
  .string()
  .min(PasswordRegex.MIN_LENGTH, "Minimum 8 characters")
  .regex(PasswordRegex.REGEX, PasswordRegex.MESSAGE);

const NameZodSchema = z.string().min(2, "Name must be at least two characters");
const TokenZodSchema = z.string().jwt();
export { EmailZodSchema, PasswordZodSchema, NameZodSchema, TokenZodSchema };
