import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../model/schemas/forgotPassword.schema";

export default function useForgotPassword() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  function onSubmit() {
    console.log("абоба");
  }
  return { form, onSubmit };
}
