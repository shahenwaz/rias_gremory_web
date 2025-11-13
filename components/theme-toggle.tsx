"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // We intentionally set local state once after mount so that
  // next-themes can safely resolve the real theme on the client.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const current = (theme === "system" ? resolvedTheme : theme) ?? "light";

  const handleToggle = () => {
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center
                 rounded-full border-border/70 bg-background/80 shadow-sm
                 transition-colors duration-300 ease-out
                 hover:bg-accent/90 hover:text-accent-foreground"
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sun (light mode) */}
      <Sun
        className={`absolute h-[1.1rem] w-[1.1rem] transform transition-all duration-300 ease-out
        ${
          !mounted || current === "light"
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-75 -rotate-90"
        }`}
      />

      {/* Moon (dark mode) */}
      <Moon
        className={`absolute h-[1.1rem] w-[1.1rem] transform transition-all duration-300 ease-out
        ${
          mounted && current === "dark"
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-75 rotate-90"
        }`}
      />
    </Button>
  );
}
