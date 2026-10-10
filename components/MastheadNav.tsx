"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

const ITEMS = [
  { label: "Front Page", href: "/" },
  ...CATEGORIES.map((c) => ({ label: c, href: `/categories/${c.toLowerCase()}` })),
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/author" },
];

// Section tabs under the nameplate. The current section is set reversed
// (paper on ink), like the highlighted section slug on a printed index.
export function MastheadNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="flex flex-wrap items-center justify-center gap-x-ed-xs text-(length:--font-size-small) uppercase tracking-[0.12em] text-charcoal"
    >
      {ITEMS.map((item, i) => {
        const active =
          item.href === "/" || item.href === "/archive"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <span key={item.href} className="flex items-center">
            {/* Below tablet the row wraps, and a bullet would lead the
                second line; the items' own padding separates them there. */}
            {i > 0 && (
              <span aria-hidden className="hidden tablet:inline mx-ed-sm text-hairline">
                &bull;
              </span>
            )}
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "my-ed-xs px-ed-sm py-1.5 tablet:py-[3px] bg-ink text-paper"
                  : "my-ed-xs px-ed-sm py-1.5 tablet:py-[3px] hover:text-accent-ink transition-colors"
              }
            >
              {item.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
