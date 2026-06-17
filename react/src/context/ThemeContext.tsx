import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

type ThemeContext = {
  theme: Theme,
  switchTheme: () => void,
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Theme Provider.");
  }
  return context;
}