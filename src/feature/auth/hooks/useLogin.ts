import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormData } from "../model/schemas/login.schema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthApi } from "../model/api/auth.api";
import { AxiosError } from "axios";

export function useLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: LoginFormData) {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await AuthApi.login(data);
      console.log(JSON.stringify(response.data));
      if (response) {
        setIsLoading(false);
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
    navigate,
    isLoading,
  };
}
