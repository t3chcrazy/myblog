"use client";

import { flushSync } from "react-dom";

// The edition switch: a type block sliding between "Day" and "Night" on a
// ruled track (styles under .edition-toggle in globals.css). Which edition
// is current comes from the `.dark` class, not React state, so the server-rendered markup is already right for whichever theme
// the init script in app/layout.tsx picked — no flash of the wrong label.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const apply = () => {
      root.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }

    // Roll the new edition down over the old one like a fresh sheet off the
    // press. `theme-switching` drops the page's named transition groups
    // (masthead, banners) for this one transition, so the whole page moves
    // as a single sheet.
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  }

  return (
    <button type="button" onClick={toggle} className="edition-toggle">
      <span className="sr-only">
        <span className="dark:hidden">Switch to the Night Edition (dark theme)</span>
        <span className="hidden dark:inline">Switch to the Day Edition (light theme)</span>
      </span>
      <span aria-hidden className="edition-label" data-edition="day">
        Day
      </span>
      <span aria-hidden className="edition-track">
        <span className="edition-knob">
          <span data-glyph="day">&#9788;</span>
          <span data-glyph="night">&#9790;</span>
        </span>
      </span>
      <span aria-hidden className="edition-label" data-edition="night">
        Night
      </span>
    </button>
  );
}
