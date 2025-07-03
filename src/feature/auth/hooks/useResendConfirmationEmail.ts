import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { AuthApi } from "../model/api/auth.api";
import {
  resendConfirmationSchema,
  type ResendConfirmationFormData,
} from "../model/schemas/resendConfirmation.schema";

export default function useResendConfirmation() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ResendConfirmationFormData>({
    resolver: zodResolver(resendConfirmationSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = useCallback(async (data: ResendConfirmationFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);

      await AuthApi.resendConfirmationEmail(data.email);

      setOpenModal(true);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    form,
    onSubmit,
    serverError,
    openModal,
    setOpenModal,
    navigate,
    isLoading,
  };
}
