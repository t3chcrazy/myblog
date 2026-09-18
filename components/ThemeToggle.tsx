"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-charcoal hover:text-accent-ink transition-colors"
      suppressHydrationWarning
    >
      {isDark ? "Day Edition" : "Night Edition"}
    </button>
  );
}
