import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../model/schemas/forgotPassword.schema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AxiosError } from "axios";
import { AuthApi } from "../model/api/auth.api";

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });
  async function onSubmit(data: ForgotPasswordFormData) {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await AuthApi.forgotPassword(data);
      if (response) {
        setIsLoading(false);
        setOpenModal(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        setServerError(error.response?.data.message);
      }
    }
  }

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
