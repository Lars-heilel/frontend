import z from "zod";
import { PasswordRegex } from "../const/passwordRegex";

export const EmailZodSchema = z.string().email("Invalid email");
export const PasswordZodSchema = z
  .string()
  .min(PasswordRegex.MIN_LENGTH, "Minimum 8 characters")
  .regex(PasswordRegex.REGEX, PasswordRegex.MESSAGE);

export const NameZodSchema = z.string().min(2, "Name must be at least two characters");
