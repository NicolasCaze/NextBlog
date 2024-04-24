"use client"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const {theme, setTheme} = useTheme();
    const Toggle  = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    return (
        <Button 
        className="flex justify-center"
        variant="ghost"
        size="icon"
        onClick={Toggle}
        >
            <Moon className="h-6 w-6 scale-100 dark:scale-0" />
            <Sun className="h-6 w-6 scale-0 dark:scale-100" />
            
        </Button>
    )
}