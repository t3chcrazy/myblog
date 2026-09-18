"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";

type PagefindResultData = {
  url: string;
  meta: { title?: string; category?: string; date?: string };
  excerpt: string;
};

type PagefindFilterCounts = Record<string, Record<string, number>>;

type PagefindSearchResult = {
  results: { id: string; data: () => Promise<PagefindResultData> }[];
  filters: PagefindFilterCounts;
};

type PagefindModule = {
  search: (
    query: string,
    options?: { filters?: Record<string, string> }
  ) => Promise<PagefindSearchResult>;
  filters: () => Promise<PagefindFilterCounts>;
};

// Pagefind indexes the raw prerendered .html files under .next/server/app,
// so result URLs come back as e.g. "/blog/my-post.html" — but Next.js
// serves that route without the extension. Strip it before using as a href.
function toRoutePath(pagefindUrl: string): string {
  if (pagefindUrl.endsWith("/index.html")) {
    return pagefindUrl.slice(0, -"index.html".length) || "/";
  }
  if (pagefindUrl.endsWith(".html")) {
    return pagefindUrl.slice(0, -".html".length);
  }
  return pagefindUrl;
}

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
  const [category, setCategory] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [selected, setSelected] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setCategory(null);
  }, []);

  // Global "Search" trigger: click, or Cmd/Ctrl+K from anywhere on the site.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    loadPagefind()
      .then((pagefind) => pagefind.filters())
      .then((filters) => setCategoryCounts(filters.category ?? {}))
      .catch(() => setUnavailable(true));
  }, [open]);

  useEffect(() => {
    if (!open || query.trim().length < 2) return;

    let cancelled = false;
    const started = performance.now();
    loadPagefind()
      .then((pagefind) =>
        pagefind.search(query, category ? { filters: { category } } : undefined)
      )
      .then(async (search) => {
        if (cancelled) return;
        const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
        if (cancelled) return;
        setResults(data);
        setSelected(0);
        setElapsedMs(Math.round(performance.now() - started));
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, query, category]);

  const visibleResults = query.trim().length >= 2 ? results : [];

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, visibleResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && visibleResults[selected]) {
      window.location.href = toRoutePath(visibleResults[selected].url);
    }
  }

  return (
    <>
      <div className="border-b border-hairline bg-paper-raised">
        <div className="mx-auto max-w-[1240px] px-gutter py-ed-xs">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center w-full max-w-2xl mx-auto border border-hairline bg-paper px-ed-md py-ed-xs text-left hover:border-ink transition-colors cursor-pointer"
          >
            <span className="text-charcoal mr-ed-sm" aria-hidden>
              &#128269;
            </span>
            <span className="flex-1 text-[length:var(--font-size-body)] text-silver truncate">
              Search dispatches, topics, or tags&hellip;
            </span>
            <kbd className="hidden sm:inline text-[length:var(--font-size-micro)] font-mono border border-hairline bg-paper-raised px-ed-xs py-[1px] text-silver">
              &#8984;K
            </kbd>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-start justify-center p-gutter overflow-y-auto"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl my-auto bg-paper border border-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-ed-md py-ed-sm border-b border-ink bg-paper-raised">
              <div>
                <span className="block text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-ink font-semibold">
                  The Weekly Build &middot; Archival Index
                </span>
                <span className="block text-[length:var(--font-size-micro)] uppercase tracking-wide text-silver">
                  Indexed via Pagefind &middot; searched locally, no server round-trip
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-[length:var(--font-size-micro)] uppercase tracking-wide text-charcoal hover:text-accent-ink"
              >
                Esc to close
              </button>
            </div>

            <div className="p-ed-md">
              <div className="flex items-center border-2 border-ink bg-paper px-ed-md py-ed-sm">
                <span className="text-accent-ink mr-ed-sm" aria-hidden>
                  &#128269;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search posts by keyword or topic..."
                  className="flex-1 bg-transparent text-[length:var(--font-size-h3)] font-[family-name:var(--font-headline)] text-ink focus:outline-none"
                />
                {visibleResults.length > 0 && (
                  <span className="hidden sm:inline text-[length:var(--font-size-micro)] uppercase tracking-wide text-silver whitespace-nowrap ml-ed-md">
                    {visibleResults.length} results in {elapsedMs}ms
                  </span>
                )}
              </div>

              {unavailable && query.trim().length >= 2 && (
                <p className="text-[length:var(--font-size-small)] text-silver mt-ed-md">
                  Search index unavailable — it&apos;s only built in
                  production (`bun run build`), not in dev mode.
                </p>
              )}

              {query.trim().length >= 2 && (
                <div className="flex flex-wrap items-center gap-ed-xs mt-ed-md pb-ed-sm border-b border-hairline">
                  <span className="text-[length:var(--font-size-micro)] uppercase tracking-wide text-silver mr-ed-xs">
                    Section:
                  </span>
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    className={`text-[length:var(--font-size-micro)] uppercase tracking-wide px-ed-sm py-[2px] border ${
                      category === null
                        ? "bg-ink text-paper border-ink"
                        : "border-hairline text-charcoal hover:border-ink"
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((c) => {
                    const count = categoryCounts[c] ?? 0;
                    return (
                      <button
                        key={c}
                        type="button"
                        disabled={count === 0}
                        onClick={() => setCategory(c)}
                        className={`text-[length:var(--font-size-micro)] uppercase tracking-wide px-ed-sm py-[2px] border ${
                          category === c
                            ? "bg-ink text-paper border-ink"
                            : count === 0
                              ? "border-hairline text-silver/50 cursor-not-allowed"
                              : "border-hairline text-charcoal hover:border-ink"
                        }`}
                      >
                        {c} ({count})
                      </button>
                    );
                  })}
                </div>
              )}

              {visibleResults.length > 0 && (
                <ul className="mt-ed-md divide-y divide-hairline max-h-[420px] overflow-y-auto">
                  {visibleResults.map((result, i) => (
                    <li key={result.url}>
                      <a
                        href={toRoutePath(result.url)}
                        onClick={close}
                        onMouseEnter={() => setSelected(i)}
                        className={`block py-ed-sm px-ed-xs ${i === selected ? "bg-paper-raised" : ""}`}
                      >
                        <div className="flex items-center gap-ed-xs text-[length:var(--font-size-micro)] uppercase tracking-wide text-accent-ink font-semibold">
                          {result.meta.category && <span>{result.meta.category}</span>}
                          {result.meta.date && (
                            <>
                              <span aria-hidden>&middot;</span>
                              <span>{result.meta.date}</span>
                            </>
                          )}
                        </div>
                        <span className="block font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-semibold text-ink mt-1">
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

            <div className="flex items-center gap-ed-md px-ed-md py-ed-xs border-t border-hairline text-[length:var(--font-size-micro)] uppercase tracking-wide text-silver">
              <span className="flex items-center gap-1">
                <kbd className="font-mono border border-hairline bg-paper-raised px-1">&uarr;</kbd>
                <kbd className="font-mono border border-hairline bg-paper-raised px-1">&darr;</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono border border-hairline bg-paper-raised px-1">&crarr;</kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono border border-hairline bg-paper-raised px-1">Esc</kbd>
                Dismiss
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
