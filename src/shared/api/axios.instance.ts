import { useAuthStore } from "@/feature/auth/model/store/authStore";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

import { handleApiError } from "../lib/error/error-handler";
import { AuthApi } from "@/feature/auth/model/api/auth.api";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:1488/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await AuthApi.refresh();
        useAuthStore.getState().setAccessToken(newToken.token);
        originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
        return api.request(originalRequest);
      } catch (refreshError: unknown) {
        useAuthStore.getState().clearAccessToken();
        handleApiError(refreshError);
        return Promise.reject(refreshError);
      }
    }
    handleApiError(error);
    return Promise.reject(error);
  },
);
