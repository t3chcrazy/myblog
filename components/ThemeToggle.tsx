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

    // A hidden tab can't run a view transition (the browser aborts it with an
    // InvalidStateError), so switch instantly there too.
    if (
      !document.startViewTransition ||
      document.visibilityState !== "visible" ||
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
    // If the browser skips the animation (tab hidden mid-switch, viewport
    // resize), `ready` rejects; the theme has still been applied, so the
    // rejection is expected and mustn't surface as an uncaught error.
    transition.ready.catch(() => {});
    transition.finished
      .catch(() => {})
      .finally(() => root.classList.remove("theme-switching"));
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
