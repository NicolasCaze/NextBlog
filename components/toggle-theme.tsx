"use client"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const Toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="flex justify-center items-center"
      variant="ghost"
      size="icon"
      onClick={Toggle}
    >
      <div className="flex justify-center items-center w-6 h-6">
        <Moon className="dark:hidden" />
        <Sun className="hidden dark:block" />
      </div>
    </Button>
  );
}
