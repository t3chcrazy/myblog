import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";
import { MastheadNav } from "@/components/MastheadNav";

function today() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// One volume per year of publication, numbered from the first year.
const FIRST_YEAR = 2026;
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function Masthead() {
  const issue = getAllPosts().length;
  const volume = ROMAN[new Date().getFullYear() - FIRST_YEAR] ?? "I";

  return (
    <header className="bg-paper" style={{ viewTransitionName: "site-header" }}>
      {/* Folio strip: edition metadata, as printed above the nameplate. */}
      <div className="mx-auto max-w-[1240px] px-gutter pt-ed-sm">
        <div className="flex items-center justify-between gap-ed-md py-ed-xs text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-charcoal">
          <span className="flex flex-wrap items-center gap-x-ed-sm">
            <span>Vol. {volume}</span>
            <span aria-hidden>&bull;</span>
            <span>No. {issue}</span>
            <span aria-hidden className="hidden tablet:inline">&bull;</span>
            <span className="hidden tablet:inline">{today()}</span>
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-gutter pt-ed-md pb-ed-md">
        <div className="grid items-center gap-ed-md desktop:grid-cols-[11rem_1fr_11rem]">
          <div className="ear hidden desktop:block p-ed-sm text-center">
            <p className="label-caps text-accent-ink">Weekly Edition</p>
            <p className="font-headline italic text-(length:--font-size-small) text-charcoal mt-1 leading-snug">
              All the code that&rsquo;s fit to print
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="nameplate inline-block font-headline font-normal text-ink"
            >
              Auxesis
            </Link>
            <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-sm">
              A weekly digest of Web, Mobile, Backend &amp; AI engineering
            </p>
          </div>

          <div className="ear hidden desktop:block p-ed-sm text-center">
            <p className="label-caps text-accent-ink">Est. {FIRST_YEAR}</p>
            <p className="font-headline italic text-(length:--font-size-small) text-charcoal mt-1 leading-snug">
              Set, proofed &amp; printed by an AI
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-gutter">
        <div className="double-rule" />
        <MastheadNav />
        <div className="h-px bg-ink" />
      </div>
      <Search />
    </header>
  );
}
