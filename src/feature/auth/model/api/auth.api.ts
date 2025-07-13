import { api } from "@/shared/api/axios.instance";
import { AUTH_PATH } from "../const/backend-path-const";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData, LoginResponse } from "../schemas/login.schema";
import type { ForgotPasswordFormData } from "../schemas/forgotPassword.schema";
import type { ResetPasswordFormData } from "../schemas/resetPassword.schema";
import { AxiosError, type AxiosResponse } from "axios";
import { zodSchemaParser } from "@/shared/lib/zod/zod-shema-parser";
import { handleApiError } from "@/shared/lib/error/error-handler";
import { RefreshSchema, type RefreshType } from "../schemas/refresh.schema";
import { useAuthStore } from "../store/authStore";
import { ConfirmEmailResponseSchema, type ConfirmEmailResponse } from "../schemas/confirm.schema";

export const AuthApi = {
  async register(dto: Omit<RegisterFormData, "confirmPassword">) {
    return await api.post(AUTH_PATH.REGISTER, {
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
  },
  async login(dto: LoginFormData): Promise<AxiosResponse<LoginResponse>> {
    return await api.post(AUTH_PATH.LOGIN, dto);
  },
  async logout() {
    return await api.post(AUTH_PATH.LOGOUT);
  },
  async verifyAccount(verifyToken: string): Promise<AxiosResponse<ConfirmEmailResponse>> {
    try {
      const response = await api.get(AUTH_PATH.VERIFY_ACCOUNT, {
        params: { token: verifyToken },
      });
      const parseResult = await zodSchemaParser(ConfirmEmailResponseSchema, response.data);
      if (parseResult.error) {
        throw parseResult.error;
      }
      return response;
    } catch (error: unknown) {
      handleApiError(error);
      throw error;
    }
  },
  async resendConfirmationEmail(email: string) {
    return await api.post(AUTH_PATH.RESEND_CONFIRMATION, { email });
  },
  async forgotPassword(dto: ForgotPasswordFormData) {
    return await api.post(AUTH_PATH.FORGOT_PASSWORD, dto);
  },
  async resetPassword(dto: ResetPasswordFormData, verifyToken: string) {
    return await api.put(
      AUTH_PATH.RESET_PASSWORD,
      { password: dto.password },
      {
        params: { token: verifyToken },
      },
    );
  },
  async refresh(): Promise<RefreshType> {
    try {
      const response = await api.post(AUTH_PATH.REFRESH);
      const parseResult = await zodSchemaParser(RefreshSchema, response.data);
      if (parseResult.error) {
        throw parseResult.error;
      }
      return parseResult.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        useAuthStore.getState().clearAccessToken();
        throw new Error("Refresh token invalid or expired. Please log in again.");
      }
      handleApiError(error);
      throw error;
    }
  },
};
