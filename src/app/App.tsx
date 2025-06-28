import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./styles/theme-provider";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}
