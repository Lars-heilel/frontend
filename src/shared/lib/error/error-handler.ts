import { AxiosError } from "axios";
import { ZodError } from "zod";

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "Network error occurred";
  }

  if (error instanceof ZodError) {
    return "Server returned an unexpected response";
  }

  return error instanceof Error ? error.message : "Unknown error occurred";
};
