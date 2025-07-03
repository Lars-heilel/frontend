import { api } from "@/shared/api/axios.instance";
import { AUTH_PATH } from "../const/backend-path-const";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData } from "../schemas/login.schema";
import type { ForgotPasswordFormData } from "../schemas/forgotPassword.schema";
import type { ResetPasswordFormData } from "../schemas/resetPassword.schema";

export const AuthApi = {
  async register(dto: Omit<RegisterFormData, "confirmPassword">) {
    const response = await api.post(AUTH_PATH.REGISTER, {
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
    return response;
  },
  async login(dto: LoginFormData) {
    const response = await api.post(AUTH_PATH.LOGIN, dto);
    return response;
  },
  async logout() {
    const response = await api.post(AUTH_PATH.LOGOUT);
    return response;
  },
  async verifyAccount(verifyToken: string) {
    const response = await api.get(AUTH_PATH.VERIFY_ACCOUNT, {
      params: { token: verifyToken },
    });
    return response;
  },
  async resendConfirmationEmail(email: string) {
    const response = await api.post(AUTH_PATH.RESEND_CONFIRMATION, { email });
    return response;
  },
  async forgotPassword(dto: ForgotPasswordFormData) {
    const response = await api.post(AUTH_PATH.FORGOT_PASSWORD, dto);
    return response;
  },
  async resetPassword(dto: ResetPasswordFormData, verifyToken: string) {
    const response = await api.put(
      AUTH_PATH.RESET_PASSWORD,
      { password: dto.password },
      {
        params: { token: verifyToken },
      },
    );
    return response;
  },
};
