import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormData } from "../model/schemas/login.schema";

export function useLogin() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  function onSubmit() {
    console.log("купить шляпу");
  }
  return { form, onSubmit };
}
