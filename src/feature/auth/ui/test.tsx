import { api } from "@/shared/api/axios.instance";
import { useEffect, useState } from "react";
import { AUTH_PATH, PROTECTED_PATH } from "../model/const/backend-path-const";
import { handleApiError } from "@/shared/lib/error/error-handler";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

export function TestPage() {
  const [data, setData] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const res = await api.get(PROTECTED_PATH.TEST);
        setData(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 403) {
            navigate(AUTH_PATH.LOGIN);
          }
        }
        setError(handleApiError(error));
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p className='animate-bounce text-3xl text-blue-600'>Загрузка...</p>
      ) : error ? (
        <p className='text-3xl text-red-500'>{error}</p>
      ) : (
        <p className='text-3xl text-green-400'>{data}</p>
      )}
    </div>
  );
}
