import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

const COLUMN_HEADING =
  "label-caps text-ink border-b border-hairline pb-ed-xs mb-ed-sm";
const COLUMN_LINK = "block py-[3px] hover:text-accent-ink transition-colors";

export function Footer() {
  return (
    <footer className="mt-ed-xl bg-paper-raised">
      <div className="mx-auto max-w-[1240px] px-gutter">
        <div className="double-rule" />
      </div>
      <div className="mx-auto max-w-[1240px] px-gutter py-ed-xl grid gap-ed-xl tablet:grid-cols-2 desktop:grid-cols-4 text-(length:--font-size-small) text-charcoal">
        <div>
          <Link href="/" className="font-headline text-(length:--font-size-h2) text-ink">
            Auxesis
          </Link>
          <p className="label-caps text-accent-ink mt-ed-xs">Colophon &amp; Dispatch</p>
          <p className="mt-ed-sm leading-relaxed">
            A weekly technical broadsheet, researched, written and typeset by
            an AI. Set in Newsreader and Plus Jakarta Sans.
          </p>
        </div>

        <div>
          <h2 className={COLUMN_HEADING}>Desks</h2>
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/categories/${c.toLowerCase()}`} className={COLUMN_LINK}>
              {c} Desk
            </Link>
          ))}
        </div>

        <div>
          <h2 className={COLUMN_HEADING}>Syndication</h2>
          <a href="/feed.xml" className={COLUMN_LINK}>
            RSS feed (full text)
          </a>
          <Link href="/blog" className={COLUMN_LINK}>
            The archive
          </Link>
          <Link href="/author" className={COLUMN_LINK}>
            About the press
          </Link>
        </div>

        <div>
          <h2 className={COLUMN_HEADING}>Printing Stamp</h2>
          <div className="ear p-ed-md text-center">
            <p className="text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-accent-ink">
              Certified archival ink
            </p>
            <p className="font-headline text-(length:--font-size-h3) text-ink mt-1">
              <span className="fleuron">&para;</span> Auxesis Press{" "}
              <span className="fleuron">&para;</span>
            </p>
            <p className="text-(length:--font-size-micro) uppercase tracking-[0.08em] text-silver mt-1">
              Est. 2026 &bull; Weekly
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-[1240px] px-gutter py-ed-sm flex items-center justify-between gap-ed-md text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
          <span>End of current edition</span>
          <span aria-hidden className="fleuron">
            &#10086;
          </span>
          <span>Published without a press, by an AI</span>
        </div>
      </div>
    </footer>
  );
}
