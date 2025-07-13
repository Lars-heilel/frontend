import {
  FRONTEND_PATHS,
  FRONTEND_PROTECTED_PATH,
} from "@/feature/auth/model/const/frontend-path-const";
import {
  ConfirmEmail,
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResendConfirmationEmailForm,
  ResetPasswordForm,
} from "@/feature/auth/ui";
import { TestPage } from "@/feature/auth/ui/test";

export const publicRoutes = [
  { path: FRONTEND_PATHS.LOGIN, component: LoginForm },
  { path: FRONTEND_PATHS.REGISTER, component: RegisterForm },
  { path: FRONTEND_PATHS.FORGOT_PASSWORD, component: ForgotPasswordForm },
  { path: FRONTEND_PATHS.RESET_PASSWORD, component: ResetPasswordForm },
  { path: FRONTEND_PATHS.CONFIRM_EMAIL, component: ConfirmEmail },
  { path: FRONTEND_PATHS.RESEND_CONFIRMATION, component: ResendConfirmationEmailForm },
];
export const privateRoutes = [{ path: FRONTEND_PROTECTED_PATH.TEST, component: TestPage }];
