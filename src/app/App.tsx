import { BrowserRouter } from "react-router";
import AuthLayout from "@/widgets/auth/auth-layout";
import { ThemeProvider } from "./styles/theme-provider";
import { ModeToggle } from "./styles/mode-toggle";
import { ResetPasswordForm } from "@/feature/mail/ui/resetPasswordForm";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {<ModeToggle></ModeToggle>}
        <AuthLayout>
          <ResetPasswordForm></ResetPasswordForm>
        </AuthLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
