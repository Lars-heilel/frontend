import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./providers/theme-provider";
import { ModeToggle } from "@/shared/components/ui/mode-toggle";
import { AppRouter } from "./router/app-router";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}
