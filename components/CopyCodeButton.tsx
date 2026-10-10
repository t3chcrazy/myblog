"use client";

import { useEffect, useRef, useState } from "react";

// "Copy" control set in the listing's slug line, top right of a code block.
// Reads the code from the sibling <pre> at click time, so the server-rendered
// listing stays the single source of the text.
export function CopyCodeButton() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(button: HTMLButtonElement) {
    const code = button.parentElement?.querySelector("pre code") as HTMLElement | null;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""));
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => copy(e.currentTarget)}
        aria-label="Copy code"
        className="code-copy"
        data-state={state}
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Code copied to clipboard" : state === "failed" ? "Could not copy code" : ""}
      </span>
    </>
  );
}
