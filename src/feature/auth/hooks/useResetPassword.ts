import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../model/schemas/resetPassword.schema";

export default function useResetPassword() {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });
  function onSubmit() {
    console.log("абоба");
  }
  return { form, onSubmit };
}
