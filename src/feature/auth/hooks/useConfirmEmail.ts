import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AuthApi } from "../model/api/auth.api";
import { AxiosError } from "axios";

export default function useConfirmEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const existingToken = !!token;

  const onSubmit = useCallback(async () => {
    if (!token) {
      setIsTokenInvalid(true);
      return;
    }

    try {
      setIsLoading(true);
      setServerError(null);
      setIsTokenInvalid(false);

      const response = await AuthApi.verifyAccount(token);

      if (response.status === 200) {
        setOpenModal(true);
      } else {
        setServerError("Failed to confirm email. Please try again.");
      }
    } catch (error) {
      setIsTokenInvalid(true);

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
  }, [token]);

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
