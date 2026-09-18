import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export function Masthead() {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col items-center gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h2)] font-bold tracking-tight text-ink"
        >
          The Weekly Build
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[length:var(--font-size-small)] uppercase tracking-wide text-charcoal">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="hover:text-accent"
            >
              {category}
            </Link>
          ))}
          <Link href="/blog" className="hover:text-accent">
            All posts
          </Link>
          <Link href="/author" className="hover:text-accent">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
