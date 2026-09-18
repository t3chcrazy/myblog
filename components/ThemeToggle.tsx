"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

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
    >
      {isDark ? "Day Edition" : "Night Edition"}
    </button>
  );
}
