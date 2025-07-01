import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "../model/schemas/register.schema";
import { useState } from "react";
import { AuthApi } from "../model/api/auth.api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export function useRegister() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<RegisterFormData>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: RegisterFormData) {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await AuthApi.register(data);
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
