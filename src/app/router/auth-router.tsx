import {
  AuthLayout,
  ConfirmEmail,
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
} from "@/feature/auth/ui";
import { ResendConfirmationEmailForm } from "@/feature/auth/ui/resendConfirmationEmail-form";

import { Route, Routes } from "react-router";

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="confirm-email" element={<ConfirmEmail />}></Route>
        <Route
          path="resend-confirmation"
          element={<ResendConfirmationEmailForm />}
        ></Route>
      </Route>
    </Routes>
  );
}
