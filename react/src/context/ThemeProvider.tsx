import { useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContext.tsx";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    const switchTheme = () => { setTheme(t => ((t === "light") ? "dark" : "light")) }

  return <ThemeContext value={{theme, switchTheme}}>{children}</ThemeContext>;
}