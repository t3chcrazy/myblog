import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref = "/",
  actionLabel = "Consult today's front page",
}: {
  /** Omit where the page's own h1 already says it (the 404). */
  title?: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-ed-xl px-gutter bg-paper-raised">
      <span className="fleuron text-(length:--font-size-h1) leading-none" aria-hidden>
        &#10086;
      </span>
      <p className="text-(length:--font-size-small) uppercase tracking-[0.15em] text-accent-ink font-semibold mt-ed-md">
        Composing Room Notice
      </p>
      {title && (
        <h2 className="font-headline text-(length:--font-size-h2) font-medium text-ink mt-ed-xs">
          {title}
        </h2>
      )}
      <div className="w-16 h-[2px] bg-accent-ink opacity-40 my-ed-sm" />
      <p className="text-(length:--font-size-body) text-charcoal max-w-sm">
        {body}
      </p>
      <Link
        href={actionHref}
        className="group inline-flex items-center gap-1 min-h-8 text-(length:--font-size-micro) uppercase tracking-[0.15em] text-accent-ink hover:text-ink transition-colors mt-ed-lg"
      >
        <span className="nudge-back" aria-hidden>&larr;</span> {actionLabel}
      </Link>
    </div>
  );
}
