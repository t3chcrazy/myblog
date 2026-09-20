import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";

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
    <header className="bg-paper" style={{ viewTransitionName: "site-header" }}>
      <div className="mx-auto max-w-[1240px] px-gutter pt-ed-md">
        {/* Dateline strip — the small print above the nameplate on a real front page */}
        <div className="flex items-baseline justify-between text-(length:--font-size-micro) uppercase tracking-[0.15em] text-charcoal">
          <span>{today()}</span>
          <span className="flex items-center gap-ed-md">
            <span>Vol. I — Weekly Edition</span>
            <ThemeToggle />
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-gutter pt-ed-sm pb-ed-md text-center">
        <Link
          href="/"
          className="inline-block font-headline text-(length:--font-size-nameplate) font-normal tracking-[-0.02em] leading-none text-ink"
        >
          Auxesis
        </Link>
        <p className="mt-1 text-(length:--font-size-small) uppercase tracking-[0.3em] text-charcoal">
          Web &middot; Mobile &middot; Backend &middot; AI
        </p>
      </div>

      {/* The broadsheet double rule: one heavy line, one hairline beneath it. */}
      <div className="mx-auto max-w-[1240px] px-gutter">
        <div className="h-[2px] bg-ink" />
        <div className="h-px bg-ink mt-[3px]" />
      </div>

      <div className="mx-auto max-w-[1240px] px-gutter">
        <nav className="flex flex-wrap items-center justify-center text-(length:--font-size-small) uppercase tracking-wide text-charcoal">
          {[...CATEGORIES.map((c) => ({ label: c, href: `/categories/${c.toLowerCase()}` })),
            { label: "All posts", href: "/blog" },
            { label: "About", href: "/author" },
          ].map((item, i) => (
            <span key={item.href} className="flex items-center">
              {i > 0 && <span className="mx-ed-md text-hairline">|</span>}
              <Link href={item.href} className="py-ed-sm hover:text-accent-ink">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-[1240px] px-gutter">
        <div className="h-px bg-hairline" />
      </div>
      <Search />
    </header>
  );
}
