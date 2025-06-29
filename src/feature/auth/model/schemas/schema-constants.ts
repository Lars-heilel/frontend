import z from "zod";
import { PasswordRegex } from "../const/passwordRegex";

export const EmailZodSchema = z.string().email("Некорректный email");
export const PasswordZodSchema = z
  .string()
  .min(PasswordRegex.MIN_LENGTH, "минимум 8 символов")
  .regex(PasswordRegex.REGEX, PasswordRegex.MESSAGE);

export const NameZodSchema = z
  .string()
  .min(2, "Имя должно иметь минимум два символа");
