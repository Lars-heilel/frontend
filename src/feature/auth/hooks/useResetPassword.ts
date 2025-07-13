import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../model/schemas/resetPassword.schema";
import { useNavigate, useSearchParams } from "react-router";
import { useCallback, useState } from "react";
import { AuthApi } from "../model/api/auth.api";
import { handleApiError } from "@/shared/lib/error/error-handler";

export default function useResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const existingToken = !!token;
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      if (!token) {
        setIsTokenInvalid(true);
        throw new Error("Token not found");
      }

      try {
        setIsLoading(true);
        setServerError(null);
        setIsTokenInvalid(false);
        const response = await AuthApi.resetPassword(data, token);
        if (response.status === 200) {
          setOpenModal(true);
        } else {
          setServerError("Failed to reset password. Please try again.");
        }
      } catch (error) {
        setServerError(handleApiError(error));
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  return {
    form,
    onSubmit,
    serverError,
    isLoading,
    existingToken,
    openModal,
    isTokenInvalid,
    setOpenModal,
    navigate,
  };
}
