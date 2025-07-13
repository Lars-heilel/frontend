import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AuthApi } from "../model/api/auth.api";
import { handleApiError } from "@/shared/lib/error/error-handler";
import { useAuthStore } from "../model/store/authStore";

export default function useConfirmEmail() {
  const store = useAuthStore.getState().setAccessToken;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const existingToken = !!token;

  const onSubmit = async () => {
    if (!token) {
      setIsTokenInvalid(true);
      return;
    }
    try {
      setIsLoading(true);
      const res = await AuthApi.verifyAccount(token);
      if (res) {
        store(res.data.token);
        setOpenModal(true);
      }
    } catch (error: unknown) {
      setServerError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    existingToken,
    serverError,
    isLoading,
    navigate,
    openModal,
    setOpenModal,
    isTokenInvalid,
  };
}
