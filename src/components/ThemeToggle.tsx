"use client";

import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1.25v2M8 12.75v2M1.25 8h2M12.75 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M12.25 10.25a4.75 4.75 0 01-6.5-6.5 4.75 4.75 0 106.5 6.5z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    document.documentElement.classList.add("theme-transition");
    toggleTheme();
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 280);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`theme-toggle touch-link inline-flex items-center gap-2 border border-border px-3 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:text-accent ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="copy-stable hidden min-[380px]:inline">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
