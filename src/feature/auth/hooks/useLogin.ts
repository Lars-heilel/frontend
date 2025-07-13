import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginResponseSchema,
  LoginSchema,
  type LoginFormData,
} from "../model/schemas/login.schema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthApi } from "../model/api/auth.api";
import { useAuthStore } from "../model/store/authStore";
import { handleApiError } from "@/shared/lib/error/error-handler";
import { zodSchemaParser } from "@/shared/lib/zod/zod-shema-parser";

export function useLogin() {
  const store = useAuthStore((state) => state.setAccessToken);
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
      const parseResult = await zodSchemaParser(LoginResponseSchema, response.data);
      store(parseResult.data.token);
      navigate(`/test`);
    } catch (error: unknown) {
      setServerError(handleApiError(error));
    } finally {
      setIsLoading(false);
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
