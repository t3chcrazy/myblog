"use client";

import { useEffect, useRef, useState } from "react";

type PagefindResultData = {
  url: string;
  meta: { title?: string };
  excerpt: string;
};

type PagefindModule = {
  search: (query: string) => Promise<{
    results: { data: () => Promise<PagefindResultData> }[];
  }>;
};

let pagefindPromise: Promise<PagefindModule> | null = null;

function loadPagefind() {
  if (!pagefindPromise) {
    const pagefindUrl = "/pagefind/pagefind.js";
    pagefindPromise = import(
      /* webpackIgnore: true */ pagefindUrl
    ) as Promise<PagefindModule>;
  }
  return pagefindPromise;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setResults([]);
      return;
    }

    let cancelled = false;
    loadPagefind()
      .then((pagefind) => pagefind.search(query))
      .then(async (search) => {
        if (cancelled) return;
        const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="py-ed-sm hover:text-accent-ink"
      >
        Search
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 flex items-start justify-center pt-[10vh] px-gutter"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-paper border border-ink w-full max-w-xl p-ed-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-ed-md">
              <span className="text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink font-semibold">
                Search the archive
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[length:var(--font-size-small)] uppercase tracking-wide text-charcoal hover:text-accent-ink"
              >
                Close
              </button>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts by keyword or topic..."
              className="w-full border border-ink bg-paper px-ed-md py-ed-sm text-[length:var(--font-size-body)] text-ink focus:outline-none focus:border-[2px] focus:border-accent-ink"
            />

            {unavailable && query.trim().length >= 2 && (
              <p className="text-[length:var(--font-size-small)] text-silver mt-ed-md">
                Search index unavailable — it's only built in production
                (`bun run build`), not in dev mode.
              </p>
            )}

            {results.length > 0 && (
              <ul className="mt-ed-md divide-y divide-hairline">
                {results.map((result) => (
                  <li key={result.url}>
                    <a
                      href={result.url}
                      className="block py-ed-sm group"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-semibold text-ink group-hover:underline">
                        {result.meta.title ?? result.url}
                      </span>
                      <span
                        className="block text-[length:var(--font-size-small)] text-charcoal mt-1"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
