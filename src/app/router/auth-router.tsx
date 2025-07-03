import {
  AuthLayout,
  ConfirmEmail,
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResendConfirmationEmailForm,
  ResetPasswordForm,
} from "@/feature/auth/ui";

import { Route, Routes } from "react-router";
import { FRONTEND_PATHS } from "@/feature/auth/model/const/frontend-path-const";

export function AuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path={FRONTEND_PATHS.LOGIN} element={<LoginForm />} />
        <Route path={FRONTEND_PATHS.REGISTER} element={<RegisterForm />} />
        <Route path={FRONTEND_PATHS.FORGOT_PASSWORD} element={<ForgotPasswordForm />} />
        <Route path={FRONTEND_PATHS.RESET_PASSWORD} element={<ResetPasswordForm />} />
        <Route path={FRONTEND_PATHS.CONFIRM_EMAIL} element={<ConfirmEmail />} />
        <Route
          path={FRONTEND_PATHS.RESEND_CONFIRMATION}
          element={<ResendConfirmationEmailForm />}
        />
      </Route>
    </Routes>
  );
}
