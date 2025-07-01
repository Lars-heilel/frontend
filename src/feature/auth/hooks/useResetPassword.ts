import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../model/schemas/resetPassword.schema";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { AxiosError } from "axios";
import { AuthApi } from "../model/api/auth.api";

export default function useResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [existingToken, setExistingToken] = useState(!!token);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    if (!token) {
      setExistingToken(false);
      return;
    }

    try {
      setIsLoading(true);
      setServerError(null);
      await AuthApi.resetPassword(data, token);
    } catch (error) {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { form, onSubmit, serverError, isLoading, existingToken };
}
