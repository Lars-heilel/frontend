import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "../model/schemas/register.schema";

export function useRegister() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  function onSubmit() {
    console.log("Шляпа какраз какразкакзрз");
  }
  return { form, onSubmit };
}
