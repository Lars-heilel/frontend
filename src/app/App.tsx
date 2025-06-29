import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthRouter } from "./router/auth-router";
import { ModeToggle } from "@/shared/components/ui/mode-toggle";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
        <AuthRouter></AuthRouter>
      </ThemeProvider>
    </BrowserRouter>
  );
}
