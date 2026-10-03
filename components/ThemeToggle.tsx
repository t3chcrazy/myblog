"use client";

import { flushSync } from "react-dom";

// The edition switch, set like the edition selector on a newspaper's folio
// line: both editions named, the one in hand stamped in a box. Which one is
// current comes from the `.dark` class (via `dark:` variants), not React
// state, so the server-rendered markup is already right for whichever theme
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
    <button
      type="button"
      onClick={toggle}
      className="edition-toggle flex items-center gap-ed-xs text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-charcoal"
    >
      <span className="sr-only">
        <span className="dark:hidden">Switch to the Night Edition (dark theme)</span>
        <span className="hidden dark:inline">Switch to the Day Edition (light theme)</span>
      </span>
      <span aria-hidden className="edition-option" data-edition="day">
        <span className="fleuron mr-1 text-[1.15em] leading-none">&#9788;</span>
        Day
      </span>
      <span aria-hidden className="text-silver">/</span>
      <span aria-hidden className="edition-option" data-edition="night">
        <span className="fleuron mr-1 text-[1.15em] leading-none">&#9790;</span>
        Night
      </span>
      <span aria-hidden className="hidden tablet:inline">Edition</span>
    </button>
  );
}
