import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

function today() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function Masthead() {
  return (
    <header className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 pt-6">
        {/* Dateline strip — the small print above the nameplate on a real front page */}
        <div className="flex items-baseline justify-between text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-charcoal">
          <span>{today()}</span>
          <span>Vol. I — Weekly Edition</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-3 pb-4 text-center">
        <Link
          href="/"
          className="inline-block font-[family-name:var(--font-headline)] text-[length:var(--font-size-nameplate)] font-bold tracking-[-0.02em] text-ink"
        >
          The Weekly Build
        </Link>
        <p className="mt-1 text-[length:var(--font-size-small)] uppercase tracking-[0.3em] text-charcoal">
          Web &middot; Mobile &middot; Backend &middot; AI
        </p>
      </div>

      {/* A newspaper banner rule: one heavy line, one hairline beneath it. */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-[3px] bg-ink" />
        <div className="h-px bg-ink mt-1" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <nav className="flex flex-wrap items-center justify-center text-[length:var(--font-size-small)] uppercase tracking-wide text-charcoal">
          {[...CATEGORIES.map((c) => ({ label: c, href: `/categories/${c.toLowerCase()}` })),
            { label: "All posts", href: "/blog" },
            { label: "About", href: "/author" },
          ].map((item, i) => (
            <span key={item.href} className="flex items-center">
              {i > 0 && <span className="mx-4 text-hairline">|</span>}
              <Link href={item.href} className="py-3 hover:text-accent-ink">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-hairline" />
      </div>
    </header>
  );
}
