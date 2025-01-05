import React from "react";
import { baseTheme } from "../config/theme";

export const ThemeContext = React.createContext(baseTheme);

export function ThemeProvider({
  theme,
  children,
}: {
  theme?: typeof baseTheme;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme ?? baseTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
