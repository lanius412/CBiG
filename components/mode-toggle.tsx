"use client";

import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <span className="border rounded block">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setTheme("light")}
        className={cn(
          theme === "light" && "bg-neutral-500/80",
          "hover:bg-neutral-500/90 rounded-r-none",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Sun className="size-2" />
          Light
        </div>
      </Button>
      <Button
        variant="secondary"
        onClick={() => setTheme("dark")}
        className={cn(
          theme === "dark" && "bg-neutral-500/80",
          "border-l hover:bg-neutral-500/90 rounded-none",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Moon className="size-2" />
          Dark
        </div>
      </Button>
      <Button
        variant="secondary"
        onClick={() => setTheme("system")}
        className={cn(
          theme === "system" && "bg-neutral-500/80",
          "border-l hover:bg-neutral-500/90 rounded-l-none",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Settings className="size-2" />
          System
        </div>
      </Button>
    </span>
  );
}
