"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class" // adds/removes `class="dark"` on <html>
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // no ugly flicker
    >
      {children}
    </NextThemesProvider>
  );
}
