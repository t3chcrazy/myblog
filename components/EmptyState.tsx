import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref = "/",
  actionLabel = "Consult today's front page",
}: {
  title: string;
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
      <h3 className="font-headline text-(length:--font-size-h2) font-medium text-ink mt-ed-xs">
        {title}
      </h3>
      <div className="w-16 h-[2px] bg-accent-ink opacity-40 my-ed-sm" />
      <p className="text-(length:--font-size-body) text-charcoal max-w-sm">
        {body}
      </p>
      <Link
        href={actionHref}
        className="text-(length:--font-size-micro) uppercase tracking-[0.15em] text-accent-ink hover:text-ink mt-ed-lg"
      >
        &larr; {actionLabel}
      </Link>
    </div>
  );
}
